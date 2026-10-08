import React, { useState, useEffect } from "react";
import DeveloperSidebar from "../../Components/Developer/DeveloperSidebar";
import { AiOutlineSearch } from "react-icons/ai";
import {
    FiCheckSquare,
    FiClock,
    FiAlertCircle,
    FiCalendar,
    FiFolder,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { getBugsAPI, getMyProjectsAPI } from "../../../../services/allAPI";

const statusMeta = {
    "New": { label: "Pending", icon: FiClock, color: "text-[#8b98ff]", bg: "bg-[#576aff]/[0.12]", badge: "bg-[#576aff]/[0.12] text-[#8b98ff] border-[#576aff]/20" },
    "Assigned": { label: "Pending", icon: FiClock, color: "text-[#8b98ff]", bg: "bg-[#576aff]/[0.12]", badge: "bg-[#576aff]/[0.12] text-[#8b98ff] border-[#576aff]/20" },
    "In Progress": { label: "In Progress", icon: FiCheckSquare, color: "text-[#f0a83b]", bg: "bg-[#f0a83b]/[0.12]", badge: "bg-[#f0a83b]/[0.12] text-[#f0a83b] border-[#f0a83b]/20" },
    "Ready for QA": { label: "Pending", icon: FiClock, color: "text-[#8b98ff]", bg: "bg-[#576aff]/[0.12]", badge: "bg-[#576aff]/[0.12] text-[#8b98ff] border-[#576aff]/20" },
    "Retest": { label: "In Progress", icon: FiCheckSquare, color: "text-[#f0a83b]", bg: "bg-[#f0a83b]/[0.12]", badge: "bg-[#f0a83b]/[0.12] text-[#f0a83b] border-[#f0a83b]/20" },
    "Resolved": { label: "Completed", icon: FiCheckSquare, color: "text-[#4ade80]", bg: "bg-[#4ade80]/[0.12]", badge: "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/20" },
    "Verified": { label: "Completed", icon: FiCheckSquare, color: "text-[#4ade80]", bg: "bg-[#4ade80]/[0.12]", badge: "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/20" },
    "Closed": { label: "Completed", icon: FiCheckSquare, color: "text-[#4ade80]", bg: "bg-[#4ade80]/[0.12]", badge: "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/20" },
}

const filterMatches = (bug, filter) => {
    if (filter === "All Tasks") return true
    const meta = statusMeta[bug.status]
    if (!meta) return false
    if (filter === "In Progress") return meta.label === "In Progress"
    if (filter === "Pending") return meta.label === "Pending"
    if (filter === "Completed") return meta.label === "Completed"
    return true
}

const highPriorityBadge = (priority) => {
    if (priority === "High" || priority === "Critical") {
        return "bg-[#f87171]/[0.12] text-[#f87171] border-[#f87171]/20"
    }
    return null
}

function DeveloperTasks() {
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
            if (response.status === 200) {
                setBugs(response.data)
            }
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

    const assignedCount = bugs.filter((b) => statusMeta[b.status]?.label !== "Completed").length
    const completedCount = bugs.filter((b) => statusMeta[b.status]?.label === "Completed").length
    const highPriorityCount = bugs.filter((b) => ['High', 'Critical'].includes(b.priority) && statusMeta[b.status]?.label !== "Completed").length

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

            <DeveloperSidebar />

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

                {/* Main content */}
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



                    {/* Page header */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-7">

                        <div>
                            <h1 className="text-[19px] sm:text-[22px] font-semibold text-white">My Tasks</h1>
                            <p className="text-[13px] sm:text-[14px] text-[#8b909c] mt-1">
                                View and manage your assigned development tasks
                            </p>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-3 py-1.5 rounded-[7px] text-[12px] font-medium bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/20 whitespace-nowrap">
                                {assignedCount} Assigned
                            </span>
                            <span className="px-3 py-1.5 rounded-[7px] text-[12px] font-medium bg-[#4ade80]/[0.10] text-[#4ade80] border border-[#4ade80]/20 whitespace-nowrap">
                                {completedCount} Completed
                            </span>
                        </div>

                    </div>

                    {/* Summary boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-7">

                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b] shrink-0">
                                    <FiClock size={17} />
                                </span>
                                <div>
                                    <p className="text-[18px] sm:text-[20px] font-semibold text-white">
                                        {bugs.filter((b) => statusMeta[b.status]?.label === "In Progress").length}
                                    </p>
                                    <p className="text-[11.5px] sm:text-[12px] text-[#8b909c]">In Progress</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f87171]/[0.12] text-[#f87171] shrink-0">
                                    <FiAlertCircle size={17} />
                                </span>
                                <div>
                                    <p className="text-[18px] sm:text-[20px] font-semibold text-white">{highPriorityCount}</p>
                                    <p className="text-[11.5px] sm:text-[12px] text-[#8b909c]">High Priority</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80] shrink-0">
                                    <FiCheckSquare size={17} />
                                </span>
                                <div>
                                    <p className="text-[18px] sm:text-[20px] font-semibold text-white">{completedCount}</p>
                                    <p className="text-[11.5px] sm:text-[12px] text-[#8b909c]">Completed</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
                        {["All Tasks", "In Progress", "Pending", "Completed"].map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setActiveFilter(filter)}
                                className={`h-[36px] sm:h-[38px] px-3.5 sm:px-4 rounded-[8px] text-[12.5px] sm:text-[13px] font-medium cursor-pointer transition-colors ${activeFilter === filter
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">

                            {filteredBugs.map((bug) => {
                                const meta = statusMeta[bug.status] || statusMeta["New"]
                                const Icon = meta.icon
                                const urgentBadge = highPriorityBadge(bug.priority)

                                return (
                                    <div
                                        key={bug.id}
                                        className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px] hover:border-white/[0.10] transition-colors"
                                    >
                                        <div className="flex items-start justify-between gap-3 sm:gap-4">

                                            <div className="flex items-start gap-3 min-w-0">
                                                <span className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-[9px] ${meta.bg} ${meta.color} shrink-0`}>
                                                    <Icon size={17} />
                                                </span>

                                                <div className="min-w-0">
                                                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-white leading-snug">
                                                        {bug.title}
                                                    </h3>
                                                    <p className="text-[12px] sm:text-[12.5px] text-[#5b606c] mt-1 truncate">
                                                        {projectsMap[bug.project_id] || "—"}
                                                    </p>
                                                </div>
                                            </div>

                                            <span className={`px-2.5 py-1 rounded-[5px] text-[10.5px] sm:text-[11px] font-medium border shrink-0 whitespace-nowrap ${urgentBadge || meta.badge}`}>
                                                {urgentBadge ? `${bug.priority} Priority` : meta.label}
                                            </span>
                                        </div>

                                        {bug.description && (
                                            <p className="text-[12.5px] sm:text-[13px] text-[#8b909c] leading-relaxed mt-4 sm:mt-5 line-clamp-2">
                                                {bug.description}
                                            </p>
                                        )}

                                        <div className="flex items-center justify-between mt-4 sm:mt-5 pt-4 border-t border-white/[0.06] flex-wrap gap-2">

                                            <div className="flex items-center gap-2 text-[11.5px] sm:text-[12px] text-[#8b909c]">
                                                <FiCalendar size={14} className="shrink-0" />
                                                Reported {bug.created_at ? new Date(bug.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "—"}
                                            </div>

                                            <span className="flex items-center gap-1.5 text-[11.5px] sm:text-[12px] text-[#8b909c]">
                                                <FiFolder size={14} className="shrink-0" />
                                                {bug.tag || "Bug"}
                                            </span>

                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    )}


                </div>
            </div>
        </div>
    );
}

export default DeveloperTasks;