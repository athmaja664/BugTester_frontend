import React from "react";
import DeveloperSidebar from "../../Components/Developer/DeveloperSidebar";
import { AiOutlineSearch } from "react-icons/ai";
import {
  FiCheckSquare,
  FiClock,
  FiAlertCircle,
  FiCalendar,
  FiFolder,
  FiUser,
} from "react-icons/fi";


function DeveloperTasks() {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">

      {/* Sidebar */}
      <DeveloperSidebar />

      {/* Right column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

          <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
            My Tasks
          </h1>

          <div className="flex items-center gap-4">

            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 h-[40px] px-3.5 w-[240px] bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">

              <AiOutlineSearch
                className="text-[#5b606c]"
                size={17}
              />

              <input
                type="text"
                placeholder="Search tasks..."
                className="flex-1 w-full bg-transparent border-none outline-none text-[13.5px] text-white placeholder:text-[#5b606c]"
              />

            </div>

            {/* Developer */}
            <div className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-3 h-10 rounded-[8px] hover:bg-white/[0.04] cursor-pointer">

              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[12.5px] font-semibold">
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

          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">

            <div>
              <h1 className="text-[22px] font-semibold text-white">
                My Tasks
              </h1>

              <p className="text-[14px] text-[#8b909c] mt-1">
                View and manage your assigned development tasks
              </p>
            </div>

            {/* Task summary */}
            <div className="flex items-center gap-2">

              <span className="px-3 py-1.5 rounded-[7px] text-[12px] font-medium bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/20">
                8 Assigned
              </span>

              <span className="px-3 py-1.5 rounded-[7px] text-[12px] font-medium bg-[#4ade80]/[0.10] text-[#4ade80] border border-[#4ade80]/20">
                3 Completed
              </span>

            </div>

          </div>


          {/* Task filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">

            <button
              type="button"
              className="h-[38px] px-4 rounded-[8px] text-[13px] font-medium text-[#0d0f14] bg-[#f0a83b] cursor-pointer"
            >
              All Tasks
            </button>

            <button
              type="button"
              className="h-[38px] px-4 rounded-[8px] text-[13px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
            >
              In Progress
            </button>

            <button
              type="button"
              className="h-[38px] px-4 rounded-[8px] text-[13px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
            >
              Pending
            </button>

            <button
              type="button"
              className="h-[38px] px-4 rounded-[8px] text-[13px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
            >
              Completed
            </button>

          </div>


          {/* Task cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">


            {/* Task 1 */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px] hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-3">

                  <span className="flex items-center justify-center w-10 h-10 rounded-[9px] bg-[#f0a83b]/[0.12] text-[#f0a83b] shrink-0">
                    <FiCheckSquare size={18} />
                  </span>

                  <div>
                    <h3 className="text-[15px] font-semibold text-white">
                      Implement Login API
                    </h3>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      E-Commerce Platform
                    </p>
                  </div>

                </div>

                <span className="px-2.5 py-1 rounded-[5px] text-[11px] font-medium bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/20">
                  In Progress
                </span>

              </div>


              <p className="text-[13px] text-[#8b909c] leading-relaxed mt-5">
                Develop the authentication API and connect it with the
                frontend login form.
              </p>


              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">

                <div className="flex items-center gap-2 text-[12px] text-[#8b909c]">
                  <FiCalendar size={14} />
                  Due Aug 18, 2026
                </div>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiFolder size={14} />
                  Backend
                </span>

              </div>

            </div>


            {/* Task 2 */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px] hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-3">

                  <span className="flex items-center justify-center w-10 h-10 rounded-[9px] bg-[#576aff]/[0.12] text-[#8b98ff] shrink-0">
                    <FiCheckSquare size={18} />
                  </span>

                  <div>
                    <h3 className="text-[15px] font-semibold text-white">
                      Fix Payment Validation Bug
                    </h3>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Banking Dashboard
                    </p>
                  </div>

                </div>

                <span className="px-2.5 py-1 rounded-[5px] text-[11px] font-medium bg-[#576aff]/[0.12] text-[#8b98ff] border border-[#576aff]/20">
                  Pending
                </span>

              </div>


              <p className="text-[13px] text-[#8b909c] leading-relaxed mt-5">
                Resolve the payment validation issue reported during
                the latest testing cycle.
              </p>


              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">

                <div className="flex items-center gap-2 text-[12px] text-[#8b909c]">
                  <FiCalendar size={14} />
                  Due Aug 20, 2026
                </div>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiFolder size={14} />
                  Bug Fix
                </span>

              </div>

            </div>


            {/* Task 3 */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px] hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-3">

                  <span className="flex items-center justify-center w-10 h-10 rounded-[9px] bg-[#f0a83b]/[0.12] text-[#f0a83b] shrink-0">
                    <FiCheckSquare size={18} />
                  </span>

                  <div>
                    <h3 className="text-[15px] font-semibold text-white">
                      Create Booking API
                    </h3>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Travel Booking App
                    </p>
                  </div>

                </div>

                <span className="px-2.5 py-1 rounded-[5px] text-[11px] font-medium bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/20">
                  In Progress
                </span>

              </div>


              <p className="text-[13px] text-[#8b909c] leading-relaxed mt-5">
                Build the booking endpoint for hotel reservations and
                connect it with the booking interface.
              </p>


              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">

                <div className="flex items-center gap-2 text-[12px] text-[#8b909c]">
                  <FiCalendar size={14} />
                  Due Aug 25, 2026
                </div>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiFolder size={14} />
                  Backend
                </span>

              </div>

            </div>


            {/* Task 4 */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px] hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-3">

                  <span className="flex items-center justify-center w-10 h-10 rounded-[9px] bg-[#4ade80]/[0.12] text-[#4ade80] shrink-0">
                    <FiCheckSquare size={18} />
                  </span>

                  <div>
                    <h3 className="text-[15px] font-semibold text-white">
                      Update Employee Module
                    </h3>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Employee Management
                    </p>
                  </div>

                </div>

                <span className="px-2.5 py-1 rounded-[5px] text-[11px] font-medium bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/20">
                  Completed
                </span>

              </div>


              <p className="text-[13px] text-[#8b909c] leading-relaxed mt-5">
                Complete the employee profile module and update the
                related API integration.
              </p>


              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">

                <div className="flex items-center gap-2 text-[12px] text-[#8b909c]">
                  <FiCalendar size={14} />
                  Completed Aug 08, 2026
                </div>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiFolder size={14} />
                  Frontend
                </span>

              </div>

            </div>


            {/* Task 5 */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px] hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-3">

                  <span className="flex items-center justify-center w-10 h-10 rounded-[9px] bg-[#f0a83b]/[0.12] text-[#f0a83b] shrink-0">
                    <FiCheckSquare size={18} />
                  </span>

                  <div>
                    <h3 className="text-[15px] font-semibold text-white">
                      Optimize API Response
                    </h3>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      E-Commerce Platform
                    </p>
                  </div>

                </div>

                <span className="px-2.5 py-1 rounded-[5px] text-[11px] font-medium bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/20">
                  In Progress
                </span>

              </div>


              <p className="text-[13px] text-[#8b909c] leading-relaxed mt-5">
                Improve API response performance and reduce unnecessary
                database queries.
              </p>


              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">

                <div className="flex items-center gap-2 text-[12px] text-[#8b909c]">
                  <FiCalendar size={14} />
                  Due Aug 28, 2026
                </div>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiFolder size={14} />
                  Backend
                </span>

              </div>

            </div>


            {/* Task 6 */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px] hover:border-white/[0.10] transition-colors">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-3">

                  <span className="flex items-center justify-center w-10 h-10 rounded-[9px] bg-[#f87171]/[0.12] text-[#f87171] shrink-0">
                    <FiAlertCircle size={18} />
                  </span>

                  <div>
                    <h3 className="text-[15px] font-semibold text-white">
                      Resolve Critical Bug
                    </h3>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Banking Dashboard
                    </p>
                  </div>

                </div>

                <span className="px-2.5 py-1 rounded-[5px] text-[11px] font-medium bg-[#f87171]/[0.12] text-[#f87171] border border-[#f87171]/20">
                  High Priority
                </span>

              </div>


              <p className="text-[13px] text-[#8b909c] leading-relaxed mt-5">
                Investigate and resolve the critical transaction
                processing issue reported by the QA team.
              </p>


              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">

                <div className="flex items-center gap-2 text-[12px] text-[#8b909c]">
                  <FiCalendar size={14} />
                  Due Aug 15, 2026
                </div>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiFolder size={14} />
                  Bug Fix
                </span>

              </div>

            </div>

          </div>


          {/* Bottom summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center gap-3">

                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                  <FiClock size={17} />
                </span>

                <div>
                  <p className="text-[20px] font-semibold text-white">
                    3
                  </p>

                  <p className="text-[12px] text-[#8b909c]">
                    In Progress
                  </p>
                </div>

              </div>

            </div>


            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center gap-3">

                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f87171]/[0.12] text-[#f87171]">
                  <FiAlertCircle size={17} />
                </span>

                <div>
                  <p className="text-[20px] font-semibold text-white">
                    1
                  </p>

                  <p className="text-[12px] text-[#8b909c]">
                    High Priority
                  </p>
                </div>

              </div>

            </div>


            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center gap-3">

                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80]">
                  <FiCheckSquare size={17} />
                </span>

                <div>
                  <p className="text-[20px] font-semibold text-white">
                    3
                  </p>

                  <p className="text-[12px] text-[#8b909c]">
                    Completed
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default DeveloperTasks;