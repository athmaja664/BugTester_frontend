import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../../Components/Admin/Sidebar";

import {
    AiOutlineSearch,
    AiOutlineProject,
    AiOutlinePlus,
} from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { BsBug } from "react-icons/bs";
import { MdArrowForward } from "react-icons/md";

function AdminProjects() {
    const navigate = useNavigate();

    // profile dropdown
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutsideProfile = (e) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(e.target)
            ) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutsideProfile);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutsideProfile
            );
        };
    }, []);

    return (
        <div className="flex min-h-screen bg-[#0d0f14]">

            <Sidebar />

            {/* right column */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* header */}
                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

                    <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
                        Projects
                    </h1>

                    <div className="flex items-center gap-4">

                        {/* search */}
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

                        {/* profile */}
                        <div
                            className="relative"
                            ref={profileRef}
                        >
                            <span
                                onClick={() =>
                                    setShowProfileMenu(!showProfileMenu)
                                }
                                className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-3 h-10 rounded-[8px] hover:bg-white/[0.04] cursor-pointer"
                            >
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[12.5px] font-semibold">
                                    AD
                                </span>

                                <span className="hidden sm:block text-[13.5px] font-medium text-white">
                                    Admin
                                </span>
                            </span>

                            {showProfileMenu && (
                                <div className="absolute top-full right-0 mt-2 w-44 bg-[#161922] rounded-lg shadow-lg border border-white/[0.08] py-2 z-20">

                                    <span
                                        onClick={() =>
                                            navigate("/profile")
                                        }
                                        className="block px-4 py-2 text-sm text-[#a8abb8] hover:bg-white/[0.04] hover:text-white cursor-pointer"
                                    >
                                        Profile
                                    </span>

                                    <span
                                        className="block px-4 py-2 text-sm text-[#a8abb8] hover:bg-white/[0.04] hover:text-white cursor-pointer"
                                    >
                                        Logout
                                    </span>

                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* main content */}
                <div className="flex-1 p-5 lg:p-8">

                    {/* page header */}
                    <div className="flex items-center justify-between mb-8">

                        <div>
                            <h1 className="text-[22px] font-semibold text-white">
                                Projects
                            </h1>

                            <p className="text-[14px] text-[#8b909c] mt-1">
                                Manage and monitor all BugTester projects
                            </p>
                        </div>

                        {/* Add Project */}
                        <button
                            type="button"
                            onClick={() => navigate("/admin/projects/add")}
                            className="flex items-center gap-2 px-4 h-[42px] rounded-[8px] text-[14px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer shrink-0"
                        >
                            <AiOutlinePlus size={17} />
                            Add Project
                        </button>

                    </div>

                    {/* statistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                        {/* total projects */}
                        <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                            <div className="flex items-center justify-between">

                                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                                    <AiOutlineProject size={19} />
                                </span>

                            </div>

                            <div>
                                <h2 className="text-[26px] font-semibold text-white">
                                    12
                                </h2>

                                <p className="text-[13px] text-[#8b909c] mt-0.5">
                                    Total Projects
                                </p>
                            </div>

                        </div>

                        {/* active projects */}
                        <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                            <div className="flex items-center justify-between">

                                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80]">
                                    <AiOutlineProject size={19} />
                                </span>

                            </div>

                            <div>
                                <h2 className="text-[26px] font-semibold text-white">
                                    10
                                </h2>

                                <p className="text-[13px] text-[#8b909c] mt-0.5">
                                    Active Projects
                                </p>
                            </div>

                        </div>

                        {/* on hold */}
                        <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                            <div className="flex items-center justify-between">

                                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-white/[0.06] text-[#8b909c]">
                                    <AiOutlineProject size={19} />
                                </span>

                            </div>

                            <div>
                                <h2 className="text-[26px] font-semibold text-white">
                                    2
                                </h2>

                                <p className="text-[13px] text-[#8b909c] mt-0.5">
                                    On Hold
                                </p>
                            </div>

                        </div>

                        {/* total bugs */}
                        <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                            <div className="flex items-center justify-between">

                                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff]">
                                    <BsBug size={18} />
                                </span>

                            </div>

                            <div>
                                <h2 className="text-[26px] font-semibold text-white">
                                    132
                                </h2>

                                <p className="text-[13px] text-[#8b909c] mt-0.5">
                                    Total Bugs
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* projects */}
                    <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                        <div className="flex items-center justify-between mb-6">

                            <h2 className="text-[16px] font-semibold text-white">
                                All Projects
                            </h2>

                            <Link
                                to="/admin/projects"
                                className="flex items-center gap-1.5 text-[13px] font-medium text-[#f0a83b] hover:opacity-85"
                            >
                                View all projects
                                <MdArrowForward size={15} />
                            </Link>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full text-left border-collapse min-w-[780px]">

                                <thead>
                                    <tr className="border-b border-white/[0.06]">

                                        <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                                            Project
                                        </th>

                                        <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                                            Lead
                                        </th>

                                        <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                                            Members
                                        </th>

                                        <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                                            Bugs
                                        </th>

                                        <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                                            Status
                                        </th>

                                        <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-[#5b606c]">
                                            Updated
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    <tr
                                        onClick={() =>
                                            navigate("/admin/projects/1")
                                        }
                                        className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02]"
                                    >

                                        <td className="py-3.5">

                                            <div className="flex items-center gap-2.5">

                                                <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-[#f0a83b]/[0.12] text-[#f0a83b] text-[11.5px] font-semibold shrink-0">
                                                    PG
                                                </span>

                                                <div>
                                                    <p className="text-[14px] font-medium text-white">
                                                        Payment Gateway
                                                    </p>

                                                    <p className="text-[12px] text-[#5b606c] mt-0.5">
                                                        Checkout & billing services
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                                            Meera Nair
                                        </td>

                                        <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                                            6
                                        </td>

                                        <td className="py-3.5 text-[13.5px] font-medium text-[#f0a83b]">
                                            24
                                        </td>

                                        <td className="py-3.5">

                                            <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/25">
                                                Active
                                            </span>

                                        </td>

                                        <td className="py-3.5 text-[13px] text-[#5b606c]">
                                            2 hrs ago
                                        </td>

                                    </tr>

                                    <tr
                                        onClick={() =>
                                            navigate("/admin/projects/2")
                                        }
                                        className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02]"
                                    >

                                        <td className="py-3.5">

                                            <div className="flex items-center gap-2.5">

                                                <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-[#f0a83b]/[0.12] text-[#f0a83b] text-[11.5px] font-semibold shrink-0">
                                                    IS
                                                </span>

                                                <div>
                                                    <p className="text-[14px] font-medium text-white">
                                                        Inventory Sync
                                                    </p>

                                                    <p className="text-[12px] text-[#5b606c] mt-0.5">
                                                        Warehouse stock automation
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                                            Arjun Dev
                                        </td>

                                        <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                                            4
                                        </td>

                                        <td className="py-3.5 text-[13.5px] font-medium text-[#f0a83b]">
                                            9
                                        </td>

                                        <td className="py-3.5">

                                            <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/25">
                                                Active
                                            </span>

                                        </td>

                                        <td className="py-3.5 text-[13px] text-[#5b606c]">
                                            5 hrs ago
                                        </td>

                                    </tr>

                                    <tr
                                        onClick={() =>
                                            navigate("/admin/projects/3")
                                        }
                                        className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02]"
                                    >

                                        <td className="py-3.5">

                                            <div className="flex items-center gap-2.5">

                                                <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-[#f0a83b]/[0.12] text-[#f0a83b] text-[11.5px] font-semibold shrink-0">
                                                    MA
                                                </span>

                                                <div>
                                                    <p className="text-[14px] font-medium text-white">
                                                        Mobile App v2
                                                    </p>

                                                    <p className="text-[12px] text-[#5b606c] mt-0.5">
                                                        iOS & Android client rebuild
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                                            Meera Nair
                                        </td>

                                        <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                                            8
                                        </td>

                                        <td className="py-3.5 text-[13.5px] font-medium text-[#f0a83b]">
                                            41
                                        </td>

                                        <td className="py-3.5">

                                            <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/25">
                                                Active
                                            </span>

                                        </td>

                                        <td className="py-3.5 text-[13px] text-[#5b606c]">
                                            1 day ago
                                        </td>

                                    </tr>

                                    <tr
                                        onClick={() =>
                                            navigate("/admin/projects/4")
                                        }
                                        className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02]"
                                    >

                                        <td className="py-3.5">

                                            <div className="flex items-center gap-2.5">

                                                <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-[#f0a83b]/[0.12] text-[#f0a83b] text-[11.5px] font-semibold shrink-0">
                                                    CP
                                                </span>

                                                <div>
                                                    <p className="text-[14px] font-medium text-white">
                                                        Client Portal
                                                    </p>

                                                    <p className="text-[12px] text-[#5b606c] mt-0.5">
                                                        Customer self-service dashboard
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                                            Sana Rahman
                                        </td>

                                        <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                                            3
                                        </td>

                                        <td className="py-3.5 text-[13.5px] font-medium text-[#f0a83b]">
                                            6
                                        </td>

                                        <td className="py-3.5">

                                            <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-white/[0.05] text-[#8b909c] border border-white/10">
                                                On Hold
                                            </span>

                                        </td>

                                        <td className="py-3.5 text-[13px] text-[#5b606c]">
                                            3 days ago
                                        </td>

                                    </tr>

                                    <tr
                                        onClick={() =>
                                            navigate("/admin/projects/5")
                                        }
                                        className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02]"
                                    >

                                        <td className="py-3.5">

                                            <div className="flex items-center gap-2.5">

                                                <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-[#f0a83b]/[0.12] text-[#f0a83b] text-[11.5px] font-semibold shrink-0">
                                                    NS
                                                </span>

                                                <div>
                                                    <p className="text-[14px] font-medium text-white">
                                                        Notification Service
                                                    </p>

                                                    <p className="text-[12px] text-[#5b606c] mt-0.5">
                                                        Push, email & SMS delivery
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                                            Fahad K.
                                        </td>

                                        <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                                            5
                                        </td>

                                        <td className="py-3.5 text-[13.5px] font-medium text-[#f0a83b]">
                                            17
                                        </td>

                                        <td className="py-3.5">

                                            <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#4ade80]/[0.12] text-[#4ade80] border border-[#4ade80]/25">
                                                Active
                                            </span>

                                        </td>

                                        <td className="py-3.5 text-[13px] text-[#5b606c]">
                                            6 hrs ago
                                        </td>

                                    </tr>

                                    <tr
                                        onClick={() =>
                                            navigate("/admin/projects/6")
                                        }
                                        className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02]"
                                    >

                                        <td className="py-3.5">

                                            <div className="flex items-center gap-2.5">

                                                <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-[#f0a83b]/[0.12] text-[#f0a83b] text-[11.5px] font-semibold shrink-0">
                                                    IA
                                                </span>

                                                <div>
                                                    <p className="text-[14px] font-medium text-white">
                                                        Internal Admin Tools
                                                    </p>

                                                    <p className="text-[12px] text-[#5b606c] mt-0.5">
                                                        Support & ops tooling
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                                            Devika Rao
                                        </td>

                                        <td className="py-3.5 text-[13.5px] text-[#a8abb8]">
                                            2
                                        </td>

                                        <td className="py-3.5 text-[13.5px] font-medium text-[#f0a83b]">
                                            3
                                        </td>

                                        <td className="py-3.5">

                                            <span className="inline-flex px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-white/[0.05] text-[#8b909c] border border-white/10">
                                                On Hold
                                            </span>

                                        </td>

                                        <td className="py-3.5 text-[13px] text-[#5b606c]">
                                            4 days ago
                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminProjects;