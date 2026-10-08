import React, { useState, useEffect } from "react";
import { FaBug } from "react-icons/fa6";
import { HiOutlineShieldCheck, HiOutlineArrowLeft } from "react-icons/hi";
import { HiOutlineOfficeBuilding, HiOutlineMail, HiOutlineCalendar } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getOrganizationByIdAPI, updateOrgBillingStatusAPI } from "../../../../services/allAPI";

const roleColors = {
  Administrator: "text-[#f0a83b] bg-[#f0a83b]/10",
  Lead: "text-[#a78bfa] bg-[#a78bfa]/10",
  Developer: "text-[#8b98ff] bg-[#8b98ff]/10",
  Tester: "text-[#4ade80] bg-[#4ade80]/10",
};

function SuperAdminOrgDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);
  const token = localStorage.getItem('superAdminToken');

  const getOrganization = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const response = await getOrganizationByIdAPI(id, reqHeader);
      if (response.status === 200) {
        setOrganization(response.data.organization);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load organization');
    }
  };

  useEffect(() => {
    getOrganization();
  }, [id]);

  const handleToggleStatus = async () => {
    const newStatus = organization.billing_status === 'active' ? 'pending' : 'active';
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      await updateOrgBillingStatusAPI(id, { status: newStatus }, reqHeader);
      toast.success(`Organization ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
      getOrganization();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update status');
    }
  };

  if (!organization) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0f14]">
        <p className="text-[#5b606c] text-sm">Loading organization...</p>
      </div>
    );
  }

  const isActive = organization.billing_status === 'active';

  return (
    <div
      className="min-h-screen font-['DM_Sans',sans-serif] relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 900px 600px at 15% 10%, rgba(240,168,59,0.10), transparent 60%), radial-gradient(ellipse 900px 700px at 85% 90%, rgba(87,106,255,0.14), transparent 60%), #0d0f14",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-10 py-10 max-[640px]:px-5 max-[640px]:py-7">

        <header className="flex items-center justify-between mb-10 max-[640px]:flex-col max-[640px]:gap-5 max-[640px]:items-start">
          <a href="#" aria-label="BugTester home" className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]">
              <FaBug className="w-[18px] h-[18px] text-[#0d0f14]" />
            </span>
            <span className="text-[19px] font-bold tracking-tight text-white">
              BugTester
            </span>
          </a>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/10">
            <HiOutlineShieldCheck className="w-4 h-4 text-[#f0a83b]" />
            <span className="text-[13px] font-medium text-[#a8abb8]">
              PLATFORM ACCESS
            </span>
          </div>
        </header>

        <button onClick={() => navigate("/superadmin/dashboard")} className="flex items-center gap-2 text-sm text-[#a8abb8] hover:text-white mb-6 cursor-pointer">
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Organizations
        </button>

        <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] p-7 mb-6 flex items-center justify-between max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-5">
          <div className="flex items-center gap-4">
            <span className="flex items-center justify-center w-14 h-14 rounded-[12px] bg-white/[0.04] border border-white/10">
              <HiOutlineOfficeBuilding className="w-6 h-6 text-[#f0a83b]" />
            </span>
            <div>
              <h1 className="text-xl font-semibold text-white">{organization.name}</h1>
              <div className="flex items-center gap-4 mt-1.5">
                <span className="flex items-center gap-1.5 text-sm text-[#6a6f7b]">
                  <HiOutlineMail className="w-4 h-4" />
                  {organization.contact_email || "—"}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-[#6a6f7b]">
                  <HiOutlineCalendar className="w-4 h-4" />
                  Joined {organization.created_at ? new Date(organization.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isActive ? (
              <span className="inline-flex items-center gap-1.5 bg-[#4ade80]/10 text-[#4ade80] text-xs font-medium px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-[#f87171]/10 text-[#f87171] text-xs font-medium px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
                Pending
              </span>
            )}
            <button
              onClick={handleToggleStatus}
              className={isActive
                ? "h-[42px] px-4 text-sm font-medium text-[#f87171] bg-[#f87171]/10 border border-[#f87171]/20 rounded-[3px] hover:bg-[#f87171]/20 cursor-pointer"
                : "h-[42px] px-4 text-sm font-medium text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/20 rounded-[3px] hover:bg-[#4ade80]/20 cursor-pointer"
              }
            >
              {isActive ? "Deactivate" : "Activate"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] p-6">
            <p className="text-sm text-[#6a6f7b]">Total Members</p>
            <p className="text-3xl font-bold text-white mt-2">{organization.members?.length || 0}</p>
          </div>
          <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] p-6">
            <p className="text-sm text-[#6a6f7b]">Projects</p>
            <p className="text-3xl font-bold text-white mt-2">{organization.project_count ?? "—"}</p>
          </div>
          <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] p-6">
            <p className="text-sm text-[#6a6f7b]">Open Bugs</p>
            <p className="text-3xl font-bold text-white mt-2">{organization.open_bug_count ?? "—"}</p>
          </div>
        </div>

        <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06]">
            <h2 className="text-base font-semibold text-white">Members</h2>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-[#6a6f7b] text-xs uppercase tracking-wide">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {(!organization.members || organization.members.length === 0) ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-[#5b606c] text-sm">
                    No members yet
                  </td>
                </tr>
              ) : (
                organization.members.map((m) => (
                  <tr key={m.id}>
                    <td className="px-6 py-4 text-white font-medium">{m.name}</td>
                    <td className="px-6 py-4 text-[#a8abb8] text-sm">{m.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${roleColors[m.role] || "text-[#a8abb8] bg-white/[0.05]"}`}>
                        {m.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default SuperAdminOrgDetail;