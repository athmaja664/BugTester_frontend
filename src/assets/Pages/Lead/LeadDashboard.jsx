import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeadSidebar from "../../Components/Lead/LeadSidebar";
import {
  FiUsers,
  FiFolder,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import toast from "react-hot-toast";
import { getMyProjectsAPI, getBugsAPI, getMyActivityAPI } from "../../../../services/allAPI";

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
  const [projects, setProjects] = useState([])
  const [bugs, setBugs] = useState([])
  const [activity, setActivity] = useState([])

  //loading
  const [loading, setLoading] = useState(true)

  const getProjects = async () => {
    const reqHeader = { Authorization: `Bearer ${token}` }
    const response = await getMyProjectsAPI(reqHeader)
    if (response.status === 200) {
      setProjects(response.data.projects)
    } else {
      toast.error('Failed to fetch projects')
    }
  }

  const getBugs = async () => {
    const reqHeader = { Authorization: `Bearer ${token}` }
    const response = await getBugsAPI(reqHeader)
    if (response.status === 200) {
      setBugs(response.data)
    } else {
      toast.error('Failed to fetch bugs')
    }
  }

  const getActivity = async () => {
    const reqHeader = { Authorization: `Bearer ${token}` }
    const response = await getMyActivityAPI(reqHeader)
    if (response.status === 200) {
      setActivity(response.data.activity || response.data)
    }
  }

  const loadDashboard = async () => {
    await Promise.all([getProjects(), getBugs(), getActivity()])
    setLoading(false)
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const getInitials = (name) => {
    if (!name) return "—"
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

  const recentBugs = [...myBugs]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)

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
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

          <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
            Dashboard
          </h1>

          <div className="flex items-center gap-4">

            <div className="hidden sm:flex items-center gap-2 h-[40px] px-3.5 w-[240px] bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">
              <AiOutlineSearch className="text-[#5b606c]" size={17} />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 w-full bg-transparent border-none outline-none text-[13.5px] text-white placeholder:text-[#5b606c]"
              />
            </div>

            <div className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-3 h-10 rounded-[8px] hover:bg-white/[0.04] cursor-pointer">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[12.5px] font-semibold">
                LD
              </span>
              <span className="hidden sm:block text-[13.5px] font-medium text-white">
                Lead
              </span>
            </div>

          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 lg:p-8">

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-[22px] font-semibold text-white">
              Lead Dashboard
            </h1>
            <p className="text-[14px] text-[#8b909c] mt-1">
              Overview of your projects, bugs and team activity
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
              <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff]">
                <FiFolder size={19} />
              </span>
              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  {totalProjects}
                </h2>
                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  Total Projects
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
              <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#c084fc]/[0.12] text-[#c084fc]">
                <FiUsers size={19} />
              </span>
              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  {totalTeamMembers}
                </h2>
                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  Team Members
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
              <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                <FiAlertCircle size={19} />
              </span>
              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  {openBugs}
                </h2>
                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  Open Bugs
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
              <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80]">
                <FiCheckCircle size={19} />
              </span>
              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  {resolvedBugs}
                </h2>
                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  Resolved Bugs
                </p>
              </div>
            </div>

          </div>

          {/* Recent Activity */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mb-7">

            <h2 className="text-[16px] font-semibold text-white mb-6">
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
                      LD
                    </div>
                    <div>
                      <p className="text-[13px] text-[#e8e9ed]">
                        {item.description || item.action}
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
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[16px] font-semibold text-white">
                Recent Bugs
              </h2>

              <Link
                to="/leadbugs"
                className="flex items-center gap-1.5 text-[13px] font-medium text-[#f0a83b] hover:opacity-85"
              >
                View all bugs
                <FiArrowRight size={15} />
              </Link>
            </div>

            {recentBugs.length === 0 ? (
              <div className="py-8 text-center text-[13.5px] text-[#5b606c]">
                No bugs found
              </div>
            ) : (
              <div className="overflow-x-auto">

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
                        <td className="py-3.5 text-[13.5px] font-medium text-[#f0a83b]">
                          BUG-{item.id}
                        </td>
                        <td className="py-3.5 text-[14px] text-white">
                          {item.title}
                        </td>
                        <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                          {projectsMap[item.project_id] || "—"}
                        </td>
                        <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                          {item.assigned_to ? (usersMap[item.assigned_to] || "—") : "Unassigned"}
                        </td>
                        <td className="py-3.5">
                          <span className={`inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] border ${statusColors[item.status] || "bg-white/[0.05] text-[#8b909c] border-white/10"}`}>
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