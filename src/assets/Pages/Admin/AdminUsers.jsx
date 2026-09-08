import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import AddUserModal from "../../Components/Admin/AddUserModal";
import EditUserModal from "../../Components/Admin/EditUserModal";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineMail } from "react-icons/ai";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineCalendar } from "react-icons/hi2";
import toast from "react-hot-toast";
import { deleteUserAPI, getUsersAPI } from "../../../../services/allAPI";


const roleColors = {
    Administrator: "bg-[#f26d6d]/[0.12] text-[#f26d6d] border-[#f26d6d]/25",
    Lead: "bg-[#c084fc]/[0.12] text-[#c084fc] border-[#c084fc]/25",
    Developer: "bg-[#576aff]/[0.12] text-[#8b98ff] border-[#576aff]/25",
    Tester: "bg-[#f0a83b]/[0.12] text-[#f0a83b] border-[#f0a83b]/25",
}

function AdminUsers() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)
    const [confirmDeleteId, setConfirmDeleteId] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [userData, setUserData] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [roleFilter, setRoleFilter] = useState("")
    const token = localStorage.getItem('token')

    const getUsers = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getUsersAPI(reqHeader)
            if (response.status === 200) {
                setUserData(response.data.users)
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to fetch users')
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value
        setSearchTerm(value)

        if (value === "") {
            setSuggestions([])
            return
        }

        const result = userData.filter((item) =>
            item.name?.toLowerCase().includes(value.toLowerCase()) ||
            item.email?.toLowerCase().includes(value.toLowerCase())
        )

        setSuggestions(result)
    }

    const handleDelete = async (id) => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await deleteUserAPI(id, reqHeader)
            if (response.status === 200) {
                setConfirmDeleteId(null)
                toast.success('User deleted successfully')
                getUsers()
            }
        } catch (err) {
            setConfirmDeleteId(null)
            toast.error(err?.response?.data?.message || 'Failed to delete user')
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, roleFilter])

    const filteredUsers = userData.filter((item) => {
        const matchesSearch =
            item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRole = roleFilter ? item.role === roleFilter : true
        return matchesSearch && matchesRole
    })

    const usersPerPage = 8
    const lastIndex = currentPage * usersPerPage
    const firstIndex = lastIndex - usersPerPage
    const currentUsers = filteredUsers.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

    const getInitials = (name) => {
        return name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    }

    return (
        <div className="flex min-h-screen bg-[#0d0f14]">

            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">

                {/* header */}
                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

                    <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
                        Users
                    </h1>

                    <div className="flex items-center gap-4">

                      

                        <span className="relative flex items-center justify-center w-10 h-10 rounded-[8px] text-[#a8abb8] hover:bg-white/[0.04] hover:text-white cursor-pointer">
                            <MdOutlineNotificationsNone size={20} />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#f0a83b]"></span>
                        </span>

                        <div className="relative">
                            <span className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-3 h-10 rounded-[8px] hover:bg-white/[0.04] cursor-pointer">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[12.5px] font-semibold">
                                    AD
                                </span>
                                <span className="hidden sm:block text-[13.5px] font-medium text-white">
                                    Admin
                                </span>
                            </span>
                        </div>

                    </div>

                </div>

                {/* main content */}
                <div className="flex-1 p-5 lg:p-8">

                    {/* page header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-[22px] font-semibold text-white">
                                Users
                            </h1>
                            <p className="text-[14px] text-[#8b909c] mt-1">
                                Manage Admins, Leads, Developers and Testers
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 px-4 h-[42px] rounded-[8px] text-[14px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer"
                        >
                            <AiOutlinePlus size={17} />
                            Add User
                        </button>
                    </div>

                    {/* filter panel */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 p-5 bg-[#161922] border border-white/[0.06] rounded-[14px] mb-6">

                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full sm:w-[200px]">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Role
                            </label>
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b]"
                            >
                                <option className="bg-[#161922]" value="">All Roles</option>
                                <option className="bg-[#161922]" value="Administrator">Administrator</option>
                                <option className="bg-[#161922]" value="Lead">Lead</option>
                                <option className="bg-[#161922]" value="Developer">Developer</option>
                                <option className="bg-[#161922]" value="Tester">Tester</option>
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setSearchTerm("")
                                setRoleFilter("")
                                setSuggestions([])
                            }}
                            className="h-[42px] px-5 rounded-[8px] text-[13.5px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                        >
                            Clear
                        </button>

                    </div>

                    {/* users cards */}
                    <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                        {currentUsers.length === 0 ? (
                            <div className="py-8 text-center text-[13.5px] text-[#5b606c]">
                                No users found
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                                {currentUsers.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-[12px] hover:bg-white/[0.04] hover:border-white/10 transition-colors"
                                    >

                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[13px] font-semibold shrink-0">
                                                    {getInitials(item.name)}
                                                </span>
                                                <div className="min-w-0">
                                                    <h3 className="text-[14px] font-semibold text-white leading-snug truncate">
                                                        {item.name}
                                                    </h3>
                                                    <span className={`inline-flex mt-1 px-2 py-0.5 text-[11px] font-medium rounded-[5px] border ${roleColors[item.role] || "bg-white/[0.05] text-[#8b909c] border-white/10"}`}>
                                                        {item.role}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 pt-1">
                                            <div className="flex items-center gap-2 text-[12.5px] text-[#a8abb8] min-w-0">
                                                <AiOutlineMail className="text-[#5b606c] shrink-0" size={14} />
                                                <span className="truncate">{item.email}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-[12.5px] text-[#5b606c]">
                                                <HiOutlineCalendar className="text-[#5b606c] shrink-0" size={14} />
                                                <span>
                                                    Joined{" "}
                                                    {new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedUser(item)
                                                    setShowEditModal(true)
                                                }}
                                                className="flex-1 flex items-center justify-center gap-1.5 h-9 text-xs font-medium rounded-[6px] bg-[#576aff]/[0.12] text-[#8b98ff] border border-[#576aff]/25 hover:bg-[#576aff]/[0.2] transition-colors cursor-pointer"
                                            >
                                                <HiOutlinePencilSquare size={14} />
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setConfirmDeleteId(item.id)}
                                                className="flex-1 flex items-center justify-center gap-1.5 h-9 text-xs font-medium rounded-[6px] bg-[#f26d6d]/[0.12] text-[#f26d6d] border border-[#f26d6d]/25 hover:bg-[#f26d6d]/[0.2] transition-colors cursor-pointer"
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
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-white/[0.06]">

                            <p className="text-[13px] text-[#5b606c]">
                                Showing{" "}
                                <span className="text-white font-medium">{filteredUsers.length ? firstIndex + 1 : 0}</span>{" "}
                                to{" "}
                                <span className="text-white font-medium">{Math.min(lastIndex, filteredUsers.length)}</span>{" "}
                                of{" "}
                                <span className="text-white font-medium">{filteredUsers.length}</span>{" "}
                                users
                            </p>

                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-white/10 text-[#5b606c] disabled:cursor-not-allowed hover:bg-white/[0.04] cursor-pointer"
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
                                                : "border border-white/10 text-[#5b606c] hover:bg-white/[0.04]"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-white/10 text-[#5b606c] disabled:cursor-not-allowed hover:bg-white/[0.04] cursor-pointer"
                                >
                                    &#10095;
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <AddUserModal
                    onClose={() => setShowAddModal(false)}
                    getUsers={getUsers}
                />
            )}

            {/* Edit User Modal */}
            {showEditModal && (
                <EditUserModal
                    user={selectedUser}
                    onClose={() => {
                        setShowEditModal(false)
                        setSelectedUser(null)
                    }}
                    getUsers={getUsers}
                />
            )}

            {/* Delete Confirmation Popup */}
            {confirmDeleteId && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] px-4">
                    <div className="bg-[#161922] border border-white/[0.08] rounded-[16px] shadow-lg w-full max-w-[360px] p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Delete user?
                        </h3>
                        <p className="text-sm text-[#a8abb8] mb-6">
                            Are you sure you want to delete this user? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-4 py-2 text-sm font-medium text-[#a8abb8] border border-white/10 rounded-[8px] hover:bg-white/[0.04] transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDelete(confirmDeleteId)}
                                className="px-4 py-2 text-sm font-medium text-white bg-[#f26d6d] rounded-[8px] hover:bg-[#e85555] transition-colors cursor-pointer"
                            >
                                Yes, delete
                            </button>F
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AdminUsers;