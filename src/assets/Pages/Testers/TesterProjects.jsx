import React from "react";
import TesterSidebar from "../../Components/Tester/TesterSidebar";
import { AiOutlineSearch, AiOutlineProject } from "react-icons/ai";
import { BsBug } from "react-icons/bs";
import {
  FiArrowUpRight,
  FiCheckSquare,
  FiClock,
} from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi";

function TesterProjects() {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">

      <TesterSidebar />

      {/* Right Column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

          <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
            Projects
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
                placeholder="Search projects..."
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
                My Projects
              </h1>

              <p className="text-[14px] text-[#8b909c] mt-1">
                View and test the projects assigned to you.
              </p>
            </div>

            {/* Project Count */}
            <div className="flex items-center gap-2 px-3.5 h-[38px] rounded-[8px] bg-white/[0.03] border border-white/[0.06]">

              <AiOutlineProject
                size={16}
                className="text-[#f0a83b]"
              />

              <span className="text-[13px] text-[#a8abb8]">
                4 Assigned Projects
              </span>

            </div>

          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

            {/* Assigned */}
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

            {/* Active */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#8b98ff]/[0.12] text-[#8b98ff] mb-4">
                <FiClock size={18} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                3
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Projects In Testing
              </p>

            </div>

            {/* Completed */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80] mb-4">
                <FiCheckSquare size={18} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                1
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Completed Testing
              </p>

            </div>

          </div>

          {/* Projects Section */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

              <div>
                <h2 className="text-[16px] font-semibold text-white">
                  Assigned Projects
                </h2>

                <p className="text-[12.5px] text-[#5b606c] mt-1">
                  Projects currently assigned for testing
                </p>
              </div>

              {/* Filter */}
              <select
                className="h-[38px] px-3 rounded-[8px] bg-[#0d0f14] border border-white/10 text-[13px] text-[#a8abb8] outline-none focus:border-[#f0a83b] cursor-pointer"
              >
                <option>All Projects</option>
                <option>In Testing</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>

            </div>

            {/* ================================================= */}
            {/* Project Card 1 */}
            {/* ================================================= */}

            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06] mb-4">

              {/* Top Section */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  {/* Project Icon */}
                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#f0a83b]/[0.12] text-[#f0a83b] shrink-0">
                    <AiOutlineProject size={20} />
                  </span>

                  {/* Project Information */}
                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        E-Commerce Platform
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/20">
                        In Testing
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Web Application
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      Customer shopping and online payment platform.
                    </p>

                  </div>

                </div>

                {/* View Project */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Project
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              {/* Testing Progress Card */}
              <div className="mt-5 p-4 rounded-[10px] bg-[#0d0f14] border border-white/[0.06]">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-[12px] text-[#8b909c]">
                      Testing Progress
                    </p>

                    <p className="text-[20px] font-semibold text-white mt-1">
                      72%
                    </p>
                  </div>

                  <div className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                    <FiCheckSquare size={18} />
                  </div>

                </div>

              </div>

              {/* Project Details */}
              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <BsBug size={14} />
                  12 Bugs
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiCheckSquare size={14} />
                  36 Tests
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Aug 25, 2026
                </span>

              </div>

            </div>

            {/* ================================================= */}
            {/* Project Card 2 */}
            {/* ================================================= */}

            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06] mb-4">

              {/* Top Section */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  {/* Project Icon */}
                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#8b98ff]/[0.12] text-[#8b98ff] shrink-0">
                    <AiOutlineProject size={20} />
                  </span>

                  {/* Project Information */}
                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        Banking Dashboard
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#8b98ff]/[0.12] text-[#8b98ff] border border-[#8b98ff]/20">
                        In Testing
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Admin Portal
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      Banking administration and account management portal.
                    </p>

                  </div>

                </div>

                {/* View Project */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Project
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              {/* Testing Progress Card */}
              <div className="mt-5 p-4 rounded-[10px] bg-[#0d0f14] border border-white/[0.06]">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-[12px] text-[#8b909c]">
                      Testing Progress
                    </p>

                    <p className="text-[20px] font-semibold text-white mt-1">
                      54%
                    </p>
                  </div>

                  <div className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#8b98ff]/[0.12] text-[#8b98ff]">
                    <FiCheckSquare size={18} />
                  </div>

                </div>

              </div>

              {/* Project Details */}
              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <BsBug size={14} />
                  8 Bugs
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiCheckSquare size={14} />
                  28 Tests
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Sep 02, 2026
                </span>

              </div>

            </div>

            {/* ================================================= */}
            {/* Project Card 3 */}
            {/* ================================================= */}

            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06] mb-4">

              {/* Top Section */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  {/* Project Icon */}
                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#4ade80]/[0.12] text-[#4ade80] shrink-0">
                    <AiOutlineProject size={20} />
                  </span>

                  {/* Project Information */}
                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        Travel Booking App
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/20">
                        Completed
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Mobile & Web Application
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      Travel planning, booking, and reservation application.
                    </p>

                  </div>

                </div>

                {/* View Project */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Project
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              {/* Testing Progress Card */}
              <div className="mt-5 p-4 rounded-[10px] bg-[#0d0f14] border border-white/[0.06]">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-[12px] text-[#8b909c]">
                      Testing Progress
                    </p>

                    <p className="text-[20px] font-semibold text-white mt-1">
                      100%
                    </p>
                  </div>

                  <div className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80]">
                    <FiCheckSquare size={18} />
                  </div>

                </div>

              </div>

              {/* Project Details */}
              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <BsBug size={14} />
                  5 Bugs
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiCheckSquare size={14} />
                  42 Tests
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Jul 18, 2026
                </span>

              </div>

            </div>

            {/* ================================================= */}
            {/* Project Card 4 */}
            {/* ================================================= */}

            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06]">

              {/* Top Section */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  {/* Project Icon */}
                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#c084fc]/[0.12] text-[#c084fc] shrink-0">
                    <AiOutlineProject size={20} />
                  </span>

                  {/* Project Information */}
                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        Employee Management Portal
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#c084fc]/[0.12] text-[#c084fc] border border-[#c084fc]/20">
                        Pending
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Web Application
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      Employee attendance, leave, and management portal.
                    </p>

                  </div>

                </div>

                {/* View Project */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Project
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              {/* Testing Progress Card */}
              <div className="mt-5 p-4 rounded-[10px] bg-[#0d0f14] border border-white/[0.06]">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-[12px] text-[#8b909c]">
                      Testing Progress
                    </p>

                    <p className="text-[20px] font-semibold text-white mt-1">
                      20%
                    </p>
                  </div>

                  <div className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#c084fc]/[0.12] text-[#c084fc]">
                    <FiClock size={18} />
                  </div>

                </div>

              </div>

              {/* Project Details */}
              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <BsBug size={14} />
                  2 Bugs
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiCheckSquare size={14} />
                  10 Tests
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Sep 15, 2026
                </span>

              </div>

            </div>

          </div>

          {/* Testing Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {/* Testing Status */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <h2 className="text-[16px] font-semibold text-white mb-5">
                Testing Status
              </h2>

              <div className="flex items-center justify-between p-4 rounded-[10px] bg-white/[0.02] border border-white/[0.06]">

                <div className="flex items-center gap-3">

                  <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                    <FiClock size={17} />
                  </span>

                  <div>

                    <p className="text-[13.5px] font-medium text-white">
                      Active Testing
                    </p>

                    <p className="text-[12px] text-[#5b606c] mt-0.5">
                      3 projects are currently active
                    </p>

                  </div>

                </div>

                <span className="text-[13px] font-semibold text-[#f0a83b]">
                  3
                </span>

              </div>

            </div>

            {/* Bug Summary */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <h2 className="text-[16px] font-semibold text-white mb-5">
                Bug Summary
              </h2>

              <div className="flex items-center justify-between p-4 rounded-[10px] bg-white/[0.02] border border-white/[0.06]">

                <div className="flex items-center gap-3">

                  <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f87171]/[0.12] text-[#f87171]">
                    <BsBug size={17} />
                  </span>

                  <div>

                    <p className="text-[13.5px] font-medium text-white">
                      Reported Bugs
                    </p>

                    <p className="text-[12px] text-[#5b606c] mt-0.5">
                      Issues found during testing
                    </p>

                  </div>

                </div>

                <span className="text-[13px] font-semibold text-[#f87171]">
                  25
                </span>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default TesterProjects;