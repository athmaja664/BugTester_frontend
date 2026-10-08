import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBug } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import {
  HiOutlineUsers,
  HiOutlineLogout,
  HiOutlineMenuAlt2,
  HiOutlineX,
  HiOutlineClipboardList,
} from "react-icons/hi";
import { AiOutlineProject } from "react-icons/ai";
import { BsBug } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  //logged-in admin details from localStorage
  const storedUser = localStorage.getItem('user')
  let adminUser = {}
  if (storedUser) {
    adminUser = JSON.parse(storedUser)
  }

  const adminName = adminUser.name || "Admin User"
  const adminEmail = adminUser.email || "admin@bugtester.com"

  //builds initials from the admin's name for the avatar circle
  const getInitials = (name) => {
    if (!name) {
      return "AD"
    }
    const parts = name.trim().split(" ")
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase()
    }
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }

const handleLogout = () => {
    setMobileOpen(false)
    navigate('/')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-20 flex items-center justify-center w-10 h-10 rounded-[8px] bg-white border border-[#e5e7eb] text-[#4b5563] cursor-pointer shadow-sm"
      >
        <HiOutlineMenuAlt2 size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40
          h-screen w-[260px] shrink-0
          flex flex-col
          bg-white
          border-r border-[#e5e7eb]
          transition-transform duration-200
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-[#e5e7eb]">
          
          <Link
            to="/admindashboard"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#f0a83b]">
              <FaBug className="w-[16px] h-[16px] text-[#0d0f14]" />
            </span>

            <span className="text-[17px] font-bold text-[#111827]">
              BugTester
            </span>
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-[#6b7280] hover:text-[#111827] cursor-pointer"
          >
            <HiOutlineX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <p className="px-3 mb-3 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#9ca3af]">
            Admin
          </p>

          {/* Dashboard */}
          <NavLink
            to="/admindashboard"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 h-[42px] rounded-[8px] text-[14px] font-medium mb-1 transition-colors ${
                isActive
                  ? "bg-[#f0a83b]/[0.15] text-[#b36b00] border border-[#f0a83b]/40"
                  : "text-[#4b5563] border border-transparent hover:bg-[#f3f4f6] hover:text-[#111827]"
              }`
            }
          >
            <MdSpaceDashboard size={18} />
            Dashboard
          </NavLink>

          {/* Users */}
          <NavLink
            to="/adminusers"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 h-[42px] rounded-[8px] text-[14px] font-medium mb-1 transition-colors ${
                isActive
                  ? "bg-[#f0a83b]/[0.15] text-[#b36b00] border border-[#f0a83b]/40"
                  : "text-[#4b5563] border border-transparent hover:bg-[#f3f4f6] hover:text-[#111827]"
              }`
            }
          >
            <HiOutlineUsers size={18} />
            Users
          </NavLink>

          {/* Projects */}
          <NavLink
            to="/adminprojects"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 h-[42px] rounded-[8px] text-[14px] font-medium mb-1 transition-colors ${
                isActive
                  ? "bg-[#f0a83b]/[0.15] text-[#b36b00] border border-[#f0a83b]/40"
                  : "text-[#4b5563] border border-transparent hover:bg-[#f3f4f6] hover:text-[#111827]"
              }`
            }
          >
            <AiOutlineProject size={18} />
            Projects
          </NavLink>

          {/* Bugs */}
          <NavLink
            to="/adminbugs"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 h-[42px] rounded-[8px] text-[14px] font-medium mb-1 transition-colors ${
                isActive
                  ? "bg-[#f0a83b]/[0.15] text-[#b36b00] border border-[#f0a83b]/40"
                  : "text-[#4b5563] border border-transparent hover:bg-[#f3f4f6] hover:text-[#111827]"
              }`
            }
          >
            <BsBug size={17} />
            Bugs
          </NavLink>
 <div className="my-4 border-t border-[#e5e7eb]" />
          {/* Profile */}
          <NavLink
            to="/adminprofile"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 h-[42px] rounded-[8px] text-[14px] font-medium mb-1 transition-colors ${
                isActive
                  ? "bg-[#f0a83b]/[0.15] text-[#b36b00] border border-[#f0a83b]/40"
                  : "text-[#4b5563] border border-transparent hover:bg-[#f3f4f6] hover:text-[#111827]"
              }`
            }
          >
            <CgProfile size={18} />
            Profile
          </NavLink>


        </nav>

        {/* Admin information */}
        <div className="px-4 py-5 border-t border-[#e5e7eb]">

          <div className="flex items-center gap-3 px-2 mb-3">

            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f3f4f6] text-[#4b5563] text-[13px] font-semibold">
              {getInitials(adminName)}
            </span>

            <div>
              <p className="text-[13.5px] font-medium text-[#111827]">
                {adminName}
              </p>

              <p className="text-[12px] text-[#6b7280]">
                {adminEmail}
              </p>
            </div>

          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 h-[42px] rounded-[8px] text-[14px] font-medium text-[#4b5563] hover:bg-[#f3f4f6] hover:text-[#111827] transition-colors cursor-pointer"
          >
            <HiOutlineLogout size={18} />
            Logout
          </button>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;