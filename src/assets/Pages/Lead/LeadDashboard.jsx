import React from "react";
import { Link } from "react-router-dom";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiUsers,
  FiFolder,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import LeadSidebar from "../../Components/Lead/LeadSidebar";

function LeadDashboard() {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">
      <LeadSidebar />

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

            {/* Profile */}
            <div className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-3 h-10 rounded-[8px] hover:bg-white/[0.04] cursor-pointer">

              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[12.5px] font-semibold">
                LD
              </span>

              <span className="hidden sm:block text-[13.5px] font-medium text-white">
                Lead
              </span>

            </div>

          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 lg:p-8">

          {/* Page Header */}
          <div className="mb-8">

            <h1 className="text-[22px] font-semibold text-white">
              Lead Dashboard
            </h1>

            <p className="text-[14px] text-[#8b909c] mt-1">
              Overview of your projects, bugs and team activity
            </p>

          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            {/* Total Projects */}
            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff]">
                  <FiFolder size={19} />
                </span>

                <span className="flex items-center gap-1 text-[12px] text-[#4ade80]">
                  <FiTrendingUp size={13} />
                  +2
                </span>

              </div>

              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  8
                </h2>

                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  Total Projects
                </p>
              </div>

            </div>

            {/* Team Members */}
            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#c084fc]/[0.12] text-[#c084fc]">
                  <FiUsers size={19} />
                </span>

                <span className="flex items-center gap-1 text-[12px] text-[#4ade80]">
                  <FiTrendingUp size={13} />
                  +3
                </span>

              </div>

              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  24
                </h2>

                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  Team Members
                </p>
              </div>

            </div>

            {/* Open Bugs */}
            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                  <FiAlertCircle size={19} />
                </span>

                <span className="flex items-center gap-1 text-[12px] text-[#f26d6d]">
                  <FiTrendingDown size={13} />
                  -4
                </span>

              </div>

              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  32
                </h2>

                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  Open Bugs
                </p>
              </div>

            </div>

            {/* Resolved Bugs */}
            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80]">
                  <FiCheckCircle size={19} />
                </span>

                <span className="flex items-center gap-1 text-[12px] text-[#4ade80]">
                  <FiTrendingUp size={13} />
                  +12
                </span>

              </div>

              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  76
                </h2>

                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  Resolved Bugs
                </p>
              </div>

            </div>

          </div>

          {/* Team Activity */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mb-7">

            <h2 className="text-[16px] font-semibold text-white mb-6">
              Team Activity
            </h2>

            <div className="flex flex-col gap-5">

              {/* Activity 1 */}
              <div className="flex items-start gap-3">

                <div className="w-8 h-8 rounded-full bg-[#576aff]/[0.12] text-[#8b98ff] flex items-center justify-center text-[11px] font-semibold">
                  RS
                </div>

                <div>
                  <p className="text-[13px] text-[#e8e9ed]">
                    Rahul resolved BUG-104
                  </p>

                  <p className="text-[12px] text-[#5b606c] mt-1">
                    20 min ago
                  </p>
                </div>

              </div>

              {/* Activity 2 */}
              <div className="flex items-start gap-3">

                <div className="w-8 h-8 rounded-full bg-[#c084fc]/[0.12] text-[#c084fc] flex items-center justify-center text-[11px] font-semibold">
                  AD
                </div>

                <div>
                  <p className="text-[13px] text-[#e8e9ed]">
                    Arjun created a new bug
                  </p>

                  <p className="text-[12px] text-[#5b606c] mt-1">
                    1 hr ago
                  </p>
                </div>

              </div>

              {/* Activity 3 */}
              <div className="flex items-start gap-3">

                <div className="w-8 h-8 rounded-full bg-[#f0a83b]/[0.12] text-[#f0a83b] flex items-center justify-center text-[11px] font-semibold">
                  FK
                </div>

                <div>
                  <p className="text-[13px] text-[#e8e9ed]">
                    Fahad moved BUG-116 to QA
                  </p>

                  <p className="text-[12px] text-[#5b606c] mt-1">
                    2 hrs ago
                  </p>
                </div>

              </div>

              {/* Activity 4 */}
              <div className="flex items-start gap-3">

                <div className="w-8 h-8 rounded-full bg-[#4ade80]/[0.12] text-[#4ade80] flex items-center justify-center text-[11px] font-semibold">
                  SK
                </div>

                <div>
                  <p className="text-[13px] text-[#e8e9ed]">
                    Sana completed a task
                  </p>

                  <p className="text-[12px] text-[#5b606c] mt-1">
                    3 hrs ago
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Recent Bugs */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-[16px] font-semibold text-white">
                Recent Bugs
              </h2>

              <Link
                to="/lead/bugs"
                className="flex items-center gap-1.5 text-[13px] font-medium text-[#f0a83b] hover:opacity-85"
              >
                View all bugs
                <FiArrowRight size={15} />
              </Link>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left border-collapse min-w-[720px]">

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

                  </tr>

                </thead>

                <tbody>

                  {/* BUG 118 */}
                  <tr className="border-b border-white/[0.04]">

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

                  </tr>

                  {/* BUG 117 */}
                  <tr className="border-b border-white/[0.04]">

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

                  </tr>

                  {/* BUG 116 */}
                  <tr>

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

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default LeadDashboard;