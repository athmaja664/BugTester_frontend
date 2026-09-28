import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import toast from "react-hot-toast";
import BugsTable from "../../Components/Common/BugsTable";
import { getMyIssuesAPI } from "../../../../services/allAPI";

const allStatuses = ["New", "Assigned", "In Progress", "Resolved", "Ready for QA", "Retest", "Verified", "Closed"]

// SidebarComponent is passed in by the route, so every role shows its own sidebar
function MyIssues({ SidebarComponent }) {
    const [bugData, setBugData] = useState([])
    const [projectsMap, setProjectsMap] = useState({})
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const token = localStorage.getItem('token')

    const getMyIssues = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getMyIssuesAPI(reqHeader)
            if (response.status === 200) {
                setBugData(response.data)

                // project names come back with each bug
                const map = {}
                response.data.forEach((b) => { map[b.project_id] = b.project_name })
                setProjectsMap(map)
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to fetch your issues')
        }
    }

    useEffect(() => {
        getMyIssues()
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, statusFilter])

    const filteredBugs = bugData.filter((item) => {
        const matchesSearch =
            item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `BUG-${item.id}`.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter ? item.status === statusFilter : true
        return matchesSearch && matchesStatus
    })

    const bugsPerPage = 10
    const lastIndex = currentPage * bugsPerPage
    const firstIndex = lastIndex - bugsPerPage
    const currentBugs = filteredBugs.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(filteredBugs.length / bugsPerPage)

    return (
        <div className="flex min-h-screen bg-[#0d0f14]">
            <SidebarComponent />

            {/* right column */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* header */}
                <div className="sticky top-0 z-20 flex items-center h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">
                    <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
                        My Issues
                    </h1>
                </div>

                {/* main content */}
                <div className="flex-1 p-5 lg:p-8">

                    <div className="mb-8">
                        <h1 className="text-[22px] font-semibold text-white">My Issues</h1>
                        <p className="text-[14px] text-[#8b909c] mt-1">
                            Bugs assigned to you
                        </p>
                    </div>

                    {/* filters */}
                    <div className="p-5 mb-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                            <div className="flex items-center gap-2 h-[40px] px-3.5 flex-1 bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">
                                <AiOutlineSearch className="text-[#5b606c]" size={17} />
                                <input
                                    type="text"
                                    placeholder="Search by bug ID or title"
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

                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm("")
                                    setStatusFilter("")
                                }}
                                className="h-[40px] px-5 rounded-[8px] text-[13px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                            >
                                Clear
                            </button>

                        </div>
                    </div>

                    {/* table */}
                    <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                        <BugsTable
                            bugs={currentBugs}
                            projectsMap={projectsMap}
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
        </div>
    );
}

export default MyIssues;