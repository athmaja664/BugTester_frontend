import React, { useState, useEffect } from "react";
import TesterSidebar from "../../Components/Tester/TesterSidebar";
import { AiOutlineSearch, AiOutlineProject } from "react-icons/ai";
import { FiCheckSquare, FiClock, FiAlertCircle } from "react-icons/fi";
import { BsBug } from "react-icons/bs";
import { HiOutlineCalendar } from "react-icons/hi";
import toast from "react-hot-toast";
import { getBugsAPI, getMyProjectsAPI } from "../../../../services/allAPI";

const statusMeta = {
    "New": { label: "Pending", badge: "bg-[#576aff]/[0.12] text-[#8b98ff] border-[#576aff]/20", icon: FiClock, iconBg: "bg-[#576aff]/[0.12]", iconColor: "text-[#8b98ff]" },
    "Assigned": { label: "Pending", badge: "bg-[#576aff]/[0.12] text-[#8b98ff] border-[#576aff]/20", icon: FiClock, iconBg: "bg-[#576aff]/[0.12]", iconColor: "text-[#8b98ff]" },
    "In Progress": { label: "In Progress", badge: "bg-[#f0a83b]/[0.12] text-[#f0a83b] border-[#f0a83b]/20", icon: FiCheckSquare, iconBg: "bg-[#f0a83b]/[0.12]", iconColor: "text-[#f0a83b]" },
    "Ready for QA": { label: "Ready for QA", badge: "bg-[#c084fc]/[0.12] text-[#c084fc] border-[#c084fc]/20", icon: FiCheckSquare, iconBg: "bg-[#c084fc]/[0.12]", iconColor: "text-[#c084fc]" },
    "Retest": { label: "Retest", badge: "bg-[#c084fc]/[0.12] text-[#c084fc] border-[#c084fc]/20", icon: FiAlertCircle, iconBg: "bg-[#c084fc]/[0.12]", iconColor: "text-[#c084fc]" },
    "Resolved": { label: "Completed", badge: "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/20", icon: FiCheckSquare, iconBg: "bg-[#4ade80]/[0.12]", iconColor: "text-[#4ade80]" },
    "Verified": { label: "Completed", badge: "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/20", icon: FiCheckSquare, iconBg: "bg-[#4ade80]/[0.12]", iconColor: "text-[#4ade80]" },
    "Closed": { label: "Completed", badge: "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/20", icon: FiCheckSquare, iconBg: "bg-[#4ade80]/[0.12]", iconColor: "text-[#4ade80]" },
}

const filterMatches = (bug, filter) => {
    if (filter === "All Tasks") return true
    const meta = statusMeta[bug.status]
    if (!meta) return false
    if (filter === "Pending") return meta.label === "Pending"
    if (filter === "In Progress") return ["In Progress", "Ready for QA", "Retest"].includes(meta.label)
    if (filter === "Completed") return meta.label === "Completed"
    return true
}

