import React, { useState } from "react";
import LeadSidebar from "../../Components/Lead/LeadSidebar";
import {
  FiSearch,
  FiUsers,
  FiMail,
  FiFolder,
  FiMoreHorizontal,
  FiX,
  FiPlus,
} from "react-icons/fi";

function LeadTeams() {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "Developer",
    projects: "0",
    status: "Active",
  });

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      initials: "AK",
      name: "Arun Kumar",
      role: "Frontend Developer",
      email: "arun@bugtester.com",
      projects: 2,
      status: "Active",
      type: "Developer",
    },
    {
      id: 2,
      initials: "NS",
      name: "Neha Sharma",
      role: "Backend Developer",
      email: "neha@bugtester.com",
      projects: 3,
      status: "Active",
      type: "Developer",
    },
    {
      id: 3,
      initials: "RM",
      name: "Rahul Menon",
      role: "QA Engineer",
      email: "rahul@bugtester.com",
      projects: 2,
      status: "Active",
      type: "QA Engineer",
    },
    {
      id: 4,
      initials: "PS",
      name: "Priya Shah",
      role: "UI/UX Designer",
      email: "priya@bugtester.com",
      projects: 1,
      status: "Active",
      type: "Designer",
    },
    {
      id: 5,
      initials: "AJ",
      name: "Aditya Joshi",
      role: "Full Stack Developer",
      email: "aditya@bugtester.com",
      projects: 3,
      status: "Active",
      type: "Developer",
    },
    {
      id: 6,
      initials: "SK",
      name: "Sneha Krishnan",
      role: "QA Engineer",
      email: "sneha@bugtester.com",
      projects: 2,
      status: "Active",
      type: "QA Engineer",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMember = (e) => {
    e.preventDefault();

    if (!newMember.name.trim() || !newMember.email.trim()) {
      return;
    }

    const initials = newMember.name
      .trim()
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const member = {
      id: Date.now(),
      initials,
      name: newMember.name.trim(),
      role: newMember.role,
      email: newMember.email.trim(),
      projects: Number(newMember.projects) || 0,
      status: newMember.status,
      type:
        newMember.role.includes("QA")
          ? "QA Engineer"
          : newMember.role.includes("Designer")
            ? "Designer"
            : "Developer",
    };

    setTeamMembers((prev) => [...prev, member]);

    setNewMember({
      name: "",
      email: "",
      role: "Developer",
      projects: "0",
      status: "Active",
    });

    setShowAddModal(false);
  };

  const filteredMembers = teamMembers.filter((member) => {
    const searchValue = search.toLowerCase();

    return (
      member.name.toLowerCase().includes(searchValue) ||
      member.email.toLowerCase().includes(searchValue) ||
      member.role.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="min-h-screen bg-[#0d0f14] text-white flex">

      {/* Sidebar */}
      <LeadSidebar />

      {/* Main Content */}
      <main className="flex-1 min-w-0">

        {/* Top Bar */}
        <div className="h-[72px] border-b border-white/[0.06] flex items-center justify-between px-8">

          <div>
            <h1 className="text-[20px] font-semibold text-white">
              Team
            </h1>

            <p className="text-[13px] text-[#5b606c] mt-1">
              Manage your team members and their projects
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* Search */}
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

            {/* Add Member Button */}
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="h-[40px] px-4 flex items-center gap-2 rounded-[8px] bg-[#f0a83b] hover:bg-[#ffc15c] text-[#0d0f14] text-[13px] font-semibold transition-colors cursor-pointer"
            >
              <FiPlus size={16} />
              Add Member
            </button>

          </div>

        </div>


        {/* Content */}
        <div className="p-8">

          {/* Page Heading */}
          <div className="mb-6">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-[17px] font-semibold text-white">
                  Team Members
                </h2>

                <p className="text-[13px] text-[#5b606c] mt-1">
                  View team members working on your projects
                </p>
              </div>

              <div className="flex items-center gap-2 text-[12px] text-[#5b606c]">
                <FiUsers size={15} />
                {teamMembers.length} Members
              </div>

            </div>

          </div>


          {/* Team Cards */}
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

              {filteredMembers.map((member) => (

                <div
                  key={member.id}
                  className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-5 hover:border-white/[0.10] transition-colors"
                >

                  {/* Header */}
                  <div className="flex items-start justify-between">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-full bg-[#f0a83b]/10 text-[#f0a83b] flex items-center justify-center text-[13px] font-semibold">
                        {member.initials}
                      </div>

                      <div>

                        <h3 className="text-[15px] font-semibold text-white">
                          {member.name}
                        </h3>

                        <p className="text-[12px] text-[#5b606c] mt-1">
                          {member.role}
                        </p>

                      </div>

                    </div>

                    <button
                      type="button"
                      className="text-[#5b606c] hover:text-white cursor-pointer"
                    >
                      <FiMoreHorizontal size={19} />
                    </button>

                  </div>


                  {/* Email */}
                  <div className="flex items-center gap-2 mt-5">

                    <FiMail
                      size={14}
                      className="text-[#5b606c]"
                    />

                    <span className="text-[12px] text-[#7f8491]">
                      {member.email}
                    </span>

                  </div>


                  {/* Projects */}
                  <div className="flex items-center gap-2 mt-3">

                    <FiFolder
                      size={14}
                      className="text-[#5b606c]"
                    />

                    <span className="text-[12px] text-[#7f8491]">
                      {member.projects}{" "}
                      {member.projects === 1 ? "Project" : "Projects"}
                    </span>

                  </div>


                  {/* Status */}
                  <div className="flex items-center justify-between border-t border-white/[0.06] mt-5 pt-4">

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
                        member.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-white/[0.06] text-[#7f8491]"
                      }`}
                    >

                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          member.status === "Active"
                            ? "bg-emerald-400"
                            : "bg-[#5b606c]"
                        }`}
                      ></span>

                      {member.status}

                    </span>

                    <span className="text-[12px] text-[#5b606c]">
                      {member.type}
                    </span>

                  </div>

                </div>

              ))}

            </div>
          ) : (

            <div className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-10 text-center">

              <div className="w-12 h-12 mx-auto rounded-full bg-white/[0.04] flex items-center justify-center">
                <FiUsers
                  size={20}
                  className="text-[#5b606c]"
                />
              </div>

              <h3 className="text-[15px] font-semibold text-white mt-4">
                No team members found
              </h3>

              <p className="text-[12px] text-[#5b606c] mt-1">
                Try searching with a different name, email, or role.
              </p>

            </div>

          )}

        </div>

      </main>


      {/* Add Member Modal */}
      {showAddModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          ></div>


          {/* Modal */}
          <div className="relative w-full max-w-[500px] bg-[#161922] border border-white/[0.08] rounded-[14px] shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">

              <div>
                <h2 className="text-[17px] font-semibold text-white">
                  Add Team Member
                </h2>

                <p className="text-[12px] text-[#5b606c] mt-1">
                  Add a new member to your team
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-[7px] text-[#5b606c] hover:text-white hover:bg-white/[0.05] cursor-pointer"
              >
                <FiX size={18} />
              </button>

            </div>


            {/* Form */}
            <form onSubmit={handleAddMember}>

              <div className="p-6 space-y-5">

                {/* Full Name */}
                <div>

                  <label className="block text-[12px] font-medium text-[#a8abb8] mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={newMember.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                    className="w-full h-[42px] px-3 rounded-[8px] bg-[#0d0f14] border border-white/[0.08] text-[13px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]/40"
                  />

                </div>


                {/* Email */}
                <div>

                  <label className="block text-[12px] font-medium text-[#a8abb8] mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={newMember.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                    className="w-full h-[42px] px-3 rounded-[8px] bg-[#0d0f14] border border-white/[0.08] text-[13px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]/40"
                  />

                </div>


                {/* Role + Projects */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <label className="block text-[12px] font-medium text-[#a8abb8] mb-2">
                      Role
                    </label>

                    <select
                      name="role"
                      value={newMember.role}
                      onChange={handleInputChange}
                      className="w-full h-[42px] px-3 rounded-[8px] bg-[#0d0f14] border border-white/[0.08] text-[13px] text-[#a8abb8] outline-none focus:border-[#f0a83b]/40"
                    >
                      <option value="Developer">
                        Developer
                      </option>

                      <option value="Frontend Developer">
                        Frontend Developer
                      </option>

                      <option value="Backend Developer">
                        Backend Developer
                      </option>

                      <option value="Full Stack Developer">
                        Full Stack Developer
                      </option>

                      <option value="QA Engineer">
                        QA Engineer
                      </option>

                      <option value="UI/UX Designer">
                        UI/UX Designer
                      </option>

                    </select>

                  </div>


                  <div>

                    <label className="block text-[12px] font-medium text-[#a8abb8] mb-2">
                      Projects
                    </label>

                    <input
                      type="number"
                      name="projects"
                      min="0"
                      value={newMember.projects}
                      onChange={handleInputChange}
                      className="w-full h-[42px] px-3 rounded-[8px] bg-[#0d0f14] border border-white/[0.08] text-[13px] text-white outline-none focus:border-[#f0a83b]/40"
                    />

                  </div>

                </div>


                {/* Status */}
                <div>

                  <label className="block text-[12px] font-medium text-[#a8abb8] mb-2">
                    Status
                  </label>

                  <select
                    name="status"
                    value={newMember.status}
                    onChange={handleInputChange}
                    className="w-full h-[42px] px-3 rounded-[8px] bg-[#0d0f14] border border-white/[0.08] text-[13px] text-[#a8abb8] outline-none focus:border-[#f0a83b]/40"
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

              </div>


              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.06]">

                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="h-[40px] px-4 rounded-[8px] border border-white/[0.08] text-[13px] text-[#a8abb8] hover:text-white hover:bg-white/[0.04] cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-[40px] px-5 flex items-center gap-2 rounded-[8px] bg-[#f0a83b] hover:bg-[#ffc15c] text-[#0d0f14] text-[13px] font-semibold cursor-pointer"
                >
                  <FiPlus size={15} />
                  Add Member
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default LeadTeams;