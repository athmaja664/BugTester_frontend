import React, { useState } from "react";
import { createUserAPI } from "../../../../services/allAPI";
import toast from "react-hot-toast";


function AddUserModal({ onClose, getUsers }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("Developer")
    const token = localStorage.getItem('token')

    const handleAdd = async () => {
        if (!name || !email || !password) {
            toast.error("Please fill all fields")
            return
        }
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const reqBody = { name, email, password, role }
            const response = await createUserAPI(reqBody, reqHeader)
            if (response.status === 200 || response.status === 201) {
                toast.success('User created successfully')
                getUsers()
                onClose()
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to create user')
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] px-4">
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] shadow-lg w-full max-w-[420px] p-6">

                <h3 className="text-lg font-semibold text-[#111827] mb-5">
                    Add User
                </h3>

                <div className="flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#374151]">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Rahul S."
                            className="h-[42px] px-3.5 rounded-[8px] bg-white border border-[#d1d5db] text-[13.5px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#f0a83b]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#374151]">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@bugtester.com"
                            className="h-[42px] px-3.5 rounded-[8px] bg-white border border-[#d1d5db] text-[13.5px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#f0a83b]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#374151]">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Temporary password"
                            className="h-[42px] px-3.5 rounded-[8px] bg-white border border-[#d1d5db] text-[13.5px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#f0a83b]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#374151]">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="h-[42px] px-3.5 rounded-[8px] bg-white border border-[#d1d5db] text-[13.5px] text-[#111827] outline-none focus:border-[#f0a83b] cursor-pointer"
                        >
                            <option className="bg-white text-[#111827]" value="Lead">Lead</option>
                            <option className="bg-white text-[#111827]" value="Developer">Developer</option>
                            <option className="bg-white text-[#111827]" value="Tester">Tester</option>
                        </select>
                    </div>

                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-[#374151] border border-[#d1d5db] rounded-[8px] hover:bg-[#f3f4f6] transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 text-sm font-semibold text-[#1f2937] bg-[#f0a83b] rounded-[8px] hover:bg-[#f5bc6b] transition-colors cursor-pointer"
                    >
                        Create User
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AddUserModal