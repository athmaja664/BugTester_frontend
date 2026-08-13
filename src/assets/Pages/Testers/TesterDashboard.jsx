import React from "react";
import TesterSidebar from "../../Components/Tester/TesterSidebar";
import { AiOutlineSearch, AiOutlineProject } from "react-icons/ai";
import { BsBug } from "react-icons/bs";
import { FiCheckSquare, FiClock } from "react-icons/fi";

function TesterDashboard() {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">

      <TesterSidebar />

      {/* Right Column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

          <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
            Dashboard
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
                placeholder="Search..."
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

          {/* Welcome */}
          <div className="mb-8">

            <h1 className="text-[22px] font-semibold text-white">
              Welcome back, Tester User
            </h1>

            <p className="text-[14px] text-[#8b909c] mt-1">
              Here's an overview of your testing activity.
            </p>

          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

            {/* Assigned Projects */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-start justify-between">

                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                  <AiOutlineProject size={18} />
                </span>

                <span className="text-[12px] text-[#5b606c]">
                  This month
                </span>

              </div>

              <p className="text-[25px] font-semibold text-white mt-5">
                4
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Assigned Projects
              </p>

            </div>

            {/* Open Bugs */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-start justify-between">

                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f87171]/[0.12] text-[#f87171]">
                  <BsBug size={18} />
                </span>

                <span className="text-[12px] text-[#5b606c]">
                  Active
                </span>

              </div>

              <p className="text-[25px] font-semibold text-white mt-5">
                12
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Open Bugs
              </p>

            </div>

            {/* Tasks */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-start justify-between">

                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#8b98ff]/[0.12] text-[#8b98ff]">
                  <FiCheckSquare size={18} />
                </span>

                <span className="text-[12px] text-[#5b606c]">
                  Assigned
                </span>

              </div>

              <p className="text-[25px] font-semibold text-white mt-5">
                8
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Pending Tasks
              </p>

            </div>

            {/* Completed */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-start justify-between">

                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80]">
                  <FiCheckSquare size={18} />
                </span>

                <span className="text-[12px] text-[#4ade80]">
                  +12%
                </span>

              </div>

              <p className="text-[25px] font-semibold text-white mt-5">
                36
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Bugs Tested
              </p>

            </div>

          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {/* My Tasks - Left Side */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <h2 className="text-[16px] font-semibold text-white">
                    My Tasks
                  </h2>

                  <p className="text-[12.5px] text-[#5b606c] mt-1">
                    Tasks assigned to you
                  </p>
                </div>

                <FiCheckSquare
                  className="text-[#f0a83b]"
                  size={18}
                />

              </div>

              {/* Task 1 */}
              <div className="flex items-start gap-3 pb-4 mb-4 border-b border-white/[0.06]">

                <span className="mt-1 flex items-center justify-center w-4 h-4 rounded border border-[#f0a83b]">
                </span>

                <div className="flex-1">

                  <p className="text-[13px] font-medium text-white">
                    Test checkout flow
                  </p>

                  <p className="text-[11.5px] text-[#5b606c] mt-1">
                    E-Commerce Platform
                  </p>

                </div>

                <span className="text-[11px] text-[#f0a83b]">
                  High
                </span>

              </div>

              {/* Task 2 */}
              <div className="flex items-start gap-3 pb-4 mb-4 border-b border-white/[0.06]">

                <span className="mt-1 flex items-center justify-center w-4 h-4 rounded border border-[#f0a83b]">
                </span>

                <div className="flex-1">

                  <p className="text-[13px] font-medium text-white">
                    Verify login validation
                  </p>

                  <p className="text-[11.5px] text-[#5b606c] mt-1">
                    Banking Dashboard
                  </p>

                </div>

                <span className="text-[11px] text-[#8b98ff]">
                  Medium
                </span>

              </div>

              {/* Task 3 */}
              <div className="flex items-start gap-3">

                <span className="mt-1 flex items-center justify-center w-4 h-4 rounded border border-[#f0a83b]">
                </span>

                <div className="flex-1">

                  <p className="text-[13px] font-medium text-white">
                    Test responsive layout
                  </p>

                  <p className="text-[11.5px] text-[#5b606c] mt-1">
                    Travel Booking App
                  </p>

                </div>

                <span className="text-[11px] text-[#4ade80]">
                  Low
                </span>

              </div>

              <button
                type="button"
                className="w-full h-[40px] mt-5 rounded-[8px] border border-white/10 text-[12.5px] font-medium text-[#a8abb8] hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
              >
                View All Tasks
              </button>

            </div>

            {/* Recent Bugs - Right Side */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <h2 className="text-[16px] font-semibold text-white">
                    Recent Bugs
                  </h2>

                  <p className="text-[12.5px] text-[#5b606c] mt-1">
                    Latest reported issues
                  </p>

                </div>

                <BsBug
                  className="text-[#f87171]"
                  size={18}
                />

              </div>

              {/* Bug 1 */}
              <div className="flex items-start gap-3 pb-4 mb-4 border-b border-white/[0.06]">

                <span className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-[#f87171]/[0.12] text-[#f87171] shrink-0">
                  <BsBug size={13} />
                </span>

                <div className="flex-1">

                  <p className="text-[13px] font-medium text-white">
                    Checkout button not working
                  </p>

                  <p className="text-[11.5px] text-[#5b606c] mt-1">
                    E-Commerce Platform
                  </p>

                </div>

                <span className="px-2 py-1 rounded-[5px] text-[10px] font-medium bg-[#f87171]/[0.10] text-[#f87171]">
                  Open
                </span>

              </div>

              {/* Bug 2 */}
              <div className="flex items-start gap-3 pb-4 mb-4 border-b border-white/[0.06]">

                <span className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-[#f0a83b]/[0.12] text-[#f0a83b] shrink-0">
                  <BsBug size={13} />
                </span>

                <div className="flex-1">

                  <p className="text-[13px] font-medium text-white">
                    Incorrect account balance
                  </p>

                  <p className="text-[11.5px] text-[#5b606c] mt-1">
                    Banking Dashboard
                  </p>

                </div>

                <span className="px-2 py-1 rounded-[5px] text-[10px] font-medium bg-[#f0a83b]/[0.10] text-[#f0a83b]">
                  Testing
                </span>

              </div>

              {/* Bug 3 */}
              <div className="flex items-start gap-3">

                <span className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-[#4ade80]/[0.12] text-[#4ade80] shrink-0">
                  <BsBug size={13} />
                </span>

                <div className="flex-1">

                  <p className="text-[13px] font-medium text-white">
                    Mobile menu alignment
                  </p>

                  <p className="text-[11.5px] text-[#5b606c] mt-1">
                    Travel Booking App
                  </p>

                </div>

                <span className="px-2 py-1 rounded-[5px] text-[10px] font-medium bg-[#4ade80]/[0.10] text-[#4ade80]">
                  Fixed
                </span>

              </div>

            </div>

          </div>

          {/* Testing Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

            {/* Completed */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center gap-3">

                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80]">
                  <FiCheckSquare size={17} />
                </span>

                <div>

                  <p className="text-[13px] text-[#8b909c]">
                    Tests Completed
                  </p>

                  <p className="text-[20px] font-semibold text-white mt-0.5">
                    84
                  </p>

                </div>

              </div>

            </div>

            {/* Pending */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center gap-3">

                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                  <FiClock size={17} />
                </span>

                <div>

                  <p className="text-[13px] text-[#8b909c]">
                    Pending Tests
                  </p>

                  <p className="text-[20px] font-semibold text-white mt-0.5">
                    16
                  </p>

                </div>

              </div>

            </div>

            {/* Bugs Found */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center gap-3">

                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f87171]/[0.12] text-[#f87171]">
                  <BsBug size={17} />
                </span>

                <div>

                  <p className="text-[13px] text-[#8b909c]">
                    Bugs Reported
                  </p>

                  <p className="text-[20px] font-semibold text-white mt-0.5">
                    27
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

export default TesterDashboard;