function TesterTasks() {
    const [bugs, setBugs] = useState([])
    const [projectsMap, setProjectsMap] = useState({})
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [activeFilter, setActiveFilter] = useState("All Tasks")
    const token = localStorage.getItem('token')

    const getBugs = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getBugsAPI(reqHeader)
            if (response.status === 200) setBugs(response.data)
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to load tasks')
        }
    }

    const getProjects = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getMyProjectsAPI(reqHeader)
            if (response.status === 200) {
                const map = {}
                response.data.projects.forEach((p) => { map[p.id] = p.name })
                setProjectsMap(map)
            }
        } catch (err) {
            toast.error('Failed to load projects')
        }
    }

    useEffect(() => {
        Promise.all([getBugs(), getProjects()]).finally(() => setLoading(false))
    }, [])

    const pendingCount = bugs.filter((b) => statusMeta[b.status]?.label === "Pending").length
    const completedCount = bugs.filter((b) => statusMeta[b.status]?.label === "Completed").length

    const filteredBugs = bugs
        .filter((b) => filterMatches(b, activeFilter))
        .filter((b) => b.title?.toLowerCase().includes(searchTerm.toLowerCase()))

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[#0d0f14] items-center justify-center">
                <p className="text-[13.5px] text-[#5b606c]">Loading tasks...</p>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-[#0d0f14]">

            <TesterSidebar />

            <div className="flex-1 flex flex-col min-w-0">

                {/* Header */}
                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[64px] sm:h-[72px] px-4 sm:px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

                    <h1 className="text-[16px] sm:text-[18px] font-semibold text-white pl-12 lg:pl-0 truncate">
                        My Tasks
                    </h1>

                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="hidden sm:flex items-center gap-2 h-[40px] px-3.5 w-[200px] md:w-[240px] bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">
                            <AiOutlineSearch className="text-[#5b606c] shrink-0" size={17} />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 w-full bg-transparent border-none outline-none text-[13.5px] text-white placeholder:text-[#5b606c]"
                            />
                        </div>

                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 sm:p-5 lg:p-8">

                    {/* Mobile search */}
                    <div className="sm:hidden flex items-center gap-2 h-[42px] px-3.5 mb-5 bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">
                        <AiOutlineSearch className="text-[#5b606c] shrink-0" size={17} />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 w-full bg-transparent border-none outline-none text-[13.5px] text-white placeholder:text-[#5b606c]"
                        />
                    </div>

                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
                        <div>
                            <h1 className="text-[19px] sm:text-[22px] font-semibold text-white">My Tasks</h1>
                            <p className="text-[13px] sm:text-[14px] text-[#8b909c] mt-1">
                                View and manage the bugs you've reported
                            </p>
                        </div>

                        <div className="flex items-center gap-2 px-3.5 h-[38px] rounded-[8px] bg-white/[0.03] border border-white/[0.06] whitespace-nowrap">
                            <FiCheckSquare size={16} className="text-[#f0a83b]" />
                            <span className="text-[13px] text-[#a8abb8]">{bugs.length} Reported</span>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b] mb-3 sm:mb-4">
                                <FiCheckSquare size={18} />
                            </span>
                            <p className="text-[20px] sm:text-[24px] font-semibold text-white">{bugs.length}</p>
                            <p className="text-[12px] sm:text-[13px] text-[#8b909c] mt-1">Total Reported</p>
                        </div>

                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#8b98ff]/[0.12] text-[#8b98ff] mb-3 sm:mb-4">
                                <FiClock size={18} />
                            </span>
                            <p className="text-[20px] sm:text-[24px] font-semibold text-white">{pendingCount}</p>
                            <p className="text-[12px] sm:text-[13px] text-[#8b909c] mt-1">Pending</p>
                        </div>

                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80] mb-3 sm:mb-4">
                                <FiCheckSquare size={18} />
                            </span>
                            <p className="text-[20px] sm:text-[24px] font-semibold text-white">{completedCount}</p>
                            <p className="text-[12px] sm:text-[13px] text-[#8b909c] mt-1">Completed</p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
                        {["All Tasks", "Pending", "In Progress", "Completed"].map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setActiveFilter(filter)}
                                className={`h-[36px] sm:h-[38px] px-3.5 sm:px-4 rounded-[8px] text-[12.5px] sm:text-[13px] font-medium cursor-pointer transition-colors ${
                                    activeFilter === filter
                                        ? "text-[#0d0f14] bg-[#f0a83b]"
                                        : "text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white"
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Task cards */}
                    {filteredBugs.length === 0 ? (
                        <div className="p-10 bg-[#161922] border border-white/[0.06] rounded-[14px] text-center">
                            <p className="text-[13.5px] text-[#5b606c]">No tasks found</p>
                        </div>
                    ) : (
                        filteredBugs.map((bug) => {
                            const meta = statusMeta[bug.status] || statusMeta["New"]
                            const Icon = meta.icon

                            return (
                                <div
                                    key={bug.id}
                                    className="p-4 sm:p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06] mb-4 last:mb-0"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-5">

                                        <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                                            <span className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-[9px] ${meta.iconBg} ${meta.iconColor} shrink-0`}>
                                                <Icon size={18} />
                                            </span>

                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-white">
                                                        {bug.title}
                                                    </h3>
                                                    <span className={`px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium border whitespace-nowrap ${meta.badge}`}>
                                                        {meta.label}
                                                    </span>
                                                </div>

                                                <p className="text-[12px] sm:text-[12.5px] text-[#5b606c] mt-1 truncate">
                                                    {projectsMap[bug.project_id] || "—"}
                                                </p>

                                                {bug.description && (
                                                    <p className="text-[12.5px] sm:text-[13px] text-[#8b909c] mt-3 leading-relaxed line-clamp-2">
                                                        {bug.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-4 sm:mt-5 pt-4 border-t border-white/[0.06]">
                                        <span className="flex items-center gap-1.5 text-[11.5px] sm:text-[12px] text-[#8b909c] truncate">
                                            <AiOutlineProject size={14} className="shrink-0" />
                                            {projectsMap[bug.project_id] || "—"}
                                        </span>

                                        <span className="flex items-center gap-1.5 text-[11.5px] sm:text-[12px] text-[#8b909c]">
                                            <HiOutlineCalendar size={14} className="shrink-0" />
                                            {bug.created_at ? new Date(bug.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "—"}
                                        </span>

                                        <span className="flex items-center gap-1.5 text-[11.5px] sm:text-[12px] text-[#8b909c]">
                                            <BsBug size={14} className="shrink-0" />
                                            BUG-{bug.id} · {bug.priority}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    )}

                </div>
            </div>
        </div>
    );
}

export default TesterTasks;