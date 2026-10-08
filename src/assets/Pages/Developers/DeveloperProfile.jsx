import React, { useState, useEffect } from "react";
import DeveloperSidebar from "../../Components/Developer/DeveloperSidebar";
import { MdOutlineEdit } from "react-icons/md";
import {
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineCalendar,
    HiOutlineShieldCheck,
} from "react-icons/hi";
import { AiOutlineProject } from "react-icons/ai";
import { BsBug } from "react-icons/bs";
import { FiCheckCircle, FiBriefcase, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import {
    getMyProfileAPI,
    updateMyProfileAPI,
    changeMyPasswordAPI,
    getMyProjectsAPI,
    getBugsAPI,
} from "../../../../services/allAPI";

function DeveloperProfile() {
    const [profile, setProfile] = useState(null)
    const [editing, setEditing] = useState(false)
    const [profileForm, setProfileForm] = useState({ name: "", phone: "", location: "" })
    const [savingProfile, setSavingProfile] = useState(false)

    const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
    const [savingPassword, setSavingPassword] = useState(false)

    const [projectCount, setProjectCount] = useState(0)
    const [resolvedCount, setResolvedCount] = useState(0)
    const [openCount, setOpenCount] = useState(0)

    const token = localStorage.getItem('token')

    const getProfile = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getMyProfileAPI(reqHeader)
            if (response.status === 200) {
                setProfile(response.data.user)
                setProfileForm({
                    name: response.data.user.name || "",
                    phone: response.data.user.phone || "",
                    location: response.data.user.location || "",
                })
            }
        } catch (err) {
            toast.error('Failed to load profile')
        }
    }

    const getStats = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const [projectsRes, bugsRes] = await Promise.all([
                getMyProjectsAPI(reqHeader),
                getBugsAPI(reqHeader),
            ])
            if (projectsRes.status === 200) {
                setProjectCount(projectsRes.data.projects.length)
            }
            if (bugsRes.status === 200) {
                const bugs = bugsRes.data
                setResolvedCount(bugs.filter((b) => ['Resolved', 'Verified', 'Closed'].includes(b.status)).length)
                setOpenCount(bugs.filter((b) => !['Resolved', 'Verified', 'Closed'].includes(b.status)).length)
            }
        } catch (err) {
            toast.error('Failed to load stats')
        }
    }

    useEffect(() => {
        getProfile()
        getStats()
    }, [])

    // Lock page scroll and allow Esc to close while the modal is open
    useEffect(() => {
        if (!editing) return
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        const handleKeyDown = (e) => {
            if (e.key === "Escape") handleCloseModal()
        }
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [editing])

    const getInitials = (name) => {
        if (!name) return "DV"
        return name.trim().split(" ").map((w) => w.charAt(0)).join("").slice(0, 2).toUpperCase()
    }

    const handleProfileChange = (e) => {
        setProfileForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleOpenModal = () => {
        setProfileForm({
            name: profile?.name || "",
            phone: profile?.phone || "",
            location: profile?.location || "",
        })
        setEditing(true)
    }

    const handleCloseModal = () => {
        setProfileForm({
            name: profile?.name || "",
            phone: profile?.phone || "",
            location: profile?.location || "",
        })
        setEditing(false)
    }

    const handleSaveProfile = async () => {
        if (!profileForm.name.trim()) {
            toast.error('Name is required')
            return
        }
        try {
            setSavingProfile(true)
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await updateMyProfileAPI(profileForm, reqHeader)
            if (response.status === 200) {
                toast.success('Profile updated successfully')
                await getProfile()
                setEditing(false)
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to update profile')
        } finally {
            setSavingProfile(false)
        }
    }

    const handlePasswordChange = (e) => {
        setPasswordForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleUpdatePassword = async () => {
        if (!passwordForm.currentPassword || !passwordForm.newPassword) {
            toast.error('Please fill in both password fields')
            return
        }
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error('New passwords do not match')
            return
        }
        if (passwordForm.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }
        try {
            setSavingPassword(true)
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await changeMyPasswordAPI(
                { currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword },
                reqHeader
            )
            if (response.status === 200) {
                toast.success('Password changed successfully')
                setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to change password')
        } finally {
            setSavingPassword(false)
        }
    }

    if (!profile) {
        return (
            <div className="flex min-h-screen bg-[#0d0f14] items-center justify-center">
                <p className="text-[13.5px] text-[#5b606c]">Loading profile...</p>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-[#0d0f14]">

            <DeveloperSidebar />

            <div className="flex-1 flex flex-col min-w-0">

                {/* Header */}
                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[64px] sm:h-[72px] px-4 sm:px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">
                    <h1 className="text-[16px] sm:text-[18px] font-semibold text-white pl-12 lg:pl-0 truncate">
                        Profile
                    </h1>
                    <div className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-3 h-10 rounded-[8px] hover:bg-white/[0.04] cursor-pointer shrink-0">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[12.5px] font-semibold">
                            {getInitials(profile.name)}
                        </span>
                        <span className="hidden sm:block text-[13.5px] font-medium text-white">
                            Developer
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 sm:p-5 lg:p-8">

                    <div className="mb-6 sm:mb-8 min-w-0">
                        <h1 className="text-[19px] sm:text-[22px] font-semibold text-white truncate">
                            {profile.name}
                        </h1>
                        <p className="text-[13px] sm:text-[14px] text-[#8b909c] mt-1">
                            Manage your developer account information
                        </p>
                    </div>

                    {/* Profile Banner */}
                    <div className="p-4 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                <span className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f0a83b]/[0.12] border border-[#f0a83b]/25 text-[#f0a83b] text-[18px] sm:text-[20px] font-semibold shrink-0">
                                    {getInitials(profile.name)}
                                </span>
                                <div className="min-w-0">
                                    <h2 className="text-[16px] sm:text-[18px] font-semibold text-white truncate">
                                        {profile.name}
                                    </h2>
                                    <p className="text-[13px] sm:text-[13.5px] text-[#8b909c] mt-0.5 truncate">
                                        {profile.email}
                                    </p>

                                    {/* Organization name */}
                                    {profile.organization_name && (
                                        <p className="flex items-center gap-1.5 text-[12.5px] sm:text-[13px] text-[#f0a83b] mt-1 min-w-0">
                                            <FiBriefcase size={13} className="shrink-0" />
                                            <span className="truncate">{profile.organization_name}</span>
                                        </p>
                                    )}

                                    <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25">
                                        <HiOutlineShieldCheck size={13} />
                                        Developer
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleOpenModal}
                                className="flex items-center justify-center gap-2 px-4 h-[42px] rounded-[8px] text-[14px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer shrink-0 w-full sm:w-auto"
                            >
                                <MdOutlineEdit size={16} />
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b] mb-3 sm:mb-4">
                                <AiOutlineProject size={17} />
                            </span>
                            <p className="text-[20px] sm:text-[24px] font-semibold text-white">{projectCount}</p>
                            <p className="text-[12px] sm:text-[13px] text-[#8b909c] mt-1">Projects Assigned</p>
                        </div>

                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff] mb-3 sm:mb-4">
                                <BsBug size={17} />
                            </span>
                            <p className="text-[20px] sm:text-[24px] font-semibold text-white">{resolvedCount}</p>
                            <p className="text-[12px] sm:text-[13px] text-[#8b909c] mt-1">Bugs Resolved</p>
                        </div>

                        <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
                            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80] mb-3 sm:mb-4">
                                <FiCheckCircle size={17} />
                            </span>
                            <p className="text-[20px] sm:text-[24px] font-semibold text-white">{openCount}</p>
                            <p className="text-[12px] sm:text-[13px] text-[#8b909c] mt-1">Open Bugs</p>
                        </div>
                    </div>

                    {/* Account Details (read only) */}
                    <div className="p-4 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                        <h3 className="text-[15px] sm:text-[16px] font-semibold text-white mb-5">Account Details</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">Full Name</label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    readOnly
                                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">Email Address</label>
                                <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10">
                                    <HiOutlineMail className="text-[#5b606c] shrink-0" size={16} />
                                    <span className="text-[14px] text-white truncate">{profile.email}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">Phone Number</label>
                                <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10">
                                    <HiOutlinePhone className="text-[#5b606c] shrink-0" size={16} />
                                    <span className="text-[14px] text-white truncate">{profile.phone || "—"}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">Role</label>
                                <input
                                    type="text"
                                    value="Developer"
                                    readOnly
                                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">Location</label>
                                <input
                                    type="text"
                                    value={profile.location || "—"}
                                    readOnly
                                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">Joined Date</label>
                                <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10">
                                    <HiOutlineCalendar className="text-[#5b606c] shrink-0" size={16} />
                                    <span className="text-[14px] text-white">
                                        {profile.created_at
                                            ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                                            : "—"}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Security */}
                    <div className="p-4 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mt-6">

                        <h3 className="text-[15px] sm:text-[16px] font-semibold text-white mb-5">Security</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordForm.currentPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter current password"
                                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordForm.newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter new password"
                                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordForm.confirmPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Confirm new password"
                                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
                                />
                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={handleUpdatePassword}
                            disabled={savingPassword}
                            className="h-[42px] px-5 mt-6 rounded-[8px] text-[13.5px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer disabled:opacity-60 w-full sm:w-auto"
                        >
                            {savingPassword ? "Updating..." : "Update Password"}
                        </button>

                    </div>

                </div>

            </div>

            {/* Edit Profile Modal */}
            {editing && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={handleCloseModal}
                >
                    <div
                        className="w-full max-w-[480px] max-h-[90vh] overflow-y-auto p-5 sm:p-6 bg-[#161922] border border-white/[0.08] rounded-[14px] shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Modal header */}
                        <div className="flex items-start justify-between gap-3 mb-5">
                            <div className="min-w-0">
                                <h3 className="text-[16px] sm:text-[18px] font-semibold text-white">
                                    Edit Profile
                                </h3>
                                <p className="text-[12.5px] sm:text-[13px] text-[#8b909c] mt-1">
                                    Update your personal information
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="flex items-center justify-center w-8 h-8 rounded-[8px] text-[#8b909c] hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer shrink-0"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        {/* Modal fields */}
                        <div className="flex flex-col gap-4">

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profileForm.name}
                                    onChange={handleProfileChange}
                                    placeholder="Enter your name"
                                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">Email Address</label>
                                <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.02] border border-white/[0.06] opacity-70">
                                    <HiOutlineMail className="text-[#5b606c] shrink-0" size={16} />
                                    <span className="text-[14px] text-white truncate">{profile.email}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">Phone Number</label>
                                <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 focus-within:border-[#f0a83b]">
                                    <HiOutlinePhone className="text-[#5b606c] shrink-0" size={16} />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={profileForm.phone}
                                        onChange={handleProfileChange}
                                        placeholder="Add phone number"
                                        className="flex-1 min-w-0 bg-transparent border-none outline-none text-[14px] text-white placeholder:text-[#5b606c]"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12.5px] font-medium text-[#a8abb8]">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={profileForm.location}
                                    onChange={handleProfileChange}
                                    placeholder="Add location"
                                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
                                />
                            </div>

                        </div>

                        {/* Modal buttons */}
                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="h-[42px] px-5 rounded-[8px] text-[13.5px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveProfile}
                                disabled={savingProfile}
                                className="h-[42px] px-5 rounded-[8px] text-[13.5px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer disabled:opacity-60"
                            >
                                {savingProfile ? "Saving..." : "Save Changes"}
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

export default DeveloperProfile;