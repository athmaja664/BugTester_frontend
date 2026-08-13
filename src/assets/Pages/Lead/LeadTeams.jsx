import React from "react";
import LeadSidebar from "../../Components/Lead/LeadSidebar";
import {
  FiSearch,
  FiUsers,
  FiMail,
  FiFolder,
  FiMoreHorizontal,
} from "react-icons/fi";

function LeadTeams() {
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

          {/* Search */}
          <div className="relative w-[260px]">

            <FiSearch
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5b606c]"
            />

            <input
              type="text"
              placeholder="Search team members..."
              className="w-full h-[40px] pl-10 pr-3 rounded-[8px] bg-[#161922] border border-white/[0.06] text-[13px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]/30"
            />

          </div>

        </div>


        {/* Content */}
        <div className="p-8">

          {/* Page Heading */}
          <div className="mb-6">

            <h2 className="text-[17px] font-semibold text-white">
              Team Members
            </h2>

            <p className="text-[13px] text-[#5b606c] mt-1">
              View team members working on your projects
            </p>

          </div>


          {/* Team Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">


            {/* Member 1 */}
            <div className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-5 hover:border-white/[0.10] transition-colors">

              {/* Header */}
              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-full bg-[#f0a83b]/10 text-[#f0a83b] flex items-center justify-center text-[13px] font-semibold">
                    AK
                  </div>

                  <div>

                    <h3 className="text-[15px] font-semibold text-white">
                      Arun Kumar
                    </h3>

                    <p className="text-[12px] text-[#5b606c] mt-1">
                      Frontend Developer
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
                  arun@bugtester.com
                </span>

              </div>


              {/* Projects */}
              <div className="flex items-center gap-2 mt-3">

                <FiFolder
                  size={14}
                  className="text-[#5b606c]"
                />

                <span className="text-[12px] text-[#7f8491]">
                  2 Projects
                </span>

              </div>


              {/* Status */}
              <div className="flex items-center justify-between border-t border-white/[0.06] mt-5 pt-4">

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Active
                </span>

                <span className="text-[12px] text-[#5b606c]">
                  Developer
                </span>

              </div>

            </div>


            {/* Member 2 */}
            <div className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-5 hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-full bg-[#f0a83b]/10 text-[#f0a83b] flex items-center justify-center text-[13px] font-semibold">
                    NS
                  </div>

                  <div>

                    <h3 className="text-[15px] font-semibold text-white">
                      Neha Sharma
                    </h3>

                    <p className="text-[12px] text-[#5b606c] mt-1">
                      Backend Developer
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


              <div className="flex items-center gap-2 mt-5">

                <FiMail
                  size={14}
                  className="text-[#5b606c]"
                />

                <span className="text-[12px] text-[#7f8491]">
                  neha@bugtester.com
                </span>

              </div>


              <div className="flex items-center gap-2 mt-3">

                <FiFolder
                  size={14}
                  className="text-[#5b606c]"
                />

                <span className="text-[12px] text-[#7f8491]">
                  3 Projects
                </span>

              </div>


              <div className="flex items-center justify-between border-t border-white/[0.06] mt-5 pt-4">

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Active
                </span>

                <span className="text-[12px] text-[#5b606c]">
                  Developer
                </span>

              </div>

            </div>


            {/* Member 3 */}
            <div className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-5 hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-full bg-[#f0a83b]/10 text-[#f0a83b] flex items-center justify-center text-[13px] font-semibold">
                    RM
                  </div>

                  <div>

                    <h3 className="text-[15px] font-semibold text-white">
                      Rahul Menon
                    </h3>

                    <p className="text-[12px] text-[#5b606c] mt-1">
                      QA Engineer
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


              <div className="flex items-center gap-2 mt-5">

                <FiMail
                  size={14}
                  className="text-[#5b606c]"
                />

                <span className="text-[12px] text-[#7f8491]">
                  rahul@bugtester.com
                </span>

              </div>


              <div className="flex items-center gap-2 mt-3">

                <FiFolder
                  size={14}
                  className="text-[#5b606c]"
                />

                <span className="text-[12px] text-[#7f8491]">
                  2 Projects
                </span>

              </div>


              <div className="flex items-center justify-between border-t border-white/[0.06] mt-5 pt-4">

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Active
                </span>

                <span className="text-[12px] text-[#5b606c]">
                  QA Engineer
                </span>

              </div>

            </div>


            {/* Member 4 */}
            <div className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-5 hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-full bg-[#f0a83b]/10 text-[#f0a83b] flex items-center justify-center text-[13px] font-semibold">
                    PS
                  </div>

                  <div>

                    <h3 className="text-[15px] font-semibold text-white">
                      Priya Shah
                    </h3>

                    <p className="text-[12px] text-[#5b606c] mt-1">
                      UI/UX Designer
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


              <div className="flex items-center gap-2 mt-5">

                <FiMail
                  size={14}
                  className="text-[#5b606c]"
                />

                <span className="text-[12px] text-[#7f8491]">
                  priya@bugtester.com
                </span>

              </div>


              <div className="flex items-center gap-2 mt-3">

                <FiFolder
                  size={14}
                  className="text-[#5b606c]"
                />

                <span className="text-[12px] text-[#7f8491]">
                  1 Project
                </span>

              </div>


              <div className="flex items-center justify-between border-t border-white/[0.06] mt-5 pt-4">

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Active
                </span>

                <span className="text-[12px] text-[#5b606c]">
                  Designer
                </span>

              </div>

            </div>


            {/* Member 5 */}
            <div className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-5 hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-full bg-[#f0a83b]/10 text-[#f0a83b] flex items-center justify-center text-[13px] font-semibold">
                    AJ
                  </div>

                  <div>

                    <h3 className="text-[15px] font-semibold text-white">
                      Aditya Joshi
                    </h3>

                    <p className="text-[12px] text-[#5b606c] mt-1">
                      Full Stack Developer
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


              <div className="flex items-center gap-2 mt-5">

                <FiMail
                  size={14}
                  className="text-[#5b606c]"
                />

                <span className="text-[12px] text-[#7f8491]">
                  aditya@bugtester.com
                </span>

              </div>


              <div className="flex items-center gap-2 mt-3">

                <FiFolder
                  size={14}
                  className="text-[#5b606c]"
                />

                <span className="text-[12px] text-[#7f8491]">
                  3 Projects
                </span>

              </div>


              <div className="flex items-center justify-between border-t border-white/[0.06] mt-5 pt-4">

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Active
                </span>

                <span className="text-[12px] text-[#5b606c]">
                  Developer
                </span>

              </div>

            </div>


            {/* Member 6 */}
            <div className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-5 hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-full bg-[#f0a83b]/10 text-[#f0a83b] flex items-center justify-center text-[13px] font-semibold">
                    SK
                  </div>

                  <div>

                    <h3 className="text-[15px] font-semibold text-white">
                      Sneha Krishnan
                    </h3>

                    <p className="text-[12px] text-[#5b606c] mt-1">
                      QA Engineer
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


              <div className="flex items-center gap-2 mt-5">

                <FiMail
                  size={14}
                  className="text-[#5b606c]"
                />

                <span className="text-[12px] text-[#7f8491]">
                  sneha@bugtester.com
                </span>

              </div>


              <div className="flex items-center gap-2 mt-3">

                <FiFolder
                  size={14}
                  className="text-[#5b606c]"
                />

                <span className="text-[12px] text-[#7f8491]">
                  2 Projects
                </span>

              </div>


              <div className="flex items-center justify-between border-t border-white/[0.06] mt-5 pt-4">

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Active
                </span>

                <span className="text-[12px] text-[#5b606c]">
                  QA Engineer
                </span>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default LeadTeams;