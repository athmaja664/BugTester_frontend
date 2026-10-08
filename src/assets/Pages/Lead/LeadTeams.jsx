import React, { useState, useEffect, useRef } from "react";
import LeadSidebar from "../../Components/Lead/LeadSidebar";
import {
  FiSearch,
  FiUsers,
  FiMail,
  FiFolder,
  FiUserPlus,
} from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { getMyProjectsAPI, getUsersAPI, updateProjectMembersAPI } from "../../../../services/allAPI";

// Click-to-open multi-select (same style as the project modals)
function MultiSelect({ label, placeholder, emptyText, options, selectedIds, onToggle }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col gap-2 relative" ref={ref}>
      <label className="text-[12.5px] font-medium text-[#a8abb8]">{label}</label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b] flex items-center justify-between"
      >
        <span className={`truncate ${selectedIds.length === 0 ? "text-[#5b606c]" : "text-white"}`}>
          {selectedIds.length === 0
            ? placeholder
            : options.filter((o) => selectedIds.includes(o.id)).map((o) => o.name).join(", ")}
        </span>
        <span className="text-[#6a6f7b] text-xs ml-2 flex-shrink-0">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 right-0 z-10 bg-[#1c202b] border border-white/10 rounded-[8px] shadow-lg max-h-[180px] overflow-y-auto p-2">
          {options.length === 0 && (
            <p className="text-[12.5px] text-[#5b606c] px-2 py-1">{emptyText}</p>
          )}
          {options.map((o) => (
            <label
              key={o.id}
              className="flex items-center gap-2 text-[13px] text-white px-2 py-2 rounded-[6px] cursor-pointer hover:bg-white/[0.05]"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(o.id)}
                onChange={() => onToggle(o.id)}
                className="accent-[#f0a83b]"
              />
              {o.name}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

function AddTeamMemberModal({ projects, allUsers, onClose, onSaved }) {
  const [projectId, setProjectId] = useState("")
  const [developerIds, setDeveloperIds] = useState([])
  const [testerIds, setTesterIds] = useState([])
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('token')

  const developers = allUsers.filter((u) => u.role === 'Developer')
  const testers = allUsers.filter((u) => u.role === 'Tester')

  // when a project is chosen, pre-select the people already on it
  const handleProjectChange = (e) => {
    const id = e.target.value
    setProjectId(id)
    const project = projects.find((p) => String(p.id) === String(id))
    const members = project?.members || []
    setDeveloperIds(members.filter((m) => m.role === 'Developer').map((m) => m.id))
    setTesterIds(members.filter((m) => m.role === 'Tester').map((m) => m.id))
  }

  const toggle = (setter) => (id) =>
    setter((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const handleSubmit = async () => {
    if (!projectId) {
      toast.error('Please select a project')
      return
    }
    if (loading) return

    const project = projects.find((p) => String(p.id) === String(projectId))

    try {
      setLoading(true)
      const reqHeader = { Authorization: `Bearer ${token}` }
      const response = await updateProjectMembersAPI(
        project.id,
        { lead_id: project.lead_id || null, developer_ids: developerIds, tester_ids: testerIds },
        reqHeader
      )
      if (response.status === 200) {
        toast.success('Team updated successfully')
        onSaved()
        onClose()
      } else {
        toast.error(response?.response?.data?.message || 'Failed to update team')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update team')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] px-4">
      <div className="bg-[#161922] border border-white/[0.08] rounded-[16px] shadow-lg w-full max-w-[480px] max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between px-5 sm:px-7 pt-6 sm:pt-7 pb-5 border-b border-white/[0.06]">
          <h3 className="text-lg font-semibold text-white">Add Team Members</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-[8px] text-[#5b606c] hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
          >
            <AiOutlineClose size={16} />
          </button>
        </div>

        <div className="px-5 sm:px-7 py-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[12.5px] font-medium text-[#a8abb8]">Project</label>
            <select
              value={projectId}
              onChange={handleProjectChange}
              className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b]"
            >
              <option className="bg-[#161922]" value="">Select a project</option>
              {projects.map((p) => (
                <option className="bg-[#161922]" key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <MultiSelect
            label="Developers"
            placeholder="Select developers"
            emptyText="No developers found"
            options={developers}
            selectedIds={developerIds}
            onToggle={toggle(setDeveloperIds)}
          />

          <MultiSelect
            label="Testers"
            placeholder="Select testers"
            emptyText="No testers found"
            options={testers}
            selectedIds={testerIds}
            onToggle={toggle(setTesterIds)}
          />
        </div>

        <div className="flex items-center justify-center gap-3 px-5 sm:px-7 py-5 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={onClose}
            className="h-[44px] px-5 text-sm font-medium text-[#a8abb8] hover:text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="h-[44px] px-6 text-sm font-bold text-[#0d0f14] bg-[#f0a83b] rounded-[8px] hover:bg-[#f5bc6b] disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Team'}
          </button>
        </div>

      </div>
    </div>
  )
}

function LeadTeams() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
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
        setAllUsers(usersRes.data.users)
      }
    } catch (err) {
      toast.error('Failed to load team data')
    }
  }

  useEffect(() => {
    getTeamData()
  }, [])

  const usersMap = {}
  allUsers.forEach((u) => { usersMap[u.id] = u.email })

  // flatten members across all of this Lead's projects, deduped by user id
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

  const openAddModal = () => {
    if (projects.length === 0) {
      toast.error('You need a project before you can add team members')
      return
    }
    setShowAddModal(true)
  }

  return (
    <div className="min-h-screen bg-[#0d0f14] text-white flex">

      <LeadSidebar />

      <main className="flex-1 min-w-0">

        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 min-h-[64px] sm:min-h-[72px] py-3 pl-16 pr-4 lg:pl-8 lg:pr-8 border-b border-white/[0.06]">

          <div className="min-w-0">
            <h1 className="text-[18px] sm:text-[20px] font-semibold text-white">
              Team
            </h1>
            <p className="text-[12.5px] sm:text-[13px] text-[#5b606c] mt-0.5 sm:mt-1">
              Developers and testers working across your projects
            </p>
          </div>

          <div className="relative w-full sm:w-[260px] shrink-0">
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
        <div className="p-4 sm:p-6 lg:p-8">

          <div className="mb-5 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-[16px] sm:text-[17px] font-semibold text-white">
                Team Members
              </h2>
              <p className="text-[12.5px] sm:text-[13px] text-[#5b606c] mt-1">
                Members assigned to projects you lead
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div className="flex items-center gap-2 text-[12px] text-[#5b606c]">
                <FiUsers size={15} />
                {teamMembers.length} Members
              </div>

              <button
                type="button"
                onClick={openAddModal}
                className="flex items-center gap-2 h-[40px] px-4 rounded-[8px] bg-[#f0a83b] text-[#0d0f14] text-[13.5px] font-semibold hover:bg-[#f5bc6b] transition-colors cursor-pointer"
              >
                <FiUserPlus size={16} />
                Add Member
              </button>
            </div>
          </div>

          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">

              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-4 sm:p-5 hover:border-white/[0.10] transition-colors"
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

                  <div className="flex items-center gap-2 mt-4 sm:mt-5 min-w-0">
                    <FiMail size={14} className="text-[#5b606c] shrink-0" />
                    <span className="text-[12px] text-[#7f8491] truncate">
                      {member.email}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 mt-3">
                    <FiFolder size={14} className="text-[#5b606c] mt-0.5 shrink-0" />
                    <span className="text-[12px] text-[#7f8491] break-words min-w-0">
                      {member.projectNames.join(", ")}
                    </span>
                  </div>

                </div>
              ))}

            </div>
          ) : (
            <div className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-8 sm:p-10 text-center">
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

      {showAddModal && (
        <AddTeamMemberModal
          projects={projects}
          allUsers={allUsers}
          onClose={() => setShowAddModal(false)}
          onSaved={getTeamData}
        />
      )}

    </div>
  );
}

export default LeadTeams;