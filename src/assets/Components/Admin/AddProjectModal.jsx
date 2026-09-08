import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { createProjectAPI, getUsersAPI } from "../../../../services/allAPI";


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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] px-4">
            <div className="bg-[#161922] border border-white/[0.08] rounded-[16px] shadow-lg w-full max-w-[440px] p-6 max-h-[90vh] overflow-y-auto">

                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">
                        Add Project
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
                            Project Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={projectData.name}
                            onChange={handleChange}
                            placeholder="Enter project name"
                            className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#a8abb8]">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={projectData.description}
                            onChange={handleChange}
                            placeholder="Enter project description"
                            rows={3}
                            className="px-3.5 py-2.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors resize-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#a8abb8]">
                            Status
                        </label>
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

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Start Date
                            </label>
                            <input
                                type="date"
                                name="start_date"
                                value={projectData.start_date}
                                onChange={handleChange}
                                className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white outline-none focus:border-[#f0a83b] transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Due Date
                            </label>
                            <input
                                type="date"
                                name="due_date"
                                value={projectData.due_date}
                                onChange={handleChange}
                                className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white outline-none focus:border-[#f0a83b] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#a8abb8]">
                            Lead
                        </label>
                        <select
                            name="lead_id"
                            value={projectData.lead_id}
                            onChange={handleChange}
                            className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b]"
                        >
                            <option className="bg-[#161922]" value="">No lead assigned</option>
                            {allUsers.filter((item) => item.role === 'Lead').map((item) => (
                                <option className="bg-[#161922]" key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#a8abb8]">
                            Developers
                        </label>
                        <div className="flex flex-col gap-2 p-3 rounded-[8px] bg-white/[0.03] border border-white/10 max-h-[140px] overflow-y-auto">
                            {allUsers.filter((item) => item.role === 'Developer').length === 0 ? (
                                <span className="text-[12.5px] text-[#5b606c]">No developers found</span>
                            ) : (
                                allUsers.filter((item) => item.role === 'Developer').map((item) => (
                                    <label key={item.id} className="flex items-center gap-2 text-[13px] text-white cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={projectData.developer_ids.includes(item.id)}
                                            onChange={() => toggleDeveloper(item.id)}
                                            className="accent-[#f0a83b]"
                                        />
                                        {item.name}
                                    </label>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#a8abb8]">
                            Testers
                        </label>
                        <div className="flex flex-col gap-2 p-3 rounded-[8px] bg-white/[0.03] border border-white/10 max-h-[140px] overflow-y-auto">
                            {allUsers.filter((item) => item.role === 'Tester').length === 0 ? (
                                <span className="text-[12.5px] text-[#5b606c]">No testers found</span>
                            ) : (
                                allUsers.filter((item) => item.role === 'Tester').map((item) => (
                                    <label key={item.id} className="flex items-center gap-2 text-[13px] text-white cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={projectData.tester_ids.includes(item.id)}
                                            onChange={() => toggleTester(item.id)}
                                            className="accent-[#f0a83b]"
                                        />
                                        {item.name}
                                    </label>
                                ))
                            )}
                        </div>
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
                        {loading ? 'Creating...' : 'Create Project'}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AddProjectModal;