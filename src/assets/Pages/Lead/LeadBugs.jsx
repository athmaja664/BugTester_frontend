import React, { useState, useEffect, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiPlus,
} from "react-icons/fi";
import { BsBug } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import toast from "react-hot-toast";
import LeadSidebar from "../../Components/Lead/LeadSidebar";
import LeadReportBugModal from "../../Components/Lead/LeadReportBugModal";
import LeadEditBugModal from "../../Components/Lead/LeadEditBugModal";
import { getBugsAPI, getMyProjectsAPI, getUsersAPI } from "../../../../services/allAPI";

const statusColors = {
    "New": "bg-white/[0.05] text-[#a8abb8] border-white/10",
    "Assigned": "bg-[#576aff]/[0.12] text-[#8b98ff] border-[#576aff]/25",
    "In Progress": "bg-[#f0a83b]/[0.12] text-[#f0a83b] border-[#f0a83b]/25",
    "Resolved": "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/25",
    "Ready for QA": "bg-[#c084fc]/[0.12] text-[#c084fc] border-[#c084fc]/25",
    "Retest": "bg-[#c084fc]/[0.12] text-[#c084fc] border-[#c084fc]/25",
    "Verified": "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/25",
    "Closed": "bg-white/[0.04] text-[#6a6f7b] border-white/10",
}

const priorityColors = {
    Low: "bg-white/[0.05] text-[#8b909c] border-white/10",
    Medium: "bg-[#f0a83b]/[0.12] text-[#f0a83b] border-[#f0a83b]/25",
    High: "bg-[#f26d6d]/[0.12] text-[#f26d6d] border-[#f26d6d]/25",
    Critical: "bg-[#f26d6d]/[0.2] text-[#f26d6d] border-[#f26d6d]/40",
}

const allStatuses = ["New", "Assigned", "In Progress", "Resolved", "Ready for QA", "Retest", "Verified", "Closed"]
const allPriorities = ["Low", "Medium", "High", "Critical"]

