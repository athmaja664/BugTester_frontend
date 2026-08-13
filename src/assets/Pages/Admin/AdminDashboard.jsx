import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../../Components/Admin/Sidebar";
import { HiOutlineUsers } from "react-icons/hi";
import { AiOutlineProject, AiOutlineSearch } from "react-icons/ai";
import { BsBug, BsCheckCircle } from "react-icons/bs";
import { MdOutlineBugReport, MdArrowForward } from "react-icons/md";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#0d0f14]">
      <Sidebar />

      {/* right column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

          <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
            Dashboard
          </h1>

          <div className="flex items-center gap-4">

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

            <div className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-3 h-10 rounded-[8px] hover:bg-white/[0.04] cursor-pointer">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[12.5px] font-semibold">
                AD
              </span>

              <span className="hidden sm:block text-[13.5px] font-medium text-white">
                Admin
              </span>
            </div>

          </div>
        </div>

        {/* main content */}
        <div className="flex-1 p-5 lg:p-8">

          {/* page header */}
          <div className="mb-8">
            <h1 className="text-[22px] font-semibold text-white">
              Admin Dashboard
            </h1>

            <p className="text-[14px] text-[#8b909c] mt-1">
              Overview of your BugTester workspace
            </p>
          </div>

          {/* statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">

            {/* Total Users */}
            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff]">
                  <HiOutlineUsers size={19} />
                </span>

                <span className="flex items-center gap-1 text-[12px] text-[#4ade80]">
                  <FiTrendingUp size={13} />
                  +4
                </span>

              </div>

              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  38
                </h2>

                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  Total Users
                </p>
              </div>

            </div>

            {/* Total Projects */}
            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#c084fc]/[0.12] text-[#c084fc]">
                  <AiOutlineProject size={19} />
                </span>

                <span className="flex items-center gap-1 text-[12px] text-[#4ade80]">
                  <FiTrendingUp size={13} />
                  +2
                </span>

              </div>

              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  12
                </h2>

                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  Total Projects
                </p>
              </div>

            </div>

            {/* Total Bugs */}
            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                  <BsBug size={18} />
                </span>

                <span className="flex items-center gap-1 text-[12px] text-[#4ade80]">
                  <FiTrendingUp size={13} />
                  +18
                </span>

              </div>

              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  132
                </h2>

                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  Total Bugs
                </p>
              </div>

            </div>

            {/* Open Bugs */}
            <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between">

                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#f26d6d]/[0.12] text-[#f26d6d]">
                  <MdOutlineBugReport size={19} />
                </span>

                <span className="flex items-center gap-1 text-[12px] text-[#f26d6d]">
                  <FiTrendingDown size={13} />
                  -3
                </span>

              </div>

              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  46
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
                  <BsCheckCircle size={17} />
                </span>

                <span className="flex items-center gap-1 text-[12px] text-[#4ade80]">
                  <FiTrendingUp size={13} />
                  +9
                </span>

              </div>

              <div>
                <h2 className="text-[26px] font-semibold text-white">
                  86
                </h2>

                <p className="text-[13px] text-[#8b909c] mt-0.5">
                  Resolved Bugs
                </p>
              </div>

            </div>

          </div>

          {/* recent projects */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mb-8">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-[16px] font-semibold text-white">
                Recent Projects
              </h2>

              <Link
                to="/admin/projects"
                className="flex items-center gap-1.5 text-[13px] font-medium text-[#f0a83b] hover:opacity-85"
              >
                View all projects
                <MdArrowForward size={15} />
              </Link>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left border-collapse min-w-[640px]">

                <thead>
                  <tr className="border-b border-white/[0.06]">

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Project
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Lead
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Members
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Bugs
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Status
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Updated
                    </th>

                  </tr>
                </thead>

                <tbody>

                  <tr
                    onClick={() => navigate("/admin/projects/1")}
                    className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02]"
                  >
                    <td className="py-3.5 text-[14px] font-medium text-white">
                      Payment Gateway
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Meera Nair
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      6
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      24
                    </td>

                    <td className="py-3.5">
                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/25">
                        Active
                      </span>
                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      2 hrs ago
                    </td>
                  </tr>

                  <tr
                    onClick={() => navigate("/admin/projects/2")}
                    className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02]"
                  >
                    <td className="py-3.5 text-[14px] font-medium text-white">
                      Inventory Sync
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Arjun Dev
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      4
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      9
                    </td>

                    <td className="py-3.5">
                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/25">
                        Active
                      </span>
                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      5 hrs ago
                    </td>
                  </tr>

                  <tr
                    onClick={() => navigate("/admin/projects/3")}
                    className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02]"
                  >
                    <td className="py-3.5 text-[14px] font-medium text-white">
                      Mobile App v2
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Meera Nair
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      8
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      41
                    </td>

                    <td className="py-3.5">
                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/25">
                        Active
                      </span>
                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      1 day ago
                    </td>
                  </tr>

                  <tr
                    onClick={() => navigate("/admin/projects/4")}
                    className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02]"
                  >
                    <td className="py-3.5 text-[14px] font-medium text-white">
                      Client Portal
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Sana Rahman
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      3
                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      6
                    </td>

                    <td className="py-3.5">
                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-white/[0.05] text-[#8b909c] border border-white/10">
                        On Hold
                      </span>
                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      3 days ago
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

          {/* recent bugs */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-[16px] font-semibold text-white">
                Recent Bugs
              </h2>

              <Link
                to="/admin/bugs"
                className="flex items-center gap-1.5 text-[13px] font-medium text-[#f0a83b] hover:opacity-85"
              >
                View all bugs
                <MdArrowForward size={15} />
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

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Date
                    </th>

                  </tr>
                </thead>

                <tbody>

                  <tr
                    onClick={() => navigate("/bugs/BUG-118")}
                    className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02]"
                  >
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

                  <tr
                    onClick={() => navigate("/bugs/BUG-117")}
                    className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02]"
                  >
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
                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-white/[0.05] text-[#a8abb8] border border-white/10">
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

                  <tr
                    onClick={() => navigate("/bugs/BUG-116")}
                    className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02]"
                  >
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

                  <tr
                    onClick={() => navigate("/bugs/BUG-115")}
                    className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02]"
                  >
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

                  <tr
                    onClick={() => navigate("/bugs/BUG-114")}
                    className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02]"
                  >
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

                </tbody>

              </table>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;