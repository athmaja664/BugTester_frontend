import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { updateBugAPI, getProjectsAPI, getUsersAPI } from "../../../../services/allAPI";

const allStatuses = ["New", "Assigned", "In Progress", "Resolved", "Ready for QA", "Retest", "Verified", "Closed"]

function EditBugModal({ bug, onClose, getBugs }) {
    const [bugData, setBugData] = useState({
        title: bug.title || "",
        description: bug.description || "",
        project_id: bug.project_id || "",
        status: bug.status || "New",
        priority: bug.priority || "Medium",
        assigned_to: bug.assigned_to || ""
    })
    const [projects, setProjects] = useState([])
    const [developers, setDevelopers] = useState([])
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

    useEffect(() => {
        getProjects()
        getDevelopers()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setBugData((prev) => ({ ...prev, [name]: value }))
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
                assigned_to: bugData.assigned_to ? Number(bugData.assigned_to) : null
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] px-4">
            <div className="bg-[#161922] border border-white/[0.08] rounded-[16px] shadow-lg w-full max-w-[440px] p-6">

                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">
                        Edit Bug — BUG-{bug.id}
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-[8px] text-[#5b606c] hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
                    >
                        <AiOutlineClose size={16} />
                    </button>
                </div>

                <div className="flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#a8abb8]">
                            Bug Title
                        </label>
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
                        <label className="text-[12.5px] font-medium text-[#a8abb8]">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={bugData.description}
                            onChange={handleChange}
                            placeholder="Steps to reproduce, expected vs actual behavior..."
                            rows={3}
                            className="px-3.5 py-2.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors resize-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#a8abb8]">
                            Project
                        </label>
                        <select
                            name="project_id"
                            value={bugData.project_id}
                            disabled
                            className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.02] border border-white/10 text-[13.5px] text-left text-[#6a6f7b] cursor-not-allowed outline-none"
                        >
                            <option className="bg-[#161922]" value="">Select a project</option>
                            {projects.map((p) => (
                                <option className="bg-[#161922]" key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-4">

                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Status
                            </label>
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

                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Priority
                            </label>
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

                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#a8abb8]">
                            Assign To
                        </label>
                        <select
                            name="assigned_to"
                            value={bugData.assigned_to}
                            onChange={handleChange}
                            className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b]"
                        >
                            <option className="bg-[#161922]" value="">Unassigned</option>
                            {developers.map((d) => (
                                <option className="bg-[#161922]" key={d.id} value={d.id}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-[#a8abb8] border border-white/10 rounded-[8px] hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-semibold text-[#0d0f14] bg-[#f0a83b] rounded-[8px] hover:bg-[#f5bc6b] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default EditBugModal;