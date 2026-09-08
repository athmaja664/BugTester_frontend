import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import { AiOutlineSearch, AiOutlineProject } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { BsBug } from "react-icons/bs";
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
        setActivity(response.data.activity)
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

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
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

  return (
    <div className="flex min-h-screen bg-[#0d0f14]">
      <Sidebar />

      {/* right column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

          <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
            Profile
          </h1>

          <div className="flex items-center gap-4">

         

            <div className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-3 h-10 rounded-[8px] hover:bg-white/[0.04] cursor-pointer">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[12.5px] font-semibold">
                {profile.name ? profile.name.split(' ').map((item) => item[0]).join('').toUpperCase().slice(0, 2) : "AD"}
              </span>

              <span className="hidden sm:block text-[13.5px] font-medium text-white">
                {profile.name || "Admin"}
              </span>
            </div>

          </div>
        </div>

        {/* main content */}
        <div className="flex-1 p-5 lg:p-8">

          {/* page header */}
          <div className="mb-8">
            <h1 className="text-[22px] font-semibold text-white">
              Profile
            </h1>

            <p className="text-[14px] text-[#8b909c] mt-1">
              Manage your account information
            </p>
          </div>

          {/* profile banner */}
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mb-6">

            <div className="flex items-center gap-4">

              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#f0a83b]/[0.12] border border-[#f0a83b]/25 text-[#f0a83b] text-[20px] font-semibold">
                {profile.name ? profile.name.split(' ').map((item) => item[0]).join('').toUpperCase().slice(0, 2) : "AD"}
              </span>

              <div>

                <h2 className="text-[18px] font-semibold text-white">
                  {profile.name || "Admin User"}
                </h2>

                <p className="text-[13.5px] text-[#8b909c] mt-0.5">
                  {profile.email}
                </p>

                <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25">
                  <HiOutlineShieldCheck size={13} />
                  {profile.role}
                </span>

              </div>

            </div>

          </div>

          {/* statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b] mb-4">
                <AiOutlineProject size={17} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                {stats.projectsManaged}
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Projects Managed
              </p>

            </div>

            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff] mb-4">
                <BsBug size={17} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                {stats.bugsReviewed}
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Bugs Reviewed
              </p>

            </div>

            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80] mb-4">
                <CgProfile size={17} />
              </span>

              <p className="text-[24px] font-semibold text-white">
                {stats.teamMembers}
              </p>

              <p className="text-[13px] text-[#8b909c] mt-1">
                Team Members
              </p>

            </div>

          </div>

          {/* account details + activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* account details */}
            <div className="lg:col-span-2 p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <h3 className="text-[16px] font-semibold text-white mb-5">
                Account Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div className="flex flex-col gap-1.5">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white outline-none focus:border-[#f0a83b] transition-colors"
                  />

                </div>

                <div className="flex flex-col gap-1.5">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Email Address
                  </label>

                  <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10">

                    <HiOutlineMail
                      className="text-[#5b606c]"
                      size={16}
                    />

                    <span className="text-[14px] text-white">
                      {profile.email}
                    </span>

                  </div>

                </div>

                <div className="flex flex-col gap-1.5">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Phone Number
                  </label>

                  <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 focus-within:border-[#f0a83b] transition-colors">

                    <HiOutlinePhone
                      className="text-[#5b606c]"
                      size={16}
                    />

                    <input
                      type="text"
                      name="phone"
                      value={profile.phone || ""}
                      onChange={handleProfileChange}
                      placeholder="Enter phone number"
                      className="flex-1 w-full bg-transparent border-none outline-none text-[14px] text-white placeholder:text-[#5b606c]"
                    />

                  </div>

                </div>

                <div className="flex flex-col gap-1.5">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Role
                  </label>

                  <input
                    type="text"
                    value={profile.role}
                    readOnly
                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white outline-none"
                  />

                </div>

                <div className="flex flex-col gap-1.5">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={profile.location || ""}
                    onChange={handleProfileChange}
                    placeholder="Enter your location"
                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                  />

                </div>

                <div className="flex flex-col gap-1.5">

                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Joined Date
                  </label>

                  <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10">

                    <HiOutlineCalendar
                      className="text-[#5b606c]"
                      size={16}
                    />

                    <span className="text-[14px] text-white">
                      {profile.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "—"}
                    </span>

                  </div>

                </div>

              </div>

              <div className="flex gap-3 mt-7">

                <button
                  type="button"
                  onClick={fetchProfile}
                  className="h-[42px] px-5 rounded-[8px] text-[13.5px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveProfile}
                  disabled={savingProfile}
                  className="h-[42px] px-5 rounded-[8px] text-[13.5px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {savingProfile ? 'Saving...' : 'Save Changes'}
                </button>

              </div>

            </div>

            {/* recent activity */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <h3 className="text-[16px] font-semibold text-white mb-5">
                Recent Activity
              </h3>

              <div className="flex flex-col gap-5">

                {activity.length === 0 ? (
                  <p className="text-[13px] text-[#5b606c]">
                    No recent activity yet
                  </p>
                ) : (
                  activity.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">

                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f0a83b] shrink-0"></span>

                      <div>
                        <p className="text-[13.5px] text-[#c7c9d1] leading-snug">
                          {item.message}
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
          <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mt-6">

            <h3 className="text-[16px] font-semibold text-white mb-5">
              Security
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

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
                  className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
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
                  className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
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
                  className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                />

              </div>

            </div>

            <button
              type="button"
              onClick={handleUpdatePassword}
              disabled={savingPassword}
              className="h-[42px] px-5 mt-6 rounded-[8px] text-[13.5px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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