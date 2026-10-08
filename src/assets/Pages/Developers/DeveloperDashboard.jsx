import React, { useState, useEffect } from "react";
import DeveloperSidebar from "../../Components/Developer/DeveloperSidebar";
import { AiOutlineProject } from "react-icons/ai";
import { FiCheckCircle, FiClock, FiBriefcase } from "react-icons/fi";
import { BsBug } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import toast from "react-hot-toast";
import { getMyProjectsAPI, getBugsAPI, getMyProfileAPI } from "../../../../services/allAPI";


const priorityColors = {
    Low: "bg-white/[0.06] text-[#a8abb8]",
    Medium: "bg-[#f0a83b]/[0.10] text-[#f0a83b]",
    High: "bg-[#ef4444]/[0.10] text-[#ef7777]",
    Critical: "bg-[#ef4444]/[0.15] text-[#ef7777]",
}

function DeveloperDashboard() {
    const [profile, setProfile] = useState(null)
    const [projects, setProjects] = useState([])
    const [bugs, setBugs] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')

    const getProfile = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getMyProfileAPI(reqHeader)
            if (response.status === 200) {
                setProfile(response.data.user)
            }
        } catch (err) {
            toast.error('Failed to load profile')
        }
    }

    const getProjects = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getMyProjectsAPI(reqHeader)
            if (response.status === 200) {
                setProjects(response.data.projects)
            }
        } catch (err) {
            toast.error('Failed to load projects')
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
            toast.error('Failed to load bugs')
        }
    }

    useEffect(() => {
        Promise.all([getProfile(), getProjects(), getBugs()]).finally(() => setLoading(false))
    }, [])

    const getInitials = (name) => {
        if (!name) return "DV"
        return name.trim().split(" ").map((w) => w.charAt(0)).join("").slice(0, 2).toUpperCase()
    }

    // bugs here are already filtered to "assigned to me" by the backend
    const openBugs = bugs.filter((b) => !['Resolved', 'Verified', 'Closed'].includes(b.status)).length
    const inProgressBugs = bugs.filter((b) => b.status === 'In Progress').length
    const resolvedBugs = bugs.filter((b) => ['Resolved', 'Verified', 'Closed'].includes(b.status)).length

    const projectsMap = {}
    projects.forEach((p) => { projectsMap[p.id] = p.name })

    const recentBugs = [...bugs]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5)

    // dedupe team members across all my projects, excluding myself
    const teamMap = {}
    projects.forEach((project) => {
        (project.members || []).forEach((member) => {
            if (member.id !== profile?.id) {
                teamMap[member.id] = member
            }
        })
    })
    const team = Object.values(teamMap).slice(0, 6)

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[#0d0f14] items-center justify-center">
                <p className="text-[13.5px] text-[#5b606c]">Loading dashboard...</p>
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
                        Dashboard
                    </h1>
                    
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 sm:p-5 lg:p-8">

                    <div className="mb-6 sm:mb-7">
                        <h1 className="text-[19px] sm:text-[22px] font-semibold text-white">
                            Welcome back, {profile?.name?.split(" ")[0] || "Developer"}
                        </h1>
                        <p className="text-[13px] sm:text-[14px] text-[#8b909c] mt-1">
                            Here's an overview of your assigned projects and bugs
                        </p>

                        {/* Organization badge */}
                        {profile?.organization_name && (
                            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 max-w-full rounded-[8px] bg-[#f0a83b]/[0.10] border border-[#f0a83b]/25 text-[#f0a83b]">
                                <FiBriefcase size={14} className="shrink-0" />
                                <span className="text-[12.5px] font-medium truncate">
                                    {profile.organization_name}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">

                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b] mb-3 sm:mb-4">
                                <AiOutlineProject size={18} />
                            </span>
                            <p className="text-[20px] sm:text-[24px] font-semibold text-white">{projects.length}</p>
                            <p className="text-[12px] sm:text-[13px] text-[#8b909c] mt-1">Assigned Projects</p>
                        </div>

                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#ef4444]/[0.12] text-[#ef7777] mb-3 sm:mb-4">
                                <BsBug size={17} />
                            </span>
                            <p className="text-[20px] sm:text-[24px] font-semibold text-white">{openBugs}</p>
                            <p className="text-[12px] sm:text-[13px] text-[#8b909c] mt-1">Open Bugs</p>
                        </div>

                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff] mb-3 sm:mb-4">
                                <FiClock size={17} />
                            </span>
                            <p className="text-[20px] sm:text-[24px] font-semibold text-white">{inProgressBugs}</p>
                            <p className="text-[12px] sm:text-[13px] text-[#8b909c] mt-1">In Progress</p>
                        </div>

                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80] mb-3 sm:mb-4">
                                <FiCheckCircle size={17} />
                            </span>
                            <p className="text-[20px] sm:text-[24px] font-semibold text-white">{resolvedBugs}</p>
                            <p className="text-[12px] sm:text-[13px] text-[#8b909c] mt-1">Resolved</p>
                        </div>

                    </div>

                    {/* Bottom section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">

                        {/* Recent Bugs */}
                        <div className="p-5 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                            <div className="mb-5">
                                <h2 className="text-[15px] sm:text-[16px] font-semibold text-white">Recent Bugs</h2>
                                <p className="text-[12px] sm:text-[12.5px] text-[#5b606c] mt-1">Bugs assigned to you</p>
                            </div>

                            {recentBugs.length === 0 ? (
                                <p className="text-[13px] text-[#5b606c] py-4">No bugs assigned yet</p>
                            ) : (
                                recentBugs.map((bug, index) => (
                                    <div
                                        key={bug.id}
                                        className={`flex items-center justify-between gap-3 py-3 ${index !== recentBugs.length - 1 ? "border-b border-white/[0.06]" : ""}`}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-[#ef4444]/[0.12] text-[#ef7777] shrink-0">
                                                <BsBug size={15} />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-[13px] font-medium text-white truncate">{bug.title}</p>
                                                <p className="text-[11.5px] text-[#5b606c] mt-0.5 truncate">
                                                    {projectsMap[bug.project_id] || "—"}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`text-[10.5px] px-2 py-1 rounded-[4px] shrink-0 whitespace-nowrap ${priorityColors[bug.priority] || "bg-white/[0.06] text-[#a8abb8]"}`}>
                                            {bug.priority}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Project Team */}
                        <div className="p-5 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h2 className="text-[15px] sm:text-[16px] font-semibold text-white">Project Team</h2>
                                    <p className="text-[12px] sm:text-[12.5px] text-[#5b606c] mt-1">
                                        People you're working with
                                    </p>
                                </div>
                                <HiOutlineUserGroup size={19} className="text-[#5b606c] shrink-0" />
                            </div>

                            {team.length === 0 ? (
                                <p className="text-[13px] text-[#5b606c] py-4">No teammates yet</p>
                            ) : (
                                team.map((member, index) => (
                                    <div
                                        key={member.id}
                                        className={`flex items-center justify-between py-3 ${index !== team.length - 1 ? "border-b border-white/[0.06]" : ""}`}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[11px] font-semibold shrink-0">
                                                {getInitials(member.name)}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-[13px] font-medium text-white truncate">{member.name}</p>
                                                <p className="text-[11.5px] text-[#5b606c] truncate">{member.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DeveloperDashboard;