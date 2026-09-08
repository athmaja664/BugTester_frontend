import React, { useState } from "react";
import toast from "react-hot-toast";
import { updateUserAPI, resetUserPasswordAPI } from "../../../../services/allAPI";

function EditUserModal({ user, onClose, getUsers }) {
    const [name, setName] = useState(user?.name || "")
    const [email, setEmail] = useState(user?.email || "")
    const [role, setRole] = useState(user?.role || "Developer")
    const [newPassword, setNewPassword] = useState("")
    const token = localStorage.getItem('token')

    const handleUpdate = async () => {
        if (!name || !email) {
            toast.error("Please fill all fields")
            return
        }
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const reqBody = { name, email, role }
            const response = await updateUserAPI(user.id, reqBody, reqHeader)
            if (response.status === 200) {
                toast.success('User updated successfully')
                getUsers()
                onClose()
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to update user')
        }
    }

    const handleResetPassword = async () => {
        if (!newPassword || newPassword.length < 6) {
            toast.error("Password must be at least 6 characters")
            return
        }
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const reqBody = { newPassword }
            const response = await resetUserPasswordAPI(user.id, reqBody, reqHeader)
            if (response.status === 200) {
                toast.success('Password reset successfully')
                setNewPassword("")
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to reset password')
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] px-4">
            <div className="bg-[#161922] border border-white/[0.08] rounded-[16px] shadow-lg w-full max-w-[420px] p-6">

                <h3 className="text-lg font-semibold text-white mb-5">
                    Edit User
                </h3>

                <div className="flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#a8abb8]">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Rahul S."
                            className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#a8abb8]">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@bugtester.com"
                            className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#a8abb8]">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white outline-none focus:border-[#f0a83b] cursor-pointer"
                        >
                            <option className="bg-[#161922]" value="Administrator">Administrator</option>
                            <option className="bg-[#161922]" value="Lead">Lead</option>
                            <option className="bg-[#161922]" value="Developer">Developer</option>
                            <option className="bg-[#161922]" value="Tester">Tester</option>
                        </select>
                    </div>

                </div>

                {/* Reset Password section */}
                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                    <label className="text-[12.5px] font-medium text-[#a8abb8]">
                        Reset Password
                    </label>
                    <div className="flex gap-3 mt-2">
                        <input
                            type="text"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New password"
                            className="flex-1 h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
                        />
                        <button
                            onClick={handleResetPassword}
                            className="px-4 h-[42px] text-sm font-medium text-[#f0a83b] border border-[#f0a83b]/25 bg-[#f0a83b]/[0.08] rounded-[8px] hover:bg-[#f0a83b]/[0.15] transition-colors cursor-pointer whitespace-nowrap"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-[#a8abb8] border border-white/10 rounded-[8px] hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 text-sm font-semibold text-[#0d0f14] bg-[#f0a83b] rounded-[8px] hover:bg-[#f5bc6b] transition-colors cursor-pointer"
                    >
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    )
}

export default EditUserModal