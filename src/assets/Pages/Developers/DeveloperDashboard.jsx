import React from "react";
import DeveloperSidebar from "../../Components/Developer/DeveloperSidebar";
import { AiOutlineSearch, AiOutlineProject } from "react-icons/ai";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiFolder,
} from "react-icons/fi";
import { BsBug } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";


function DeveloperDashboard() {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">

      <DeveloperSidebar />


      {/* Right column */}
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


          {/* Page heading */}
          <div className="mb-7">

            <h1 className="text-[22px] font-semibold text-white">
              Welcome back, Developer
            </h1>

            <p className="text-[14px] text-[#8b909c] mt-1">
              Here's an overview of your assigned projects and tasks.
            </p>

          </div>


          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">


            {/* Assigned Projects */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b] mb-4">
                <AiOutlineProject size={18} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                4
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Assigned Projects
              </p>

            </div>


            {/* Open Bugs */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#ef4444]/[0.12] text-[#ef7777] mb-4">
                <BsBug size={17} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                12
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Open Bugs
              </p>

            </div>


            {/* Tasks */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff] mb-4">
                <FiClock size={17} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                8
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Pending Tasks
              </p>

            </div>


            {/* Completed */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80] mb-4">
                <FiCheckCircle size={17} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                24
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Completed Tasks
              </p>

            </div>


          </div>


          {/* Main dashboard sections */}
     

          

            {/* My Tasks */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">


              <div className=" items-center justify-between mb-5">

                <div>

                  <h2 className="text-[16px] font-semibold text-white">
                    My Tasks
                  </h2>

                  <p className="text-[12.5px] text-[#5b606c] mt-1">
                    Your current tasks
                  </p>

                </div>

                <button
                  type="button"
                  className="text-[12.5px] font-medium text-[#f0a83b] hover:text-[#f5bc6b] cursor-pointer"
                >
                  View All
                </button>

              </div>


              {/* Task 1 */}
              <div className="flex items-start gap-3 pb-4 mb-4 border-b border-white/[0.06]">

                <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-[#f0a83b]/[0.12] text-[#f0a83b] shrink-0">
                  <FiClock size={15} />
                </span>

                <div className="min-w-0">

                  <p className="text-[13px] font-medium text-white">
                    Fix checkout validation
                  </p>

                  <p className="text-[11.5px] text-[#5b606c] mt-1">
                    E-Commerce Platform
                  </p>

                  <span className="inline-block mt-2 text-[10.5px] px-2 py-1 rounded-[4px] bg-[#f0a83b]/[0.10] text-[#f0a83b]">
                    In Progress
                  </span>

                </div>

              </div>


              {/* Task 2 */}
              <div className="flex items-start gap-3 pb-4 mb-4 border-b border-white/[0.06]">

                <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-[#ef4444]/[0.12] text-[#ef7777] shrink-0">
                  <BsBug size={15} />
                </span>

                <div className="min-w-0">

                  <p className="text-[13px] font-medium text-white">
                    Resolve login bug
                  </p>

                  <p className="text-[11.5px] text-[#5b606c] mt-1">
                    Banking Dashboard
                  </p>

                  <span className="inline-block mt-2 text-[10.5px] px-2 py-1 rounded-[4px] bg-[#ef4444]/[0.10] text-[#ef7777]">
                    High Priority
                  </span>

                </div>

              </div>


              {/* Task 3 */}
              <div className="flex items-start gap-3">

                <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-[#4ade80]/[0.12] text-[#4ade80] shrink-0">
                  <FiCheckCircle size={15} />
                </span>

                <div className="min-w-0">

                  <p className="text-[13px] font-medium text-white">
                    Update user profile page
                  </p>

                  <p className="text-[11.5px] text-[#5b606c] mt-1">
                    Travel Booking App
                  </p>

                  <span className="inline-block mt-2 text-[10.5px] px-2 py-1 rounded-[4px] bg-[#4ade80]/[0.10] text-[#4ade80]">
                    Completed
                  </span>

                </div>

              </div>


            </div>


        

          {/* Bottom section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">


            {/* Recent Bugs */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <h2 className="text-[16px] font-semibold text-white">
                    Recent Bugs
                  </h2>

                  <p className="text-[12.5px] text-[#5b606c] mt-1">
                    Bugs assigned to you
                  </p>

                </div>

                <button
                  type="button"
                  className="text-[12.5px] font-medium text-[#f0a83b] hover:text-[#f5bc6b] cursor-pointer"
                >
                  View All
                </button>

              </div>


              {/* Bug 1 */}
              <div className="flex items-center justify-between gap-4 py-3 border-b border-white/[0.06]">

                <div className="flex items-center gap-3 min-w-0">

                  <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-[#ef4444]/[0.12] text-[#ef7777] shrink-0">
                    <BsBug size={15} />
                  </span>

                  <div className="min-w-0">

                    <p className="text-[13px] font-medium text-white truncate">
                      Checkout button not working
                    </p>

                    <p className="text-[11.5px] text-[#5b606c] mt-0.5">
                      E-Commerce Platform
                    </p>

                  </div>

                </div>

                <span className="text-[10.5px] px-2 py-1 rounded-[4px] bg-[#ef4444]/[0.10] text-[#ef7777] shrink-0">
                  High
                </span>

              </div>


              {/* Bug 2 */}
              <div className="flex items-center justify-between gap-4 py-3 border-b border-white/[0.06]">

                <div className="flex items-center gap-3 min-w-0">

                  <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-[#f0a83b]/[0.12] text-[#f0a83b] shrink-0">
                    <BsBug size={15} />
                  </span>

                  <div className="min-w-0">

                    <p className="text-[13px] font-medium text-white truncate">
                      Incorrect transaction total
                    </p>

                    <p className="text-[11.5px] text-[#5b606c] mt-0.5">
                      Banking Dashboard
                    </p>

                  </div>

                </div>

                <span className="text-[10.5px] px-2 py-1 rounded-[4px] bg-[#f0a83b]/[0.10] text-[#f0a83b] shrink-0">
                  Medium
                </span>

              </div>


              {/* Bug 3 */}
              <div className="flex items-center justify-between gap-4 py-3">

                <div className="flex items-center gap-3 min-w-0">

                  <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-white/[0.06] text-[#a8abb8] shrink-0">
                    <BsBug size={15} />
                  </span>

                  <div className="min-w-0">

                    <p className="text-[13px] font-medium text-white truncate">
                      Profile image not loading
                    </p>

                    <p className="text-[11.5px] text-[#5b606c] mt-0.5">
                      Travel Booking App
                    </p>

                  </div>

                </div>

                <span className="text-[10.5px] px-2 py-1 rounded-[4px] bg-white/[0.06] text-[#a8abb8] shrink-0">
                  Low
                </span>

              </div>

            </div>


            {/* Team / Project Information */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <h2 className="text-[16px] font-semibold text-white">
                    Project Team
                  </h2>

                  <p className="text-[12.5px] text-[#5b606c] mt-1">
                    Your current team members
                  </p>

                </div>

                <HiOutlineUserGroup
                  size={19}
                  className="text-[#5b606c]"
                />

              </div>


              {/* Member 1 */}
              <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">

                <div className="flex items-center gap-3">

                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f0a83b]/[0.12] text-[#f0a83b] text-[11px] font-semibold">
                    AT
                  </span>

                  <div>

                    <p className="text-[13px] font-medium text-white">
                      Arjun Thomas
                    </p>

                    <p className="text-[11.5px] text-[#5b606c]">
                      Team Lead
                    </p>

                  </div>

                </div>

                <span className="w-2 h-2 rounded-full bg-[#4ade80]"></span>

              </div>


              {/* Member 2 */}
              <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">

                <div className="flex items-center gap-3">

                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[11px] font-semibold">
                    RS
                  </span>

                  <div>

                    <p className="text-[13px] font-medium text-white">
                      Rahul S.
                    </p>

                    <p className="text-[11.5px] text-[#5b606c]">
                      Developer
                    </p>

                  </div>

                </div>

                <span className="w-2 h-2 rounded-full bg-[#4ade80]"></span>

              </div>


              {/* Member 3 */}
              <div className="flex items-center justify-between py-3">

                <div className="flex items-center gap-3">

                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[11px] font-semibold">
                    KM
                  </span>

                  <div>

                    <p className="text-[13px] font-medium text-white">
                      Karan M.
                    </p>

                    <p className="text-[11.5px] text-[#5b606c]">
                      Developer
                    </p>

                  </div>

                </div>

                <span className="w-2 h-2 rounded-full bg-[#4ade80]"></span>

              </div>


            </div>


          </div>


        </div>

      </div>

    </div>
  );
}


export default DeveloperDashboard;