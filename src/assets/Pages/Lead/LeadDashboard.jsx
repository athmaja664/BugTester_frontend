import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeadSidebar from "../../Components/Lead/LeadSidebar";
import {
  FiUsers,
  FiFolder,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowRight,
  FiBriefcase,
} from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import toast from "react-hot-toast";
import { getMyProjectsAPI, getBugsAPI, getMyActivityAPI, getMyProfileAPI } from "../../../../services/allAPI";

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
  Low: "text-[#6a6f7b]",
  Medium: "text-[#f0a83b]",
  High: "text-[#f26d6d]",
  Critical: "text-[#f26d6d]",
}

function LeadDashboard() {
  const token = localStorage.getItem('token')

  //data
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [bugs, setBugs] = useState([])
  const [activity, setActivity] = useState([])

  //search
  const [searchTerm, setSearchTerm] = useState("")

  //loading
  const [loading, setLoading] = useState(true)

  const getProfile = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` }
      const response = await getMyProfileAPI(reqHeader)
      if (response.status === 200) {
        setProfile(response.data.user)
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to fetch profile')
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

  const getActivity = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` }
      const response = await getMyActivityAPI(reqHeader)
      if (response.status === 200) {
        setActivity(response.data.activity || response.data)
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to fetch activity')
    }
  }

  const loadDashboard = async () => {
    await Promise.all([getProfile(), getProjects(), getBugs(), getActivity()])
    setLoading(false)
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const getInitials = (name) => {
    if (!name) return "LD"
    return name.trim().split(" ").map((word) => word.charAt(0)).join("").slice(0, 2).toUpperCase()
  }

  const timeAgo = (dateString) => {
    if (!dateString) return "—"
    const diffMs = Date.now() - new Date(dateString).getTime()
    const diffMins = Math.floor(diffMs / 60000)
    if (diffMins < 1) return "just now"
    if (diffMins < 60) return `${diffMins} min ago`
    const diffHrs = Math.floor(diffMins / 60)
    if (diffHrs < 24) return `${diffHrs} hr${diffHrs > 1 ? 's' : ''} ago`
    const diffDays = Math.floor(diffHrs / 24)
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  }

  const firstName = profile?.name?.trim().split(" ")[0]

  //derived data, computed from state before render
  const myProjectIds = projects.map((p) => p.id)
  const myBugs = bugs.filter((item) => myProjectIds.includes(item.project_id))

  const totalProjects = projects.length

  const teamMemberIds = new Set()
  projects.forEach((project) => {
    (project.members || []).forEach((member) => teamMemberIds.add(member.id))
  })
  const totalTeamMembers = teamMemberIds.size

  const openBugs = myBugs.filter((item) =>
    !['Resolved', 'Verified', 'Closed'].includes(item.status)
  ).length

  const resolvedBugs = myBugs.filter((item) =>
    ['Resolved', 'Verified', 'Closed'].includes(item.status)
  ).length

  const projectsMap = {}
  projects.forEach((p) => { projectsMap[p.id] = p.name })

  const usersMap = {}
  projects.forEach((project) => {
    (project.members || []).forEach((member) => { usersMap[member.id] = member.name })
  })

  // search runs on all of my bugs first, then the newest 5 are shown
  const term = searchTerm.trim().toLowerCase()

  const recentBugs = [...myBugs]
    .filter((item) => {
      if (!term) return true
      const developer = item.assigned_to ? (usersMap[item.assigned_to] || "") : "unassigned"
      return (
        item.title?.toLowerCase().includes(term) ||
        `bug-${item.id}`.includes(term) ||
        (projectsMap[item.project_id] || "").toLowerCase().includes(term) ||
        developer.toLowerCase().includes(term) ||
        item.status?.toLowerCase().includes(term) ||
        item.priority?.toLowerCase().includes(term)
      )
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)

  const statCards = [
    { label: "Total Projects", value: totalProjects, icon: FiFolder, color: "bg-[#576aff]/[0.12] text-[#8b98ff]" },
    { label: "Team Members", value: totalTeamMembers, icon: FiUsers, color: "bg-[#c084fc]/[0.12] text-[#c084fc]" },
    { label: "Open Bugs", value: openBugs, icon: FiAlertCircle, color: "bg-[#f0a83b]/[0.12] text-[#f0a83b]" },
    { label: "Resolved Bugs", value: resolvedBugs, icon: FiCheckCircle, color: "bg-[#4ade80]/[0.12] text-[#4ade80]" },
  ]

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#0d0f14] items-center justify-center">
        <p className="text-[13.5px] text-[#5b606c]">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#0d0f14]">
      <LeadSidebar />

      {/* Right column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-3 h-[64px] sm:h-[72px] pl-16 pr-4 lg:pl-8 lg:pr-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

          <h1 className="text-[16px] sm:text-[18px] font-semibold text-white truncate">
            Dashboard
          </h1>

          <div className="hidden md:flex items-center gap-2 h-[40px] px-3.5 w-[240px] shrink-0 bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">
            <AiOutlineSearch className="text-[#5b606c] shrink-0" size={17} />
            <input
              type="text"
              placeholder="Search bugs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 w-full min-w-0 bg-transparent border-none outline-none text-[13.5px] text-white placeholder:text-[#5b606c]"
            />
          </div>

        </div>

        {/* Main content */}
        <div className="flex-1 p-4 sm:p-5 lg:p-8">

          {/* Mobile search */}
          <div className="md:hidden flex items-center gap-2 h-[42px] px-3.5 mb-5 bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">
            <AiOutlineSearch className="text-[#5b606c] shrink-0" size={17} />
            <input
              type="text"
              placeholder="Search bugs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 w-full min-w-0 bg-transparent border-none outline-none text-[13.5px] text-white placeholder:text-[#5b606c]"
            />
          </div>

          {/* Page Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-[20px] sm:text-[22px] font-semibold text-white break-words">
              Welcome back{firstName ? `, ${firstName}` : ""}
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#8b909c] mt-1">
              Overview of your projects, bugs and team activity
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
            {statCards.map((card) => {
              const Icon = card.icon
              return (
                <div key={card.label} className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                  <span className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] ${card.color}`}>
                    <Icon size={19} />
                  </span>
                  <div>
                    <h2 className="text-[22px] sm:text-[26px] font-semibold text-white leading-none">
                      {card.value}
                    </h2>
                    <p className="text-[12px] sm:text-[13px] text-[#8b909c] mt-1.5">
                      {card.label}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Recent Activity */}
          <div className="p-4 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mb-5 sm:mb-7">

            <h2 className="text-[15px] sm:text-[16px] font-semibold text-white mb-5 sm:mb-6">
              Your Recent Activity
            </h2>

            {activity.length === 0 ? (
              <p className="text-[13px] text-[#5b606c]">
                No recent activity yet
              </p>
            ) : (
              <div className="flex flex-col gap-5">
                {activity.slice(0, 5).map((item, index) => (
                  <div key={item.id || index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f0a83b]/[0.12] text-[#f0a83b] flex items-center justify-center text-[11px] font-semibold shrink-0">
                      {getInitials(profile?.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] text-[#e8e9ed] break-words">
                        {item.message || item.description || item.action}
                      </p>
                      <p className="text-[12px] text-[#5b606c] mt-1">
                        {timeAgo(item.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Recent Bugs */}
          <div className="p-4 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

            <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
              <h2 className="text-[15px] sm:text-[16px] font-semibold text-white">
                Recent Bugs
              </h2>

              <Link
                to="/leadbugs"
                className="flex items-center gap-1.5 text-[13px] font-medium text-[#f0a83b] hover:opacity-85 shrink-0"
              >
                View all
                <FiArrowRight size={15} />
              </Link>
            </div>

            {recentBugs.length === 0 ? (
              <div className="py-8 text-center text-[13.5px] text-[#5b606c]">
                {term ? "No bugs match your search" : "No bugs found"}
              </div>
            ) : (
              <div className="overflow-x-auto -mx-1 px-1">

                <table className="w-full text-left border-collapse min-w-[720px]">

                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">Bug ID</th>
                      <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">Title</th>
                      <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">Project</th>
                      <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">Developer</th>
                      <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">Status</th>
                      <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">Priority</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentBugs.map((item, index) => (
                      <tr
                        key={item.id}
                        className={index !== recentBugs.length - 1 ? "border-b border-white/[0.04]" : ""}
                      >
                        <td className="py-3.5 pr-3 text-[13.5px] font-medium text-[#f0a83b] whitespace-nowrap">
                          BUG-{item.id}
                        </td>
                        <td className="py-3.5 pr-3 text-[14px] text-white">
                          {item.title}
                        </td>
                        <td className="py-3.5 pr-3 text-[13.5px] text-[#a8abb8]">
                          {projectsMap[item.project_id] || "—"}
                        </td>
                        <td className="py-3.5 pr-3 text-[13.5px] text-[#a8abb8]">
                          {item.assigned_to ? (usersMap[item.assigned_to] || "—") : "Unassigned"}
                        </td>
                        <td className="py-3.5 pr-3">
                          <span className={`inline-flex whitespace-nowrap px-2.5 py-1 text-[12px] font-medium rounded-[5px] border ${statusColors[item.status] || "bg-white/[0.05] text-[#8b909c] border-white/10"}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className={`py-3.5 text-[13px] font-medium ${priorityColors[item.priority] || "text-[#8b909c]"}`}>
                          {item.priority}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default LeadDashboard;