import React, { useState, useEffect } from "react";
import TesterSidebar from "../../Components/Tester/TesterSidebar";
import { AiOutlineProject } from "react-icons/ai";
import { BsBug } from "react-icons/bs";
import { FiCheckCircle, FiClock, FiArrowUpRight } from "react-icons/fi";
import toast from "react-hot-toast";
import { getMyProjectsAPI, getBugsAPI, getMyProfileAPI } from "../../../../services/allAPI";

function TesterDashboard() {
    const [profile, setProfile] = useState(null)
    const [projects, setProjects] = useState([])
    const [bugs, setBugs] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')

    const getProfile = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getMyProfileAPI(reqHeader)
            if (response.status === 200) setProfile(response.data.user)
        } catch (err) {
            toast.error('Failed to load profile')
        }
    }

    const getProjects = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getMyProjectsAPI(reqHeader)
            if (response.status === 200) setProjects(response.data.projects)
        } catch (err) {
            toast.error('Failed to load projects')
        }
    }

    const getBugs = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getBugsAPI(reqHeader)
            if (response.status === 200) setBugs(response.data)
        } catch (err) {
            toast.error('Failed to load bugs')
        }
    }

    useEffect(() => {
        Promise.all([getProfile(), getProjects(), getBugs()]).finally(() => setLoading(false))
    }, [])

    const getInitials = (name) => {
        if (!name) return "TS"
        return name.trim().split(" ").map((w) => w.charAt(0)).join("").slice(0, 2).toUpperCase()
    }

    const openBugs = bugs.filter((b) => !['Resolved', 'Verified', 'Closed'].includes(b.status))
    const completedBugs = bugs.filter((b) => ['Resolved', 'Verified', 'Closed'].includes(b.status))

    const projectsMap = {}
    projects.forEach((p) => { projectsMap[p.id] = p.name })

    const openItems = [...openBugs].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4)
    const recentBugs = [...bugs].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4)

    const statusStyle = (status) => {
        if (['Resolved', 'Verified', 'Closed'].includes(status)) return "bg-[#4ade80]/[0.10] text-[#4ade80]"
        if (status === 'In Progress' || status === 'Retest') return "bg-[#f0a83b]/[0.10] text-[#f0a83b]"
        return "bg-[#f87171]/[0.10] text-[#f87171]"
    }

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[#0d0f14] items-center justify-center">
                <p className="text-[13.5px] text-[#5b606c]">Loading dashboard...</p>
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
                        Dashboard
                    </h1>
                    
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">

                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-[19px] sm:text-[23px] font-semibold text-white">
                            Welcome back, {profile?.name?.split(" ")[0] || "Tester"}
                        </h1>
                        <p className="text-[13px] sm:text-[14.5px] text-[#8b909c] mt-1.5">
                            Here's an overview of your testing activity
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">

                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px] flex flex-col justify-between min-h-[110px] sm:min-h-[120px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                                <AiOutlineProject size={18} />
                            </span>
                            <div className="mt-3">
                                <p className="text-[20px] sm:text-[25px] font-semibold text-white leading-none">{projects.length}</p>
                                <p className="text-[12px] sm:text-[13px] text-[#8b909c] mt-1.5">Assigned Projects</p>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px] flex flex-col justify-between min-h-[110px] sm:min-h-[120px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f87171]/[0.12] text-[#f87171]">
                                <BsBug size={18} />
                            </span>
                            <div className="mt-3">
                                <p className="text-[20px] sm:text-[25px] font-semibold text-white leading-none">{openBugs.length}</p>
                                <p className="text-[12px] sm:text-[13px] text-[#8b909c] mt-1.5">Open Bugs</p>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px] flex flex-col justify-between min-h-[110px] sm:min-h-[120px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#8b98ff]/[0.12] text-[#8b98ff]">
                                <FiClock size={18} />
                            </span>
                            <div className="mt-3">
                                <p className="text-[20px] sm:text-[25px] font-semibold text-white leading-none">{bugs.length}</p>
                                <p className="text-[12px] sm:text-[13px] text-[#8b909c] mt-1.5">Total Reported</p>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px] flex flex-col justify-between min-h-[110px] sm:min-h-[120px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80]">
                                <FiCheckCircle size={18} />
                            </span>
                            <div className="mt-3">
                                <p className="text-[20px] sm:text-[25px] font-semibold text-white leading-none">{completedBugs.length}</p>
                                <p className="text-[12px] sm:text-[13px] text-[#8b909c] mt-1.5">Resolved</p>
                            </div>
                        </div>

                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">

                        {/* Needs Attention */}
                        <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] overflow-hidden flex flex-col">

                            <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-white/[0.06]">
                                <div>
                                    <h2 className="text-[15px] sm:text-[16px] font-semibold text-white">Needs Attention</h2>
                                    <p className="text-[12px] sm:text-[12.5px] text-[#5b606c] mt-0.5">Your open reported bugs</p>
                                </div>
                                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f87171]/[0.10] text-[#f87171] shrink-0">
                                    <BsBug size={16} />
                                </span>
                            </div>

                            <div className="flex-1 px-5 sm:px-6 py-2">
                                {openItems.length === 0 ? (
                                    <p className="text-[13px] text-[#5b606c] py-6 text-center">Nothing open right now</p>
                                ) : (
                                    openItems.map((bug, index) => (
                                        <div
                                            key={bug.id}
                                            className={`flex items-center gap-3 py-3.5 ${index !== openItems.length - 1 ? "border-b border-white/[0.05]" : ""}`}
                                        >
                                            <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-[#f87171]/[0.10] text-[#f87171] shrink-0">
                                                <BsBug size={14} />
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[13px] font-medium text-white truncate">{bug.title}</p>
                                                <p className="text-[11.5px] text-[#5b606c] mt-0.5 truncate">
                                                    {projectsMap[bug.project_id] || "—"}
                                                </p>
                                            </div>
                                            <span className={`text-[10.5px] px-2.5 py-1 rounded-full shrink-0 whitespace-nowrap font-medium ${statusStyle(bug.status)}`}>
                                                {bug.status}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Recent Bugs */}
                        <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] overflow-hidden flex flex-col">

                            <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-white/[0.06]">
                                <div>
                                    <h2 className="text-[15px] sm:text-[16px] font-semibold text-white">Recent Bugs</h2>
                                    <p className="text-[12px] sm:text-[12.5px] text-[#5b606c] mt-0.5">Latest reported issues</p>
                                </div>
                                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.10] text-[#f0a83b] shrink-0">
                                    <FiArrowUpRight size={16} />
                                </span>
                            </div>

                            <div className="flex-1 px-5 sm:px-6 py-2">
                                {recentBugs.length === 0 ? (
                                    <p className="text-[13px] text-[#5b606c] py-6 text-center">No bugs reported yet</p>
                                ) : (
                                    recentBugs.map((bug, index) => (
                                        <div
                                            key={bug.id}
                                            className={`flex items-center gap-3 py-3.5 ${index !== recentBugs.length - 1 ? "border-b border-white/[0.05]" : ""}`}
                                        >
                                            <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-[#f0a83b]/[0.10] text-[#f0a83b] shrink-0">
                                                <BsBug size={14} />
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[13px] font-medium text-white truncate">{bug.title}</p>
                                                <p className="text-[11.5px] text-[#5b606c] mt-0.5 truncate">
                                                    {projectsMap[bug.project_id] || "—"}
                                                </p>
                                            </div>
                                            <span className={`text-[10.5px] px-2.5 py-1 rounded-full shrink-0 whitespace-nowrap font-medium ${statusStyle(bug.status)}`}>
                                                {bug.status}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default TesterDashboard;