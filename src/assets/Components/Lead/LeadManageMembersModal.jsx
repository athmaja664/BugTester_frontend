import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { getUsersAPI, updateProjectMembersAPI } from "../../../../services/allAPI";

function LeadManageMembersModal({ project, onClose, getProjects }) {
    const [allUsers, setAllUsers] = useState([])
    const [developerIds, setDeveloperIds] = useState(
        project.members?.filter((m) => m.role === 'Developer').map((m) => m.id) || []
    )
    const [testerIds, setTesterIds] = useState(
        project.members?.filter((m) => m.role === 'Tester').map((m) => m.id) || []
    )
    const [loading, setLoading] = useState(false)
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
        try {
            setLoading(true)
            const reqHeader = { Authorization: `Bearer ${token}` }
            const reqBody = {
                lead_id: project.lead_id,
                developer_ids: developerIds,
                tester_ids: testerIds
            }
            const response = await updateProjectMembersAPI(project.id, reqBody, reqHeader)

            if (response.status === 200) {
                toast.success('Project members updated successfully')
                getProjects()
                onClose()
            } else {
                toast.error(response?.response?.data?.message || 'Failed to update members')
            }
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message || 'Failed to update members')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] px-4">
            <div className="bg-[#161922] border border-white/[0.08] rounded-[16px] shadow-lg w-full max-w-[440px] p-6 max-h-[90vh] overflow-y-auto">

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            Manage Members
                        </h3>
                        <p className="text-[12.5px] text-[#5b606c] mt-1">
                            {project.name}
                        </p>
                    </div>
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
                            Developers
                        </label>
                        <div className="flex flex-col gap-2 p-3 rounded-[8px] bg-white/[0.03] border border-white/10 max-h-[160px] overflow-y-auto">
                            {allUsers.filter((item) => item.role === 'Developer').length === 0 ? (
                                <span className="text-[12.5px] text-[#5b606c]">No developers found</span>
                            ) : (
                                allUsers.filter((item) => item.role === 'Developer').map((item) => (
                                    <label key={item.id} className="flex items-center gap-2 text-[13px] text-white cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={developerIds.includes(item.id)}
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
                        <div className="flex flex-col gap-2 p-3 rounded-[8px] bg-white/[0.03] border border-white/10 max-h-[160px] overflow-y-auto">
                            {allUsers.filter((item) => item.role === 'Tester').length === 0 ? (
                                <span className="text-[12.5px] text-[#5b606c]">No testers found</span>
                            ) : (
                                allUsers.filter((item) => item.role === 'Tester').map((item) => (
                                    <label key={item.id} className="flex items-center gap-2 text-[13px] text-white cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={testerIds.includes(item.id)}
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
                        {loading ? 'Saving...' : 'Save Members'}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default LeadManageMembersModal;