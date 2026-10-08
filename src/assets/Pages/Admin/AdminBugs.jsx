import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import ReportBugModal from "../../Components/Admin/ReportBugModal";
import EditBugModal from "../../Components/Admin/EditBugModal";
import BugsTable from "../../Components/Common/BugsTable";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineNotificationsNone } from "react-icons/md";
import toast from "react-hot-toast";
import { getBugsAPI, getProjectsAPI, deleteBugAPI } from "../../../../services/allAPI";

const allStatuses = ["New", "Assigned", "In Progress", "Resolved", "Ready for QA", "Retest", "Verified", "Closed"]
const allPriorities = ["Low", "Medium", "High", "Critical"]

function AdminBugs() {
    const [showReportBugModal, setShowReportBugModal] = useState(false)
    const [showEditBugModal, setShowEditBugModal] = useState(false)
    const [selectedBug, setSelectedBug] = useState(null)
    const [bugData, setBugData] = useState([])
    const [projectsMap, setProjectsMap] = useState({})
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [priorityFilter, setPriorityFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const token = localStorage.getItem('token')

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
            const projectsRes = await getProjectsAPI(reqHeader)

            if (projectsRes.status === 200) {
                const map = {}
                projectsRes.data.projects.forEach((p) => { map[p.id] = p.name })
                setProjectsMap(map)
            }
        } catch (err) {
            toast.error('Failed to load project data')
        }
    }

    useEffect(() => {
        getBugs()
        getLookups()
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, statusFilter, priorityFilter])

    const handleEditClick = (bug) => {
        setSelectedBug(bug)
        setShowEditBugModal(true)
    }

    const handleDeleteClick = async (bug) => {
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

    const bugsPerPage = 10
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


                    {/* bugs table */}
                    <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                        <BugsTable
                            bugs={currentBugs}
                            projectsMap={projectsMap}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />


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