function LeadBugs() {
    const [showReportBugModal, setShowReportBugModal] = useState(false)
    const [showEditBugModal, setShowEditBugModal] = useState(false)
    const [selectedBug, setSelectedBug] = useState(null)
    const [openMenuId, setOpenMenuId] = useState(null)
    const [bugData, setBugData] = useState([])
    const [myProjectIds, setMyProjectIds] = useState([])
    const [projectsMap, setProjectsMap] = useState({})
    const [usersMap, setUsersMap] = useState({})
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [priorityFilter, setPriorityFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const token = localStorage.getItem('token')
    const menuRef = useRef(null)

    const getBugs = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getBugsAPI(reqHeader)
            if (response.status === 200) {
                setBugData(response.data)
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to fetch bugs')
        }
    }

    const getLookups = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }

            const [projectsRes, usersRes] = await Promise.all([
                getMyProjectsAPI(reqHeader),
                getUsersAPI(reqHeader)
            ])

            if (projectsRes.status === 200) {
                const map = {}
                const ids = []
                projectsRes.data.projects.forEach((p) => {
                    map[p.id] = p.name
                    ids.push(p.id)
                })
                setProjectsMap(map)
                setMyProjectIds(ids)
            }

            if (usersRes.status === 200) {
                const map = {}
                usersRes.data.users.forEach((u) => { map[u.id] = u.name })
                setUsersMap(map)
            }
        } catch (err) {
            toast.error('Failed to load project/user data')
        }
    }

    useEffect(() => {
        getBugs()
        getLookups()
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, statusFilter, priorityFilter])

    // close the row-action dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenuId(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleEditClick = (bug) => {
        setSelectedBug(bug)
        setShowEditBugModal(true)
        setOpenMenuId(null)
    }

    // only bugs belonging to projects this Lead owns
    const myBugs = bugData.filter((item) => myProjectIds.includes(item.project_id))

    const totalBugs = myBugs.length
    const newBugs = myBugs.filter((item) => item.status === 'New').length
    const inProgressBugs = myBugs.filter((item) => item.status === 'In Progress').length
    const readyForQaBugs = myBugs.filter((item) => item.status === 'Ready for QA').length
    const resolvedBugs = myBugs.filter((item) => item.status === 'Resolved' || item.status === 'Verified' || item.status === 'Closed').length

    const filteredBugs = myBugs.filter((item) => {
        const matchesSearch =
            item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `BUG-${item.id}`.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter ? item.status === statusFilter : true
        const matchesPriority = priorityFilter ? item.priority === priorityFilter : true
        return matchesSearch && matchesStatus && matchesPriority
    })

    const bugsPerPage = 6
    const lastIndex = currentPage * bugsPerPage
    const firstIndex = lastIndex - bugsPerPage
    const currentBugs = filteredBugs.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(filteredBugs.length / bugsPerPage)

    return (
        <div className="flex min-h-screen bg-[#0d0f14]">

            <LeadSidebar />

            {/* Right column */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Header */}
                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

                    <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
                        Bugs
                    </h1>

                    <div className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-3 h-10 rounded-[8px] hover:bg-white/[0.04] cursor-pointer">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[12.5px] font-semibold">
                            LD
                        </span>
                        <span className="hidden sm:block text-[13.5px] font-medium text-white">
                            Lead
                        </span>
                    </div>

                </div>

                {/* Main content */}
                <div className="flex-1 p-5 lg:p-8">

                    {/* Page header */}
                    <div className="flex items-center justify-between mb-8">

                        <div>
                            <h1 className="text-[22px] font-semibold text-white">
                                Bugs
                            </h1>
                            <p className="text-[14px] text-[#8b909c] mt-1">
                                Manage and monitor bugs across your projects
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowReportBugModal(true)}
                            className="flex items-center gap-2 px-4 h-10 rounded-[8px] bg-[#f0a83b] hover:bg-[#e39b2f] text-[#0d0f14] text-[13px] font-semibold transition-colors cursor-pointer"
                        >
                            <FiPlus size={16} />
                            Report Bug
                        </button>

                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">

                        <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff]">
                                <BsBug size={18} />
                            </span>
                            <div>
                                <h2 className="text-[26px] font-semibold text-white">{totalBugs}</h2>
                                <p className="text-[13px] text-[#8b909c] mt-0.5">Total Bugs</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff]">
                                <FiAlertCircle size={19} />
                            </span>
                            <div>
                                <h2 className="text-[26px] font-semibold text-white">{newBugs}</h2>
                                <p className="text-[13px] text-[#8b909c] mt-0.5">New</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                                <FiClock size={19} />
                            </span>
                            <div>
                                <h2 className="text-[26px] font-semibold text-white">{inProgressBugs}</h2>
                                <p className="text-[13px] text-[#8b909c] mt-0.5">In Progress</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#c084fc]/[0.12] text-[#c084fc]">
                                <FiCheckCircle size={18} />
                            </span>
                            <div>
                                <h2 className="text-[26px] font-semibold text-white">{readyForQaBugs}</h2>
                                <p className="text-[13px] text-[#8b909c] mt-0.5">Ready for QA</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80]">
                                <FiCheckCircle size={17} />
                            </span>
                            <div>
                                <h2 className="text-[26px] font-semibold text-white">{resolvedBugs}</h2>
                                <p className="text-[13px] text-[#8b909c] mt-0.5">Resolved</p>
                            </div>
                        </div>

                    </div>

                    {/* Filters */}
                    <div className="p-5 mb-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                            <div className="flex items-center gap-2 h-[40px] px-3.5 flex-1 bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">
                                <AiOutlineSearch className="text-[#5b606c]" size={17} />
                                <input
                                    type="text"
                                    placeholder="Search bugs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-[13.5px] text-white placeholder:text-[#5b606c]"
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="h-[40px] px-3 min-w-[150px] bg-[#0d0f14] border border-white/10 rounded-[8px] outline-none text-[13px] text-[#a8abb8] cursor-pointer"
                            >
                                <option value="">All Status</option>
                                {allStatuses.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>

                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="h-[40px] px-3 min-w-[140px] bg-[#0d0f14] border border-white/10 rounded-[8px] outline-none text-[13px] text-[#a8abb8] cursor-pointer"
                            >
                                <option value="">All Priority</option>
                                {allPriorities.map((p) => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm("")
                                    setStatusFilter("")
                                    setPriorityFilter("")
                                }}
                                className="h-[40px] px-5 rounded-[8px] text-[13px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                            >
                                Clear
                            </button>

                        </div>

                    </div>

                    {/* Bug cards */}
                    <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                        <div className="mb-6">
                            <h2 className="text-[16px] font-semibold text-white">
                                All Bugs
                            </h2>
                            <p className="text-[12px] text-[#5b606c] mt-1">
                                Bugs assigned across your projects
                            </p>
                        </div>

                        {currentBugs.length === 0 ? (
                            <div className="py-8 text-center text-[13.5px] text-[#5b606c]">
                                No bugs found
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                                {currentBugs.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col gap-3 p-4 bg-white/[0.02] border border-white/[0.06] rounded-[12px] hover:bg-white/[0.04] hover:border-white/10 transition-colors relative"
                                    >

                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-white/[0.05] text-[#8b909c] shrink-0">
                                                    <BsBug size={15} />
                                                </span>
                                                <span className="text-[12.5px] font-semibold text-[#f0a83b]">
                                                    BUG-{item.id}
                                                </span>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full text-[#6a6f7b] hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer shrink-0"
                                            >
                                                <HiDotsVertical size={16} />
                                            </button>

                                            {openMenuId === item.id && (
                                                <div
                                                    ref={menuRef}
                                                    className="absolute right-4 top-14 z-30 w-[150px] py-1.5 bg-[#1b1f29] border border-white/10 rounded-[10px] shadow-lg"
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEditClick(item)}
                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-[#c7c9d1] hover:bg-white/[0.05] hover:text-white transition-colors cursor-pointer"
                                                    >
                                                        <HiOutlinePencilSquare size={15} />
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-[14px] font-medium text-white leading-snug line-clamp-2">
                                            {item.title}
                                        </h3>

                                        <p className="text-[12.5px] text-[#5b606c]">
                                            {projectsMap[item.project_id] || "—"}
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <span className={`inline-flex px-2.5 py-1 text-[11.5px] font-medium rounded-[5px] border ${statusColors[item.status] || "bg-white/[0.05] text-[#8b909c] border-white/10"}`}>
                                                {item.status}
                                            </span>
                                            <span className={`inline-flex px-2.5 py-1 text-[11.5px] font-medium rounded-[5px] border ${priorityColors[item.priority] || "bg-white/[0.05] text-[#8b909c] border-white/10"}`}>
                                                {item.priority}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                                            <div>
                                                <p className="text-[10.5px] uppercase tracking-wide text-[#5b606c]">Developer</p>
                                                <p className="text-[12.5px] text-[#a8abb8] mt-0.5">
                                                    {item.assigned_to ? (usersMap[item.assigned_to] || "—") : "Unassigned"}
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-[10.5px] uppercase tracking-wide text-[#5b606c]">Date</p>
                                                <p className="text-[12.5px] text-[#a8abb8] mt-0.5">
                                                    {item.created_at ? new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit" }) : "—"}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        )}

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-white/[0.06]">

                            <p className="text-[13px] text-[#5b606c]">
                                Showing{" "}
                                <span className="text-white font-medium">{filteredBugs.length ? firstIndex + 1 : 0}</span>{" "}
                                to{" "}
                                <span className="text-white font-medium">{Math.min(lastIndex, filteredBugs.length)}</span>{" "}
                                of{" "}
                                <span className="text-white font-medium">{filteredBugs.length}</span>{" "}
                                bugs
                            </p>

                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-white/10 text-[#5b606c] disabled:cursor-not-allowed hover:bg-white/[0.04] cursor-pointer"
                                >
                                    &#10094;
                                </button>

                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`w-9 h-9 rounded-[8px] text-[13px] font-medium cursor-pointer transition-colors
                                            ${currentPage === index + 1
                                                ? "bg-[#f0a83b] text-[#0d0f14]"
                                                : "border border-white/10 text-[#5b606c] hover:bg-white/[0.04]"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-white/10 text-[#5b606c] disabled:cursor-not-allowed hover:bg-white/[0.04] cursor-pointer"
                                >
                                    &#10095;
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {showReportBugModal && (
                <LeadReportBugModal
                    onClose={() => setShowReportBugModal(false)}
                    getBugs={getBugs}
                />
            )}

            {showEditBugModal && selectedBug && (
                <LeadEditBugModal
                    bug={selectedBug}
                    onClose={() => {
                        setShowEditBugModal(false)
                        setSelectedBug(null)
                    }}
                    getBugs={getBugs}
                />
            )}

        </div>
    );
}

export default LeadBugs;