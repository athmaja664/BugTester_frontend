import React, { useState, useEffect } from "react";
import TesterSidebar from "../../Components/Tester/TesterSidebar";
import TesterReportBugModal from "../../Components/Tester/TesterReportBugModal";
import TesterReviewBugModal from "../../Components/Tester/TesterReviewBugModal";
import BugsTable from "../../Components/Common/BugsTable";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBug } from "react-icons/bs";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import { getBugsAPI, getProjectsAPI } from "../../../../services/allAPI";

function TesterBugs() {
    const [showReportModal, setShowReportModal] = useState(false)
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [selectedBug, setSelectedBug] = useState(null)
    const [bugData, setBugData] = useState([])
    const [projectsMap, setProjectsMap] = useState({})
    const [searchTerm, setSearchTerm] = useState("")
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
    }, [searchTerm])

    const handleRowClick = (bug) => {
        setSelectedBug(bug)
        setShowReviewModal(true)
    }

    const totalBugs = bugData.length
    const openBugs = bugData.filter((b) => !['Resolved', 'Verified', 'Closed'].includes(b.status)).length
    const resolvedBugs = bugData.filter((b) => ['Resolved', 'Verified', 'Closed'].includes(b.status)).length

    const filteredBugs = bugData.filter((item) =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `BUG-${item.id}`.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const bugsPerPage = 10
    const lastIndex = currentPage * bugsPerPage
    const firstIndex = lastIndex - bugsPerPage
    const currentBugs = filteredBugs.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(filteredBugs.length / bugsPerPage)

    return (
        <div className="flex min-h-screen bg-[#0d0f14]">

            <TesterSidebar />

            <div className="flex-1 flex flex-col min-w-0">

                {/* Header */}
                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

                    <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
                        Bugs
                    </h1>


                </div>

                {/* Main content */}
                <div className="flex-1 p-5 lg:p-8">

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-[22px] font-semibold text-white">My Bugs</h1>
                            <p className="text-[14px] text-[#8b909c] mt-1">
                                View and manage bugs reported during testing
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowReportModal(true)}
                            className="flex items-center justify-center gap-2 h-[40px] px-4 rounded-[8px] bg-[#f0a83b] hover:bg-[#ffc15c] text-[#0d0f14] text-[13px] font-semibold transition-colors cursor-pointer"
                        >
                            <BsBug size={15} />
                            Report Bug
                        </button>
                    </div>

                    {/* Summary cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                        <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f87171]/[0.12] text-[#f87171] mb-4">
                                <BsBug size={18} />
                            </span>
                            <p className="text-[24px] font-semibold text-white">{totalBugs}</p>
                            <p className="text-[13px] text-[#8b909c] mt-1">Total Bugs</p>
                        </div>

                        <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b] mb-4">
                                <FiAlertCircle size={18} />
                            </span>
                            <p className="text-[24px] font-semibold text-white">{openBugs}</p>
                            <p className="text-[13px] text-[#8b909c] mt-1">Open Bugs</p>
                        </div>

                        <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80] mb-4">
                                <FiCheckCircle size={18} />
                            </span>
                            <p className="text-[24px] font-semibold text-white">{resolvedBugs}</p>
                            <p className="text-[13px] text-[#8b909c] mt-1">Resolved Bugs</p>
                        </div>

                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-2 h-[42px] px-3.5 mb-6 bg-[#161922] border border-white/[0.06] rounded-[14px] focus-within:border-[#f0a83b]">
                        <AiOutlineSearch className="text-[#5b606c]" size={17} />
                        <input
                            type="text"
                            placeholder="Search bugs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-[13.5px] text-white placeholder:text-[#5b606c]"
                        />
                    </div>

                    {/* Bugs table */}
                    <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                        <div className="mb-6">
                            <h2 className="text-[16px] font-semibold text-white">Reported Bugs</h2>
                            <p className="text-[12px] text-[#5b606c] mt-1">
                                Click a bug to review or update its status
                            </p>
                        </div>

                        <BugsTable
                            bugs={currentBugs}
                            projectsMap={projectsMap}
                            onEdit={handleRowClick}
                        />

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

            {showReportModal && (
                <TesterReportBugModal
                    onClose={() => setShowReportModal(false)}
                    getBugs={getBugs}
                />
            )}

            {showReviewModal && selectedBug && (
                <TesterReviewBugModal
                    bug={selectedBug}
                    onClose={() => {
                        setShowReviewModal(false)
                        setSelectedBug(null)
                    }}
                    getBugs={getBugs}
                />
            )}

        </div>
    );
}

export default TesterBugs;