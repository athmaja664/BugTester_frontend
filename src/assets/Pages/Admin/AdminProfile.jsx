import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import { AiOutlineProject } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { BsBug } from "react-icons/bs";
import { FiBriefcase } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  getMyProfileAPI,
  updateMyProfileAPI,
  changeMyPasswordAPI,
  getMyActivityAPI,
  getAdminStatsAPI
} from "../../../../services/allAPI";

function AdminProfile() {
  const token = localStorage.getItem('token')

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    location: "",
    organization_name: "",
    created_at: ""
  })
  const [stats, setStats] = useState({
    projectsManaged: 0,
    bugsReviewed: 0,
    teamMembers: 0
  })
  const [activity, setActivity] = useState([])
  const [savingProfile, setSavingProfile] = useState(false)

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [savingPassword, setSavingPassword] = useState(false)

  const fetchProfile = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` }
      const response = await getMyProfileAPI(reqHeader)
      if (response.status === 200) {
        setProfile(response.data.user)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchStats = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` }
      const response = await getAdminStatsAPI(reqHeader)
      if (response.status === 200) {
        setStats(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchActivity = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` }
      const response = await getMyActivityAPI(reqHeader)
      if (response.status === 200) {
        setActivity(response.data.activity || response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProfile()
    fetchStats()
    fetchActivity()
  }, [])

  const getInitials = (name) => {
    if (!name) return "AD"
    return name.trim().split(" ").map((word) => word.charAt(0)).join("").slice(0, 2).toUpperCase()
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
    if (!profile.name?.trim()) {
      toast.error('Name is required')
      return
    }
    try {
      setSavingProfile(true)
      const reqHeader = { Authorization: `Bearer ${token}` }
      const reqBody = {
        name: profile.name,
        phone: profile.phone,
        location: profile.location
      }
      const response = await updateMyProfileAPI(reqBody, reqHeader)
      if (response.status === 200) {
        toast.success('Profile updated successfully')
        await fetchProfile() // reload so organization and other fields stay correct
        fetchActivity()
      }
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message || 'Failed to update profile')
    } finally {
      setSavingProfile(false)
    }
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdatePassword = async () => {
    if (!passwordData.currentPassword) {
      toast.error('Current password is required')
      return
    }
    if (!passwordData.newPassword || passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters')
      return
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New password and confirm password do not match')
      return
    }

    try {
      setSavingPassword(true)
      const reqHeader = { Authorization: `Bearer ${token}` }
      const reqBody = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }
      const response = await changeMyPasswordAPI(reqBody, reqHeader)
      if (response.status === 200) {
        toast.success('Password changed successfully')
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
        fetchActivity()
      }
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message || 'Failed to change password')
    } finally {
      setSavingPassword(false)
    }
  }

  const initials = getInitials(profile.name)

  const statCards = [
    { label: "Projects Managed", value: stats.projectsManaged, icon: AiOutlineProject, color: "bg-[#f0a83b]/[0.12] text-[#f0a83b]" },
    { label: "Bugs Reviewed", value: stats.bugsReviewed, icon: BsBug, color: "bg-[#576aff]/[0.12] text-[#8b98ff]" },
    { label: "Team Members", value: stats.teamMembers, icon: CgProfile, color: "bg-[#4ade80]/[0.12] text-[#4ade80]" },
  ]

  return (
    <div className="flex min-h-screen bg-[#0d0f14]">
      <Sidebar />

      {/* right column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-3 h-[64px] sm:h-[72px] px-4 sm:px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

          <h1 className="text-[16px] sm:text-[18px] font-semibold text-white pl-12 lg:pl-0 truncate">
            Profile
          </h1>
        </div>

        {/* main content */}
        <div className="flex-1 p-4 sm:p-5 lg:p-8">

          {/* page header */}
<div className="mb-6 sm:mb-8 min-w-0">
  <h1 className="text-[20px] sm:text-[22px] font-semibold text-white truncate">
    {profile.name || "Admin User"}
  </h1>

  <p className="flex items-center gap-1.5 text-[13px] sm:text-[14px] text-[#f0a83b] mt-1 min-w-0">
    <FiBriefcase size={14} className="shrink-0" />
    <span className="truncate">
      {profile.organization_name || "No organization found"}
    </span>
  </p>
</div>

          {/* profile banner */}
          <div className="p-4 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mb-5 sm:mb-6">

            <div className="flex items-center gap-3 sm:gap-4 min-w-0">

              <span className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f0a83b]/[0.12] border border-[#f0a83b]/25 text-[#f0a83b] text-[18px] sm:text-[20px] font-semibold shrink-0">
                {initials}
              </span>

              <div className="min-w-0">

                <h2 className="text-[17px] sm:text-[18px] font-semibold text-white truncate">
                  {profile.name || "Admin User"}
                </h2>

                <p className="text-[13px] sm:text-[13.5px] text-[#8b909c] mt-0.5 truncate">
                  {profile.email}
                </p>
<p className="flex items-center gap-1.5 text-[12.5px] sm:text-[13px] text-[#f0a83b] mt-1 min-w-0">
  <FiBriefcase size={13} className="shrink-0" />
  <span className="truncate">
    {profile.organization_name || "No organization found"}
  </span>
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
                  {profile.role}
                </span>

              </div>

            </div>

          </div>

          {/* statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">

            {statCards.map((card) => {
              const Icon = card.icon
              return (
                <div key={card.label} className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

                  <span className={`flex items-center justify-center w-9 h-9 rounded-[8px] mb-3 sm:mb-4 ${card.color}`}>
                    <Icon size={17} />
                  </span>

                  <p className="text-[22px] sm:text-[24px] font-semibold text-white">
                    {card.value}
                  </p>

                  <p className="text-[12.5px] sm:text-[13px] text-[#8b909c] mt-1">
                    {card.label}
                  </p>

                </div>
              )
            })}

          </div>

          {/* account details + activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">

            {/* account details */}
            <div className="lg:col-span-2 p-4 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] min-w-0">

              <h3 className="text-[15px] sm:text-[16px] font-semibold text-white mb-5">
                Account Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

                <div className="flex flex-col gap-1.5 min-w-0">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={profile.name || ""}
                    onChange={handleProfileChange}
                    className="h-[44px] px-3.5 w-full rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white outline-none focus:border-[#f0a83b] transition-colors"
                  />

                </div>

                <div className="flex flex-col gap-1.5 min-w-0">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Email Address
                  </label>

                  <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 min-w-0">

                    <HiOutlineMail className="text-[#5b606c] shrink-0" size={16} />

                    <span className="text-[14px] text-white truncate">
                      {profile.email}
                    </span>

                  </div>

                </div>

                <div className="flex flex-col gap-1.5 min-w-0">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Phone Number
                  </label>

                  <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 focus-within:border-[#f0a83b] transition-colors min-w-0">

                    <HiOutlinePhone className="text-[#5b606c] shrink-0" size={16} />

                    <input
                      type="text"
                      name="phone"
                      value={profile.phone || ""}
                      onChange={handleProfileChange}
                      placeholder="Enter phone number"
                      className="flex-1 w-full min-w-0 bg-transparent border-none outline-none text-[14px] text-white placeholder:text-[#5b606c]"
                    />

                  </div>

                </div>

                <div className="flex flex-col gap-1.5 min-w-0">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Role
                  </label>

                  <input
                    type="text"
                    value={profile.role || ""}
                    readOnly
                    className="h-[44px] px-3.5 w-full rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white outline-none"
                  />

                </div>

                <div className="flex flex-col gap-1.5 min-w-0">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Organization
                  </label>

                  <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 min-w-0">

                    <FiBriefcase className="text-[#5b606c] shrink-0" size={16} />

                    <span className="text-[14px] text-white truncate">
                      {profile.organization_name || "—"}
                    </span>

                  </div>

                </div>

                <div className="flex flex-col gap-1.5 min-w-0">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={profile.location || ""}
                    onChange={handleProfileChange}
                    placeholder="Enter your location"
                    className="h-[44px] px-3.5 w-full rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                  />

                </div>

                <div className="flex flex-col gap-1.5 min-w-0 sm:col-span-2">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Joined Date
                  </label>

                  <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 min-w-0">

                    <HiOutlineCalendar className="text-[#5b606c] shrink-0" size={16} />

                    <span className="text-[14px] text-white truncate">
                      {profile.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "—"}
                    </span>

                  </div>

                </div>

              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6 sm:mt-7">

                <button
                  type="button"
                  onClick={fetchProfile}
                  className="h-[42px] px-5 w-full sm:w-auto rounded-[8px] text-[13.5px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveProfile}
                  disabled={savingProfile}
                  className="h-[42px] px-5 w-full sm:w-auto rounded-[8px] text-[13.5px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {savingProfile ? 'Saving...' : 'Save Changes'}
                </button>

              </div>

            </div>

            {/* recent activity */}
            <div className="p-4 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] min-w-0">

              <h3 className="text-[15px] sm:text-[16px] font-semibold text-white mb-5">
                Recent Activity
              </h3>

              <div className="flex flex-col gap-5">

                {activity.length === 0 ? (
                  <p className="text-[13px] text-[#5b606c]">
                    No recent activity yet
                  </p>
                ) : (
                  activity.map((item, index) => (
                    <div key={item.id || index} className="flex items-start gap-3">

                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f0a83b] shrink-0"></span>

                      <div className="min-w-0">
                        <p className="text-[13.5px] text-[#c7c9d1] leading-snug break-words">
                          {item.message || item.description || item.action}
                        </p>

                        <p className="text-[12px] text-[#5b606c] mt-1">
                          {new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                        </p>
                      </div>

                    </div>
                  ))
                )}

              </div>

            </div>

          </div>

          {/* security */}
          <div className="p-4 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mt-5 sm:mt-6">

            <h3 className="text-[15px] sm:text-[16px] font-semibold text-white mb-5">
              Security
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">

              <div className="flex flex-col gap-1.5">

                <label className="text-[12.5px] font-medium text-[#a8abb8]">
                  Current Password
                </label>

                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="h-[44px] px-3.5 w-full rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                />

              </div>

              <div className="flex flex-col gap-1.5">

                <label className="text-[12.5px] font-medium text-[#a8abb8]">
                  New Password
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="h-[44px] px-3.5 w-full rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                />

              </div>

              <div className="flex flex-col gap-1.5">

                <label className="text-[12.5px] font-medium text-[#a8abb8]">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="h-[44px] px-3.5 w-full rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                />

              </div>

            </div>

            <button
              type="button"
              onClick={handleUpdatePassword}
              disabled={savingPassword}
              className="h-[42px] px-5 mt-6 w-full sm:w-auto rounded-[8px] text-[13.5px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {savingPassword ? 'Updating...' : 'Update Password'}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminProfile;