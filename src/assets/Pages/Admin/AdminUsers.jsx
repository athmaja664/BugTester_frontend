import React from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import { HiDotsVertical } from "react-icons/hi";

function AdminUsers() {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">

      <Sidebar />

      {/* right column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

          <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
            Users
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


            <span className="relative flex items-center justify-center w-10 h-10 rounded-[8px] text-[#a8abb8] hover:bg-white/[0.04] hover:text-white cursor-pointer">

              <MdOutlineNotificationsNone size={20} />

              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#f0a83b]"></span>

            </span>


            <div className="relative">

              <span className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-3 h-10 rounded-[8px] hover:bg-white/[0.04] cursor-pointer">

                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[12.5px] font-semibold">
                  AD
                </span>

                <span className="hidden sm:block text-[13.5px] font-medium text-white">
                  Admin
                </span>

              </span>

            </div>

          </div>

        </div>


        {/* main content */}
        <div className="flex-1 p-5 lg:p-8">

          {/* page header */}
          <div className="flex items-center justify-between mb-8">

            <div>

              <h1 className="text-[22px] font-semibold text-white">
                Users
              </h1>

              <p className="text-[14px] text-[#8b909c] mt-1">
                Manage Admins, Leads, Developers and Testers
              </p>

            </div>


            <button
              type="button"
              className="flex items-center gap-2 px-4 h-[42px] rounded-[8px] text-[14px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer"
            >

              <AiOutlinePlus size={17} />

              Add User

            </button>

          </div>


          {/* filter panel */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px] mb-6">

            <div className="flex flex-col gap-2 flex-1">

              <label className="text-[12.5px] font-medium text-[#a8abb8]">
                Search
              </label>

              <input
                type="text"
                placeholder="Search by name or email"
                className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
              />

            </div>


            <div className="flex flex-col gap-2 w-full sm:w-[200px]">

              <label className="text-[12.5px] font-medium text-[#a8abb8]">
                Role
              </label>

              <button
                type="button"
                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer flex justify-between items-center"
              >

                All Roles

                <span className="text-[#5b606c]">
                  ▾
                </span>

              </button>

            </div>


            <button
              type="button"
              className="h-[42px] px-5 rounded-[8px] text-[13.5px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              Clear
            </button>

          </div>


          {/* users table */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

            <div className="overflow-x-auto">

              <table className="w-full text-left border-collapse min-w-[880px]">

                <thead>

                  <tr className="border-b border-white/[0.06]">

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Name
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Email
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Role
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Project
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Status
                    </th>

                    <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                      Created
                    </th>

                    <th className="pb-3"></th>

                  </tr>

                </thead>


                <tbody>

                  {/* Meera Nair */}
                  <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer">

                    <td className="py-3.5">

                      <div className="flex items-center gap-2.5">

                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[11.5px] font-semibold shrink-0">
                          MN
                        </span>

                        <span className="text-[14px] font-medium text-white">
                          Meera Nair
                        </span>

                      </div>

                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      meera.nair@bugtester.com
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#c084fc]/[0.12] text-[#c084fc] border border-[#c084fc]/25">
                        Lead
                      </span>

                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Payment Gateway
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/25">
                        Active
                      </span>

                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      Jan 12, 2026
                    </td>

                    <td className="py-3.5 text-right">

                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-full text-[#6a6f7b] hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
                      >
                        <HiDotsVertical size={16} />
                      </button>

                    </td>

                  </tr>


                  {/* Rahul S */}
                  <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer">

                    <td className="py-3.5">

                      <div className="flex items-center gap-2.5">

                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[11.5px] font-semibold shrink-0">
                          RS
                        </span>

                        <span className="text-[14px] font-medium text-white">
                          Rahul S.
                        </span>

                      </div>

                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      rahul.s@bugtester.com
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#576aff]/[0.12] text-[#8b98ff] border border-[#576aff]/25">
                        Developer
                      </span>

                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Payment Gateway
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/25">
                        Active
                      </span>

                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      Jan 15, 2026
                    </td>

                    <td className="py-3.5 text-right">

                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-full text-[#6a6f7b] hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
                      >
                        <HiDotsVertical size={16} />
                      </button>

                    </td>

                  </tr>


                  {/* Fahad K */}
                  <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer">

                    <td className="py-3.5">

                      <div className="flex items-center gap-2.5">

                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[11.5px] font-semibold shrink-0">
                          FK
                        </span>

                        <span className="text-[14px] font-medium text-white">
                          Fahad K.
                        </span>

                      </div>

                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      fahad.k@bugtester.com
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25">
                        Tester
                      </span>

                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Mobile App v2
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/25">
                        Active
                      </span>

                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      Feb 02, 2026
                    </td>

                    <td className="py-3.5 text-right">

                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-full text-[#6a6f7b] hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
                      >
                        <HiDotsVertical size={16} />
                      </button>

                    </td>

                  </tr>


                  {/* Arjun Dev */}
                  <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer">

                    <td className="py-3.5">

                      <div className="flex items-center gap-2.5">

                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[11.5px] font-semibold shrink-0">
                          AD
                        </span>

                        <span className="text-[14px] font-medium text-white">
                          Arjun Dev
                        </span>

                      </div>

                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      arjun.dev@bugtester.com
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#576aff]/[0.12] text-[#8b98ff] border border-[#576aff]/25">
                        Developer
                      </span>

                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Inventory Sync
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/25">
                        Active
                      </span>

                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      Feb 10, 2026
                    </td>

                    <td className="py-3.5 text-right">

                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-full text-[#6a6f7b] hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
                      >
                        <HiDotsVertical size={16} />
                      </button>

                    </td>

                  </tr>


                  {/* Sana Rahman */}
                  <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer">

                    <td className="py-3.5">

                      <div className="flex items-center gap-2.5">

                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[11.5px] font-semibold shrink-0">
                          SR
                        </span>

                        <span className="text-[14px] font-medium text-white">
                          Sana Rahman
                        </span>

                      </div>

                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      sana.r@bugtester.com
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#c084fc]/[0.12] text-[#c084fc] border border-[#c084fc]/25">
                        Lead
                      </span>

                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Client Portal
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-white/[0.05] text-[#8b909c] border border-white/10">
                        Inactive
                      </span>

                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      Mar 01, 2026
                    </td>

                    <td className="py-3.5 text-right">

                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-full text-[#6a6f7b] hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
                      >
                        <HiDotsVertical size={16} />
                      </button>

                    </td>

                  </tr>


                  {/* Aisha K */}
                  <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer">

                    <td className="py-3.5">

                      <div className="flex items-center gap-2.5">

                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[11.5px] font-semibold shrink-0">
                          AK
                        </span>

                        <span className="text-[14px] font-medium text-white">
                          Aisha K.
                        </span>

                      </div>

                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      aisha.k@bugtester.com
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25">
                        Tester
                      </span>

                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Payment Gateway
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/25">
                        Active
                      </span>

                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      Mar 18, 2026
                    </td>

                    <td className="py-3.5 text-right">

                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-full text-[#6a6f7b] hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
                      >
                        <HiDotsVertical size={16} />
                      </button>

                    </td>

                  </tr>


                  {/* Devika Rao */}
                  <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer">

                    <td className="py-3.5">

                      <div className="flex items-center gap-2.5">

                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[11.5px] font-semibold shrink-0">
                          DR
                        </span>

                        <span className="text-[14px] font-medium text-white">
                          Devika Rao
                        </span>

                      </div>

                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      devika.rao@bugtester.com
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#576aff]/[0.12] text-[#8b98ff] border border-[#576aff]/25">
                        Developer
                      </span>

                    </td>

                    <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                      Mobile App v2
                    </td>

                    <td className="py-3.5">

                      <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/25">
                        Active
                      </span>

                    </td>

                    <td className="py-3.5 text-[13px] text-[#5b606c]">
                      Apr 05, 2026
                    </td>

                    <td className="py-3.5 text-right">

                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-full text-[#6a6f7b] hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
                      >
                        <HiDotsVertical size={16} />
                      </button>

                    </td>

                  </tr>

                </tbody>

              </table>

            </div>


            {/* pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">

              <p className="text-[13px] text-[#5b606c]">

                Showing{" "}
                <span className="text-white font-medium">
                  1
                </span>{" "}
                to{" "}
                <span className="text-white font-medium">
                  7
                </span>{" "}
                of{" "}
                <span className="text-white font-medium">
                  7
                </span>{" "}
                users

              </p>


              <div className="flex items-center gap-2">

                <button
                  type="button"
                  className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-white/10 text-[#5b606c] cursor-not-allowed"
                  disabled
                >
                  &#10094;
                </button>

                <button
                  type="button"
                  className="w-9 h-9 rounded-[8px] text-[13px] font-medium bg-[#f0a83b] text-[#0d0f14] cursor-pointer"
                >
                  1
                </button>

                <button
                  type="button"
                  className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-white/10 text-[#5b606c] cursor-not-allowed"
                  disabled
                >
                  &#10095;
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminUsers;