import React from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import { AiOutlineSearch, AiOutlineProject } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { BsBug } from "react-icons/bs";

function AdminProfile() {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">
      <Sidebar />

      {/* right column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

          <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
            Profile
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
              Profile
            </h1>

            <p className="text-[14px] text-[#8b909c] mt-1">
              Manage your account information
            </p>
          </div>

          {/* profile banner */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mb-6">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

              <div className="flex items-center gap-4">

                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#f0a83b]/[0.12] border border-[#f0a83b]/25 text-[#f0a83b] text-[20px] font-semibold">
                  AD
                </span>

                <div>

                  <h2 className="text-[18px] font-semibold text-white">
                    Admin User
                  </h2>

                  <p className="text-[13.5px] text-[#8b909c] mt-0.5">
                    admin@bugtester.com
                  </p>

                  <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25">
                    <HiOutlineShieldCheck size={13} />
                    Administrator
                  </span>

                </div>

              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 h-[42px] rounded-[8px] text-[14px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer shrink-0"
              >
                <MdOutlineEdit size={16} />
                Edit Profile
              </button>

            </div>

          </div>

          {/* statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b] mb-4">
                <AiOutlineProject size={17} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                6
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Projects Managed
              </p>

            </div>

            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff] mb-4">
                <BsBug size={17} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                132
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Bugs Reviewed
              </p>

            </div>

            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80] mb-4">
                <CgProfile size={17} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                38
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Team Members
              </p>

            </div>

          </div>

          {/* account details + activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* account details */}
            <div className="lg:col-span-2 p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <h3 className="text-[16px] font-semibold text-white mb-5">
                Account Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div className="flex flex-col gap-1.5">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value="Admin User"
                    readOnly
                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white outline-none"
                  />

                </div>

                <div className="flex flex-col gap-1.5">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Email Address
                  </label>

                  <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10">

                    <HiOutlineMail
                      className="text-[#5b606c]"
                      size={16}
                    />

                    <span className="text-[14px] text-white">
                      admin@bugtester.com
                    </span>

                  </div>

                </div>

                <div className="flex flex-col gap-1.5">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Phone Number
                  </label>

                  <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10">

                    <HiOutlinePhone
                      className="text-[#5b606c]"
                      size={16}
                    />

                    <span className="text-[14px] text-white">
                      +91 98765 43210
                    </span>

                  </div>

                </div>

                <div className="flex flex-col gap-1.5">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Role
                  </label>

                  <input
                    type="text"
                    value="Administrator"
                    readOnly
                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white outline-none"
                  />

                </div>

                <div className="flex flex-col gap-1.5">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Location
                  </label>

                  <input
                    type="text"
                    value="Kochi, Kerala, India"
                    readOnly
                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white outline-none"
                  />

                </div>

                <div className="flex flex-col gap-1.5">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Joined Date
                  </label>

                  <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10">

                    <HiOutlineCalendar
                      className="text-[#5b606c]"
                      size={16}
                    />

                    <span className="text-[14px] text-white">
                      Jan 12, 2026
                    </span>

                  </div>

                </div>

              </div>

              <div className="flex gap-3 mt-7">

                <button
                  type="button"
                  className="h-[42px] px-5 rounded-[8px] text-[13.5px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="h-[42px] px-5 rounded-[8px] text-[13.5px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer"
                >
                  Save Changes
                </button>

              </div>

            </div>

            {/* recent activity */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <h3 className="text-[16px] font-semibold text-white mb-5">
                Recent Activity
              </h3>

              <div className="flex flex-col gap-5">

                <div className="flex items-start gap-3">

                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f0a83b] shrink-0"></span>

                  <div>
                    <p className="text-[13.5px] text-[#c7c9d1] leading-snug">
                      Updated role permissions for Rahul S.
                    </p>

                    <p className="text-[12px] text-[#5b606c] mt-1">
                      2 hrs ago
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f0a83b] shrink-0"></span>

                  <div>
                    <p className="text-[13.5px] text-[#c7c9d1] leading-snug">
                      Approved new project "Notification Service"
                    </p>

                    <p className="text-[12px] text-[#5b606c] mt-1">
                      1 day ago
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f0a83b] shrink-0"></span>

                  <div>
                    <p className="text-[13.5px] text-[#c7c9d1] leading-snug">
                      Deactivated user account for Karan M.
                    </p>

                    <p className="text-[12px] text-[#5b606c] mt-1">
                      3 days ago
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f0a83b] shrink-0"></span>

                  <div>
                    <p className="text-[13.5px] text-[#c7c9d1] leading-snug">
                      Changed account password
                    </p>

                    <p className="text-[12px] text-[#5b606c] mt-1">
                      1 week ago
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* security */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mt-6">

            <h3 className="text-[16px] font-semibold text-white mb-5">
              Security
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

              <div className="flex flex-col gap-1.5">

                <label className="text-[12.5px] font-medium text-[#a8abb8]">
                  Current Password
                </label>

                <input
                  type="password"
                  value="password"
                  readOnly
                  className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white outline-none"
                />

              </div>

              <div className="flex flex-col gap-1.5">

                <label className="text-[12.5px] font-medium text-[#a8abb8]">
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                />

              </div>

              <div className="flex flex-col gap-1.5">

                <label className="text-[12.5px] font-medium text-[#a8abb8]">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                />

              </div>

            </div>

            <button
              type="button"
              className="h-[42px] px-5 mt-6 rounded-[8px] text-[13.5px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer"
            >
              Update Password
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminProfile;