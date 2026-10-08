import React, { useState, useEffect } from "react";
import TesterSidebar from "../../Components/Tester/TesterSidebar";
import { AiOutlineUser, AiOutlineProject } from "react-icons/ai";
import { FiMail, FiPhone, FiCalendar, FiCheckSquare, FiClock } from "react-icons/fi";
import { BsBug } from "react-icons/bs";
import toast from "react-hot-toast";
import {
    getMyProfileAPI,
    updateMyProfileAPI,
    changeMyPasswordAPI,
    getMyProjectsAPI,
    getBugsAPI,
} from "../../../../services/allAPI";

function TesterProfile() {
    const [profile, setProfile] = useState(null)
    const [editing, setEditing] = useState(false)
    const [profileForm, setProfileForm] = useState({ name: "", phone: "", location: "" })
    const [savingProfile, setSavingProfile] = useState(false)

    const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
    const [savingPassword, setSavingPassword] = useState(false)

    const [projectCount, setProjectCount] = useState(0)
    const [reportedCount, setReportedCount] = useState(0)
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
                setReportedCount(bugs.length)
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

    const getInitials = (name) => {
        if (!name) return "TS"
        return name.trim().split(" ").map((w) => w.charAt(0)).join("").slice(0, 2).toUpperCase()
    }

    const handleProfileChange = (e) => {
        setProfileForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleCancelEdit = () => {
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
                setProfile(response.data.user)
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

            <TesterSidebar />

            <div className="flex-1 flex flex-col min-w-0">

                {/* Header */}
                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[64px] sm:h-[72px] px-4 sm:px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">
                    <h1 className="text-[16px] sm:text-[18px] font-semibold text-white pl-12 lg:pl-0 truncate">
                        Profile
                    </h1>
                    
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 sm:p-5 lg:p-8">

                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-[19px] sm:text-[22px] font-semibold text-white">My Profile</h1>
                        <p className="text-[13px] sm:text-[14px] text-[#8b909c] mt-1">
                            View and manage your tester profile information
                        </p>
                    </div>

                    {/* Profile Layout */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 sm:gap-6">

                        {/* Profile Card */}
                        <div className="p-5 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                            <div className="flex flex-col items-center text-center">
                                <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f0a83b]/[0.12] border border-[#f0a83b]/20 text-[#f0a83b] text-[22px] sm:text-[26px] font-semibold">
                                    {getInitials(profile.name)}
                                </div>
                                <h2 className="text-[17px] sm:text-[18px] font-semibold text-white mt-5">
                                    {profile.name}
                                </h2>
                                <p className="text-[13px] text-[#8b909c] mt-1">Software Tester</p>
                                <span className="px-3 py-1 mt-3 rounded-[6px] text-[11px] font-medium bg-[#4ade80]/[0.10] text-[#4ade80] border border-[#4ade80]/20">
                                    Active
                                </span>
                            </div>

                            <div className="border-t border-white/[0.06] my-6"></div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-white/[0.04] text-[#8b909c] shrink-0">
                                        <FiMail size={15} />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-[11px] text-[#5b606c]">Email</p>
                                        <p className="text-[12.5px] text-[#c7c9d1] mt-0.5 truncate">{profile.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-white/[0.04] text-[#8b909c] shrink-0">
                                        <FiPhone size={15} />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-[11px] text-[#5b606c]">Phone</p>
                                        <p className="text-[12.5px] text-[#c7c9d1] mt-0.5 truncate">{profile.phone || "—"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-white/[0.04] text-[#8b909c] shrink-0">
                                        <FiCalendar size={15} />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-[11px] text-[#5b606c]">Joined</p>
                                        <p className="text-[12.5px] text-[#c7c9d1] mt-0.5">
                                            {profile.created_at
                                                ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                                                : "—"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="xl:col-span-2 p-5 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-[15px] sm:text-[16px] font-semibold text-white">Personal Information</h2>
                                    <p className="text-[12px] sm:text-[12.5px] text-[#5b606c] mt-1">Your basic account information</p>
                                </div>
                                <AiOutlineUser className="text-[#f0a83b] shrink-0" size={19} />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                <div>
                                    <label className="block text-[12px] text-[#8b909c] mb-2">Full Name</label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={profileForm.name}
                                            onChange={handleProfileChange}
                                            className="h-[42px] w-full px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-white outline-none focus:border-[#f0a83b]"
                                        />
                                    ) : (
                                        <div className="h-[42px] flex items-center px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-[#c7c9d1]">
                                            {profile.name}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[12px] text-[#8b909c] mb-2">Role</label>
                                    <div className="h-[42px] flex items-center px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-[#c7c9d1]">
                                        Software Tester
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[12px] text-[#8b909c] mb-2">Email Address</label>
                                    <div className="h-[42px] flex items-center px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-[#c7c9d1] truncate">
                                        {profile.email}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[12px] text-[#8b909c] mb-2">Phone Number</label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            name="phone"
                                            value={profileForm.phone}
                                            onChange={handleProfileChange}
                                            placeholder="Add phone number"
                                            className="h-[42px] w-full px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
                                        />
                                    ) : (
                                        <div className="h-[42px] flex items-center px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-[#c7c9d1]">
                                            {profile.phone || "—"}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[12px] text-[#8b909c] mb-2">Location</label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            name="location"
                                            value={profileForm.location}
                                            onChange={handleProfileChange}
                                            placeholder="Add location"
                                            className="h-[42px] w-full px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
                                        />
                                    ) : (
                                        <div className="h-[42px] flex items-center px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-[#c7c9d1]">
                                            {profile.location || "—"}
                                        </div>
                                    )}
                                </div>

                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-5 border-t border-white/[0.06]">
                                {editing ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={handleCancelEdit}
                                            className="h-[38px] px-5 rounded-[8px] text-[12.5px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSaveProfile}
                                            disabled={savingProfile}
                                            className="h-[38px] px-5 rounded-[8px] bg-[#f0a83b] text-[#0d0f14] text-[12.5px] font-semibold hover:bg-[#f3b24f] transition-colors cursor-pointer disabled:opacity-60"
                                        >
                                            {savingProfile ? "Saving..." : "Save Changes"}
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setEditing(true)}
                                        className="h-[38px] px-5 rounded-[8px] bg-[#f0a83b] text-[#0d0f14] text-[12.5px] font-semibold hover:bg-[#f3b24f] transition-colors cursor-pointer w-full sm:w-auto"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>

                        </div>

                    </div>

                    {/* Security */}
                    <div className="p-5 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mt-6">

                        <h3 className="text-[15px] sm:text-[16px] font-semibold text-white mb-5">Security</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12px] text-[#8b909c]">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordForm.currentPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter current password"
                                    className="h-[42px] px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12px] text-[#8b909c]">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordForm.newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter new password"
                                    className="h-[42px] px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12px] text-[#8b909c]">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordForm.confirmPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Confirm new password"
                                    className="h-[42px] px-3.5 rounded-[8px] bg-[#0d0f14] border border-white/[0.06] text-[13px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleUpdatePassword}
                            disabled={savingPassword}
                            className="h-[40px] px-5 mt-6 rounded-[8px] bg-[#f0a83b] text-[#0d0f14] text-[12.5px] font-semibold hover:bg-[#f3b24f] transition-colors cursor-pointer disabled:opacity-60 w-full sm:w-auto"
                        >
                            {savingPassword ? "Updating..." : "Update Password"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TesterProfile;