import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { createProjectAPI, getUsersAPI } from "../../../../services/allAPI";

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
            <label className="text-[12.5px] font-medium text-[#374151]">{label}</label>

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white border border-[#d1d5db] text-[13.5px] text-left text-[#111827] cursor-pointer outline-none focus:border-[#f0a83b] flex items-center justify-between"
            >
                <span className={`truncate ${selectedIds.length === 0 ? "text-[#9ca3af]" : "text-[#111827]"}`}>
                    {selectedIds.length === 0
                        ? placeholder
                        : options.filter((o) => selectedIds.includes(o.id)).map((o) => o.name).join(", ")
                    }
                </span>
                <span className="text-[#6b7280] text-xs ml-2 flex-shrink-0">
                    {open ? "▲" : "▼"}
                </span>
            </button>

            {open && (
                <div className="absolute top-full mt-1 left-0 right-0 z-10 bg-white border border-[#d1d5db] rounded-[8px] shadow-lg max-h-[180px] overflow-y-auto p-2">
                    {options.length === 0 && (
                        <p className="text-[12.5px] text-[#6b7280] px-2 py-1">{emptyText}</p>
                    )}
                    {options.map((o) => (
                        <label
                            key={o.id}
                            className="flex items-center gap-2 text-[13px] text-[#111827] px-2 py-2 rounded-[6px] cursor-pointer hover:bg-[#f3f4f6]"
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

function AddProjectModal({ onClose, getProjects }) {
    const [projectData, setProjectData] = useState({
        name: "",
        description: "",
        status: "Planning",
        start_date: "",
        due_date: "",
        lead_id: "",
        developer_ids: [],
        tester_ids: []
    })
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

    const leads = allUsers.filter((u) => u.role === 'Lead')
    const developers = allUsers.filter((u) => u.role === 'Developer')
    const testers = allUsers.filter((u) => u.role === 'Tester')

    const handleChange = (e) => {
        const { name, value } = e.target
        setProjectData((prev) => ({ ...prev, [name]: value }))
    }

    const toggleDeveloper = (id) => {
        setProjectData((prev) => ({
            ...prev,
            developer_ids: prev.developer_ids.includes(id)
                ? prev.developer_ids.filter((devId) => devId !== id)
                : [...prev.developer_ids, id]
        }))
    }

    const toggleTester = (id) => {
        setProjectData((prev) => ({
            ...prev,
            tester_ids: prev.tester_ids.includes(id)
                ? prev.tester_ids.filter((testerId) => testerId !== id)
                : [...prev.tester_ids, id]
        }))
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
            const response = await createProjectAPI(projectData, reqHeader)

            if (response.status === 200) {
                toast.success('Project created successfully')
                getProjects()
                onClose()
            } else {
                toast.error(response?.response?.data?.message || 'Failed to create project')
            }
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message || 'Failed to create project')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] px-4">
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] shadow-lg w-full max-w-[720px] max-h-[90vh] overflow-y-auto">

                {/* header */}
                <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-[#e5e7eb]">
                    <h3 className="text-lg font-semibold text-[#111827]">Add Project</h3>
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
                            Project Details
                        </p>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#374151]">Project Name</label>
                            <input
                                type="text"
                                name="name"
                                value={projectData.name}
                                onChange={handleChange}
                                placeholder="e.g. E-Commerce Website"
                                className="h-[42px] px-3.5 rounded-[8px] bg-white border border-[#d1d5db] text-[13.5px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#f0a83b] transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#374151]">Description</label>
                            <textarea
                                name="description"
                                value={projectData.description}
                                onChange={handleChange}
                                placeholder="What is this project about?"
                                rows={4}
                                className="px-3.5 py-2.5 rounded-[8px] bg-white border border-[#d1d5db] text-[13.5px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#f0a83b] transition-colors resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#374151]">Status</label>
                            <select
                                name="status"
                                value={projectData.status}
                                onChange={handleChange}
                                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white border border-[#d1d5db] text-[13.5px] text-left text-[#111827] cursor-pointer outline-none focus:border-[#f0a83b]"
                            >
                                <option className="bg-white text-[#111827]" value="Planning">Planning</option>
                                <option className="bg-white text-[#111827]" value="In Progress">In Progress</option>
                                <option className="bg-white text-[#111827]" value="Completed">Completed</option>
                                <option className="bg-white text-[#111827]" value="On Hold">On Hold</option>
                            </select>
                        </div>

                        <div className="flex gap-4 max-[400px]:flex-col">
                            <div className="flex flex-col gap-2 flex-1 min-w-0">
                                <label className="text-[12.5px] font-medium text-[#374151]">Start Date</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={projectData.start_date}
                                    onChange={handleChange}
                                    className="h-[42px] px-3.5 rounded-[8px] bg-white border border-[#d1d5db] text-[13.5px] text-[#111827] outline-none focus:border-[#f0a83b] transition-colors [color-scheme:light]"
                                />
                            </div>

                            <div className="flex flex-col gap-2 flex-1 min-w-0">
                                <label className="text-[12.5px] font-medium text-[#374151]">Due Date</label>
                                <input
                                    type="date"
                                    name="due_date"
                                    value={projectData.due_date}
                                    onChange={handleChange}
                                    className="h-[42px] px-3.5 rounded-[8px] bg-white border border-[#d1d5db] text-[13.5px] text-[#111827] outline-none focus:border-[#f0a83b] transition-colors [color-scheme:light]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT column */}
                    <div className="flex flex-col gap-5">
                        <p className="text-xs font-semibold text-[#b36b00] uppercase tracking-wide">
                            Team
                        </p>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#374151]">Lead</label>
                            <select
                                name="lead_id"
                                value={projectData.lead_id}
                                onChange={handleChange}
                                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white border border-[#d1d5db] text-[13.5px] text-left text-[#111827] cursor-pointer outline-none focus:border-[#f0a83b]"
                            >
                                <option className="bg-white text-[#111827]" value="">No lead assigned</option>
                                {leads.map((item) => (
                                    <option className="bg-white text-[#111827]" key={item.id} value={item.id}>
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
                            selectedIds={projectData.developer_ids}
                            onToggle={toggleDeveloper}
                        />

                        <MultiSelect
                            label="Testers"
                            placeholder="Select testers"
                            emptyText="No testers found"
                            options={testers}
                            selectedIds={projectData.tester_ids}
                            onToggle={toggleTester}
                        />
                    </div>

                </div>

                {/* footer */}
                <div className="flex items-center justify-center gap-3 px-7 py-5 border-t border-[#e5e7eb]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-[44px] px-5 text-sm font-medium text-[#6b7280] hover:text-[#111827] cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="h-[44px] px-6 text-sm font-bold text-[#1f2937] bg-[#f0a83b] rounded-[8px] hover:bg-[#f5bc6b] disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating...' : 'Create Project'}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AddProjectModal;