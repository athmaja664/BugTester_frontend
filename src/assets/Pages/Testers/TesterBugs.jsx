import React, { useState } from "react";
import TesterSidebar from "../../Components/Tester/TesterSidebar";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBug } from "react-icons/bs";
import {
  FiArrowUpRight,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi";

function TesterBugs() {
  const [showReportModal, setShowReportModal] = useState(false);

  const [bugForm, setBugForm] = useState({
    title: "",
    project: "",
    severity: "Medium",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setBugForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReportBug = (e) => {
    e.preventDefault();

    console.log("Bug Report:", bugForm);

    setShowReportModal(false);

    setBugForm({
      title: "",
      project: "",
      severity: "Medium",
      description: "",
    });
  };

  return (
    <div className="flex min-h-screen bg-[#0d0f14]">

      <TesterSidebar />

      {/* Right Column */}
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
                placeholder="Search bugs..."
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
                My Bugs
              </h1>

              <p className="text-[14px] text-[#8b909c] mt-1">
                View and manage bugs reported during testing.
              </p>

            </div>

            <div className="flex items-center gap-3">

              {/* Bug Count */}
              <div className="flex items-center gap-2 px-3.5 h-[38px] rounded-[8px] bg-white/[0.03] border border-white/[0.06]">

                <BsBug
                  size={16}
                  className="text-[#f87171]"
                />

                <span className="text-[13px] text-[#a8abb8]">
                  25 Reported Bugs
                </span>

              </div>

              {/* Report Bug Button */}
              <button
                type="button"
                onClick={() => setShowReportModal(true)}
                className="flex items-center justify-center gap-2 h-[38px] px-4 rounded-[8px] bg-[#f0a83b] hover:bg-[#ffc15c] text-[#0d0f14] text-[12.5px] font-semibold transition-colors cursor-pointer"
              >
                <BsBug size={15} />
                Report Bug
              </button>

            </div>

          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

            {/* Total Bugs */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f87171]/[0.12] text-[#f87171] mb-4">
                <BsBug size={18} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                25
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Total Bugs
              </p>

            </div>

            {/* Open Bugs */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b] mb-4">
                <FiAlertCircle size={18} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                15
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Open Bugs
              </p>

            </div>

            {/* Resolved */}
            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80] mb-4">
                <FiCheckCircle size={18} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                10
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Resolved Bugs
              </p>

            </div>

          </div>

          {/* Bugs Section */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

              <div>

                <h2 className="text-[16px] font-semibold text-white">
                  Reported Bugs
                </h2>

                <p className="text-[12.5px] text-[#5b606c] mt-1">
                  Bugs found during project testing
                </p>

              </div>

              {/* Filter */}
              <select
                className="h-[38px] px-3 rounded-[8px] bg-[#0d0f14] border border-white/10 text-[13px] text-[#a8abb8] outline-none focus:border-[#f0a83b] cursor-pointer"
              >
                <option>All Bugs</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>

            </div>

            {/* Bug Card 1 */}
            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06] mb-4">

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#f87171]/[0.12] text-[#f87171] shrink-0">
                    <BsBug size={20} />
                  </span>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        Payment button not responding
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#f87171]/[0.12] text-[#f87171] border border-[#f87171]/20">
                        Open
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      E-Commerce Platform
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      Payment button does not respond when the user attempts to complete checkout.
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Bug
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#f87171]">
                  <FiAlertCircle size={14} />
                  High Severity
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiClock size={14} />
                  Open
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Aug 08, 2026
                </span>

              </div>

            </div>

            {/* Bug Card 2 */}
            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06] mb-4">

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#f0a83b]/[0.12] text-[#f0a83b] shrink-0">
                    <BsBug size={20} />
                  </span>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        Incorrect account balance
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/20">
                        In Progress
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Banking Dashboard
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      Account balance does not update correctly after a transaction is completed.
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Bug
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#f0a83b]">
                  <FiAlertCircle size={14} />
                  Medium Severity
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiClock size={14} />
                  In Progress
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Aug 06, 2026
                </span>

              </div>

            </div>

            {/* Bug Card 3 */}
            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06] mb-4">

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#4ade80]/[0.12] text-[#4ade80] shrink-0">
                    <BsBug size={20} />
                  </span>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        Booking confirmation displayed correctly
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/20">
                        Resolved
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Travel Booking App
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      Booking confirmation issue has been fixed and verified successfully.
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Bug
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#4ade80]">
                  <FiCheckCircle size={14} />
                  Low Severity
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#4ade80]">
                  <FiCheckCircle size={14} />
                  Resolved
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Jul 18, 2026
                </span>

              </div>

            </div>

            {/* Bug Card 4 */}
            <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06]">

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                  <span className="flex items-center justify-center w-11 h-11 rounded-[9px] bg-[#f87171]/[0.12] text-[#f87171] shrink-0">
                    <BsBug size={20} />
                  </span>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-[15px] font-semibold text-white">
                        Login session expires unexpectedly
                      </h3>

                      <span className="px-2.5 py-1 rounded-[5px] text-[10.5px] font-medium bg-[#f87171]/[0.12] text-[#f87171] border border-[#f87171]/20">
                        Open
                      </span>

                    </div>

                    <p className="text-[12.5px] text-[#5b606c] mt-1">
                      Employee Management Portal
                    </p>

                    <p className="text-[13px] text-[#8b909c] mt-3 leading-relaxed">
                      User session expires while navigating between different sections of the portal.
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 h-[38px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#f0a83b] border border-[#f0a83b]/20 hover:bg-[#f0a83b]/[0.08] transition-colors cursor-pointer shrink-0"
                >
                  View Bug
                  <FiArrowUpRight size={14} />
                </button>

              </div>

              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">

                <span className="flex items-center gap-1.5 text-[12px] text-[#f87171]">
                  <FiAlertCircle size={14} />
                  High Severity
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <FiClock size={14} />
                  Open
                </span>

                <span className="flex items-center gap-1.5 text-[12px] text-[#8b909c]">
                  <HiOutlineCalendar size={14} />
                  Aug 04, 2026
                </span>

              </div>

            </div>

          </div>

          {/* Bug Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {/* Bug Status */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <h2 className="text-[16px] font-semibold text-white mb-5">
                Bug Status
              </h2>

              <div className="flex items-center justify-between p-4 rounded-[10px] bg-white/[0.02] border border-white/[0.06]">

                <div className="flex items-center gap-3">

                  <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f87171]/[0.12] text-[#f87171]">
                    <BsBug size={17} />
                  </span>

                  <div>

                    <p className="text-[13.5px] font-medium text-white">
                      Open Bugs
                    </p>

                    <p className="text-[12px] text-[#5b606c] mt-0.5">
                      Bugs waiting to be resolved
                    </p>

                  </div>

                </div>

                <span className="text-[13px] font-semibold text-[#f87171]">
                  15
                </span>

              </div>

            </div>

            {/* Resolved Bugs */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <h2 className="text-[16px] font-semibold text-white mb-5">
                Resolution Status
              </h2>

              <div className="flex items-center justify-between p-4 rounded-[10px] bg-white/[0.02] border border-white/[0.06]">

                <div className="flex items-center gap-3">

                  <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80]">
                    <FiCheckCircle size={17} />
                  </span>

                  <div>

                    <p className="text-[13.5px] font-medium text-white">
                      Resolved Bugs
                    </p>

                    <p className="text-[12px] text-[#5b606c] mt-0.5">
                      Bugs fixed and verified
                    </p>

                  </div>

                </div>

                <span className="text-[13px] font-semibold text-[#4ade80]">
                  10
                </span>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ===================================================== */}
      {/* REPORT BUG MODAL */}
      {/* ===================================================== */}

      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm">

          <div className="w-full max-w-[520px] bg-[#161922] border border-white/[0.08] rounded-[14px] shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">

              <div className="flex items-center gap-3">

                <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f87171]/[0.12] text-[#f87171]">
                  <BsBug size={18} />
                </span>

                <div>
                  <h2 className="text-[16px] font-semibold text-white">
                    Report a Bug
                  </h2>

                  <p className="text-[12px] text-[#5b606c] mt-1">
                    Submit a bug found during testing
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="flex items-center justify-center w-8 h-8 rounded-[7px] text-[#5b606c] hover:text-white hover:bg-white/[0.05] cursor-pointer"
              >
                <FiX size={18} />
              </button>

            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleReportBug}
              className="p-6"
            >

              {/* Bug Title */}
              <div className="mb-5">

                <label className="block text-[12.5px] font-medium text-[#c7c9d1] mb-2">
                  Bug Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={bugForm.title}
                  onChange={handleInputChange}
                  placeholder="Enter bug title"
                  required
                  className="w-full h-[42px] px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/10 outline-none text-[13px] text-white placeholder:text-[#5b606c] focus:border-[#f0a83b]/50"
                />

              </div>

              {/* Project */}
              <div className="mb-5">

                <label className="block text-[12.5px] font-medium text-[#c7c9d1] mb-2">
                  Project
                </label>

                <select
                  name="project"
                  value={bugForm.project}
                  onChange={handleInputChange}
                  required
                  className="w-full h-[42px] px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/10 outline-none text-[13px] text-[#a8abb8] focus:border-[#f0a83b]/50 cursor-pointer"
                >
                  <option value="">Select project</option>
                  <option value="E-Commerce Platform">
                    E-Commerce Platform
                  </option>
                  <option value="Banking Dashboard">
                    Banking Dashboard
                  </option>
                  <option value="Travel Booking App">
                    Travel Booking App
                  </option>
                  <option value="Employee Management Portal">
                    Employee Management Portal
                  </option>
                </select>

              </div>

              {/* Severity */}
              <div className="mb-5">

                <label className="block text-[12.5px] font-medium text-[#c7c9d1] mb-2">
                  Severity
                </label>

                <select
                  name="severity"
                  value={bugForm.severity}
                  onChange={handleInputChange}
                  className="w-full h-[42px] px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/10 outline-none text-[13px] text-[#a8abb8] focus:border-[#f0a83b]/50 cursor-pointer"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>

              </div>

              {/* Description */}
              <div className="mb-6">

                <label className="block text-[12.5px] font-medium text-[#c7c9d1] mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={bugForm.description}
                  onChange={handleInputChange}
                  placeholder="Describe the bug, steps to reproduce, expected behavior, and actual behavior..."
                  rows={5}
                  required
                  className="w-full px-3.5 py-3 rounded-[8px] bg-[#0d0f14] border border-white/10 outline-none text-[13px] leading-5 text-white placeholder:text-[#5b606c] focus:border-[#f0a83b]/50 resize-none"
                />

              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="h-[40px] px-4 rounded-[8px] text-[12.5px] font-medium text-[#a8abb8] border border-white/[0.08] hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 h-[40px] px-5 rounded-[8px] bg-[#f0a83b] hover:bg-[#ffc15c] text-[#0d0f14] text-[12.5px] font-semibold transition-colors cursor-pointer"
                >
                  <BsBug size={15} />
                  Submit Bug
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default TesterBugs;