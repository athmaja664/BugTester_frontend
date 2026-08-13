import React from "react";
import DeveloperSidebar from "../../Components/Developer/DeveloperSidebar";
import {
  AiOutlineSearch,
  AiOutlineFolder,
} from "react-icons/ai";
import {
  HiOutlineCalendar,
  HiOutlineUsers,
} from "react-icons/hi";
import { FiMoreHorizontal } from "react-icons/fi";


function DeveloperProject() {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">

      {/* Sidebar */}
      <DeveloperSidebar />

      {/* Right column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

          <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
            Projects
          </h1>

          <div className="flex items-center gap-4">

            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 h-[40px] px-3.5 w-[260px] bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">

              <AiOutlineSearch
                className="text-[#5b606c]"
                size={17}
              />

              <input
                type="text"
                placeholder="Search projects..."
                className="flex-1 w-full bg-transparent border-none outline-none text-[13.5px] text-white placeholder:text-[#5b606c]"
              />

            </div>

            {/* Developer */}
            <div className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-3 h-10 rounded-[8px] hover:bg-white/[0.04] cursor-pointer">

              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[12px] font-semibold">
                DV
              </span>

              <span className="hidden sm:block text-[13.5px] font-medium text-white">
                Developer
              </span>

            </div>

          </div>
        </div>


        {/* Main content */}
        <div className="flex-1 p-5 lg:p-8">

          {/* Page heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">

            <div>
              <h1 className="text-[22px] font-semibold text-white">
                My Projects
              </h1>

              <p className="text-[14px] text-[#8b909c] mt-1">
                View projects assigned to you
              </p>
            </div>

          </div>


          {/* Project cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">


            {/* Project 1 */}
            <div className="p-5 lg:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] hover:border-white/[0.10] transition-colors">

              {/* Card top */}
              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-3">

                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#f0a83b]/[0.10] text-[#f0a83b] shrink-0">
                    <AiOutlineFolder size={21} />
                  </span>

                  <div>
                    <h2 className="text-[16px] font-semibold text-white">
                      E-Commerce Platform
                    </h2>

                    <p className="text-[13px] text-[#5b606c] mt-1">
                      Web Application
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  className="text-[#6b707c] hover:text-white cursor-pointer"
                >
                  <FiMoreHorizontal size={20} />
                </button>

              </div>


              {/* Description */}
              <p className="text-[13.5px] text-[#8b909c] leading-relaxed mt-5">
                Online shopping platform with product management,
                customer accounts, checkout and payment features.
              </p>


              {/* Status */}
              <div className="flex items-center justify-between gap-3 mt-5">

                <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-[#f0a83b]/[0.10] border border-[#f0a83b]/20 text-[#f0a83b] text-[12px] font-medium">
                  In Progress
                </span>

                <span className="text-[12.5px] text-[#8b909c]">
                  Progress <span className="text-white font-semibold">72%</span>
                </span>

              </div>


              {/* Divider */}
              <div className="border-t border-white/[0.06] my-5" />


              {/* Project information */}
              <div className="grid grid-cols-2 gap-4">

                <div className="flex items-start gap-2.5">

                  <HiOutlineCalendar
                    className="text-[#5b606c] mt-0.5 shrink-0"
                    size={17}
                  />

                  <div>
                    <p className="text-[11.5px] text-[#5b606c]">
                      Deadline
                    </p>

                    <p className="text-[13px] text-white mt-1">
                      Aug 28, 2026
                    </p>
                  </div>

                </div>


                <div className="flex items-start gap-2.5">

                  <HiOutlineUsers
                    className="text-[#5b606c] mt-0.5 shrink-0"
                    size={17}
                  />

                  <div>
                    <p className="text-[11.5px] text-[#5b606c]">
                      Team
                    </p>

                    <p className="text-[13px] text-white mt-1">
                      5 Members
                    </p>
                  </div>

                </div>

              </div>


              {/* Bottom */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">

                <div className="flex items-center gap-2">

                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f0a83b]/[0.10] text-[#f0a83b] text-[11px] font-semibold">
                    AT
                  </span>

                  <span className="text-[12.5px] text-[#8b909c]">
                    Arjun Thomas
                  </span>

                </div>

                <button
                  type="button"
                  className="text-[13px] font-semibold text-[#f0a83b] hover:text-[#f5bc6b] cursor-pointer"
                >
                  View Project
                </button>

              </div>

            </div>



            {/* Project 2 */}
            <div className="p-5 lg:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-3">

                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#576aff]/[0.10] text-[#8b98ff] shrink-0">
                    <AiOutlineFolder size={21} />
                  </span>

                  <div>
                    <h2 className="text-[16px] font-semibold text-white">
                      Banking Dashboard
                    </h2>

                    <p className="text-[13px] text-[#5b606c] mt-1">
                      Admin Portal
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  className="text-[#6b707c] hover:text-white cursor-pointer"
                >
                  <FiMoreHorizontal size={20} />
                </button>

              </div>


              <p className="text-[13.5px] text-[#8b909c] leading-relaxed mt-5">
                Financial management dashboard for handling accounts,
                transactions, reports and user activity.
              </p>


              <div className="flex items-center justify-between gap-3 mt-5">

                <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-[#f0a83b]/[0.10] border border-[#f0a83b]/20 text-[#f0a83b] text-[12px] font-medium">
                  In Progress
                </span>

                <span className="text-[12.5px] text-[#8b909c]">
                  Progress <span className="text-white font-semibold">54%</span>
                </span>

              </div>


              <div className="border-t border-white/[0.06] my-5" />


              <div className="grid grid-cols-2 gap-4">

                <div className="flex items-start gap-2.5">

                  <HiOutlineCalendar
                    className="text-[#5b606c] mt-0.5 shrink-0"
                    size={17}
                  />

                  <div>
                    <p className="text-[11.5px] text-[#5b606c]">
                      Deadline
                    </p>

                    <p className="text-[13px] text-white mt-1">
                      Sep 10, 2026
                    </p>
                  </div>

                </div>


                <div className="flex items-start gap-2.5">

                  <HiOutlineUsers
                    className="text-[#5b606c] mt-0.5 shrink-0"
                    size={17}
                  />

                  <div>
                    <p className="text-[11.5px] text-[#5b606c]">
                      Team
                    </p>

                    <p className="text-[13px] text-white mt-1">
                      6 Members
                    </p>
                  </div>

                </div>

              </div>


              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">

                <div className="flex items-center gap-2">

                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#576aff]/[0.10] text-[#8b98ff] text-[11px] font-semibold">
                    RS
                  </span>

                  <span className="text-[12.5px] text-[#8b909c]">
                    Rahul S.
                  </span>

                </div>

                <button
                  type="button"
                  className="text-[13px] font-semibold text-[#f0a83b] hover:text-[#f5bc6b] cursor-pointer"
                >
                  View Project
                </button>

              </div>

            </div>



            {/* Project 3 */}
            <div className="p-5 lg:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-3">

                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#4ade80]/[0.10] text-[#4ade80] shrink-0">
                    <AiOutlineFolder size={21} />
                  </span>

                  <div>
                    <h2 className="text-[16px] font-semibold text-white">
                      Travel Booking App
                    </h2>

                    <p className="text-[13px] text-[#5b606c] mt-1">
                      Mobile Application
                    </p>
                  </div>

                </div>

                <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-white/[0.05] border border-white/10 text-[#a8abb8] text-[11.5px] font-medium">
                  Planning
                </span>

              </div>


              <p className="text-[13.5px] text-[#8b909c] leading-relaxed mt-5">
                Travel application for searching destinations,
                booking hotels and managing customer reservations.
              </p>


              <div className="flex items-center justify-between gap-3 mt-5">

                <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-white/[0.05] border border-white/10 text-[#a8abb8] text-[12px] font-medium">
                  Planning
                </span>

                <span className="text-[12.5px] text-[#8b909c]">
                  Progress <span className="text-white font-semibold">28%</span>
                </span>

              </div>


              <div className="border-t border-white/[0.06] my-5" />


              <div className="grid grid-cols-2 gap-4">

                <div className="flex items-start gap-2.5">

                  <HiOutlineCalendar
                    className="text-[#5b606c] mt-0.5 shrink-0"
                    size={17}
                  />

                  <div>
                    <p className="text-[11.5px] text-[#5b606c]">
                      Deadline
                    </p>

                    <p className="text-[13px] text-white mt-1">
                      Sep 24, 2026
                    </p>
                  </div>

                </div>


                <div className="flex items-start gap-2.5">

                  <HiOutlineUsers
                    className="text-[#5b606c] mt-0.5 shrink-0"
                    size={17}
                  />

                  <div>
                    <p className="text-[11.5px] text-[#5b606c]">
                      Team
                    </p>

                    <p className="text-[13px] text-white mt-1">
                      4 Members
                    </p>
                  </div>

                </div>

              </div>


              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">

                <div className="flex items-center gap-2">

                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4ade80]/[0.10] text-[#4ade80] text-[11px] font-semibold">
                    KM
                  </span>

                  <span className="text-[12.5px] text-[#8b909c]">
                    Karan M.
                  </span>

                </div>

                <button
                  type="button"
                  className="text-[13px] font-semibold text-[#f0a83b] hover:text-[#f5bc6b] cursor-pointer"
                >
                  View Project
                </button>

              </div>

            </div>



            {/* Project 4 */}
            <div className="p-5 lg:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-3">

                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#576aff]/[0.10] text-[#8b98ff] shrink-0">
                    <AiOutlineFolder size={21} />
                  </span>

                  <div>
                    <h2 className="text-[16px] font-semibold text-white">
                      Employee Management
                    </h2>

                    <p className="text-[13px] text-[#5b606c] mt-1">
                      HR Management System
                    </p>
                  </div>

                </div>

                <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-[#4ade80]/[0.10] border border-[#4ade80]/20 text-[#4ade80] text-[11.5px] font-medium">
                  Completed
                </span>

              </div>


              <p className="text-[13.5px] text-[#8b909c] leading-relaxed mt-5">
                Employee management system for handling employee
                records, attendance, leave and administrative tasks.
              </p>


              <div className="flex items-center justify-between gap-3 mt-5">

                <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-[#4ade80]/[0.10] border border-[#4ade80]/20 text-[#4ade80] text-[12px] font-medium">
                  Completed
                </span>

                <span className="text-[12.5px] text-[#8b909c]">
                  Progress <span className="text-white font-semibold">100%</span>
                </span>

              </div>


              <div className="border-t border-white/[0.06] my-5" />


              <div className="grid grid-cols-2 gap-4">

                <div className="flex items-start gap-2.5">

                  <HiOutlineCalendar
                    className="text-[#5b606c] mt-0.5 shrink-0"
                    size={17}
                  />

                  <div>
                    <p className="text-[11.5px] text-[#5b606c]">
                      Completed
                    </p>

                    <p className="text-[13px] text-white mt-1">
                      Aug 05, 2026
                    </p>
                  </div>

                </div>


                <div className="flex items-start gap-2.5">

                  <HiOutlineUsers
                    className="text-[#5b606c] mt-0.5 shrink-0"
                    size={17}
                  />

                  <div>
                    <p className="text-[11.5px] text-[#5b606c]">
                      Team
                    </p>

                    <p className="text-[13px] text-white mt-1">
                      5 Members
                    </p>
                  </div>

                </div>

              </div>


              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">

                <div className="flex items-center gap-2">

                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#576aff]/[0.10] text-[#8b98ff] text-[11px] font-semibold">
                    AT
                  </span>

                  <span className="text-[12.5px] text-[#8b909c]">
                    Arjun Thomas
                  </span>

                </div>

                <button
                  type="button"
                  className="text-[13px] font-semibold text-[#f0a83b] hover:text-[#f5bc6b] cursor-pointer"
                >
                  View Project
                </button>

              </div>

            </div>


          </div>

        </div>
      </div>

    </div>
  );
}


export default DeveloperProject;