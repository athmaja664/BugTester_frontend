import React, { useState, useEffect } from "react";
import DeveloperSidebar from "../../Components/Developer/DeveloperSidebar";
import { AiOutlineSearch, AiOutlineProject } from "react-icons/ai";
import { HiOutlineCalendar, HiOutlineUsers } from "react-icons/hi2";
import { BsBug } from "react-icons/bs";
import toast from "react-hot-toast";
import { getMyProjectsAPI, getBugsAPI } from "../../../../services/allAPI";

const statusColors = {
    Planning: "bg-[#576aff]/[0.12] text-[#8b98ff] border-[#576aff]/25",
    "In Progress": "bg-[#f0a83b]/[0.12] text-[#f0a83b] border-[#f0a83b]/25",
    Completed: "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/25",
    "On Hold": "bg-[#f26d6d]/[0.12] text-[#f26d6d] border-[#f26d6d]/25",
}

function DeveloperProjects() {
    const [currentPage, setCurrentPage] = useState(1)
    const [projectData, setProjectData] = useState([])
    const [bugs, setBugs] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const token = localStorage.getItem('token')

    const getProjects = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getMyProjectsAPI(reqHeader)
            if (response.status === 200) {
                setProjectData(response.data.projects)
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
        Promise.all([getProjects(), getBugs()]).finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, statusFilter])

    const formatDate = (date) => {
        if (!date) return "—"
        return new Date(date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    }

    // bugs here are already "assigned to me", so this counts my bugs in one project
    const getMyBugCount = (projectId) =>
        bugs.filter((bug) => bug.project_id === projectId).length

    const filteredProjects = projectData.filter((item) => {
        const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter ? item.status === statusFilter : true
        return matchesSearch && matchesStatus
    })

    const projectsPerPage = 8
    const lastIndex = currentPage * projectsPerPage
    const firstIndex = lastIndex - projectsPerPage
    const currentProjects = filteredProjects.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

    // shows at most 5 page buttons, with "..." for the rest, so it never overflows
    const getPageNumbers = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, index) => index + 1)
        }
        const pages = [1]
        const start = Math.max(2, currentPage - 1)
        const end = Math.min(totalPages - 1, currentPage + 1)
        if (start > 2) pages.push("...")
        for (let i = start; i <= end; i++) pages.push(i)
        if (end < totalPages - 1) pages.push("...")
        pages.push(totalPages)
        return pages
    }

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[#0d0f14] items-center justify-center">
                <p className="text-[13.5px] text-[#5b606c]">Loading projects...</p>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-[#0d0f14]">

            <DeveloperSidebar />

            <div className="flex-1 flex flex-col min-w-0">

                {/* header */}
                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[64px] sm:h-[72px] px-4 sm:px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

                    <h1 className="text-[16px] sm:text-[18px] font-semibold text-white pl-12 lg:pl-0 truncate">
                        Projects
                    </h1>

                </div>

                {/* main content */}
                <div className="flex-1 p-4 sm:p-5 lg:p-8">

                    {/* page header */}
                    <div className="mb-5 sm:mb-8">
                        <h1 className="text-[19px] sm:text-[22px] font-semibold text-white">
                            My Projects
                        </h1>
                        <p className="text-[13px] sm:text-[14px] text-[#8b909c] mt-1">
                            View the projects assigned to you
                        </p>
                    </div>

                    {/* filter panel */}
                    <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px] mb-5 sm:mb-6">

                        <div className="flex flex-col gap-2 flex-1 min-w-0">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Search
                            </label>
                            <div className="flex items-center gap-2 h-[42px] px-3.5 bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">
                                <AiOutlineSearch className="text-[#5b606c] shrink-0" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search by project name"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 w-full min-w-0 bg-transparent border-none outline-none text-[13.5px] text-white placeholder:text-[#5b606c]"
                                />
                            </div>
                        </div>

                        {/* status and clear stay on one row, even on a phone */}
                        <div className="flex items-end gap-3 sm:gap-4">

                            <div className="flex flex-col gap-2 flex-1 sm:flex-none sm:w-[180px] lg:w-[200px] min-w-0">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                    Status
                                </label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full h-[42px] px-3 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b]"
                                >
                                    <option className="bg-[#161922]" value="">All Statuses</option>
                                    <option className="bg-[#161922]" value="Planning">Planning</option>
                                    <option className="bg-[#161922]" value="In Progress">In Progress</option>
                                    <option className="bg-[#161922]" value="Completed">Completed</option>
                                    <option className="bg-[#161922]" value="On Hold">On Hold</option>
                                </select>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm("")
                                    setStatusFilter("")
                                }}
                                className="h-[42px] px-4 sm:px-5 rounded-[8px] text-[13.5px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                            >
                                Clear
                            </button>

                        </div>

                    </div>

                    {/* projects cards */}
                    <div className="p-3 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                        {currentProjects.length === 0 ? (
                            <div className="py-8 text-center text-[13.5px] text-[#5b606c]">
                                {searchTerm || statusFilter ? "No projects match your filters" : "No projects assigned yet"}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">

                                {currentProjects.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col gap-3 sm:gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-[12px] hover:bg-white/[0.04] hover:border-white/10 transition-colors min-w-0"
                                    >

                                        <div className="flex items-start justify-between gap-2">
                                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#c084fc]/[0.12] text-[#c084fc] shrink-0">
                                                <AiOutlineProject size={17} />
                                            </span>

                                            <span className={`inline-flex whitespace-nowrap px-2.5 py-1 text-[11.5px] font-medium rounded-[5px] border ${statusColors[item.status] || "bg-white/[0.05] text-[#8b909c] border-white/10"}`}>
                                                {item.status}
                                            </span>
                                        </div>

                                        <div className="min-w-0">
                                            <h3 title={item.name} className="text-[14.5px] font-semibold text-white leading-snug truncate">
                                                {item.name}
                                            </h3>

                                            {item.description && (
                                                <p className="text-[12.5px] text-[#5b606c] mt-1 line-clamp-2 break-words">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* dates wrap to two lines on narrow cards */}
                                        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 pt-1">
                                            <div className="flex items-center gap-1.5 text-[12px] text-[#a8abb8]">
                                                <HiOutlineCalendar className="text-[#5b606c] shrink-0" size={14} />
                                                <span className="whitespace-nowrap">{formatDate(item.start_date)}</span>
                                            </div>

                                            <div className="text-[12px] text-[#a8abb8] whitespace-nowrap">
                                                Due {formatDate(item.due_date)}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 pt-3 border-t border-white/[0.06]">
                                            <div className="flex items-center gap-1.5 text-[12px] text-[#a8abb8]">
                                                <HiOutlineUsers className="text-[#5b606c] shrink-0" size={14} />
                                                {(item.members || []).length} Members
                                            </div>

                                            <div className="flex items-center gap-1.5 text-[12px] text-[#a8abb8]">
                                                <BsBug className="text-[#5b606c] shrink-0" size={13} />
                                                {getMyBugCount(item.id)} My Bugs
                                            </div>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        )}

                        {/* pagination */}
                        {filteredProjects.length > 0 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/[0.06]">

                                <p className="text-[12.5px] sm:text-[13px] text-[#5b606c] text-center sm:text-left">
                                    Showing{" "}
                                    <span className="text-white font-medium">{firstIndex + 1}</span>{" "}
                                    to{" "}
                                    <span className="text-white font-medium">{Math.min(lastIndex, filteredProjects.length)}</span>{" "}
                                    of{" "}
                                    <span className="text-white font-medium">{filteredProjects.length}</span>{" "}
                                    projects
                                </p>

                                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">

                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-white/10 text-[#5b606c] disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/[0.04] cursor-pointer"
                                    >
                                        &#10094;
                                    </button>

                                    {getPageNumbers().map((page, index) =>
                                        page === "..." ? (
                                            <span key={`dots-${index}`} className="w-6 text-center text-[13px] text-[#5b606c]">
                                                ...
                                            </span>
                                        ) : (
                                            <button
                                                key={page}
                                                type="button"
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-9 h-9 rounded-[8px] text-[13px] font-medium cursor-pointer transition-colors
                                                    ${currentPage === page
                                                        ? "bg-[#f0a83b] text-[#0d0f14]"
                                                        : "border border-white/10 text-[#5b606c] hover:bg-white/[0.04]"
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage === totalPages || totalPages === 0}
                                        className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-white/10 text-[#5b606c] disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/[0.04] cursor-pointer"
                                    >
                                        &#10095;
                                    </button>

                                </div>

                            </div>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DeveloperProjects;