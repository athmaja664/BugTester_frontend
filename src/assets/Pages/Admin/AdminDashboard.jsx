import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../../Components/Admin/Sidebar";
import { HiOutlineUsers } from "react-icons/hi";
import { AiOutlineProject, AiOutlineSearch } from "react-icons/ai";
import { BsBug, BsCheckCircle } from "react-icons/bs";
import { MdOutlineBugReport, MdArrowForward } from "react-icons/md";
import toast from "react-hot-toast";
import { getUsersAPI, getProjectsAPI, getBugsAPI } from "../../../../services/allAPI";

function AdminDashboard() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [bugs, setBugs] = useState([]);

    const [projectSearch, setProjectSearch] = useState("");
    const [bugSearch, setBugSearch] = useState("");

    const [projectPage, setProjectPage] = useState(1);
    const [bugPage, setBugPage] = useState(1);

    const token = localStorage.getItem('token');

    const statusColors = {
        "New": "bg-white/[0.05] text-[#a8abb8] border-white/10",
        "Assigned": "bg-[#576aff]/[0.12] text-[#8b98ff] border-[#576aff]/25",
        "In Progress": "bg-[#f0a83b]/[0.12] text-[#f0a83b] border-[#f0a83b]/25",
        "Resolved": "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/25",
        "Ready for QA": "bg-[#c084fc]/[0.12] text-[#c084fc] border-[#c084fc]/25",
        "Retest": "bg-[#c084fc]/[0.12] text-[#c084fc] border-[#c084fc]/25",
        "Verified": "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/25",
        "Closed": "bg-white/[0.04] text-[#6a6f7b] border-white/10",
    }

    const priorityColors = {
        Low: "text-[#6a6f7b]",
        Medium: "text-[#f0a83b]",
        High: "text-[#f26d6d]",
        Critical: "text-[#f26d6d]",
    }

    const projectStatusColors = {
        "Planning": "bg-white/[0.05] text-[#8b909c] border-white/10",
        "In Progress": "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/25",
        "Completed": "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/25",
        "On Hold": "bg-white/[0.05] text-[#8b909c] border-white/10",
    }

    const getUsers = async () => {
        const reqHeader = { Authorization: `Bearer ${token}` }
        const response = await getUsersAPI(reqHeader)
        if (response.status === 200) {
            setUsers(response.data.users)
        } else {
            toast.error('Failed to fetch users')
        }
    }

    const getProjects = async () => {
        const reqHeader = { Authorization: `Bearer ${token}` }
        const response = await getProjectsAPI(reqHeader)
        if (response.status === 200) {
            setProjects(response.data.projects)
        } else {
            toast.error('Failed to fetch projects')
        }
    }

    const getBugs = async () => {
        const reqHeader = { Authorization: `Bearer ${token}` }
        const response = await getBugsAPI(reqHeader)
        if (response.status === 200) {
            setBugs(response.data)
        } else {
            toast.error('Failed to fetch bugs')
        }
    }

    useEffect(() => {
        getUsers()
        getProjects()
        getBugs()
    }, [])

    useEffect(() => {
        setProjectPage(1)
    }, [projectSearch])

    useEffect(() => {
        setBugPage(1)
    }, [bugSearch])

    const totalUsers = users.length
    const totalProjects = projects.length
    const totalBugs = bugs.length
    const openBugs = bugs.filter((item) => item.status !== 'Resolved' && item.status !== 'Verified' && item.status !== 'Closed').length
    const resolvedBugs = bugs.filter((item) => item.status === 'Resolved' || item.status === 'Verified' || item.status === 'Closed').length

    //projects filtered and sorted, before pagination
    const filteredProjects = [...projects]
        .filter((item) => item.name?.toLowerCase().includes(projectSearch.toLowerCase()))
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

    //bugs filtered and sorted, before pagination
    const filteredBugs = [...bugs]
        .filter((item) =>
            item.title?.toLowerCase().includes(bugSearch.toLowerCase()) ||
            `BUG-${item.id}`.toLowerCase().includes(bugSearch.toLowerCase())
        )
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    const projectsPerPage = 4
    const projectLastIndex = projectPage * projectsPerPage
    const projectFirstIndex = projectLastIndex - projectsPerPage
    const paginatedProjects = filteredProjects.slice(projectFirstIndex, projectLastIndex)
    const totalProjectPages = Math.ceil(filteredProjects.length / projectsPerPage)

    const bugsPerPage = 6
    const bugLastIndex = bugPage * bugsPerPage
    const bugFirstIndex = bugLastIndex - bugsPerPage
    const paginatedBugs = filteredBugs.slice(bugFirstIndex, bugLastIndex)
    const totalBugPages = Math.ceil(filteredBugs.length / bugsPerPage)

    return (
        <div className="flex min-h-screen bg-[#0d0f14]">
            <Sidebar />

            {/* right column */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* header */}
                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

                    <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
                        Dashboard
                    </h1>

                    <div className="flex items-center gap-4">

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
                            Admin Dashboard
                        </h1>

                        <p className="text-[14px] text-[#8b909c] mt-1">
                            Overview of your BugTester workspace
                        </p>
                    </div>

                    {/* statistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">

                        {/* Total Users */}
                        <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff]">
                                    <HiOutlineUsers size={19} />
                                </span>
                            </div>

                            <div>
                                <h2 className="text-[26px] font-semibold text-white">
                                    {totalUsers}
                                </h2>

                                <p className="text-[13px] text-[#8b909c] mt-0.5">
                                    Total Users
                                </p>
                            </div>
                        </div>

                        {/* Total Projects */}
                        <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#c084fc]/[0.12] text-[#c084fc]">
                                    <AiOutlineProject size={19} />
                                </span>
                            </div>

                            <div>
                                <h2 className="text-[26px] font-semibold text-white">
                                    {totalProjects}
                                </h2>

                                <p className="text-[13px] text-[#8b909c] mt-0.5">
                                    Total Projects
                                </p>
                            </div>
                        </div>

                        {/* Total Bugs */}
                        <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b]">
                                    <BsBug size={18} />
                                </span>
                            </div>

                            <div>
                                <h2 className="text-[26px] font-semibold text-white">
                                    {totalBugs}
                                </h2>

                                <p className="text-[13px] text-[#8b909c] mt-0.5">
                                    Total Bugs
                                </p>
                            </div>
                        </div>

                        {/* Open Bugs */}
                        <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#f26d6d]/[0.12] text-[#f26d6d]">
                                    <MdOutlineBugReport size={19} />
                                </span>
                            </div>

                            <div>
                                <h2 className="text-[26px] font-semibold text-white">
                                    {openBugs}
                                </h2>

                                <p className="text-[13px] text-[#8b909c] mt-0.5">
                                    Open Bugs
                                </p>
                            </div>
                        </div>

                        {/* Resolved Bugs */}
                        <div className="flex flex-col gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80]">
                                    <BsCheckCircle size={17} />
                                </span>
                            </div>

                            <div>
                                <h2 className="text-[26px] font-semibold text-white">
                                    {resolvedBugs}
                                </h2>

                                <p className="text-[13px] text-[#8b909c] mt-0.5">
                                    Resolved Bugs
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* recent projects */}
                    <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mb-8">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <h2 className="text-[16px] font-semibold text-white">
                                Recent Projects
                            </h2>

                            <div className="flex items-center gap-4">

                                <div className="flex items-center gap-2 h-[38px] px-3 w-full sm:w-[200px] bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">
                                    <AiOutlineSearch className="text-[#5b606c]" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search projects..."
                                        value={projectSearch}
                                        onChange={(e) => setProjectSearch(e.target.value)}
                                        className="flex-1 w-full bg-transparent border-none outline-none text-[13px] text-white placeholder:text-[#5b606c]"
                                    />
                                </div>

                                <Link
                                    to="/adminprojects"
                                    className="flex items-center gap-1.5 text-[13px] font-medium text-[#f0a83b] hover:opacity-85 whitespace-nowrap cursor-pointer"
                                >
                                    View all projects
                                    <MdArrowForward size={15} />
                                </Link>

                            </div>
                        </div>

                        {paginatedProjects.length === 0 ? (
                            <div className="py-8 text-center text-[13.5px] text-[#5b606c]">
                                No projects found
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                                {paginatedProjects.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => navigate(`/adminprojects/${item.id}`)}
                                        className="flex flex-col gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-[12px] cursor-pointer hover:bg-white/[0.04] hover:border-white/10 transition-colors"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#c084fc]/[0.12] text-[#c084fc] shrink-0">
                                                <AiOutlineProject size={17} />
                                            </span>

                                            <span className={`inline-flex px-2.5 py-1 text-[11.5px] font-medium rounded-[5px] border ${projectStatusColors[item.status] || "bg-white/[0.05] text-[#8b909c] border-white/10"}`}>
                                                {item.status}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-[14.5px] font-semibold text-white leading-snug line-clamp-1">
                                                {item.name}
                                            </h3>

                                            <p className="text-[12.5px] text-[#5b606c] mt-1">
                                                {bugs.filter((bug) => bug.project_id === item.id).length} bugs
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                                            <div>
                                                <p className="text-[10.5px] uppercase tracking-wide text-[#5b606c]">Due</p>
                                                <p className="text-[12.5px] text-[#a8abb8] mt-0.5">
                                                    {item.due_date ? new Date(item.due_date).toLocaleDateString("en-US", { month: "short", day: "2-digit" }) : "—"}
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-[10.5px] uppercase tracking-wide text-[#5b606c]">Updated</p>
                                                <p className="text-[12.5px] text-[#a8abb8] mt-0.5">
                                                    {item.updated_at ? new Date(item.updated_at).toLocaleDateString("en-US", { month: "short", day: "2-digit" }) : "—"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        )}

                        {/* projects pagination */}
                        {filteredProjects.length > 0 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-white/[0.06]">

                                <p className="text-[13px] text-[#5b606c]">
                                    Showing{" "}
                                    <span className="text-white font-medium">{projectFirstIndex + 1}</span>{" "}
                                    to{" "}
                                    <span className="text-white font-medium">{Math.min(projectLastIndex, filteredProjects.length)}</span>{" "}
                                    of{" "}
                                    <span className="text-white font-medium">{filteredProjects.length}</span>{" "}
                                    projects
                                </p>

                                <div className="flex items-center gap-2">

                                    <button
                                        type="button"
                                        onClick={() => setProjectPage(projectPage - 1)}
                                        disabled={projectPage === 1}
                                        className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-white/10 text-[#5b606c] disabled:cursor-not-allowed hover:bg-white/[0.04] cursor-pointer"
                                    >
                                        &#10094;
                                    </button>

                                    {Array.from({ length: totalProjectPages }, (_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setProjectPage(index + 1)}
                                            className={`w-9 h-9 rounded-[8px] text-[13px] font-medium cursor-pointer transition-colors
                                                ${projectPage === index + 1
                                                    ? "bg-[#f0a83b] text-[#0d0f14]"
                                                    : "border border-white/10 text-[#5b606c] hover:bg-white/[0.04]"
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() => setProjectPage(projectPage + 1)}
                                        disabled={projectPage === totalProjectPages || totalProjectPages === 0}
                                        className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-white/10 text-[#5b606c] disabled:cursor-not-allowed hover:bg-white/[0.04] cursor-pointer"
                                    >
                                        &#10095;
                                    </button>

                                </div>

                            </div>
                        )}

                    </div>

                    {/* recent bugs */}
                    <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <h2 className="text-[16px] font-semibold text-white">
                                Recent Bugs
                            </h2>

                            <div className="flex items-center gap-4">

                                <div className="flex items-center gap-2 h-[38px] px-3 w-full sm:w-[200px] bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">
                                    <AiOutlineSearch className="text-[#5b606c]" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search bugs..."
                                        value={bugSearch}
                                        onChange={(e) => setBugSearch(e.target.value)}
                                        className="flex-1 w-full bg-transparent border-none outline-none text-[13px] text-white placeholder:text-[#5b606c]"
                                    />
                                </div>

                                <Link
                                    to="/adminbugs"
                                    className="flex items-center gap-1.5 text-[13px] font-medium text-[#f0a83b] hover:opacity-85 whitespace-nowrap cursor-pointer"
                                >
                                    View all bugs
                                    <MdArrowForward size={15} />
                                </Link>

                            </div>
                        </div>

                        {paginatedBugs.length === 0 ? (
                            <div className="py-8 text-center text-[13.5px] text-[#5b606c]">
                                No bugs found
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                                {paginatedBugs.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => navigate(`/adminbugs/${item.id}`)}
                                        className="flex flex-col gap-3 p-4 bg-white/[0.02] border border-white/[0.06] rounded-[12px] cursor-pointer hover:bg-white/[0.04] hover:border-white/10 transition-colors"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <span className="text-[12.5px] font-semibold text-[#f0a83b]">
                                                BUG-{item.id}
                                            </span>

                                            <span className={`inline-flex px-2.5 py-1 text-[11.5px] font-medium rounded-[5px] border ${statusColors[item.status] || "bg-white/[0.05] text-[#8b909c] border-white/10"}`}>
                                                {item.status}
                                            </span>
                                        </div>

                                        <h3 className="text-[14px] font-medium text-white leading-snug line-clamp-2">
                                            {item.title}
                                        </h3>

                                        <p className="text-[12.5px] text-[#5b606c]">
                                            {projects.find((p) => p.id === item.project_id)?.name || "—"}
                                        </p>

                                        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                                            <div>
                                                <p className="text-[10.5px] uppercase tracking-wide text-[#5b606c]">Assigned</p>
                                                <p className="text-[12.5px] text-[#a8abb8] mt-0.5">
                                                    {item.assigned_to ? (users.find((u) => u.id === item.assigned_to)?.name || "—") : "Unassigned"}
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className={`text-[12.5px] font-medium ${priorityColors[item.priority] || "text-[#8b909c]"}`}>
                                                    {item.priority}
                                                </p>
                                                <p className="text-[11.5px] text-[#5b606c] mt-0.5">
                                                    {item.created_at ? new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit" }) : "—"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        )}

                        {/* bugs pagination */}
                        {filteredBugs.length > 0 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-white/[0.06]">

                                <p className="text-[13px] text-[#5b606c]">
                                    Showing{" "}
                                    <span className="text-white font-medium">{bugFirstIndex + 1}</span>{" "}
                                    to{" "}
                                    <span className="text-white font-medium">{Math.min(bugLastIndex, filteredBugs.length)}</span>{" "}
                                    of{" "}
                                    <span className="text-white font-medium">{filteredBugs.length}</span>{" "}
                                    bugs
                                </p>

                                <div className="flex items-center gap-2">

                                    <button
                                        type="button"
                                        onClick={() => setBugPage(bugPage - 1)}
                                        disabled={bugPage === 1}
                                        className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-white/10 text-[#5b606c] disabled:cursor-not-allowed hover:bg-white/[0.04] cursor-pointer"
                                    >
                                        &#10094;
                                    </button>

                                    {Array.from({ length: totalBugPages }, (_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setBugPage(index + 1)}
                                            className={`w-9 h-9 rounded-[8px] text-[13px] font-medium cursor-pointer transition-colors
                                                ${bugPage === index + 1
                                                    ? "bg-[#f0a83b] text-[#0d0f14]"
                                                    : "border border-white/10 text-[#5b606c] hover:bg-white/[0.04]"
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() => setBugPage(bugPage + 1)}
                                        disabled={bugPage === totalBugPages || totalBugPages === 0}
                                        className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-white/10 text-[#5b606c] disabled:cursor-not-allowed hover:bg-white/[0.04] cursor-pointer"
                                    >
                                        &#10095;
                                    </button>

                                </div>

                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;