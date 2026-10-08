import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import AddProjectModal from "../../Components/Admin/AddProjectModal";
import EditProjectModal from "../../Components/Admin/EditProjectModal";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineCalendar } from "react-icons/hi2";
import { AiOutlineProject } from "react-icons/ai";
import toast from "react-hot-toast";
import { deleteProjectAPI, getProjectsAPI } from "../../../../services/allAPI";

const statusColors = {
    Planning: "bg-[#576aff]/[0.12] text-[#4f5fe0] border-[#576aff]/25",
    "In Progress": "bg-[#f0a83b]/[0.15] text-[#b45309] border-[#f0a83b]/30",
    Completed: "bg-[#4ade80]/[0.15] text-[#16a34a] border-[#4ade80]/30",
    "On Hold": "bg-[#f26d6d]/[0.12] text-[#dc2626] border-[#f26d6d]/25",
}

function AdminProjects() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [confirmDeleteId, setConfirmDeleteId] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [projectData, setProjectData] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const token = localStorage.getItem('token')
    const [selectedProject, setSelectedProject] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)

    const getProjects = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getProjectsAPI(reqHeader)
            if (response.status === 200) {
                setProjectData(response.data.projects)
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to fetch projects')
        }
    }

    const handleDelete = async (id) => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await deleteProjectAPI(id, reqHeader)
            if (response.status === 200) {
                setConfirmDeleteId(null)
                toast.success('Project deleted successfully')
                getProjects()
            }
        } catch (err) {
            setConfirmDeleteId(null)
            toast.error(err?.response?.data?.message || 'Failed to delete project')
        }
    }

    useEffect(() => {
        getProjects()
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, statusFilter])

    const filteredProjects = projectData.filter((item) => {
        const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter ? item.status === statusFilter : true
        return matchesSearch && matchesStatus
    })

    const projectsPerPage = 8
    const lastIndex = currentPage * projectsPerPage
    const firstIndex = lastIndex - projectsPerPage
    const currentProjects = filteredProjects.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

    return (
        <div className="flex min-h-screen bg-[#f4f5f9]">

            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">

                {/* header */}
                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-white/90 backdrop-blur border-b border-black/[0.08]">

                    <h1 className="text-[18px] font-semibold text-[#111827] pl-14 lg:pl-0">
                        Projects
                    </h1>

                   

                </div>

                {/* main content */}
                <div className="flex-1 p-5 lg:p-8">

                    {/* page header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-[22px] font-semibold text-[#111827]">
                                Projects
                            </h1>
                            <p className="text-[14px] text-[#6b7280] mt-1">
                                Manage all active and past projects
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 px-4 h-[42px] rounded-[8px] text-[14px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer"
                        >
                            <AiOutlinePlus size={17} />
                            Add Project
                        </button>
                    </div>

                    {/* filter panel */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 p-5 bg-white border border-black/[0.08] shadow-sm rounded-[14px] mb-6">

                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-[12.5px] font-medium text-[#4b5563]">
                                Search
                            </label>
                            <div className="relative flex items-center gap-2 h-[42px] px-3.5 bg-[#f9fafb] border border-black/[0.12] rounded-[8px] focus-within:border-[#f0a83b]">
                                <AiOutlineSearch className="text-[#9ca3af]" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search by project name"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 w-full bg-transparent border-none outline-none text-[13.5px] text-[#111827] placeholder:text-[#9ca3af]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full sm:w-[200px]">
                            <label className="text-[12.5px] font-medium text-[#4b5563]">
                                Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full h-[42px] px-3.5 rounded-[8px] bg-[#f9fafb] border border-black/[0.12] text-[13.5px] text-left text-[#111827] cursor-pointer outline-none focus:border-[#f0a83b]"
                            >
                                <option className="bg-white text-[#111827]" value="">All Statuses</option>
                                <option className="bg-white text-[#111827]" value="Planning">Planning</option>
                                <option className="bg-white text-[#111827]" value="In Progress">In Progress</option>
                                <option className="bg-white text-[#111827]" value="Completed">Completed</option>
                                <option className="bg-white text-[#111827]" value="On Hold">On Hold</option>
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setSearchTerm("")
                                setStatusFilter("")
                            }}
                            className="h-[42px] px-5 rounded-[8px] text-[13.5px] font-medium text-[#4b5563] border border-black/[0.12] hover:bg-black/[0.04] hover:text-[#111827] transition-colors cursor-pointer whitespace-nowrap"
                        >
                            Clear
                        </button>

                    </div>

                    {/* projects cards */}
                    <div className="p-6 bg-white border border-black/[0.08] shadow-sm rounded-[14px]">

                        {currentProjects.length === 0 ? (
                            <div className="py-8 text-center text-[13.5px] text-[#6b7280]">
                                No projects found
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                                {currentProjects.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col gap-4 p-4 bg-[#f9fafb] border border-black/[0.08] rounded-[12px] hover:bg-[#f3f4f6] hover:border-black/[0.15] transition-colors"
                                    >

                                        <div className="flex items-start justify-between gap-2">
                                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#c084fc]/[0.15] text-[#9333ea] shrink-0">
                                                <AiOutlineProject size={17} />
                                            </span>

                                            <span className={`inline-flex px-2.5 py-1 text-[11.5px] font-medium rounded-[5px] border ${statusColors[item.status] || "bg-black/[0.05] text-[#6b7280] border-black/[0.12]"}`}>
                                                {item.status}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-[14.5px] font-semibold text-[#111827] leading-snug line-clamp-1">
                                                {item.name}
                                            </h3>

                                            {item.description && (
                                                <p className="text-[12.5px] text-[#6b7280] mt-1 line-clamp-2">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between pt-1">
                                            <div className="flex items-center gap-1.5 text-[12px] text-[#4b5563]">
                                                <HiOutlineCalendar className="text-[#9ca3af] shrink-0" size={14} />
                                                {item.start_date ? new Date(item.start_date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "—"}
                                            </div>

                                            <div className="flex items-center gap-1.5 text-[12px] text-[#4b5563]">
                                                Due{" "}
                                                {item.due_date ? new Date(item.due_date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "—"}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 pt-3 border-t border-black/[0.08]">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedProject(item)
                                                    setShowEditModal(true)
                                                }}
                                                className="flex-1 flex items-center justify-center gap-1.5 h-9 text-xs font-medium rounded-[6px] bg-[#576aff]/[0.12] text-[#4f5fe0] border border-[#576aff]/25 hover:bg-[#576aff]/[0.2] transition-colors cursor-pointer"
                                            >
                                                <HiOutlinePencilSquare size={14} />
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setConfirmDeleteId(item.id)}
                                                className="flex-1 flex items-center justify-center gap-1.5 h-9 text-xs font-medium rounded-[6px] bg-[#f26d6d]/[0.12] text-[#dc2626] border border-[#f26d6d]/25 hover:bg-[#f26d6d]/[0.2] transition-colors cursor-pointer"
                                            >
                                                <HiOutlineTrash size={14} />
                                                Delete
                                            </button>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        )}

                        {/* pagination */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-black/[0.08]">

                            <p className="text-[13px] text-[#6b7280]">
                                Showing{" "}
                                <span className="text-[#111827] font-medium">{filteredProjects.length ? firstIndex + 1 : 0}</span>{" "}
                                to{" "}
                                <span className="text-[#111827] font-medium">{Math.min(lastIndex, filteredProjects.length)}</span>{" "}
                                of{" "}
                                <span className="text-[#111827] font-medium">{filteredProjects.length}</span>{" "}
                                projects
                            </p>

                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-black/[0.12] text-[#6b7280] disabled:cursor-not-allowed hover:bg-black/[0.04] cursor-pointer"
                                >
                                    &#10094;
                                </button>

                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`w-9 h-9 rounded-[8px] text-[13px] font-medium cursor-pointer transition-colors
                                            ${currentPage === index + 1
                                                ? "bg-[#f0a83b] text-[#0d0f14]"
                                                : "border border-black/[0.12] text-[#6b7280] hover:bg-black/[0.04]"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-black/[0.12] text-[#6b7280] disabled:cursor-not-allowed hover:bg-black/[0.04] cursor-pointer"
                                >
                                    &#10095;
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Add Project Modal */}
            {showAddModal && (
                <AddProjectModal
                    onClose={() => setShowAddModal(false)}
                    getProjects={getProjects}
                />
            )}

            {/* Edit Project Modal */}
            {showEditModal && (
                <EditProjectModal
                    project={selectedProject}
                    onClose={() => {
                        setShowEditModal(false)
                        setSelectedProject(null)
                    }}
                    getProjects={getProjects}
                />
            )}

            {/* Delete Confirmation Popup */}
            {confirmDeleteId && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] px-4">
                    <div className="bg-white border border-black/[0.08] rounded-[16px] shadow-lg w-full max-w-[360px] p-6">
                        <h3 className="text-lg font-semibold text-[#111827] mb-2">
                            Delete project?
                        </h3>
                        <p className="text-sm text-[#4b5563] mb-6">
                            Are you sure you want to delete this project? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-4 py-2 text-sm font-medium text-[#4b5563] border border-black/[0.12] rounded-[8px] hover:bg-black/[0.04] transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDelete(confirmDeleteId)}
                                className="px-4 py-2 text-sm font-medium text-white bg-[#f26d6d] rounded-[8px] hover:bg-[#e85555] transition-colors cursor-pointer"
                            >
                                Yes, delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AdminProjects;