import React from "react";
import TesterSidebar from "../../Components/Tester/TesterSidebar";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineProject,
} from "react-icons/ai";
import {
  FiMail,
  FiPhone,
  FiCalendar,
  FiCheckSquare,
  FiClock,
} from "react-icons/fi";
import { BsBug } from "react-icons/bs";

function TesterProfile() {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">

      <TesterSidebar />

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
          <div className="mb-8">

            <h1 className="text-[22px] font-semibold text-white">
              My Profile
            </h1>

            <p className="text-[14px] text-[#8b909c] mt-1">
              View and manage your tester profile information.
            </p>

          </div>

          {/* Profile Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Profile Card */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex flex-col items-center text-center">

                {/* Avatar */}
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-[#f0a83b]/[0.12] border border-[#f0a83b]/20 text-[#f0a83b]">
                  <AiOutlineUser size={42} />
                </div>

                <h2 className="text-[18px] font-semibold text-white mt-5">
                  Tester User
                </h2>

                <p className="text-[13px] text-[#8b909c] mt-1">
                  Software Tester
                </p>

                <span className="px-3 py-1 mt-3 rounded-[6px] text-[11px] font-medium bg-[#4ade80]/[0.10] text-[#4ade80] border border-[#4ade80]/20">
                  Active
                </span>

              </div>

              {/* Divider */}
              <div className="border-t border-white/[0.06] my-6"></div>

              {/* Contact */}
              <div className="space-y-4">

                <div className="flex items-center gap-3">

                  <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-white/[0.04] text-[#8b909c]">
                    <FiMail size={15} />
                  </span>

                  <div>
                    <p className="text-[11px] text-[#5b606c]">
                      Email
                    </p>

                    <p className="text-[12.5px] text-[#c7c9d1] mt-0.5">
                      tester@example.com
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-white/[0.04] text-[#8b909c]">
                    <FiPhone size={15} />
                  </span>

                  <div>
                    <p className="text-[11px] text-[#5b606c]">
                      Phone
                    </p>

                    <p className="text-[12.5px] text-[#c7c9d1] mt-0.5">
                      +91 98765 43210
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-white/[0.04] text-[#8b909c]">
                    <FiCalendar size={15} />
                  </span>

                  <div>
                    <p className="text-[11px] text-[#5b606c]">
                      Joined
                    </p>

                    <p className="text-[12.5px] text-[#c7c9d1] mt-0.5">
                      June 10, 2026
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Personal Information */}
            <div className="xl:col-span-2 p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center justify-between mb-6">

                <div>
                  <h2 className="text-[16px] font-semibold text-white">
                    Personal Information
                  </h2>

                  <p className="text-[12.5px] text-[#5b606c] mt-1">
                    Your basic account information
                  </p>
                </div>

                <AiOutlineUser
                  className="text-[#f0a83b]"
                  size={19}
                />

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* Full Name */}
                <div>
                  <label className="block text-[12px] text-[#8b909c] mb-2">
                    Full Name
                  </label>

                  <div className="h-[42px] flex items-center px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-[#c7c9d1]">
                    Tester User
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-[12px] text-[#8b909c] mb-2">
                    Role
                  </label>

                  <div className="h-[42px] flex items-center px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-[#c7c9d1]">
                    Software Tester
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[12px] text-[#8b909c] mb-2">
                    Email Address
                  </label>

                  <div className="h-[42px] flex items-center px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-[#c7c9d1]">
                    tester@example.com
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[12px] text-[#8b909c] mb-2">
                    Phone Number
                  </label>

                  <div className="h-[42px] flex items-center px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-[#c7c9d1]">
                    +91 98765 43210
                  </div>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-[12px] text-[#8b909c] mb-2">
                    Department
                  </label>

                  <div className="h-[42px] flex items-center px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-[#c7c9d1]">
                    Quality Assurance
                  </div>
                </div>

                {/* Employee ID */}
                <div>
                  <label className="block text-[12px] text-[#8b909c] mb-2">
                    Employee ID
                  </label>

                  <div className="h-[42px] flex items-center px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-[#c7c9d1]">
                    TEST-001
                  </div>
                </div>

              </div>

              {/* Edit Button */}
              <div className="flex justify-end mt-6 pt-5 border-t border-white/[0.06]">

                <button
                  type="button"
                  className="h-[38px] px-5 rounded-[8px] bg-[#f0a83b] text-[#0d0f14] text-[12.5px] font-semibold hover:bg-[#f3b24f] transition-colors cursor-pointer"
                >
                  Edit Profile
                </button>

              </div>

            </div>

          </div>

          {/* Tester Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

            {/* Projects */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center gap-3">

                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                  <AiOutlineProject size={18} />
                </span>

                <div>
                  <p className="text-[12.5px] text-[#8b909c]">
                    Assigned Projects
                  </p>

                  <p className="text-[20px] font-semibold text-white mt-0.5">
                    4
                  </p>
                </div>

              </div>

            </div>

            {/* Tests */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center gap-3">

                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#8b98ff]/[0.12] text-[#8b98ff]">
                  <FiCheckSquare size={17} />
                </span>

                <div>
                  <p className="text-[12.5px] text-[#8b909c]">
                    Tests Completed
                  </p>

                  <p className="text-[20px] font-semibold text-white mt-0.5">
                    84
                  </p>
                </div>

              </div>

            </div>

            {/* Bugs */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center gap-3">

                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f87171]/[0.12] text-[#f87171]">
                  <BsBug size={17} />
                </span>

                <div>
                  <p className="text-[12.5px] text-[#8b909c]">
                    Bugs Reported
                  </p>

                  <p className="text-[20px] font-semibold text-white mt-0.5">
                    27
                  </p>
                </div>

              </div>

            </div>

            {/* Pending */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <div className="flex items-center gap-3">

                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                  <FiClock size={17} />
                </span>

                <div>
                  <p className="text-[12.5px] text-[#8b909c]">
                    Pending Tests
                  </p>

                  <p className="text-[20px] font-semibold text-white mt-0.5">
                    16
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default TesterProfile;