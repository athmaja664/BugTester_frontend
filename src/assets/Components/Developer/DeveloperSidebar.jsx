import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBug } from "react-icons/fa6";
import {
  HiOutlineMenuAlt2,
  HiOutlineX,
  HiOutlineBell,
  HiOutlineUser,
} from "react-icons/hi";
import {
  FiGrid,
  FiFolder,
  FiAlertCircle,
  FiCheckSquare,
  FiUser,
} from "react-icons/fi";


function DeveloperSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);


  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-20 flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#161922] border border-white/[0.06] text-[#a8abb8] cursor-pointer"
      >
        <HiOutlineMenuAlt2 size={20} />
      </button>


      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}


      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40
          h-screen w-[260px] shrink-0
          flex flex-col
          bg-[#161922]
          border-r border-white/[0.06]
          transition-transform duration-200
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/[0.06]">

          <Link
            to="/developerdashboard"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5"
          >

            <span className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#f0a83b]">
              <FaBug className="w-[16px] h-[16px] text-[#0d0f14]" />
            </span>

            <span className="text-[17px] font-bold text-white">
              BugTester
            </span>

          </Link>


          {/* Mobile close */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-[#9ba0ac] hover:text-white cursor-pointer"
          >
            <HiOutlineX size={20} />
          </button>

        </div>


        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <p className="px-3 mb-3 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#5b606c]">
            Developer
          </p>


          {/* Dashboard */}
          <NavLink
            to="/developerdashboard"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 h-[42px] rounded-[8px] text-[14px] font-medium mb-1 transition-colors ${
                isActive
                  ? "bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25"
                  : "text-[#a8abb8] border border-transparent hover:bg-white/[0.04] hover:text-white"
              }`
            }
          >
            <FiGrid size={18} />
            Dashboard
          </NavLink>


          {/* Projects */}
          <NavLink
            to="/developerproject"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 h-[42px] rounded-[8px] text-[14px] font-medium mb-1 transition-colors ${
                isActive
                  ? "bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25"
                  : "text-[#a8abb8] border border-transparent hover:bg-white/[0.04] hover:text-white"
              }`
            }
          >
            <FiFolder size={18} />
            Projects
          </NavLink>


          {/* Bugs */}
          <NavLink
            to="/developerbugs"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 h-[42px] rounded-[8px] text-[14px] font-medium mb-1 transition-colors ${
                isActive
                  ? "bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25"
                  : "text-[#a8abb8] border border-transparent hover:bg-white/[0.04] hover:text-white"
              }`
            }
          >
            <FiAlertCircle size={18} />
            Bugs
          </NavLink>


          {/* My Tasks */}
          <NavLink
            to="/developertasks"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 h-[42px] rounded-[8px] text-[14px] font-medium mb-1 transition-colors ${
                isActive
                  ? "bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25"
                  : "text-[#a8abb8] border border-transparent hover:bg-white/[0.04] hover:text-white"
              }`
            }
          >
            <FiCheckSquare size={18} />
            My Tasks
          </NavLink>


          {/* Divider */}
          <div className="my-4 border-t border-white/[0.06]" />


          

          {/* Profile */}
          <NavLink
            to="/developerprofile"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 h-[42px] rounded-[8px] text-[14px] font-medium mb-1 transition-colors ${
                isActive
                  ? "bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25"
                  : "text-[#a8abb8] border border-transparent hover:bg-white/[0.04] hover:text-white"
              }`
            }
          >
            <HiOutlineUser size={18} />
            Profile
          </NavLink>

        </nav>


        {/* Developer information */}
        <div className="px-4 py-5 border-t border-white/[0.06]">

          <div className="flex items-center gap-3 px-2">

            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[13px] font-semibold">
              DV
            </span>

            <div>

              <p className="text-[13.5px] font-medium text-white">
                Developer User
              </p>

              <p className="text-[12px] text-[#5b606c]">
                Developer
              </p>

            </div>

          </div>

        </div>

      </aside>
    </>
  );
}


export default DeveloperSidebar;