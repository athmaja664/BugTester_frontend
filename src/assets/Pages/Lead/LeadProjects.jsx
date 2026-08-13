import React from "react";
import LeadSidebar from "../../Components/Lead/LeadSidebar";
import {
  FiSearch,
  FiFolder,
  FiClock,
  FiCheckCircle,
  FiUsers,
  FiAlertCircle,
  FiMoreHorizontal,
  FiPlus,
} from "react-icons/fi";

function LeadProjects() {
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
              Projects
            </h1>

            <p className="text-[13px] text-[#5b606c] mt-1">
              Manage and monitor your assigned projects
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
              placeholder="Search projects..."
              className="w-full h-[40px] pl-10 pr-3 rounded-[8px] bg-[#161922] border border-white/[0.06] text-[13px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]/30"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">

          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-[17px] font-semibold text-white">
                All Projects
              </h2>

              <p className="text-[13px] text-[#5b606c] mt-1">
                Projects assigned to your team
              </p>
            </div>

            {/* Add Project Button */}
            <button
              type="button"
              className="flex items-center gap-2 px-4 h-[40px] rounded-[8px] text-[13.5px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer"
            >
              <FiPlus size={16} />
              Add Project
            </button>

          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* Project 1 */}
            <div className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-5 hover:border-white/[0.10] transition-colors">

              {/* Card Header */}
              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-[8px] bg-[#f0a83b]/10 flex items-center justify-center shrink-0">
                    <FiFolder
                      size={19}
                      className="text-[#f0a83b]"
                    />
                  </div>

                  <div>
                    <h3 className="text-[15px] font-semibold text-white">
                      E-Commerce Platform
                    </h3>

                    <p className="text-[12px] text-[#5b606c] mt-1">
                      Web Application
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

              {/* Description */}
              <p className="text-[13px] leading-6 text-[#7f8491] mt-5">
                Online shopping platform for managing products, customers,
                orders and payments.
              </p>

              {/* Status + Date */}
              <div className="flex items-center justify-between mt-5">

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f0a83b]/10 text-[#f0a83b] text-[11px] font-medium">
                  <FiClock size={12} />
                  In Progress
                </span>

                <span className="text-[12px] text-[#7f8491]">
                  Due Aug 25, 2026
                </span>

              </div>

              {/* Bottom Details */}
              <div className="flex items-center justify-between border-t border-white/[0.06] mt-5 pt-4">

                <div className="flex items-center gap-5">

                  <span className="flex items-center gap-1.5 text-[12px] text-[#7f8491]">
                    <FiUsers size={14} />
                    6 Members
                  </span>

                  <span className="flex items-center gap-1.5 text-[12px] text-[#7f8491]">
                    <FiAlertCircle size={14} />
                    12 Bugs
                  </span>

                </div>

                <button
                  type="button"
                  className="text-[12px] font-medium text-[#f0a83b] hover:text-[#ffc15c] cursor-pointer"
                >
                  View Project
                </button>

              </div>

            </div>

            {/* Project 2 */}
            <div className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-5 hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-[8px] bg-[#f0a83b]/10 flex items-center justify-center shrink-0">
                    <FiFolder
                      size={19}
                      className="text-[#f0a83b]"
                    />
                  </div>

                  <div>
                    <h3 className="text-[15px] font-semibold text-white">
                      Banking Dashboard
                    </h3>

                    <p className="text-[12px] text-[#5b606c] mt-1">
                      Admin Portal
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

              <p className="text-[13px] leading-6 text-[#7f8491] mt-5">
                Financial dashboard for monitoring transactions, accounts
                and customer activity.
              </p>

              <div className="flex items-center justify-between mt-5">

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f0a83b]/10 text-[#f0a83b] text-[11px] font-medium">
                  <FiClock size={12} />
                  In Progress
                </span>

                <span className="text-[12px] text-[#7f8491]">
                  Due Sep 02, 2026
                </span>

              </div>

              <div className="flex items-center justify-between border-t border-white/[0.06] mt-5 pt-4">

                <div className="flex items-center gap-5">

                  <span className="flex items-center gap-1.5 text-[12px] text-[#7f8491]">
                    <FiUsers size={14} />
                    4 Members
                  </span>

                  <span className="flex items-center gap-1.5 text-[12px] text-[#7f8491]">
                    <FiAlertCircle size={14} />
                    8 Bugs
                  </span>

                </div>

                <button
                  type="button"
                  className="text-[12px] font-medium text-[#f0a83b] hover:text-[#ffc15c] cursor-pointer"
                >
                  View Project
                </button>

              </div>

            </div>

            {/* Project 3 */}
            <div className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-5 hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-[8px] bg-[#f0a83b]/10 flex items-center justify-center shrink-0">
                    <FiFolder
                      size={19}
                      className="text-[#f0a83b]"
                    />
                  </div>

                  <div>
                    <h3 className="text-[15px] font-semibold text-white">
                      Travel Booking App
                    </h3>

                    <p className="text-[12px] text-[#5b606c] mt-1">
                      Mobile Application
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

              <p className="text-[13px] leading-6 text-[#7f8491] mt-5">
                Travel platform for searching hotels, flights and managing
                customer bookings.
              </p>

              <div className="flex items-center justify-between mt-5">

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] text-[#a8abb8] text-[11px] font-medium">
                  <FiClock size={12} />
                  Planning
                </span>

                <span className="text-[12px] text-[#7f8491]">
                  Due Sep 18, 2026
                </span>

              </div>

              <div className="flex items-center justify-between border-t border-white/[0.06] mt-5 pt-4">

                <div className="flex items-center gap-5">

                  <span className="flex items-center gap-1.5 text-[12px] text-[#7f8491]">
                    <FiUsers size={14} />
                    5 Members
                  </span>

                  <span className="flex items-center gap-1.5 text-[12px] text-[#7f8491]">
                    <FiAlertCircle size={14} />
                    5 Bugs
                  </span>

                </div>

                <button
                  type="button"
                  className="text-[12px] font-medium text-[#f0a83b] hover:text-[#ffc15c] cursor-pointer"
                >
                  View Project
                </button>

              </div>

            </div>

            {/* Project 4 */}
            <div className="bg-[#161922] border border-white/[0.06] rounded-[10px] p-5 hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-[8px] bg-[#f0a83b]/10 flex items-center justify-center shrink-0">
                    <FiFolder
                      size={19}
                      className="text-[#f0a83b]"
                    />
                  </div>

                  <div>
                    <h3 className="text-[15px] font-semibold text-white">
                      HR Management System
                    </h3>

                    <p className="text-[12px] text-[#5b606c] mt-1">
                      Web Application
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

              <p className="text-[13px] leading-6 text-[#7f8491] mt-5">
                Employee management platform for attendance, leave
                management and employee records.
              </p>

              <div className="flex items-center justify-between mt-5">

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                  <FiCheckCircle size={12} />
                  Completed
                </span>

                <span className="text-[12px] text-[#7f8491]">
                  Completed Aug 05, 2026
                </span>

              </div>

              <div className="flex items-center justify-between border-t border-white/[0.06] mt-5 pt-4">

                <div className="flex items-center gap-5">

                  <span className="flex items-center gap-1.5 text-[12px] text-[#7f8491]">
                    <FiUsers size={14} />
                    7 Members
                  </span>

                  <span className="flex items-center gap-1.5 text-[12px] text-[#7f8491]">
                    <FiAlertCircle size={14} />
                    2 Bugs
                  </span>

                </div>

                <button
                  type="button"
                  className="text-[12px] font-medium text-[#f0a83b] hover:text-[#ffc15c] cursor-pointer"
                >
                  View Project
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default LeadProjects;