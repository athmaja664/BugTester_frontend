import React from "react";
import { FaBug } from "react-icons/fa6";
import { HiOutlineShieldCheck, HiOutlineArrowLeft } from "react-icons/hi";
import { HiOutlineOfficeBuilding, HiOutlineMail, HiOutlineCalendar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function SuperAdminOrgDetail() {
     const navigate = useNavigate();
  return (
    <div
      className="min-h-screen font-['DM_Sans',sans-serif] relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 900px 600px at 15% 10%, rgba(240,168,59,0.10), transparent 60%), radial-gradient(ellipse 900px 700px at 85% 90%, rgba(87,106,255,0.14), transparent 60%), #0d0f14",
      }}
    >
      {/* ambient grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-10 py-10 max-[640px]:px-5 max-[640px]:py-7">

        {/* navbar */}
        <header className="flex items-center justify-between mb-10 max-[640px]:flex-col max-[640px]:gap-5 max-[640px]:items-start">
          <a href="#" aria-label="BugTester home" className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]">
              <FaBug className="w-[18px] h-[18px] text-[#0d0f14]" />
            </span>
            <span className="text-[19px] font-bold tracking-tight text-white">
              BugTester
            </span>
          </a>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/10">
            <HiOutlineShieldCheck className="w-4 h-4 text-[#f0a83b]" />
            <span className="text-[13px] font-medium text-[#a8abb8]">
              PLATFORM ACCESS
            </span>
          </div>
        </header>

        {/* back link */}
        <button onClick={() => navigate("/superadmin/dashboard")} className="flex items-center gap-2 text-sm text-[#a8abb8] hover:text-white mb-6">
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Organizations
        </button>

        {/* org header card */}
        <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] p-7 mb-6 flex items-center justify-between max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-5">
          <div className="flex items-center gap-4">
            <span className="flex items-center justify-center w-14 h-14 rounded-[12px] bg-white/[0.04] border border-white/10">
              <HiOutlineOfficeBuilding className="w-6 h-6 text-[#f0a83b]" />
            </span>
            <div>
              <h1 className="text-xl font-semibold text-white">Mindlabs</h1>
              <div className="flex items-center gap-4 mt-1.5">
                <span className="flex items-center gap-1.5 text-sm text-[#6a6f7b]">
                  <HiOutlineMail className="w-4 h-4" />
                  contact@mindlabs.com
                </span>
                <span className="flex items-center gap-1.5 text-sm text-[#6a6f7b]">
                  <HiOutlineCalendar className="w-4 h-4" />
                  Joined 15 Sep 2026
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-[#4ade80]/10 text-[#4ade80] text-xs font-medium px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
              Active
            </span>
            <button className="h-[42px] px-4 text-sm font-medium text-[#f87171] bg-[#f87171]/10 border border-[#f87171]/20 rounded-[3px] hover:bg-[#f87171]/20">
              Deactivate
            </button>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] p-6">
            <p className="text-sm text-[#6a6f7b]">Total Members</p>
            <p className="text-3xl font-bold text-white mt-2">33</p>
          </div>
          <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] p-6">
            <p className="text-sm text-[#6a6f7b]">Active Projects</p>
            <p className="text-3xl font-bold text-white mt-2">5</p>
          </div>
          <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] p-6">
            <p className="text-sm text-[#6a6f7b]">Open Bugs</p>
            <p className="text-3xl font-bold text-white mt-2">6</p>
          </div>
        </div>

        {/* members table */}
        <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06]">
            <h2 className="text-base font-semibold text-white">Members</h2>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-[#6a6f7b] text-xs uppercase tracking-wide">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              <tr>
                <td className="px-6 py-4 text-white font-medium">Athmaja</td>
                <td className="px-6 py-4 text-[#a8abb8] text-sm">athmaja@mindlabs.com</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-[#f0a83b] bg-[#f0a83b]/10 px-2.5 py-1 rounded-full">
                    Administrator
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-white font-medium">Sample Lead</td>
                <td className="px-6 py-4 text-[#a8abb8] text-sm">lead@mindlabs.com</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-[#a78bfa] bg-[#a78bfa]/10 px-2.5 py-1 rounded-full">
                    Lead
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default SuperAdminOrgDetail;