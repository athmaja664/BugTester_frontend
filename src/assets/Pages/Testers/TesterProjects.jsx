import React, { useState, useEffect } from "react";
import TesterSidebar from "../../Components/Tester/TesterSidebar";
import TesterReportBugModal from "../../Components/Tester/TesterReportBugModal";
import { AiOutlineSearch, AiOutlineProject } from "react-icons/ai";
import { BsBug } from "react-icons/bs";
import { FiCheckSquare, FiClock } from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi";
import toast from "react-hot-toast";
import { getMyProjectsAPI, getBugsAPI } from "../../../../services/allAPI";

const statusColors = {
    "Planning": "bg-white/[0.05] text-[#8b909c] border-white/10",
    "In Progress": "bg-[#8b98ff]/[0.12] text-[#8b98ff] border-[#8b98ff]/20",
    "Completed": "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/20",
    "On Hold": "bg-[#c084fc]/[0.12] text-[#c084fc] border-[#c084fc]/20",
}

function TesterProjects() {
    const [projects, setProjects] = useState([])
    const [bugs, setBugs] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [showReportModal, setShowReportModal] = useState(false)
    const [reportProjectId, setReportProjectId] = useState(null)
    const token = localStorage.getItem('token')

    const getProjects = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getMyProjectsAPI(reqHeader)
            if (response.status === 200) {
                setProjects(response.data.projects)
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to fetch projects')
        }
    }

    const getBugs = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getBugsAPI(reqHeader)
            if (response.status === 200) {
                setBugs(response.data)
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to fetch bugs')
        }
    }

    useEffect(() => {
        getProjects()
        getBugs()
    }, [])

    const handleReportBug = (projectId) => {
        setReportProjectId(projectId)
        setShowReportModal(true)
    }

    const totalProjects = projects.length
    const inProgressCount = projects.filter((p) => p.status === 'In Progress' || p.status === 'Planning').length
    const completedCount = projects.filter((p) => p.status === 'Completed').length

    const filteredProjects = projects.filter((item) => {
        const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter ? item.status === statusFilter : true
        return matchesSearch && matchesStatus
    })

    return (
        <div className="flex min-h-screen bg-[#0d0f14]">

            <TesterSidebar />

            <div className="flex-1 flex flex-col min-w-0">

                {/* Header */}
                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

                    <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
                        Projects
                    </h1>

                </div>

                {/* Main Content */}
                <div className="flex-1 p-5 lg:p-8">

                    <div className="mb-8">
                        <h1 className="text-[22px] font-semibold text-white">My Projects</h1>
                        <p className="text-[14px] text-[#8b909c] mt-1">
                            View and test the projects assigned to you
                        </p>
                    </div>

                    {/* Summary cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                        <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b] mb-4">
                                <AiOutlineProject size={18} />
                            </span>
                            <p className="text-[24px] font-semibold text-white">{totalProjects}</p>
                            <p className="text-[13px] text-[#8b909c] mt-1">Assigned Projects</p>
                        </div>

                        <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#8b98ff]/[0.12] text-[#8b98ff] mb-4">
                                <FiClock size={18} />
                            </span>
                            <p className="text-[24px] font-semibold text-white">{inProgressCount}</p>
                            <p className="text-[13px] text-[#8b909c] mt-1">In Progress</p>
                        </div>

                        <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80] mb-4">
                                <FiCheckSquare size={18} />
                            </span>
                            <p className="text-[24px] font-semibold text-white">{completedCount}</p>
                            <p className="text-[13px] text-[#8b909c] mt-1">Completed</p>
                        </div>

                    </div>

                    {/* Projects section */}
                    <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-[16px] font-semibold text-white">Assigned Projects</h2>
                                <p className="text-[12.5px] text-[#5b606c] mt-1">
                                    Projects currently assigned for testing
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 h-[38px] px-3.5 w-full sm:w-[200px] bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">
                                    <AiOutlineSearch className="text-[#5b606c]" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search projects..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="flex-1 bg-transparent border-none outline-none text-[13px] text-white placeholder:text-[#5b606c]"
                                    />
                                </div>

                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="h-[38px] px-3 rounded-[8px] bg-[#0d0f14] border border-white/10 text-[13px] text-[#a8abb8] outline-none focus:border-[#f0a83b] cursor-pointer"
                                >
                                    <option value="">All Status</option>
                                    <option value="Planning">Planning</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="On Hold">On Hold</option>
                                </select>
                            </div>
                        </div>

                        {filteredProjects.length === 0 ? (
                            <div className="py-8 text-center text-[13.5px] text-[#5b606c]">
                                No projects assigned yet
                            </div>
                        ) : (
                            filteredProjects.map((item) => {
                                const reportedCount = bugs.filter((b) => b.project_id === item.id).length

                                return (
                                    <div
                                        key={item.id}
                                        className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06] mb-4 last:mb-0"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                                            <div className="flex items-start gap-4">
                                                <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#f0a83b]/[0.12] text-[#f0a83b] shrink-0">
                                                    <AiOutlineProject size={20} />
                                                </span>

                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h3 className="text-[15px] font-semibold text-white">
                                                            {item.name}
                                                        </h3>
                                                        <span className={`px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium border ${statusColors[item.status] || "bg-white/[0.05] text-[#8b909c] border-white/10"}`}>
                                                            {item.status}
                                                        </span>
                                                    </div>

                                                    {item.description && (
                                                        <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => handleReportBug(item.id)}
                                                className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer shrink-0"
                                            >
                                                <BsBug size={14} />
                                                Report Bug
                                            </button>

                                        </div>

                                        <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                                            <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                                                <BsBug size={14} />
                                                {reportedCount} bugs reported
                                            </span>

                                            <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                                                <HiOutlineCalendar size={14} />
                                                Due {item.due_date ? new Date(item.due_date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "—"}
                                            </span>

                                        </div>
                                    </div>
                                )
                            })
                        )}

                    </div>

                </div>
            </div>

            {showReportModal && (
                <TesterReportBugModal
                    initialProjectId={reportProjectId}
                    onClose={() => {
                        setShowReportModal(false)
                        setReportProjectId(null)
                    }}
                    getBugs={getBugs}
                />
            )}

        </div>
    );
}

export default TesterProjects;