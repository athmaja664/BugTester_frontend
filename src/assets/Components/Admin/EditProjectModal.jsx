import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { updateProjectAPI, updateProjectMembersAPI, getUsersAPI } from "../../../../services/allAPI";

// Click-to-open multi-select, same style as "Assign To" in ReportBugModal
function MultiSelect({ label, placeholder, emptyText, options, selectedIds, onToggle }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="flex flex-col gap-2 relative" ref={ref}>
            <label className="text-[12.5px] font-medium text-[#a8abb8]">{label}</label>

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b] flex items-center justify-between"
            >
                <span className={`truncate ${selectedIds.length === 0 ? "text-[#5b606c]" : "text-white"}`}>
                    {selectedIds.length === 0
                        ? placeholder
                        : options.filter((o) => selectedIds.includes(o.id)).map((o) => o.name).join(", ")
                    }
                </span>
                <span className="text-[#6a6f7b] text-xs ml-2 flex-shrink-0">
                    {open ? "▲" : "▼"}
                </span>
            </button>

            {open && (
                <div className="absolute top-full mt-1 left-0 right-0 z-10 bg-[#1c202b] border border-white/10 rounded-[8px] shadow-lg max-h-[180px] overflow-y-auto p-2">
                    {options.length === 0 && (
                        <p className="text-[12.5px] text-[#5b606c] px-2 py-1">{emptyText}</p>
                    )}
                    {options.map((o) => (
                        <label
                            key={o.id}
                            className="flex items-center gap-2 text-[13px] text-white px-2 py-2 rounded-[6px] cursor-pointer hover:bg-white/[0.05]"
                        >
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(o.id)}
                                onChange={() => onToggle(o.id)}
                                className="accent-[#f0a83b]"
                            />
                            {o.name}
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}

function EditProjectModal({ project, onClose, getProjects }) {
    const [projectData, setProjectData] = useState({
        name: "",
        description: "",
        status: "Planning",
        start_date: "",
        due_date: ""
    })
    const [lead_id, setLeadId] = useState("")
    const [developer_ids, setDeveloperIds] = useState([])
    const [tester_ids, setTesterIds] = useState([])
    const [loading, setLoading] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const reqHeader = { Authorization: `Bearer ${token}` }
                const response = await getUsersAPI(reqHeader)
                if (response.status === 200) {
                    setAllUsers(response.data.users)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchUsers()
    }, [])

    useEffect(() => {
        if (project) {
            setProjectData({
                name: project.name || "",
                description: project.description || "",
                status: project.status || "Planning",
                start_date: project.start_date ? project.start_date.slice(0, 10) : "",
                due_date: project.due_date ? project.due_date.slice(0, 10) : ""
            })
            setLeadId(project.lead_id || "")
            setDeveloperIds(
                project.members
                    ? project.members.filter((item) => item.role === 'Developer').map((item) => item.id)
                    : []
            )
            setTesterIds(
                project.members
                    ? project.members.filter((item) => item.role === 'Tester').map((item) => item.id)
                    : []
            )
        }
    }, [project])

    const leads = allUsers.filter((u) => u.role === 'Lead')
    const developers = allUsers.filter((u) => u.role === 'Developer')
    const testers = allUsers.filter((u) => u.role === 'Tester')

    const handleChange = (e) => {
        const { name, value } = e.target
        setProjectData((prev) => ({ ...prev, [name]: value }))
    }

    const toggleDeveloper = (id) => {
        setDeveloperIds((prev) =>
            prev.includes(id) ? prev.filter((devId) => devId !== id) : [...prev, id]
        )
    }

    const toggleTester = (id) => {
        setTesterIds((prev) =>
            prev.includes(id) ? prev.filter((testerId) => testerId !== id) : [...prev, id]
        )
    }

    const handleSubmit = async () => {
        if (!projectData.name.trim()) {
            toast.error('Project name is required')
            return
        }
        if (loading) return

        try {
            setLoading(true)
            const reqHeader = { Authorization: `Bearer ${token}` }

            const response = await updateProjectAPI(project.id, projectData, reqHeader)

            if (response.status === 200) {
                await updateProjectMembersAPI(
                    project.id,
                    { lead_id: lead_id || null, developer_ids, tester_ids },
                    reqHeader
                )
                toast.success('Project updated successfully')
                getProjects()
                onClose()
            } else {
                toast.error(response?.response?.data?.message || 'Failed to update project')
            }
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message || 'Failed to update project')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] px-4">
            <div className="bg-[#161922] border border-white/[0.08] rounded-[16px] shadow-lg w-full max-w-[720px] max-h-[90vh] overflow-y-auto">

                {/* header */}
                <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-white/[0.06]">
                    <h3 className="text-lg font-semibold text-white">Edit Project</h3>
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
                            Project Details
                        </p>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">Project Name</label>
                            <input
                                type="text"
                                name="name"
                                value={projectData.name}
                                onChange={handleChange}
                                placeholder="e.g. E-Commerce Website"
                                className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">Description</label>
                            <textarea
                                name="description"
                                value={projectData.description}
                                onChange={handleChange}
                                placeholder="What is this project about?"
                                rows={4}
                                className="px-3.5 py-2.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">Status</label>
                            <select
                                name="status"
                                value={projectData.status}
                                onChange={handleChange}
                                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b]"
                            >
                                <option className="bg-[#161922]" value="Planning">Planning</option>
                                <option className="bg-[#161922]" value="In Progress">In Progress</option>
                                <option className="bg-[#161922]" value="Completed">Completed</option>
                                <option className="bg-[#161922]" value="On Hold">On Hold</option>
                            </select>
                        </div>

                        <div className="flex gap-4 max-[400px]:flex-col">
                            <div className="flex flex-col gap-2 flex-1 min-w-0">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">Start Date</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={projectData.start_date}
                                    onChange={handleChange}
                                    className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white outline-none focus:border-[#f0a83b] transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-2 flex-1 min-w-0">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">Due Date</label>
                                <input
                                    type="date"
                                    name="due_date"
                                    value={projectData.due_date}
                                    onChange={handleChange}
                                    className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white outline-none focus:border-[#f0a83b] transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT column */}
                    <div className="flex flex-col gap-5">
                        <p className="text-xs font-semibold text-[#f0a83b] uppercase tracking-wide">
                            Team
                        </p>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">Lead</label>
                            <select
                                value={lead_id}
                                onChange={(e) => setLeadId(e.target.value)}
                                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b]"
                            >
                                <option className="bg-[#161922]" value="">No lead assigned</option>
                                {leads.map((item) => (
                                    <option className="bg-[#161922]" key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <MultiSelect
                            label="Developers"
                            placeholder="Select developers"
                            emptyText="No developers found"
                            options={developers}
                            selectedIds={developer_ids}
                            onToggle={toggleDeveloper}
                        />

                        <MultiSelect
                            label="Testers"
                            placeholder="Select testers"
                            emptyText="No testers found"
                            options={testers}
                            selectedIds={tester_ids}
                            onToggle={toggleTester}
                        />
                    </div>

                </div>

                {/* footer */}
                <div className="flex items-center justify-center gap-3 px-7 py-5 border-t border-white/[0.06]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-[44px] px-5 text-sm font-medium text-[#a8abb8] hover:text-white cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="h-[44px] px-6 text-sm font-bold text-[#0d0f14] bg-[#f0a83b] rounded-[8px] hover:bg-[#f5bc6b] disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default EditProjectModal;