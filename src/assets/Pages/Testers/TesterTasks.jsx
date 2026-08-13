import React from "react";
import TesterSidebar from "../../Components/Tester/TesterSidebar";
import { AiOutlineSearch, AiOutlineProject } from "react-icons/ai";
import { BsBug } from "react-icons/bs";
import {
  FiCheckSquare,
  FiClock,
  FiArrowUpRight,
} from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi";

function TesterTasks() {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">

      {/* Sidebar */}
      <TesterSidebar />

      {/* Right Column */}
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

            {/* Tester */}
            <div className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-3 h-10 rounded-[8px] hover:bg-white/[0.04] cursor-pointer">

              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[12.5px] font-semibold">
                TS
              </span>

              <span className="hidden sm:block text-[13.5px] font-medium text-white">
                Tester
              </span>

            </div>

          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5 lg:p-8">

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">

            <div>

              <h1 className="text-[22px] font-semibold text-white">
                My Tasks
              </h1>

              <p className="text-[14px] text-[#8b909c] mt-1">
                View and manage the testing tasks assigned to you.
              </p>

            </div>

            {/* Task Count */}
            <div className="flex items-center gap-2 px-3.5 h-[38px] rounded-[8px] bg-white/[0.03] border border-white/[0.06]">

              <FiCheckSquare
                size={16}
                className="text-[#f0a83b]"
              />

              <span className="text-[13px] text-[#a8abb8]">
                6 Assigned Tasks
              </span>

            </div>

          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

            {/* Assigned Tasks */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b] mb-4">
                <FiCheckSquare size={18} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                6
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Assigned Tasks
              </p>

            </div>

            {/* Pending */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#8b98ff]/[0.12] text-[#8b98ff] mb-4">
                <FiClock size={18} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                3
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Pending Tasks
              </p>

            </div>

            {/* Completed */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80] mb-4">
                <FiCheckSquare size={18} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                3
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Completed Tasks
              </p>

            </div>

          </div>

          {/* Tasks Section */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

              <div>

                <h2 className="text-[16px] font-semibold text-white">
                  Assigned Tasks
                </h2>

                <p className="text-[12.5px] text-[#5b606c] mt-1">
                  Testing tasks currently assigned to you
                </p>

              </div>

              {/* Filter */}
              <select
                className="h-[38px] px-3 rounded-[8px] bg-[#0d0f14] border border-white/10 text-[13px] text-[#a8abb8] outline-none focus:border-[#f0a83b] cursor-pointer"
              >
                <option>All Tasks</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

            </div>

            {/* Task 1 */}
            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06] mb-4">

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#f0a83b]/[0.12] text-[#f0a83b] shrink-0">
                    <FiCheckSquare size={20} />
                  </span>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        Test User Login
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/20">
                        In Progress
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      E-Commerce Platform
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      Verify user login, authentication, and invalid credential handling.
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Task
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <AiOutlineProject size={14} />
                  E-Commerce Platform
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Aug 15, 2026
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#f0a83b]">
                  <FiClock size={14} />
                  High Priority
                </span>

              </div>

            </div>

            {/* Task 2 */}
            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06] mb-4">

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#8b98ff]/[0.12] text-[#8b98ff] shrink-0">
                    <BsBug size={20} />
                  </span>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        Verify Checkout Bug
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#8b98ff]/[0.12] text-[#8b98ff] border border-[#8b98ff]/20">
                        Pending
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      E-Commerce Platform
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      Re-test the checkout issue reported by the development team.
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Task
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <AiOutlineProject size={14} />
                  E-Commerce Platform
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Aug 17, 2026
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#f87171]">
                  <FiClock size={14} />
                  High Priority
                </span>

              </div>

            </div>

            {/* Task 3 */}
            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06] mb-4">

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#c084fc]/[0.12] text-[#c084fc] shrink-0">
                    <FiCheckSquare size={20} />
                  </span>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        Test Account Management
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#c084fc]/[0.12] text-[#c084fc] border border-[#c084fc]/20">
                        Pending
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Banking Dashboard
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      Test account creation, editing, deletion, and account validation.
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Task
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <AiOutlineProject size={14} />
                  Banking Dashboard
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Aug 20, 2026
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiClock size={14} />
                  Medium Priority
                </span>

              </div>

            </div>

            {/* Task 4 */}
            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06]">

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#4ade80]/[0.12] text-[#4ade80] shrink-0">
                    <FiCheckSquare size={20} />
                  </span>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        Verify Booking Flow
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/20">
                        Completed
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Travel Booking App
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      Verify the complete travel search, booking, and reservation flow.
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Task
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <AiOutlineProject size={14} />
                  Travel Booking App
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Aug 10, 2026
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#4ade80]">
                  <FiCheckSquare size={14} />
                  Completed
                </span>

              </div>

            </div>

          </div>

          {/* Task Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {/* Current Testing */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <h2 className="text-[16px] font-semibold text-white mb-5">
                Current Testing
              </h2>

              <div className="flex items-center justify-between p-4 rounded-[10px] bg-white/[0.02] border border-white/[0.06]">

                <div className="flex items-center gap-3">

                  <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                    <FiClock size={17} />
                  </span>

                  <div>

                    <p className="text-[13.5px] font-medium text-white">
                      Tasks In Progress
                    </p>

                    <p className="text-[12px] text-[#5b606c] mt-0.5">
                      Tasks currently being tested
                    </p>

                  </div>

                </div>

                <span className="text-[13px] font-semibold text-[#f0a83b]">
                  1
                </span>

              </div>

            </div>

            {/* Bug Verification */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <h2 className="text-[16px] font-semibold text-white mb-5">
                Bug Verification
              </h2>

              <div className="flex items-center justify-between p-4 rounded-[10px] bg-white/[0.02] border border-white/[0.06]">

                <div className="flex items-center gap-3">

                  <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f87171]/[0.12] text-[#f87171]">
                    <BsBug size={17} />
                  </span>

                  <div>

                    <p className="text-[13.5px] font-medium text-white">
                      Bugs To Verify
                    </p>

                    <p className="text-[12px] text-[#5b606c] mt-0.5">
                      Reported issues waiting for verification
                    </p>

                  </div>

                </div>

                <span className="text-[13px] font-semibold text-[#f87171]">
                  4
                </span>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default TesterTasks;