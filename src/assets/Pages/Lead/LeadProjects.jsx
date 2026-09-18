import React, { useState, useEffect } from "react";
import LeadSidebar from "../../Components/Lead/LeadSidebar";
import LeadManageMembersModal from "../../Components/Lead/LeadManageMembersModal";
import {
  FiSearch,
  FiFolder,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiUserPlus,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { getMyProjectsAPI, getBugsAPI } from "../../../../services/allAPI";

const statusColors = {
  Planning: "bg-white/[0.06] text-[#a8abb8]",
  "In Progress": "bg-[#f0a83b]/10 text-[#f0a83b]",
  Completed: "bg-emerald-500/10 text-emerald-400",
  "On Hold": "bg-[#f26d6d]/10 text-[#f26d6d]",
}

function LeadProjects() {
  const [projects, setProjects] = useState([])
  const [bugs, setBugs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [showMembersModal, setShowMembersModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const token = localStorage.getItem('token')

  const getProjects = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` }
      const response = await getMyProjectsAPI(reqHeader)
      if (response.status === 200) {
        setProjects(response.data.projects)
      }
    } catch (err) {
      console.log(err)
      toast.error('Failed to fetch projects')
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
      console.log(err)
    }
  }

  useEffect(() => {
    getProjects()
    getBugs()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const filteredProjects = projects.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const projectsPerPage = 4
  const lastIndex = currentPage * projectsPerPage
  const firstIndex = lastIndex - projectsPerPage
  const currentProjects = filteredProjects.slice(firstIndex, lastIndex)
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

  return (
    <div className="min-h-screen bg-[#0d0f14] text-white flex">

      <LeadSidebar />

      <main className="flex-1 min-w-0">

        {/* Top Bar */}
        <div className="h-[72px] border-b border-white/[0.06] flex items-center justify-between px-8">

          <div>
            <h1 className="text-[20px] font-semibold text-white">
              Projects
            </h1>

            <p className="text-[13px] text-[#5b606c] mt-1">
              Projects assigned to you by the admin
            </p>
          </div>

          <div className="relative w-[260px]">
            <FiSearch
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5b606c]"
            />

            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[40px] pl-10 pr-3 rounded-[8px] bg-[#161922] border border-white/[0.06] text-[13px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]/30"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">

          <div className="mb-6">
            <h2 className="text-[17px] font-semibold text-white">
              All Projects
            </h2>

            <p className="text-[13px] text-[#5b606c] mt-1">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} assigned to you
            </p>
          </div>

          {currentProjects.length === 0 ? (
            <div className="py-16 text-center text-[13.5px] text-[#5b606c] bg-[#161922] border border-white/[0.06] rounded-[10px]">
              No projects assigned to you yet
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

              {currentProjects.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-5 hover:border-white/[0.10] transition-colors"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-[8px] bg-[#f0a83b]/10 flex items-center justify-center shrink-0">
                        <FiFolder size={19} className="text-[#f0a83b]" />
                      </div>

                      <div>
                        <h3 className="text-[15px] font-semibold text-white">
                          {item.name}
                        </h3>
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProject(item)
                        setShowMembersModal(true)
                      }}
                      className="flex items-center gap-1.5 px-3 h-8 text-[12px] font-medium rounded-[6px] bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25 hover:bg-[#f0a83b]/[0.2] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <FiUserPlus size={13} />
                      Manage
                    </button>

                  </div>

                  {item.description && (
                    <p className="text-[13px] leading-6 text-[#7f8491] mt-5 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-5">

                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${statusColors[item.status] || "bg-white/[0.06] text-[#a8abb8]"}`}>
                      {item.status === 'Completed' ? <FiCheckCircle size={12} /> : <FiClock size={12} />}
                      {item.status}
                    </span>

                    <span className="flex items-center gap-1.5 text-[12px] text-[#7f8491]">
                      <FiAlertCircle size={13} />
                      {bugs.filter((bug) => bug.project_id === item.id).length} Bugs
                    </span>

                  </div>

                  {/* Developers */}
                  <div className="mt-5 pt-4 border-t border-white/[0.06]">
                    <p className="text-[11px] uppercase tracking-wide text-[#5b606c] mb-2">
                      Developers
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.members?.filter((m) => m.role === 'Developer').length === 0 || !item.members ? (
                        <span className="text-[12px] text-[#5b606c]">No developers assigned</span>
                      ) : (
                        item.members.filter((m) => m.role === 'Developer').map((dev) => (
                          <span
                            key={dev.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#576aff]/[0.12] text-[#8b98ff] text-[11.5px] font-medium border border-[#576aff]/25"
                          >
                            {dev.name}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Testers */}
                  <div className="mt-4">
                    <p className="text-[11px] uppercase tracking-wide text-[#5b606c] mb-2">
                      Testers
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.members?.filter((m) => m.role === 'Tester').length === 0 || !item.members ? (
                        <span className="text-[12px] text-[#5b606c]">No testers assigned</span>
                      ) : (
                        item.members.filter((m) => m.role === 'Tester').map((tester) => (
                          <span
                            key={tester.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c084fc]/[0.12] text-[#c084fc] text-[11.5px] font-medium border border-[#c084fc]/25"
                          >
                            {tester.name}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                </div>
              ))}

            </div>
          )}

          {/* Pagination */}
          {filteredProjects.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-white/[0.06]">

              <p className="text-[13px] text-[#5b606c]">
                Showing{" "}
                <span className="text-white font-medium">{firstIndex + 1}</span>{" "}
                to{" "}
                <span className="text-white font-medium">{Math.min(lastIndex, filteredProjects.length)}</span>{" "}
                of{" "}
                <span className="text-white font-medium">{filteredProjects.length}</span>{" "}
                projects
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
          )}

        </div>

      </main>

      {showMembersModal && selectedProject && (
        <LeadManageMembersModal
          project={selectedProject}
          onClose={() => {
            setShowMembersModal(false)
            setSelectedProject(null)
          }}
          getProjects={getProjects}
        />
      )}

    </div>
  );
}

export default LeadProjects;