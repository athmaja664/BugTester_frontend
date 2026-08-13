import React from "react";
import TesterSidebar from "../../Components/Tester/TesterSidebar";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBug } from "react-icons/bs";
import {
  FiArrowUpRight,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi";

function TesterBugs() {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">

      <TesterSidebar />

      {/* Right Column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

          <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
            Bugs
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
                placeholder="Search bugs..."
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
                My Bugs
              </h1>

              <p className="text-[14px] text-[#8b909c] mt-1">
                View and manage bugs reported during testing.
              </p>

            </div>

            {/* Bug Count */}
            <div className="flex items-center gap-2 px-3.5 h-[38px] rounded-[8px] bg-white/[0.03] border border-white/[0.06]">

              <BsBug
                size={16}
                className="text-[#f87171]"
              />

              <span className="text-[13px] text-[#a8abb8]">
                25 Reported Bugs
              </span>

            </div>

          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

            {/* Total Bugs */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f87171]/[0.12] text-[#f87171] mb-4">
                <BsBug size={18} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                25
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Total Bugs
              </p>

            </div>

            {/* Open Bugs */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b] mb-4">
                <FiAlertCircle size={18} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                15
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Open Bugs
              </p>

            </div>

            {/* Resolved */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80] mb-4">
                <FiCheckCircle size={18} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                10
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Resolved Bugs
              </p>

            </div>

          </div>

          {/* Bugs Section */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

              <div>

                <h2 className="text-[16px] font-semibold text-white">
                  Reported Bugs
                </h2>

                <p className="text-[12.5px] text-[#5b606c] mt-1">
                  Bugs found during project testing
                </p>

              </div>

              {/* Filter */}
              <select
                className="h-[38px] px-3 rounded-[8px] bg-[#0d0f14] border border-white/10 text-[13px] text-[#a8abb8] outline-none focus:border-[#f0a83b] cursor-pointer"
              >
                <option>All Bugs</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>

            </div>

            {/* ================================================= */}
            {/* Bug Card 1 */}
            {/* ================================================= */}

            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06] mb-4">

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  {/* Bug Icon */}
                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#f87171]/[0.12] text-[#f87171] shrink-0">
                    <BsBug size={20} />
                  </span>

                  {/* Bug Information */}
                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        Payment button not responding
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#f87171]/[0.12] text-[#f87171] border border-[#f87171]/20">
                        Open
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      E-Commerce Platform
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      Payment button does not respond when the user attempts to complete checkout.
                    </p>

                  </div>

                </div>

                {/* View Bug */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Bug
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              {/* Bug Details */}
              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#f87171]">
                  <FiAlertCircle size={14} />
                  High Severity
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiClock size={14} />
                  Open
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Aug 08, 2026
                </span>

              </div>

            </div>

            {/* ================================================= */}
            {/* Bug Card 2 */}
            {/* ================================================= */}

            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06] mb-4">

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  {/* Bug Icon */}
                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#f0a83b]/[0.12] text-[#f0a83b] shrink-0">
                    <BsBug size={20} />
                  </span>

                  {/* Bug Information */}
                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        Incorrect account balance
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/20">
                        In Progress
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Banking Dashboard
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      Account balance does not update correctly after a transaction is completed.
                    </p>

                  </div>

                </div>

                {/* View Bug */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Bug
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              {/* Bug Details */}
              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#f0a83b]">
                  <FiAlertCircle size={14} />
                  Medium Severity
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiClock size={14} />
                  In Progress
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Aug 06, 2026
                </span>

              </div>

            </div>

            {/* ================================================= */}
            {/* Bug Card 3 */}
            {/* ================================================= */}

            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06] mb-4">

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  {/* Bug Icon */}
                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#4ade80]/[0.12] text-[#4ade80] shrink-0">
                    <BsBug size={20} />
                  </span>

                  {/* Bug Information */}
                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        Booking confirmation displayed correctly
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/20">
                        Resolved
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Travel Booking App
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      Booking confirmation issue has been fixed and verified successfully.
                    </p>

                  </div>

                </div>

                {/* View Bug */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Bug
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              {/* Bug Details */}
              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#4ade80]">
                  <FiCheckCircle size={14} />
                  Low Severity
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#4ade80]">
                  <FiCheckCircle size={14} />
                  Resolved
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Jul 18, 2026
                </span>

              </div>

            </div>

            {/* ================================================= */}
            {/* Bug Card 4 */}
            {/* ================================================= */}

            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06]">

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  {/* Bug Icon */}
                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#f87171]/[0.12] text-[#f87171] shrink-0">
                    <BsBug size={20} />
                  </span>

                  {/* Bug Information */}
                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        Login session expires unexpectedly
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#f87171]/[0.12] text-[#f87171] border border-[#f87171]/20">
                        Open
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Employee Management Portal
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      User session expires while navigating between different sections of the portal.
                    </p>

                  </div>

                </div>

                {/* View Bug */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Bug
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              {/* Bug Details */}
              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#f87171]">
                  <FiAlertCircle size={14} />
                  High Severity
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiClock size={14} />
                  Open
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Aug 04, 2026
                </span>

              </div>

            </div>

          </div>

          {/* Bug Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {/* Bug Status */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <h2 className="text-[16px] font-semibold text-white mb-5">
                Bug Status
              </h2>

              <div className="flex items-center justify-between p-4 rounded-[10px] bg-white/[0.02] border border-white/[0.06]">

                <div className="flex items-center gap-3">

                  <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f87171]/[0.12] text-[#f87171]">
                    <BsBug size={17} />
                  </span>

                  <div>

                    <p className="text-[13.5px] font-medium text-white">
                      Open Bugs
                    </p>

                    <p className="text-[12px] text-[#5b606c] mt-0.5">
                      Bugs waiting to be resolved
                    </p>

                  </div>

                </div>

                <span className="text-[13px] font-semibold text-[#f87171]">
                  15
                </span>

              </div>

            </div>

            {/* Resolved Bugs */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <h2 className="text-[16px] font-semibold text-white mb-5">
                Resolution Status
              </h2>

              <div className="flex items-center justify-between p-4 rounded-[10px] bg-white/[0.02] border border-white/[0.06]">

                <div className="flex items-center gap-3">

                  <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80]">
                    <FiCheckCircle size={17} />
                  </span>

                  <div>

                    <p className="text-[13.5px] font-medium text-white">
                      Resolved Bugs
                    </p>

                    <p className="text-[12px] text-[#5b606c] mt-0.5">
                      Bugs fixed and verified
                    </p>

                  </div>

                </div>

                <span className="text-[13px] font-semibold text-[#4ade80]">
                  10
                </span>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default TesterBugs;