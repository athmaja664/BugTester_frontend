import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBug } from "react-icons/fa6";
import {
  HiOutlineMenuAlt2,
  HiOutlineX,
  HiOutlineUsers,
  HiOutlineClipboardList,
  HiOutlineLogout,
} from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineProject } from "react-icons/ai";
import { BsBug } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { getMyProfileAPI } from "../../../../services/allAPI"; // adjust the ../ levels if needed

function LeadSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };
      const response = await getMyProfileAPI(reqHeader);
      if (response.status === 200) setProfile(response.data.user);
    } catch (err) {
      console.log("Sidebar profile error:", err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // Lock page scroll and allow Escape to close while the mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const getInitials = (name) => {
    if (!name) return "LD";
    return name
      .trim()
      .split(" ")
      .map((w) => w.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMobileOpen(false);
    navigate("/"); // change to your login route if different
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 h-[42px] rounded-[8px] text-[14px] font-medium mb-1 transition-colors ${
      isActive
        ? "bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25"
        : "text-[#a8abb8] border border-transparent hover:bg-white/[0.04] hover:text-white"
    }`;

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        className="lg:hidden fixed top-3 left-3 sm:top-5 sm:left-5 z-20 flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#161922] border border-white/[0.06] text-[#a8abb8] cursor-pointer"
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
          h-[100dvh] lg:h-screen
          w-[260px] max-w-[85vw] shrink-0
          flex flex-col
          bg-[#161922]
          border-r border-white/[0.06]
          transition-transform duration-200
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 sm:px-6 h-[64px] sm:h-[72px] shrink-0 border-b border-white/[0.06]">
          <Link
            to="/leaddashboard"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#f0a83b]">
              <FaBug className="w-[16px] h-[16px] text-[#0d0f14]" />
            </span>
            <span className="text-[17px] font-bold text-white">BugTester</span>
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="lg:hidden text-[#9ba0ac] hover:text-white cursor-pointer"
          >
            <HiOutlineX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 sm:px-4 py-5 sm:py-6">
          <p className="px-3 mb-3 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#5b606c]">
            Lead
          </p>

          <NavLink to="/leaddashboard" onClick={() => setMobileOpen(false)} className={navClass}>
            <MdSpaceDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/leadprojects" onClick={() => setMobileOpen(false)} className={navClass}>
            <AiOutlineProject size={18} />
            Projects
          </NavLink>

          <NavLink to="/leadbugs" onClick={() => setMobileOpen(false)} className={navClass}>
            <BsBug size={17} />
            Bugs
          </NavLink>

          <NavLink to="/leadteams" onClick={() => setMobileOpen(false)} className={navClass}>
            <HiOutlineUsers size={18} />
            Team
          </NavLink>

          <div className="my-4 border-t border-white/[0.06]" />

          <NavLink to="/leadprofile" onClick={() => setMobileOpen(false)} className={navClass}>
            <CgProfile size={18} />
            Profile
          </NavLink>

        </nav>

        {/* Lead information */}
        <div className="shrink-0 px-3 sm:px-4 py-4 sm:py-5 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-2 mb-3">
            <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[13px] font-semibold">
              {getInitials(profile?.name)}
            </span>

            <div className="min-w-0">
              <p className="text-[13.5px] font-medium text-white truncate">
                {profile?.name || "Loading..."}
              </p>
              <p className="text-[12px] text-[#5b606c] truncate">
                {profile?.email || ""}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 h-[42px] rounded-[8px] text-[14px] font-medium text-[#a8abb8] hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
          >
            <HiOutlineLogout size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default LeadSidebar;