import React, { useState, useEffect } from "react";
import LeadSidebar from "../../Components/Lead/LeadSidebar";
import { AiOutlineSearch, AiOutlineProject, AiOutlineClose } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineShieldCheck,
  HiOutlineLocationMarker,
  HiOutlineUser,
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
import { FiBriefcase } from "react-icons/fi";

function LeadProfile() {
  const [profile, setProfile] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
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

  // close the modal with the Escape key, and stop the page scrolling behind it
  useEffect(() => {
    if (!showEditModal) return
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowEditModal(false)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [showEditModal])

  const openEditModal = () => {
    setFormData({
      name: profile?.name || "",
      phone: profile?.phone || "",
      location: profile?.location || ""
    })
    setShowEditModal(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
    if (!formData.name.trim()) {
      toast.error('Name is required')
      return
    }
    if (saving) return

    try {
      setSaving(true)
      const reqHeader = { Authorization: `Bearer ${token}` }
      const response = await updateMyProfileAPI(formData, reqHeader)
      if (response.status === 200) {
        toast.success('Profile updated successfully')
        await getProfile()
        setShowEditModal(false)
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

  // read-only row used in the Account Details card
  const InfoRow = ({ label, icon: Icon, value }) => (
    <div className="flex flex-col gap-1.5 min-w-0">
      <label className="text-[12.5px] font-medium text-[#a8abb8]">{label}</label>
      <div className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 min-w-0">
        <Icon className="text-[#5b606c] shrink-0" size={16} />
        <span className="text-[14px] text-white truncate">{value}</span>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-[#0d0f14]">
      <LeadSidebar />

      {/* right column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* header (name and initials removed) */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-3 h-[64px] sm:h-[72px] pl-16 pr-4 lg:pl-8 lg:pr-8 bg-[#0d0f14]/95 backdrop-blur border-b border-white/[0.06]">

          <h1 className="text-[16px] sm:text-[18px] font-semibold text-white truncate">
            Profile
          </h1>

          <div className="hidden md:flex items-center gap-2 h-[40px] px-3.5 w-[240px] shrink-0 bg-white/[0.03] border border-white/10 rounded-[8px] focus-within:border-[#f0a83b]">
            <AiOutlineSearch className="text-[#5b606c]" size={17} />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 w-full bg-transparent border-none outline-none text-[13.5px] text-white placeholder:text-[#5b606c]"
            />
          </div>

        </div>

        {/* main content */}
        <div className="flex-1 p-4 sm:p-5 lg:p-8">

          {/* page header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-[20px] sm:text-[22px] font-semibold text-white">
              Profile
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#8b909c] mt-1">
              Manage your account information
            </p>
          </div>

          {/* profile banner */}
          <div className="p-4 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px] mb-5 sm:mb-6">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

              <div className="flex items-center gap-4 min-w-0">

                <span className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f0a83b]/[0.12] border border-[#f0a83b]/25 text-[#f0a83b] text-[18px] sm:text-[20px] font-semibold shrink-0">
                  {initials}
                </span>

                <div className="min-w-0">
                  <h2 className="text-[17px] sm:text-[18px] font-semibold text-white truncate">
                    {profile?.name || "—"}
                  </h2>

                  <p className="text-[13px] sm:text-[13.5px] text-[#8b909c] mt-0.5 truncate">
                    {profile?.email || "—"}
                  </p>

                  {profile?.organization_name && (
                    <p className="flex items-center gap-1.5 text-[12.5px] sm:text-[13px] text-[#f0a83b] mt-1 min-w-0">
                      <FiBriefcase size={13} className="shrink-0" />
                      <span className="truncate">{profile.organization_name}</span>
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 text-[12px] font-medium rounded-[5px] bg-[#f0a83b]/[0.12] text-[#f0a83b] border border-[#f0a83b]/25">
                    <HiOutlineShieldCheck size={13} />
                    {profile?.role || "Lead"}
                  </span>
                </div>

              </div>

              <button
                type="button"
                onClick={openEditModal}
                className="flex items-center justify-center gap-2 px-4 h-[42px] w-full sm:w-auto rounded-[8px] text-[14px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer shrink-0"
              >
                <MdOutlineEdit size={16} />
                Edit Profile
              </button>

            </div>

          </div>

          {/* statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">

            <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/[0.12] text-[#f0a83b] mb-3 sm:mb-4">
                <AiOutlineProject size={17} />
              </span>
              <p className="text-[22px] sm:text-[24px] font-semibold text-white">
                {projects.length}
              </p>
              <p className="text-[13px] text-[#8b909c] mt-1">
                Projects Managed
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#576aff]/[0.12] text-[#8b98ff] mb-3 sm:mb-4">
                <BsBug size={17} />
              </span>
              <p className="text-[22px] sm:text-[24px] font-semibold text-white">
                {bugsReviewed}
              </p>
              <p className="text-[13px] text-[#8b909c] mt-1">
                Bugs Reviewed
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-[#161922] border border-white/[0.06] rounded-[14px]">
              <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#4ade80]/[0.12] text-[#4ade80] mb-3 sm:mb-4">
                <CgProfile size={17} />
              </span>
              <p className="text-[22px] sm:text-[24px] font-semibold text-white">
                {teamMemberIds.size}
              </p>
              <p className="text-[13px] text-[#8b909c] mt-1">
                Team Members
              </p>
            </div>

          </div>

          {/* account details + activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">

            {/* account details (read-only, edit happens in the modal) */}
            <div className="lg:col-span-2 p-4 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <h3 className="text-[15px] sm:text-[16px] font-semibold text-white mb-5">
                Account Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <InfoRow label="Full Name" icon={HiOutlineUser} value={profile?.name || "—"} />
                <InfoRow label="Email Address" icon={HiOutlineMail} value={profile?.email || "—"} />
                <InfoRow label="Phone Number" icon={HiOutlinePhone} value={profile?.phone || "Not set"} />
                <InfoRow label="Role" icon={HiOutlineShieldCheck} value={profile?.role || "—"} />
                <InfoRow label="Location" icon={HiOutlineLocationMarker} value={profile?.location || "Not set"} />
                <InfoRow
                  label="Joined Date"
                  icon={HiOutlineCalendar}
                  value={
                    profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
                      : "—"
                  }
                />
              </div>

            </div>

            {/* recent activity */}
            <div className="p-4 sm:p-6 bg-[#161922] border border-white/[0.06] rounded-[14px]">

              <h3 className="text-[15px] sm:text-[16px] font-semibold text-white mb-5">
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
                      <div className="min-w-0">
                        <p className="text-[13.5px] text-[#c7c9d1] leading-snug break-words">
                          {item.message || item.description || item.action}
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
              className="h-[42px] px-5 mt-6 w-full sm:w-auto rounded-[8px] text-[13.5px] font-semibold text-[#0d0f14] bg-[#f0a83b] hover:bg-[#f5bc6b] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {changingPassword ? 'Updating...' : 'Update Password'}
            </button>

          </div>

        </div>

      </div>

      {/* Edit Profile modal (transparent blurred backdrop) */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-[#161922] border border-white/[0.08] rounded-[16px] shadow-lg w-full max-w-[480px] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >

            {/* header */}
            <div className="flex items-center justify-between px-5 sm:px-7 pt-6 sm:pt-7 pb-5 border-b border-white/[0.06]">
              <h3 className="text-lg font-semibold text-white">Edit Profile</h3>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                aria-label="Close"
                className="w-8 h-8 flex items-center justify-center rounded-[8px] text-[#5b606c] hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
              >
                <AiOutlineClose size={16} />
              </button>
            </div>

            {/* form */}
            <div className="px-5 sm:px-7 py-6 flex flex-col gap-5">

              <div className="flex flex-col gap-2">
                <label className="text-[12.5px] font-medium text-[#a8abb8]">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoFocus
                  className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12.5px] font-medium text-[#a8abb8]">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12.5px] font-medium text-[#a8abb8]">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b] transition-colors"
                />
              </div>

              <p className="text-[12px] text-[#5b606c]">
                Your email and role can only be changed by an administrator.
              </p>

            </div>

            {/* footer */}
            <div className="flex items-center justify-center gap-3 px-5 sm:px-7 py-5 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="h-[44px] px-5 text-sm font-medium text-[#a8abb8] hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={saving}
                className="h-[44px] px-6 text-sm font-bold text-[#0d0f14] bg-[#f0a83b] rounded-[8px] hover:bg-[#f5bc6b] disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default LeadProfile;