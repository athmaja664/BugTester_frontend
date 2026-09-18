import React, { useState, useEffect } from "react";
import LeadSidebar from "../../Components/Lead/LeadSidebar";
import { AiOutlineSearch, AiOutlineProject } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
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
  getMyProjectsAPI,
  getBugsAPI,
  getMyActivityAPI,
} from "../../../../services/allAPI";

function LeadProfile() {
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "", location: "" })
  const [saving, setSaving] = useState(false)

  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
  const [changingPassword, setChangingPassword] = useState(false)

  const [projects, setProjects] = useState([])
  const [bugs, setBugs] = useState([])
  const [activity, setActivity] = useState([])

  const token = localStorage.getItem('token')

  const getProfile = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` }
      const response = await getMyProfileAPI(reqHeader)
      if (response.status === 200) {
        setProfile(response.data.user)
        setFormData({
          name: response.data.user.name || "",
          phone: response.data.user.phone || "",
          location: response.data.user.location || ""
        })
      }
    } catch (err) {
      toast.error('Failed to load profile')
    }
  }

  const getProjects = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` }
      const response = await getMyProjectsAPI(reqHeader)
      if (response.status === 200) {
        setProjects(response.data.projects)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getBugs = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` }
      const response = await getBugsAPI(reqHeader)
      if (response.status === 200) {
        setBugs(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getActivity = async () => {
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
    getProfile()
    getProjects()
    getBugs()
    getActivity()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCancelEdit = () => {
    setFormData({
      name: profile?.name || "",
      phone: profile?.phone || "",
      location: profile?.location || ""
    })
    setIsEditing(false)
  }

  const handleSaveProfile = async () => {
    if (!formData.name.trim()) {
      toast.error('Name is required')
      return
    }

    try {
      setSaving(true)
      const reqHeader = { Authorization: `Bearer ${token}` }
      const response = await updateMyProfileAPI(formData, reqHeader)
      if (response.status === 200) {
        toast.success('Profile updated successfully')
        setProfile(response.data.user)
        setIsEditing(false)
      } else {
        toast.error(response?.response?.data?.message || 'Failed to update profile')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdatePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error('Please fill in all password fields')
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    try {
      setChangingPassword(true)
      const reqHeader = { Authorization: `Bearer ${token}` }
      const reqBody = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }
      const response = await changeMyPasswordAPI(reqBody, reqHeader)
      if (response.status === 200) {
        toast.success('Password changed successfully')
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      } else {
        toast.error(response?.response?.data?.message || 'Failed to change password')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to change password')
    } finally {
      setChangingPassword(false)
    }
  }

  const getInitials = (name) => {
    if (!name) return "—"
    return name.trim().split(" ").map((word) => word.charAt(0)).join("").slice(0, 2).toUpperCase()
  }

  const timeAgo = (dateString) => {
    if (!dateString) return "—"
    const diffMs = Date.now() - new Date(dateString).getTime()
    const diffMins = Math.floor(diffMs / 60000)
    if (diffMins < 1) return "just now"
    if (diffMins < 60) return `${diffMins} min ago`
    const diffHrs = Math.floor(diffMins / 60)
    if (diffHrs < 24) return `${diffHrs} hr${diffHrs > 1 ? 's' : ''} ago`
    const diffDays = Math.floor(diffHrs / 24)
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    const diffWeeks = Math.floor(diffDays / 7)
    return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`
  }

  // stats
  const myProjectIds = projects.map((p) => p.id)
  const myBugs = bugs.filter((item) => myProjectIds.includes(item.project_id))
  const bugsReviewed = myBugs.filter((item) => ['Verified', 'Closed'].includes(item.status)).length

  const teamMemberIds = new Set()
  projects.forEach((project) => {
    (project.members || []).forEach((member) => teamMemberIds.add(member.id))
  })

  const initials = getInitials(profile?.name)

  return (
    <div className="flex min-h-screen bg-[#0d0f14]">
      <LeadSidebar />

      {/* right column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-[72px] px-5 lg:px-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

          <h1 className="text-[18px] font-semibold text-white pl-14 lg:pl-0">
            Profile
          </h1>

          <div className="flex items-center gap-4">

            <div className="hidden sm:flex items-center gap-2 h-[40px] px-3.5 w-[240px] bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">
              <AiOutlineSearch className="text-[#5b606c]" size={17} />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 w-full bg-transparent border-none outline-none text-[13.5px] text-white placeholder:text-[#5b606c]"
              />
            </div>

            <div className="flex items-center gap-2.5 pl-2 pr-1 sm:pr-3 h-10 rounded-[8px] hover:bg-white/[0.04] cursor-pointer">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#c7c9d1] text-[12.5px] font-semibold">
                {initials}
              </span>
              <span className="hidden sm:block text-[13.5px] font-medium text-white">
                {profile?.name || "Lead"}
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

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

              <div className="flex items-center gap-4">

                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#f0a83b]/[0.12] border border-[#f0a83b]/25 text-[#f0a83b] text-[20px] font-semibold shrink-0">
                  {initials}
                </span>

                <div>
                  <h2 className="text-[18px] font-semibold text-white">
                    {profile?.name || "—"}
                  </h2>

                  <p className="text-[13.5px] text-[#8b909c] mt-0.5">
                    {profile?.email || "—"}
                  </p>

                  <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25">
                    <HiOutlineShieldCheck size={13} />
                    {profile?.role || "Lead"}
                  </span>
                </div>

              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center gap-2 px-4 h-[42px] rounded-[8px] text-[14px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer shrink-0"
                >
                  <MdOutlineEdit size={16} />
                  Edit Profile
                </button>
              )}

            </div>

          </div>

          {/* statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

            <div className="p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b] mb-4">
                <AiOutlineProject size={17} />
              </span>
              <p className="text-[24px] font-semibold text-white">
                {projects.length}
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
                {bugsReviewed}
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
                {teamMemberIds.size}
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

                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`h-[44px] px-3.5 rounded-[8px] border text-[14px] text-white outline-none transition-colors ${isEditing ? "bg-white/[0.03] border-white/10 focus:border-[#f0a83b]" : "bg-white/[0.03] border-white/10"}`}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10">
                    <HiOutlineMail className="text-[#5b606c]" size={16} />
                    <span className="text-[14px] text-white">
                      {profile?.email || "—"}
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                    />
                  ) : (
                    <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10">
                      <HiOutlinePhone className="text-[#5b606c]" size={16} />
                      <span className="text-[14px] text-white">
                        {profile?.phone || "Not set"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Role */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Role
                  </label>
                  <input
                    type="text"
                    value={profile?.role || "—"}
                    readOnly
                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white outline-none"
                  />
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    placeholder={isEditing ? "Enter location" : ""}
                    className="h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[14px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                  />
                </div>

                {/* Joined Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-medium text-[#a8abb8]">
                    Joined Date
                  </label>
                  <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10">
                    <HiOutlineCalendar className="text-[#5b606c]" size={16} />
                    <span className="text-[14px] text-white">
                      {profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "—"}
                    </span>
                  </div>
                </div>

              </div>

              {isEditing && (
                <div className="flex gap-3 mt-7">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="h-[42px] px-5 rounded-[8px] text-[13.5px] font-medium text-[#a8abb8] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="h-[42px] px-5 rounded-[8px] text-[13.5px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}

            </div>

            {/* recent activity */}
            <div className="p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <h3 className="text-[16px] font-semibold text-white mb-5">
                Recent Activity
              </h3>

              {activity.length === 0 ? (
                <p className="text-[13px] text-[#5b606c]">
                  No recent activity yet
                </p>
              ) : (
                <div className="flex flex-col gap-5">
                  {activity.slice(0, 6).map((item, index) => (
                    <div key={item.id || index} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f0a83b] shrink-0"></span>
                      <div>
                        <p className="text-[13.5px] text-[#c7c9d1] leading-snug">
                          {item.description || item.action}
                        </p>
                        <p className="text-[12px] text-[#5b606c] mt-1">
                          {timeAgo(item.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

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
              disabled={changingPassword}
              className="h-[42px] px-5 mt-6 rounded-[8px] text-[13.5px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {changingPassword ? 'Updating...' : 'Update Password'}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LeadProfile;