import React from "react";
import DeveloperSidebar from "../../Components/Developer/DeveloperSidebar";
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


function DeveloperProfile() {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">

      <DeveloperSidebar />


      {/* Right Column */}
      <div className="flex-1 flex flex-col min-w-0">


        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">


          <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
            Profile
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


        {/* Main Content */}
        <div className="flex-1 p-5 lg:p-8">


          {/* Page Header */}
          <div className="mb-8">

            <h1 className="text-[22px] font-semibold text-white">
              Profile
            </h1>

            <p className="text-[14px] text-[#8b909c] mt-1">
              Manage your developer account information
            </p>

          </div>


          {/* Profile Banner */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mb-6">


            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">


              <div className="flex items-center gap-4">


                {/* Avatar */}
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#f0a83b]/[0.12] border border-[#f0a83b]/25 text-[#f0a83b] text-[20px] font-semibold">
                  DV
                </span>


                <div>

                  <h2 className="text-[18px] font-semibold text-white">
                    Developer User
                  </h2>

                  <p className="text-[13.5px] text-[#8b909c] mt-0.5">
                    developer@bugtester.com
                  </p>

                  <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25">

                    <HiOutlineShieldCheck size={13} />

                    Developer

                  </span>

                </div>

              </div>


              {/* Edit Profile */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 h-[42px] rounded-[8px] text-[14px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer shrink-0"
              >

                <MdOutlineEdit size={16} />

                Edit Profile

              </button>

            </div>

          </div>


          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">


            {/* Projects */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b] mb-4">

                <AiOutlineProject size={17} />

              </span>

              <p className="text-[24px] font-semibold text-white">
                4
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Projects Assigned
              </p>

            </div>


            {/* Bugs */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff] mb-4">

                <BsBug size={17} />

              </span>

              <p className="text-[24px] font-semibold text-white">
                47
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Bugs Resolved
              </p>

            </div>


            {/* Tasks */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80] mb-4">

                <CgProfile size={17} />

              </span>

              <p className="text-[24px] font-semibold text-white">
                32
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Tasks Completed
              </p>

            </div>

          </div>


          {/* Account Details + Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


            {/* Account Details */}
            <div className="lg:col-span-2 p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">


              <h3 className="text-[16px] font-semibold text-white mb-5">
                Account Details
              </h3>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">


                {/* Full Name */}
                <div className="flex flex-col gap-1.5">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value="Developer User"
                    readOnly
                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white outline-none"
                  />

                </div>


                {/* Email */}
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
                      developer@bugtester.com
                    </span>

                  </div>

                </div>


                {/* Phone */}
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


                {/* Role */}
                <div className="flex flex-col gap-1.5">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Role
                  </label>

                  <input
                    type="text"
                    value="Developer"
                    readOnly
                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white outline-none"
                  />

                </div>


                {/* Department */}
                <div className="flex flex-col gap-1.5">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Department
                  </label>

                  <input
                    type="text"
                    value="Software Development"
                    readOnly
                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white outline-none"
                  />

                </div>


                {/* Joined Date */}
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
                      May 12, 2026
                    </span>

                  </div>

                </div>

              </div>


              {/* Buttons */}
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


            {/* Recent Activity */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">


              <h3 className="text-[16px] font-semibold text-white mb-5">
                Recent Activity
              </h3>


              <div className="flex flex-col gap-5">


                <div className="flex items-start gap-3">

                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f0a83b] shrink-0"></span>

                  <div>

                    <p className="text-[13.5px] text-[#c7c9d1] leading-snug">
                      Completed task "Payment Integration"
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
                      Fixed bug "Login validation issue"
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
                      Updated project status
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
                      Joined "E-Commerce Platform" project
                    </p>

                    <p className="text-[12px] text-[#5b606c] mt-1">
                      1 week ago
                    </p>

                  </div>

                </div>


              </div>

            </div>

          </div>


          {/* Security */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mt-6">


            <h3 className="text-[16px] font-semibold text-white mb-5">
              Security
            </h3>


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">


              {/* Current Password */}
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


              {/* New Password */}
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


              {/* Confirm Password */}
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


export default DeveloperProfile;