import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { createBugAPI, getProjectsAPI, getUsersAPI } from "../../../../services/allAPI";

function ReportBugModal({ onClose, getBugs }) {
    const allStatuses = ["New", "Assigned", "In Progress"]
    const allTags = ["Bug", "Enhancement", "Feature"]
    const [bugData, setBugData] = useState({
        title: "",
        description: "",
        project_id: "",
        status: "New",
        priority: "Medium",
        assignedTo: [],
        tag: "Bug",
        attachments: []
    })

    const [projects, setProjects] = useState([])
    const [developers, setDevelopers] = useState([])
    const [loading, setLoading] = useState(false)
    const [assignDropdownOpen, setAssignDropdownOpen] = useState(false)
    const assignDropdownRef = useRef(null)
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

    useEffect(() => {
        getProjects()
        getDevelopers()
    }, [])

    // close the assign-to dropdown when clicking outside it
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (assignDropdownRef.current && !assignDropdownRef.current.contains(e.target)) {
                setAssignDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setBugData((prev) => ({ ...prev, [name]: value }))
    }

    const handleTagSelect = (tag) => {
        setBugData((prev) => ({ ...prev, tag }))
    }

    const handleAssigneeToggle = (devId) => {
        setBugData((prev) => {
            const isSelected = prev.assignedTo.includes(devId)
            return {
                ...prev,
                assignedTo: isSelected
                    ? prev.assignedTo.filter((id) => id !== devId)
                    : [...prev.assignedTo, devId]
            }
        })
    }

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files)
        const combined = [...bugData.attachments, ...newFiles]

        if (combined.length > 5) {
            toast.error('You can attach up to 5 files')
            e.target.value = ""
            return
        }
        if (newFiles.some((f) => f.size > 5 * 1024 * 1024)) {
            toast.error('Each file must be under 5MB')
            e.target.value = ""
            return
        }
        setBugData((prev) => ({ ...prev, attachments: combined }))
        e.target.value = "" // lets the user pick the same file again if needed
    }

    const handleRemoveFile = (index) => {
        setBugData((prev) => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
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
        if (loading) return

        try {
            setLoading(true)
            const reqHeader = { Authorization: `Bearer ${token}` }

            // FormData is needed because we are sending files
            const formData = new FormData()
            formData.append('title', bugData.title)
            formData.append('description', bugData.description)
            formData.append('project_id', bugData.project_id)
            formData.append('status', bugData.status)
            formData.append('priority', bugData.priority)
            formData.append('tag', bugData.tag)
            formData.append('assignedTo', JSON.stringify(bugData.assignedTo))
            bugData.attachments.forEach((file) => {
                formData.append('attachments', file)
            })

            const response = await createBugAPI(formData, reqHeader)

            if (response.status === 200) {
                toast.success('Bug reported successfully')
                getBugs()
                onClose()
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to report bug')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] px-4">
            <div className="bg-[#161922] border border-white/[0.08] rounded-[16px] shadow-lg w-full max-w-[720px] max-h-[90vh] overflow-y-auto">

                {/* header */}
                <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-white/[0.06]">
                    <h3 className="text-lg font-semibold text-white">Report Bug</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-[8px] text-[#5b606c] hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
                    >
                        <AiOutlineClose size={16} />
                    </button>
                </div>

                {/* two-column form */}
                <div className="px-7 py-6 grid grid-cols-2 gap-8 max-[560px]:grid-cols-1">

                    {/* LEFT column */}
                    <div className="flex flex-col gap-5">
                        <p className="text-xs font-semibold text-[#f0a83b] uppercase tracking-wide">
                            Bug Details
                        </p>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">Bug Title</label>
                            <input
                                type="text"
                                name="title"
                                value={bugData.title}
                                onChange={handleChange}
                                placeholder="e.g. Login button not responding on Safari"
                                className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">Description</label>
                            <textarea
                                name="description"
                                value={bugData.description}
                                onChange={handleChange}
                                placeholder="Steps to reproduce, expected vs actual behavior..."
                                rows={4}
                                className="px-3.5 py-2.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">Project</label>
                            <select
                                name="project_id"
                                value={bugData.project_id}
                                onChange={handleChange}
                                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b]"
                            >
                                <option className="bg-[#161922]" value="">Select a project</option>
                                {projects.map((p) => (
                                    <option className="bg-[#161922]" key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Attachments (optional, max 5 files, 5MB each)
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="text-[13px] text-[#a8abb8] file:mr-3 file:px-3 file:py-1.5 file:rounded-[6px] file:border-0 file:bg-[#f0a83b]/[0.15] file:text-[#f0a83b] file:text-[12.5px] file:cursor-pointer cursor-pointer"
                            />
                            {bugData.attachments.length > 0 && (
                                <div className="flex flex-col gap-1.5 mt-1">
                                    {bugData.attachments.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-[6px] bg-white/[0.03] border border-white/10"
                                        >
                                            <span className="text-[12.5px] text-white truncate">{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile(index)}
                                                className="text-[#6a6f7b] hover:text-white flex-shrink-0 cursor-pointer"
                                            >
                                                <AiOutlineClose size={13} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT column */}
                    <div className="flex flex-col gap-5">
                        <p className="text-xs font-semibold text-[#f0a83b] uppercase tracking-wide">
                            Classification
                        </p>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">Status</label>
                            <select
                                name="status"
                                value={bugData.status}
                                onChange={handleChange}
                                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b]"
                            >
                                {allStatuses.map((s) => (
                                    <option className="bg-[#161922]" key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">Priority</label>
                            <select
                                name="priority"
                                value={bugData.priority}
                                onChange={handleChange}
                                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b]"
                            >
                                <option className="bg-[#161922]" value="Low">Low</option>
                                <option className="bg-[#161922]" value="Medium">Medium</option>
                                <option className="bg-[#161922]" value="High">High</option>
                                <option className="bg-[#161922]" value="Critical">Critical</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">Tag</label>
                            <div className="flex gap-2 flex-wrap">
                                {allTags.map((tag) => (
                                    <button
                                        type="button"
                                        key={tag}
                                        onClick={() => handleTagSelect(tag)}
                                        className={bugData.tag === tag
                                            ? "px-3 py-1.5 rounded-[6px] text-[12.5px] font-medium border cursor-pointer transition-colors bg-[#f0a83b]/[0.15] text-[#f0a83b] border-[#f0a83b]/40"
                                            : "px-3 py-1.5 rounded-[6px] text-[12.5px] font-medium border cursor-pointer transition-colors bg-white/[0.03] text-[#a8abb8] border-white/10 hover:border-white/20"
                                        }
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Assign To — click-to-open multi-select */}
                        <div className="flex flex-col gap-2 relative" ref={assignDropdownRef}>
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">Assign To</label>

                            <button
                                type="button"
                                onClick={() => setAssignDropdownOpen((prev) => !prev)}
                                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b] flex items-center justify-between"
                            >
                                <span className={`truncate ${bugData.assignedTo.length === 0 ? "text-[#5b606c]" : "text-white"}`}>
                                    {bugData.assignedTo.length === 0
                                        ? "Select developers"
                                        : developers
                                            .filter((d) => bugData.assignedTo.includes(d.id))
                                            .map((d) => d.name)
                                            .join(", ")
                                    }
                                </span>
                                <span className="text-[#6a6f7b] text-xs ml-2 flex-shrink-0">
                                    {assignDropdownOpen ? "▲" : "▼"}
                                </span>
                            </button>

                            {assignDropdownOpen && (
                                <div className="absolute top-full mt-1 left-0 right-0 z-10 bg-[#1c202b] border border-white/10 rounded-[8px] shadow-lg max-h-[180px] overflow-y-auto p-2">
                                    {developers.length === 0 && (
                                        <p className="text-[12.5px] text-[#5b606c] px-2 py-1">No developers found</p>
                                    )}
                                    {developers.map((d) => (
                                        <label
                                            key={d.id}
                                            className="flex items-center gap-2 text-[13px] text-white px-2 py-2 rounded-[6px] cursor-pointer hover:bg-white/[0.05]"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={bugData.assignedTo.includes(d.id)}
                                                onChange={() => handleAssigneeToggle(d.id)}
                                                className="accent-[#f0a83b]"
                                            />
                                            {d.name}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* footer */}
                <div className="flex items-center justify-center gap-3 px-7 py-5 border-t border-white/[0.06]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-[44px] px-5 text-sm font-medium text-[#a8abb8] hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="h-[44px] px-6 text-sm font-bold text-[#0d0f14] bg-[#f0a83b] rounded-[3px] hover:bg-[#f5bc6b] disabled:opacity-60"
                    >
                        {loading ? 'Reporting...' : 'Report Bug'}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ReportBugModal;