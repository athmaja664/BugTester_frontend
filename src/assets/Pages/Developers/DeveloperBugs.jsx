import React from "react";
import DeveloperSidebar from "../../Components/Developer/DeveloperSidebar";
import { AiOutlineSearch } from "react-icons/ai";
import {
  HiOutlineCalendar,
  HiOutlineUser,
} from "react-icons/hi";
import {
  FiMoreHorizontal,
  FiAlertCircle,
} from "react-icons/fi";


function DeveloperBugs() {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">

      {/* Sidebar */}
      <DeveloperSidebar />

      {/* Right column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

          <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
            Bugs
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
                placeholder="Search bugs..."
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
          <div className="mb-7">

            <h1 className="text-[22px] font-semibold text-white">
              My Bugs
            </h1>

            <p className="text-[14px] text-[#8b909c] mt-1">
              View and track bugs assigned to you
            </p>

          </div>


          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

            {/* Open */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[12.5px] text-[#8b909c]">
                    Open Bugs
                  </p>

                  <p className="text-[25px] font-semibold text-white mt-2">
                    12
                  </p>

                </div>

                <span className="flex items-center justify-center w-10 h-10 rounded-[9px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                  <FiAlertCircle size={19} />
                </span>

              </div>

            </div>


            {/* In Progress */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[12.5px] text-[#8b909c]">
                    In Progress
                  </p>

                  <p className="text-[25px] font-semibold text-white mt-2">
                    5
                  </p>

                </div>

                <span className="flex items-center justify-center w-10 h-10 rounded-[9px] bg-[#576aff]/[0.12] text-[#8b98ff]">
                  <FiAlertCircle size={19} />
                </span>

              </div>

            </div>


            {/* Resolved */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[12.5px] text-[#8b909c]">
                    Resolved
                  </p>

                  <p className="text-[25px] font-semibold text-white mt-2">
                    18
                  </p>

                </div>

                <span className="flex items-center justify-center w-10 h-10 rounded-[9px] bg-[#4ade80]/[0.12] text-[#4ade80]">
                  <FiAlertCircle size={19} />
                </span>

              </div>

            </div>

          </div>


          {/* Bug list */}
          <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] overflow-hidden">

            {/* List header */}
            <div className="flex items-center justify-between gap-4 px-5 lg:px-6 py-4 border-b border-white/[0.06]">

              <div>

                <h2 className="text-[16px] font-semibold text-white">
                  Assigned Bugs
                </h2>

                <p className="text-[12.5px] text-[#5b606c] mt-1">
                  Bugs currently assigned to you
                </p>

              </div>

              <button
                type="button"
                className="hidden sm:flex items-center justify-center h-[38px] px-4 rounded-[8px] text-[13px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
              >
                View All
              </button>

            </div>


            {/* Bug 1 */}
            <div className="px-5 lg:px-6 py-5 border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors">

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                <div className="flex items-start gap-3">

                  <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.10] text-[#f0a83b] shrink-0">
                    <FiAlertCircle size={17} />
                  </span>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[14.5px] font-semibold text-white">
                        Checkout payment fails
                      </h3>

                      <span className="px-2 py-0.5 rounded-[5px] bg-[#f0a83b]/[0.10] border border-[#f0a83b]/20 text-[#f0a83b] text-[10.5px] font-medium">
                        High
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#8b909c] mt-1">
                      E-Commerce Platform
                    </p>

                    <p className="text-[13px] text-[#6f7480] mt-2 leading-relaxed">
                      Payment fails when users attempt to complete checkout using a saved card.
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-3 lg:shrink-0">

                  <span className="px-2.5 py-1 rounded-[6px] bg-[#576aff]/[0.10] border border-[#576aff]/20 text-[#8b98ff] text-[11.5px] font-medium">
                    In Progress
                  </span>

                  <button
                    type="button"
                    className="text-[#6b707c] hover:text-white cursor-pointer"
                  >
                    <FiMoreHorizontal size={19} />
                  </button>

                </div>

              </div>


              <div className="flex flex-wrap items-center gap-5 mt-4 pl-12">

                <div className="flex items-center gap-2">

                  <HiOutlineCalendar
                    className="text-[#5b606c]"
                    size={15}
                  />

                  <span className="text-[12px] text-[#8b909c]">
                    Due Aug 15, 2026
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <HiOutlineUser
                    className="text-[#5b606c]"
                    size={15}
                  />

                  <span className="text-[12px] text-[#8b909c]">
                    Assigned to Developer
                  </span>

                </div>

              </div>

            </div>


            {/* Bug 2 */}
            <div className="px-5 lg:px-6 py-5 border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors">

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                <div className="flex items-start gap-3">

                  <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#576aff]/[0.10] text-[#8b98ff] shrink-0">
                    <FiAlertCircle size={17} />
                  </span>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[14.5px] font-semibold text-white">
                        Dashboard loading issue
                      </h3>

                      <span className="px-2 py-0.5 rounded-[5px] bg-[#576aff]/[0.10] border border-[#576aff]/20 text-[#8b98ff] text-[10.5px] font-medium">
                        Medium
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#8b909c] mt-1">
                      Banking Dashboard
                    </p>

                    <p className="text-[13px] text-[#6f7480] mt-2 leading-relaxed">
                      Dashboard widgets take too long to load when multiple transactions are present.
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-3 lg:shrink-0">

                  <span className="px-2.5 py-1 rounded-[6px] bg-[#576aff]/[0.10] border border-[#576aff]/20 text-[#8b98ff] text-[11.5px] font-medium">
                    In Progress
                  </span>

                  <button
                    type="button"
                    className="text-[#6b707c] hover:text-white cursor-pointer"
                  >
                    <FiMoreHorizontal size={19} />
                  </button>

                </div>

              </div>


              <div className="flex flex-wrap items-center gap-5 mt-4 pl-12">

                <div className="flex items-center gap-2">

                  <HiOutlineCalendar
                    className="text-[#5b606c]"
                    size={15}
                  />

                  <span className="text-[12px] text-[#8b909c]">
                    Due Aug 18, 2026
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <HiOutlineUser
                    className="text-[#5b606c]"
                    size={15}
                  />

                  <span className="text-[12px] text-[#8b909c]">
                    Assigned to Developer
                  </span>

                </div>

              </div>

            </div>


            {/* Bug 3 */}
            <div className="px-5 lg:px-6 py-5 border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors">

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                <div className="flex items-start gap-3">

                  <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.10] text-[#4ade80] shrink-0">
                    <FiAlertCircle size={17} />
                  </span>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[14.5px] font-semibold text-white">
                        Booking confirmation not received
                      </h3>

                      <span className="px-2 py-0.5 rounded-[5px] bg-[#4ade80]/[0.10] border border-[#4ade80]/20 text-[#4ade80] text-[10.5px] font-medium">
                        Low
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#8b909c] mt-1">
                      Travel Booking App
                    </p>

                    <p className="text-[13px] text-[#6f7480] mt-2 leading-relaxed">
                      Confirmation message is not displayed after a successful hotel booking.
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-3 lg:shrink-0">

                  <span className="px-2.5 py-1 rounded-[6px] bg-[#4ade80]/[0.10] border border-[#4ade80]/20 text-[#4ade80] text-[11.5px] font-medium">
                    Resolved
                  </span>

                  <button
                    type="button"
                    className="text-[#6b707c] hover:text-white cursor-pointer"
                  >
                    <FiMoreHorizontal size={19} />
                  </button>

                </div>

              </div>


              <div className="flex flex-wrap items-center gap-5 mt-4 pl-12">

                <div className="flex items-center gap-2">

                  <HiOutlineCalendar
                    className="text-[#5b606c]"
                    size={15}
                  />

                  <span className="text-[12px] text-[#8b909c]">
                    Resolved Aug 10, 2026
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <HiOutlineUser
                    className="text-[#5b606c]"
                    size={15}
                  />

                  <span className="text-[12px] text-[#8b909c]">
                    Assigned to Developer
                  </span>

                </div>

              </div>

            </div>


            {/* Bug 4 */}
            <div className="px-5 lg:px-6 py-5 hover:bg-white/[0.02] transition-colors">

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                <div className="flex items-start gap-3">

                  <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.10] text-[#f0a83b] shrink-0">
                    <FiAlertCircle size={17} />
                  </span>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[14.5px] font-semibold text-white">
                        User profile update error
                      </h3>

                      <span className="px-2 py-0.5 rounded-[5px] bg-[#f0a83b]/[0.10] border border-[#f0a83b]/20 text-[#f0a83b] text-[10.5px] font-medium">
                        High
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#8b909c] mt-1">
                      Employee Management
                    </p>

                    <p className="text-[13px] text-[#6f7480] mt-2 leading-relaxed">
                      Employee profile changes are not saved correctly after editing contact information.
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-3 lg:shrink-0">

                  <span className="px-2.5 py-1 rounded-[6px] bg-[#f0a83b]/[0.10] border border-[#f0a83b]/20 text-[#f0a83b] text-[11.5px] font-medium">
                    Open
                  </span>

                  <button
                    type="button"
                    className="text-[#6b707c] hover:text-white cursor-pointer"
                  >
                    <FiMoreHorizontal size={19} />
                  </button>

                </div>

              </div>


              <div className="flex flex-wrap items-center gap-5 mt-4 pl-12">

                <div className="flex items-center gap-2">

                  <HiOutlineCalendar
                    className="text-[#5b606c]"
                    size={15}
                  />

                  <span className="text-[12px] text-[#8b909c]">
                    Due Aug 20, 2026
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <HiOutlineUser
                    className="text-[#5b606c]"
                    size={15}
                  />

                  <span className="text-[12px] text-[#8b909c]">
                    Assigned to Developer
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


export default DeveloperBugs;