import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBug } from "react-icons/fa6";
import { HiOutlineShieldCheck, HiOutlineCreditCard, HiOutlineArrowLeft } from "react-icons/hi";

function SuperAdminBilling() {
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
        <button
          onClick={() => navigate("/superadmin/dashboard")}
          className="flex items-center gap-2 text-sm text-[#a8abb8] hover:text-white mb-6"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* page title */}
        <div className="flex items-center gap-3 mb-8">
          <span className="flex items-center justify-center w-11 h-11 rounded-[10px] bg-[#f0a83b]/10">
            <HiOutlineCreditCard className="w-5 h-5 text-[#f0a83b]" />
          </span>
          <div>
            <h1 className="text-[26px] font-semibold text-white">Billing</h1>
            <p className="text-sm text-[#6a6f7b] mt-1">Track which client organizations are active or inactive</p>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] p-6">
            <p className="text-sm text-[#6a6f7b]">Paying Clients</p>
            <p className="text-3xl font-bold text-[#4ade80] mt-2">2</p>
          </div>
          <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] p-6">
            <p className="text-sm text-[#6a6f7b]">Overdue / Inactive</p>
            <p className="text-3xl font-bold text-[#f87171] mt-2">0</p>
          </div>
          <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] p-6">
            <p className="text-sm text-[#6a6f7b]">Total Organizations</p>
            <p className="text-3xl font-bold text-white mt-2">2</p>
          </div>
        </div>

        {/* billing table */}
        <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06]">
            <h2 className="text-base font-semibold text-white">Organization Billing Status</h2>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-[#6a6f7b] text-xs uppercase tracking-wide">
                <th className="px-6 py-3 font-medium">Organization</th>
                <th className="px-6 py-3 font-medium">Contact Email</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Member Since</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              <tr>
                <td className="px-6 py-4 text-white font-medium">Mindlabs</td>
                <td className="px-6 py-4 text-[#a8abb8] text-sm">contact@mindlabs.com</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 bg-[#4ade80]/10 text-[#4ade80] text-xs font-medium px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-[#6a6f7b] text-sm">15 Sep 2026</td>
                <td className="px-6 py-4">
                  <button className="h-[38px] px-4 text-sm font-medium text-[#f87171] bg-[#f87171]/10 border border-[#f87171]/20 rounded-[3px] hover:bg-[#f87171]/20">
                    Mark Inactive
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-white font-medium">XX</td>
                <td className="px-6 py-4 text-[#a8abb8] text-sm">contact@xx.com</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 bg-[#4ade80]/10 text-[#4ade80] text-xs font-medium px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-[#6a6f7b] text-sm">16 Sep 2026</td>
                <td className="px-6 py-4">
                  <button className="h-[38px] px-4 text-sm font-medium text-[#f87171] bg-[#f87171]/10 border border-[#f87171]/20 rounded-[3px] hover:bg-[#f87171]/20">
                    Mark Inactive
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default SuperAdminBilling;