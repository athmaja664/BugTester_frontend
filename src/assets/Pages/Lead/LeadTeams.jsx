import React, { useState, useEffect } from "react";
import LeadSidebar from "../../Components/Lead/LeadSidebar";
import {
  FiSearch,
  FiUsers,
  FiMail,
  FiFolder,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { getMyProjectsAPI, getUsersAPI } from "../../../../services/allAPI";

function LeadTeams() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([])
  const [usersMap, setUsersMap] = useState({})
  const token = localStorage.getItem('token')

  const getTeamData = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` }

      const [projectsRes, usersRes] = await Promise.all([
        getMyProjectsAPI(reqHeader),
        getUsersAPI(reqHeader)
      ])

      if (projectsRes.status === 200) {
        setProjects(projectsRes.data.projects)
      }

      if (usersRes.status === 200) {
        const map = {}
        usersRes.data.users.forEach((u) => { map[u.id] = u.email })
        setUsersMap(map)
      }
    } catch (err) {
      toast.error('Failed to load team data')
    }
  }

  useEffect(() => {
    getTeamData()
  }, [])

  // flatten members across all of this Lead's projects, deduped by user id,
  // collecting which project(s) each person is on
  const teamMembersMap = {}

  projects.forEach((project) => {
    (project.members || []).forEach((member) => {
      if (!teamMembersMap[member.id]) {
        teamMembersMap[member.id] = {
          id: member.id,
          name: member.name,
          role: member.role,
          email: member.email || usersMap[member.id] || "—",
          projectNames: []
        }
      }
      teamMembersMap[member.id].projectNames.push(project.name)
    })
  })

  const teamMembers = Object.values(teamMembersMap)

  const filteredMembers = teamMembers.filter((member) => {
    const searchValue = search.toLowerCase();
    return (
      member.name?.toLowerCase().includes(searchValue) ||
      member.email?.toLowerCase().includes(searchValue) ||
      member.role?.toLowerCase().includes(searchValue)
    );
  });

  const getInitials = (name) => {
    if (!name) return "—"
    return name.trim().split(" ").map((word) => word.charAt(0)).join("").slice(0, 2).toUpperCase()
  }

  const roleColors = {
    Developer: "bg-[#576aff]/10 text-[#8b98ff]",
    Tester: "bg-[#c084fc]/10 text-[#c084fc]",
  }

  return (
    <div className="min-h-screen bg-[#0d0f14] text-white flex">

      <LeadSidebar />

      <main className="flex-1 min-w-0">

        {/* Top Bar */}
        <div className="h-[72px] border-b border-white/[0.06] flex items-center justify-between px-8">

          <div>
            <h1 className="text-[20px] font-semibold text-white">
              Team
            </h1>

            <p className="text-[13px] text-[#5b606c] mt-1">
              Developers and testers working across your projects
            </p>
          </div>

          <div className="relative w-[260px]">
            <FiSearch
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5b606c]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search team members..."
              className="w-full h-[40px] pl-10 pr-3 rounded-[8px] bg-[#161922] border border-white/[0.06] text-[13px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]/30"
            />
          </div>

        </div>

        {/* Content */}
        <div className="p-8">

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[17px] font-semibold text-white">
                  Team Members
                </h2>
                <p className="text-[13px] text-[#5b606c] mt-1">
                  Members assigned to projects you lead
                </p>
              </div>

              <div className="flex items-center gap-2 text-[12px] text-[#5b606c]">
                <FiUsers size={15} />
                {teamMembers.length} Members
              </div>
            </div>
          </div>

          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-5 hover:border-white/[0.10] transition-colors"
                >

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#f0a83b]/10 text-[#f0a83b] flex items-center justify-center text-[13px] font-semibold shrink-0">
                      {getInitials(member.name)}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[15px] font-semibold text-white truncate">
                        {member.name}
                      </h3>
                      <span className={`inline-flex mt-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${roleColors[member.role] || "bg-white/[0.06] text-[#a8abb8]"}`}>
                        {member.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-5">
                    <FiMail size={14} className="text-[#5b606c]" />
                    <span className="text-[12px] text-[#7f8491] truncate">
                      {member.email}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 mt-3">
                    <FiFolder size={14} className="text-[#5b606c] mt-0.5 shrink-0" />
                    <span className="text-[12px] text-[#7f8491]">
                      {member.projectNames.join(", ")}
                    </span>
                  </div>

                </div>
              ))}

            </div>
          ) : (
            <div className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-10 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/[0.04] flex items-center justify-center">
                <FiUsers size={20} className="text-[#5b606c]" />
              </div>

              <h3 className="text-[15px] font-semibold text-white mt-4">
                No team members found
              </h3>

              <p className="text-[12px] text-[#5b606c] mt-1">
                {teamMembers.length === 0
                  ? "No developers or testers are assigned to your projects yet."
                  : "Try searching with a different name, email, or role."}
              </p>
            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default LeadTeams;