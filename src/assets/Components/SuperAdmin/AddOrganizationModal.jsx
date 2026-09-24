import React, { useState } from "react";
import { HiOutlineX, HiOutlineOfficeBuilding } from "react-icons/hi";
import { createOrganizationAPI } from "../../../../services/allAPI";
import { Navigate, useNavigate } from "react-router-dom";

function AddOrganizationModal({ isOpen, onClose }) {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    orgName: "",
    contactEmail: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async() => {
    if(!formData.orgName||!formData.adminEmail){
      toast.error('Please fill teh form!')
      return;
    }
    const token=localStorage.getItem('superAdminToken')
    const reqHeader={Authorization:`Bearer ${token}`}
    const response= await createOrganizationAPI(formData,reqHeader)
   console.log(response);
   if(response.status===200){
    toast.success('organization added successfully')
    navigate('/superadmin/dashboard')
   }
   else{
    toast.error(response.data.message)
   }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] w-[720px] max-w-full max-h-[90vh] overflow-y-auto shadow-[0_8px_40px_rgba(0,0,0,0.35)]">

        {/* header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]/10">
              <HiOutlineOfficeBuilding className="w-[18px] h-[18px] text-[#f0a83b]" />
            </span>
            <h2 className="text-lg font-semibold text-white">Add Organization</h2>
          </div>
          <button onClick={onClose} className="text-[#6a6f7b] hover:text-white">
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* form - two columns */}
        <div className="px-7 py-6 grid grid-cols-2 gap-8">

          {/* left: organization details */}
          <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold text-[#f0a83b] uppercase tracking-wide">
              Organization Details
            </p>

            <div className="flex flex-col gap-[10px]">
              <label className="text-sm font-medium text-[#a8abb8]">Organization Name</label>
              <input
                type="text"
                name="orgName"
                placeholder="e.g. XX Technologies"
                value={formData.orgName}
                onChange={handleChange}
                className="h-[48px] px-[14px] w-full bg-white/[0.03] border border-white/10 rounded-[4px] text-sm text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
              />
            </div>

            <div className="flex flex-col gap-[10px]">
              <label className="text-sm font-medium text-[#a8abb8]">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                placeholder="contact@xx.com"
                value={formData.contactEmail}
                onChange={handleChange}
                className="h-[48px] px-[14px] w-full bg-white/[0.03] border border-white/10 rounded-[4px] text-sm text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
              />
            </div>
          </div>

          {/* right: first admin account */}
          <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold text-[#f0a83b] uppercase tracking-wide">
              First Admin Account
            </p>

            <div className="flex flex-col gap-[10px]">
              <label className="text-sm font-medium text-[#a8abb8]">Admin Name</label>
              <input
                type="text"
                name="adminName"
                placeholder="e.g. John Doe"
                value={formData.adminName}
                onChange={handleChange}
                className="h-[48px] px-[14px] w-full bg-white/[0.03] border border-white/10 rounded-[4px] text-sm text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
              />
            </div>

            <div className="flex flex-col gap-[10px]">
              <label className="text-sm font-medium text-[#a8abb8]">Admin Email</label>
              <input
                type="email"
                name="adminEmail"
                placeholder="admin@xx.com"
                value={formData.adminEmail}
                onChange={handleChange}
                className="h-[48px] px-[14px] w-full bg-white/[0.03] border border-white/10 rounded-[4px] text-sm text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
              />
            </div>

            <div className="flex flex-col gap-[10px]">
              <label className="text-sm font-medium text-[#a8abb8]">Admin Password</label>
              <input
                type="password"
                name="adminPassword"
                placeholder="Set a temporary password"
                value={formData.adminPassword}
                onChange={handleChange}
                className="h-[48px] px-[14px] w-full bg-white/[0.03] border border-white/10 rounded-[4px] text-sm text-white placeholder:text-[#5b606c] outline-none focus:border-[#f0a83b]"
              />
            </div>
          </div>

        </div>

        {/* footer - centered button */}
        <div className="flex items-center justify-center gap-3 px-7 py-5 border-t border-white/[0.06]">
          <button
            onClick={onClose}
            className="h-[44px] px-5 text-sm font-medium text-[#a8abb8] hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="h-[44px] px-6 text-sm font-bold text-[#0d0f14] bg-[#f0a83b] rounded-[3px] hover:bg-[#f5bc6b]"
          >
            Create Organization
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddOrganizationModal;