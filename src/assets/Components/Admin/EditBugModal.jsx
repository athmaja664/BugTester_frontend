import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlinePaperClip } from "react-icons/hi";
import toast from "react-hot-toast";
import AssigneeDropdown from "../Common/AssigneeDropdown";
import { updateBugAPI, getProjectsAPI, getUsersAPI, getSingleBugAPI } from "../../../../services/allAPI";

const allStatuses = ["New", "Assigned", "In Progress", "Resolved", "Ready for QA", "Retest", "Verified", "Closed"]
const allTags = ["Bug", "Enhancement", "Feature"]

function EditBugModal({ bug, onClose, getBugs }) {
    const [bugData, setBugData] = useState({
        title: bug.title || "",
        description: bug.description || "",
        project_id: bug.project_id || "",
        status: bug.status || "New",
        priority: bug.priority || "Medium",
        tag: bug.tag || "Bug",
        // start with everyone already assigned to this bug
        assignedTo: bug.assignees && bug.assignees.length > 0
            ? bug.assignees.map((a) => a.id)
            : (bug.assigned_to ? [bug.assigned_to] : [])
    })
    const [projects, setProjects] = useState([])
    const [developers, setDevelopers] = useState([])
    const [attachments, setAttachments] = useState([])
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('token')

    const getProjects = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getProjectsAPI(reqHeader)
            if (response.status === 200) {
                setProjects(response.data.projects)
            }
        } catch (err) {
            toast.error('Failed to load projects')
        }
    }

    const getDevelopers = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getUsersAPI(reqHeader)
            if (response.status === 200) {
                const devs = response.data.users.filter((u) => u.role === 'Developer')
                setDevelopers(devs)
            }
        } catch (err) {
            toast.error('Failed to load developers')
        }
    }

    // the single-bug endpoint returns the attachment list
    const getAttachments = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getSingleBugAPI(bug.id, reqHeader)
            if (response.status === 200) {
                setAttachments(response.data.attachments || [])
            }
        } catch (err) {
            toast.error('Failed to load attachments')
        }
    }

    useEffect(() => {
        getProjects()
        getDevelopers()
        getAttachments()
    }, [])

    // keeps people who are already assigned in the list, so saving never removes them by accident
    const assigneeOptions = [
        ...developers,
        ...(bug.assignees || []).filter((a) => !developers.some((d) => d.id === a.id))
    ]

    const handleChange = (e) => {
        const { name, value } = e.target
        setBugData((prev) => ({ ...prev, [name]: value }))
    }

    const handleTagSelect = (tag) => {
        setBugData((prev) => ({ ...prev, tag }))
    }

    const handleAssigneeToggle = (devId) => {
        setBugData((prev) => ({
            ...prev,
            assignedTo: prev.assignedTo.includes(devId)
                ? prev.assignedTo.filter((id) => id !== devId)
                : [...prev.assignedTo, devId]
        }))
    }

    const handleSubmit = async () => {
        if (!bugData.title.trim()) {
            toast.error('Bug title is required')
            return
        }

        if (!bugData.project_id) {
            toast.error('Please select a project')
            return
        }

        try {
            setLoading(true)
            const reqHeader = { Authorization: `Bearer ${token}` }

            const reqBody = {
                title: bugData.title,
                description: bugData.description,
                status: bugData.status,
                priority: bugData.priority,
                tag: bugData.tag,
                assignedTo: bugData.assignedTo
            }

            const response = await updateBugAPI(bug.id, reqBody, reqHeader)

            if (response.status === 200) {
                toast.success('Bug updated successfully')
                getBugs()
                onClose()
            } else {
                toast.error(response?.response?.data?.message || 'Failed to update bug')
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to update bug')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] px-4">
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] shadow-lg w-full max-w-[720px] max-h-[90vh] overflow-y-auto">

                {/* header */}
                <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-[#e5e7eb]">
                    <h3 className="text-lg font-semibold text-[#111827]">
                        Edit Bug — BUG-{bug.id}
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-[8px] text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827] transition-colors cursor-pointer"
                    >
                        <AiOutlineClose size={16} />
                    </button>
                </div>

                {/* two-column form */}
                <div className="px-7 py-6 grid grid-cols-2 gap-8 max-[560px]:grid-cols-1">

                    {/* LEFT column */}
                    <div className="flex flex-col gap-5">
                        <p className="text-xs font-semibold text-[#b36b00] uppercase tracking-wide">
                            Bug Details
                        </p>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#374151]">Bug Title</label>
                            <input
                                type="text"
                                name="title"
                                value={bugData.title}
                                onChange={handleChange}
                                placeholder="e.g. Login button not responding on Safari"
                                className="h-[42px] px-3.5 rounded-[8px] bg-white border border-[#d1d5db] text-[13.5px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#f0a83b] transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#374151]">Description</label>
                            <textarea
                                name="description"
                                value={bugData.description}
                                onChange={handleChange}
                                placeholder="Steps to reproduce, expected vs actual behavior..."
                                rows={4}
                                className="px-3.5 py-2.5 rounded-[8px] bg-white border border-[#d1d5db] text-[13.5px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#f0a83b] transition-colors resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#374151]">Project</label>
                            <select
                                name="project_id"
                                value={bugData.project_id}
                                disabled
                                className="w-full h-[42px] px-3.5 rounded-[8px] bg-[#f3f4f6] border border-[#d1d5db] text-[13.5px] text-left text-[#9ca3af] cursor-not-allowed outline-none"
                            >
                                <option className="bg-white text-[#111827]" value="">Select a project</option>
                                {projects.map((p) => (
                                    <option className="bg-white text-[#111827]" key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#374151]">Attachments</label>
                            {attachments.length === 0 ? (
                                <p className="text-[12.5px] text-[#6b7280]">No attachments</p>
                            ) : (
                                <div className="flex flex-col gap-1.5">
                                    {attachments.map((file) => (
                                        <a
                                            key={file.id}
                                            href={file.file_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#f9fafb] border border-[#e5e7eb] text-[12.5px] text-[#111827] hover:border-[#f0a83b] transition-colors"
                                        >
                                            <HiOutlinePaperClip size={14} className="text-[#d97706] shrink-0" />
                                            <span className="truncate">{file.file_name}</span>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT column */}
                    <div className="flex flex-col gap-5">
                        <p className="text-xs font-semibold text-[#b36b00] uppercase tracking-wide">
                            Classification
                        </p>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#374151]">Status</label>
                            <select
                                name="status"
                                value={bugData.status}
                                onChange={handleChange}
                                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white border border-[#d1d5db] text-[13.5px] text-left text-[#111827] cursor-pointer outline-none focus:border-[#f0a83b]"
                            >
                                {allStatuses.map((s) => (
                                    <option className="bg-white text-[#111827]" key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#374151]">Priority</label>
                            <select
                                name="priority"
                                value={bugData.priority}
                                onChange={handleChange}
                                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white border border-[#d1d5db] text-[13.5px] text-left text-[#111827] cursor-pointer outline-none focus:border-[#f0a83b]"
                            >
                                <option className="bg-white text-[#111827]" value="Low">Low</option>
                                <option className="bg-white text-[#111827]" value="Medium">Medium</option>
                                <option className="bg-white text-[#111827]" value="High">High</option>
                                <option className="bg-white text-[#111827]" value="Critical">Critical</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#374151]">Tag</label>
                            <div className="flex gap-2 flex-wrap">
                                {allTags.map((tag) => (
                                    <button
                                        type="button"
                                        key={tag}
                                        onClick={() => handleTagSelect(tag)}
                                        className={bugData.tag === tag
                                            ? "px-3 py-1.5 rounded-[6px] text-[12.5px] font-medium border cursor-pointer transition-colors bg-[#f0a83b]/[0.15] text-[#b36b00] border-[#f0a83b]/50"
                                            : "px-3 py-1.5 rounded-[6px] text-[12.5px] font-medium border cursor-pointer transition-colors bg-white text-[#4b5563] border-[#d1d5db] hover:border-[#9ca3af]"
                                        }
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <AssigneeDropdown
                            options={assigneeOptions}
                            selected={bugData.assignedTo}
                            onToggle={handleAssigneeToggle}
                        />
                    </div>

                </div>

                {/* footer */}
                <div className="flex items-center justify-center gap-3 px-7 py-5 border-t border-[#e5e7eb]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-[44px] px-5 text-sm font-medium text-[#6b7280] hover:text-[#111827]"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="h-[44px] px-6 text-sm font-bold text-[#1f2937] bg-[#f0a83b] rounded-[3px] hover:bg-[#f5bc6b] disabled:opacity-60"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default EditBugModal;