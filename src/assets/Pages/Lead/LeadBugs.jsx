import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiPlus,
} from "react-icons/fi";
import { BsBug } from "react-icons/bs";
import LeadSidebar from "../../Components/Lead/LeadSidebar";

function LeadBugs() {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">

      <LeadSidebar />

      {/* Right column */}
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
                placeholder="Search..."
                className="flex-1 w-full bg-transparent border-none outline-none text-[13.5px] text-white placeholder:text-[#5b606c]"
              />

            </div>

            {/* User */}
            <div className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-3 h-10 rounded-[8px] hover:bg-white/[0.04] cursor-pointer">

              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[12.5px] font-semibold">
                AT
              </span>

              <span className="hidden sm:block text-[13.5px] font-medium text-white">
                Arjun Thomas
              </span>

            </div>

          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 lg:p-8">

          {/* Page header */}
          <div className="mb-8">

            <h1 className="text-[22px] font-semibold text-white">
              Bugs
            </h1>

            <p className="text-[14px] text-[#8b909c] mt-1">
              Manage and monitor bugs across your projects
            </p>

          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">

            {/* Total Bugs */}
            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff]">
                  <BsBug size={18} />
                </span>

                <span className="flex items-center gap-1 text-[12px] text-[#4ade80]">
                  <FiTrendingUp size={13} />
                  +8
                </span>

              </div>

              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  32
                </h2>

                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  Total Bugs
                </p>
              </div>

            </div>

            {/* New */}
            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff]">
                  <FiAlertCircle size={19} />
                </span>

                <span className="flex items-center gap-1 text-[12px] text-[#4ade80]">
                  <FiTrendingUp size={13} />
                  +3
                </span>

              </div>

              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  8
                </h2>

                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  New
                </p>
              </div>

            </div>

            {/* In Progress */}
            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                  <FiClock size={19} />
                </span>

                <span className="flex items-center gap-1 text-[12px] text-[#f0a83b]">
                  <FiTrendingUp size={13} />
                  +4
                </span>

              </div>

              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  12
                </h2>

                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  In Progress
                </p>
              </div>

            </div>

            {/* Ready for QA */}
            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#c084fc]/[0.12] text-[#c084fc]">
                  <FiCheckCircle size={18} />
                </span>

                <span className="flex items-center gap-1 text-[12px] text-[#c084fc]">
                  <FiTrendingUp size={13} />
                  +2
                </span>

              </div>

              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  5
                </h2>

                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  Ready for QA
                </p>
              </div>

            </div>

            {/* Resolved */}
            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80]">
                  <FiCheckCircle size={17} />
                </span>

                <span className="flex items-center gap-1 text-[12px] text-[#4ade80]">
                  <FiTrendingUp size={13} />
                  +9
                </span>

              </div>

              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  76
                </h2>

                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  Resolved
                </p>
              </div>

            </div>

          </div>

          {/* Filters */}
          <div className="p-5 mb-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

            <div className="flex flex-col lg:flex-row lg:items-center gap-4">

              {/* Search */}
              <div className="flex items-center gap-2 h-[40px] px-3.5 flex-1 bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">

                <AiOutlineSearch
                  className="text-[#5b606c]"
                  size={17}
                />

                <input
                  type="text"
                  placeholder="Search bugs..."
                  className="flex-1 bg-transparent border-none outline-none text-[13.5px] text-white placeholder:text-[#5b606c]"
                />

              </div>

              {/* Project */}
              <select
                className="h-[40px] px-3 min-w-[170px] bg-[#0d0f14] border border-white/10 rounded-[8px] outline-none text-[13px] text-[#a8abb8]"
              >
                <option>All Projects</option>
                <option>Payment Gateway</option>
                <option>Inventory Sync</option>
                <option>Mobile App v2</option>
                <option>Client Portal</option>
              </select>

              {/* Status */}
              <select
                className="h-[40px] px-3 min-w-[150px] bg-[#0d0f14] border border-white/10 rounded-[8px] outline-none text-[13px] text-[#a8abb8]"
              >
                <option>All Status</option>
                <option>New</option>
                <option>In Progress</option>
                <option>Ready for QA</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>

              {/* Priority */}
              <select
                className="h-[40px] px-3 min-w-[140px] bg-[#0d0f14] border border-white/10 rounded-[8px] outline-none text-[13px] text-[#a8abb8]"
              >
                <option>All Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

            </div>

          </div>

          {/* Bugs table */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

            {/* Table header */}
            <div className="flex items-center justify-between mb-6">

              <div>
                <h2 className="text-[16px] font-semibold text-white">
                  All Bugs
                </h2>

                <p className="text-[12px] text-[#5b606c] mt-1">
                  List of bugs assigned across your projects
                </p>
              </div>

              {/* Report Bug Button */}
              <button
                type="button"
                className="flex items-center gap-2 px-4 h-10 rounded-[8px] bg-[#f0a83b] hover:bg-[#e39b2f] text-[#0d0f14] text-[13px] font-semibold transition-colors"
              >
                <FiPlus size={16} />
                Report Bug
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left border-collapse min-w-[900px]">

                <thead>

                  <tr className="border-b border-white/[0.06]">

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Bug ID
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Title
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Project
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Developer
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Status
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Priority
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Created
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {/* Bug 118 */}
                  <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer">

                    <td className="py-3.5 text-[13.5px] font-medium text-[#f0a83b]">
                      BUG-118
                    </td>

                    <td className="py-3.5 text-[14px] text-white">
                      Checkout fails on Safari
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Payment Gateway
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Rahul S.
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25">
                        In Progress
                      </span>

                    </td>

                    <td className="py-3.5 text-[13px] font-medium text-[#f26d6d]">
                      High
                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      Aug 10
                    </td>

                  </tr>

                  {/* Bug 117 */}
                  <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer">

                    <td className="py-3.5 text-[13.5px] font-medium text-[#f0a83b]">
                      BUG-117
                    </td>

                    <td className="py-3.5 text-[14px] text-white">
                      Stock count mismatch after sync
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Inventory Sync
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Arjun D.
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#576aff]/[0.12] text-[#8b98ff] border border-[#576aff]/25">
                        New
                      </span>

                    </td>

                    <td className="py-3.5 text-[13px] font-medium text-[#f0a83b]">
                      Medium
                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      Aug 10
                    </td>

                  </tr>

                  {/* Bug 116 */}
                  <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer">

                    <td className="py-3.5 text-[13.5px] font-medium text-[#f0a83b]">
                      BUG-116
                    </td>

                    <td className="py-3.5 text-[14px] text-white">
                      Push notification delay on Android
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Mobile App v2
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Fahad K.
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#c084fc]/[0.12] text-[#c084fc] border border-[#c084fc]/25">
                        Ready for QA
                      </span>

                    </td>

                    <td className="py-3.5 text-[13px] font-medium text-[#6a6f7b]">
                      Low
                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      Aug 9
                    </td>

                  </tr>

                  {/* Bug 115 */}
                  <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer">

                    <td className="py-3.5 text-[13.5px] font-medium text-[#f0a83b]">
                      BUG-115
                    </td>

                    <td className="py-3.5 text-[14px] text-white">
                      Login token expires too early
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Client Portal
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Sana R.
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/25">
                        Resolved
                      </span>

                    </td>

                    <td className="py-3.5 text-[13px] font-medium text-[#f26d6d]">
                      High
                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      Aug 9
                    </td>

                  </tr>

                  {/* Bug 114 */}
                  <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer">

                    <td className="py-3.5 text-[13.5px] font-medium text-[#f0a83b]">
                      BUG-114
                    </td>

                    <td className="py-3.5 text-[14px] text-white">
                      Dashboard chart overflow on mobile
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Mobile App v2
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Rahul S.
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-white/[0.04] text-[#6a6f7b] border border-white/10">
                        Closed
                      </span>

                    </td>

                    <td className="py-3.5 text-[13px] font-medium text-[#6a6f7b]">
                      Low
                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      Aug 8
                    </td>

                  </tr>

                  {/* Bug 113 */}
                  <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer">

                    <td className="py-3.5 text-[13.5px] font-medium text-[#f0a83b]">
                      BUG-113
                    </td>

                    <td className="py-3.5 text-[14px] text-white">
                      User session disconnects unexpectedly
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Client Portal
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Arjun D.
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#576aff]/[0.12] text-[#8b98ff] border border-[#576aff]/25">
                        New
                      </span>

                    </td>

                    <td className="py-3.5 text-[13px] font-medium text-[#f26d6d]">
                      High
                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      Aug 8
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

            {/* Pagination design */}
            <div className="flex items-center justify-between mt-5 pt-5 border-t border-white/[0.06]">

              <p className="text-[12.5px] text-[#5b606c]">
                Showing 1–6 of 32 bugs
              </p>

              <div className="flex items-center gap-1">

                <button
                  type="button"
                  className="flex items-center justify-center w-8 h-8 rounded-[7px] border border-white/[0.06] text-[#5b606c] text-[13px]"
                >
                  ‹
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-[#f0a83b]/[0.12] border border-[#f0a83b]/25 text-[#f0a83b] text-[13px]"
                >
                  1
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center w-8 h-8 rounded-[7px] border border-white/[0.06] text-[#a8abb8] text-[13px]"
                >
                  2
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center w-8 h-8 rounded-[7px] border border-white/[0.06] text-[#a8abb8] text-[13px]"
                >
                  3
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center w-8 h-8 rounded-[7px] border border-white/[0.06] text-[#5b606c] text-[13px]"
                >
                  ›
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LeadBugs;