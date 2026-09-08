import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import ReportBugModal from "../../Components/Admin/ReportBugModal";
import EditBugModal from "../../Components/Admin/EditBugModal";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { BsBug } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import toast from "react-hot-toast";
import { getBugsAPI, getProjectsAPI, getUsersAPI, deleteBugAPI } from "../../../../services/allAPI";

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

function AdminBugs() {
    const [showReportBugModal, setShowReportBugModal] = useState(false)
    const [showEditBugModal, setShowEditBugModal] = useState(false)
    const [selectedBug, setSelectedBug] = useState(null)
    const [openMenuId, setOpenMenuId] = useState(null)
    const [bugData, setBugData] = useState([])
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
                getProjectsAPI(reqHeader),
                getUsersAPI(reqHeader)
            ])

            if (projectsRes.status === 200) {
                const map = {}
                projectsRes.data.projects.forEach((p) => { map[p.id] = p.name })
                setProjectsMap(map)
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

    const handleDeleteClick = async (bug) => {
        setOpenMenuId(null)
        const confirmed = window.confirm(`Delete BUG-${bug.id} — "${bug.title}"? This cannot be undone.`)
        if (!confirmed) return

        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await deleteBugAPI(bug.id, reqHeader)
            if (response.status === 200) {
                toast.success('Bug deleted successfully')
                getBugs()
            } else {
                toast.error(response?.response?.data?.message || 'Failed to delete bug')
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to delete bug')
        }
    }

    const filteredBugs = bugData.filter((item) => {
        const matchesSearch =
            item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `BUG-${item.id}`.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter ? item.status === statusFilter : true
        const matchesPriority = priorityFilter ? item.priority === priorityFilter : true
        return matchesSearch && matchesStatus && matchesPriority
    })

    const bugsPerPage = 8
    const lastIndex = currentPage * bugsPerPage
    const firstIndex = lastIndex - bugsPerPage
    const currentBugs = filteredBugs.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(filteredBugs.length / bugsPerPage)

    return (
        <div className="flex min-h-screen bg-[#0d0f14]">
            <Sidebar />

            {/* right column */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* header */}
                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

                    <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
                        Bugs
                    </h1>

                    <div className="flex items-center gap-4">

                        <span className="relative flex items-center justify-center w-10 h-10 rounded-[8px] text-[#a8abb8] hover:bg-white/[0.04] hover:text-white cursor-pointer">
                            <MdOutlineNotificationsNone size={20} />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#f0a83b]"></span>
                        </span>

                        <div className="relative">
                            <span className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-3 h-10 rounded-[8px] hover:bg-white/[0.04] cursor-pointer">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[12.5px] font-semibold">
                                    AD
                                </span>
                                <span className="hidden sm:block text-[13.5px] font-medium text-white">
                                    Admin
                                </span>
                            </span>
                        </div>

                    </div>
                </div>


                {/* main content */}
                <div className="flex-1 p-5 lg:p-8">

                    {/* page header */}
                    <div className="flex items-center justify-between mb-8">

                        <div>
                            <h1 className="text-[22px] font-semibold text-white">
                                Bugs
                            </h1>
                            <p className="text-[14px] text-[#8b909c] mt-1">
                                Track and manage all reported bugs
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowReportBugModal(true)}
                            className="flex items-center gap-2 px-4 h-[42px] rounded-[8px] text-[14px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer"
                        >
                            <AiOutlinePlus size={17} />
                            Report Bug
                        </button>

                    </div>


                    {/* filter panel */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px] mb-6">

                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search by bug ID or title"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full sm:w-[200px]">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b]"
                            >
                                <option className="bg-[#161922]" value="">All Status</option>
                                {allStatuses.map((s) => (
                                    <option className="bg-[#161922]" key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 w-full sm:w-[200px]">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Priority
                            </label>
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b]"
                            >
                                <option className="bg-[#161922]" value="">All Priority</option>
                                {allPriorities.map((p) => (
                                    <option className="bg-[#161922]" key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setSearchTerm("")
                                setStatusFilter("")
                                setPriorityFilter("")
                            }}
                            className="h-[42px] px-5 rounded-[8px] text-[13.5px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                        >
                            Clear
                        </button>

                    </div>


                    {/* bugs cards */}
                    <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

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
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteClick(item)}
                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-[#f26d6d] hover:bg-[#f26d6d]/[0.08] transition-colors cursor-pointer"
                                                    >
                                                        <HiOutlineTrash size={15} />
                                                        Delete
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


                        {/* pagination */}
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

            {/* Report Bug Modal */}
            {showReportBugModal && (
                <ReportBugModal
                    onClose={() => setShowReportBugModal(false)}
                    getBugs={getBugs}
                />
            )}

            {/* Edit Bug Modal */}
            {showEditBugModal && selectedBug && (
                <EditBugModal
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

export default AdminBugs;