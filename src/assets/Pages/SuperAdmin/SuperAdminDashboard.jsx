import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBug } from "react-icons/fa6";
import { HiOutlineShieldCheck, HiOutlineOfficeBuilding, HiOutlineCreditCard } from "react-icons/hi";
import { HiOutlinePlus } from "react-icons/hi2";
import toast from "react-hot-toast";
import AddOrganizationModal from "../../Components/SuperAdmin/AddOrganizationModal";
import { getOrganizationsAPI, updateOrgBillingStatusAPI } from "../../../../services/allAPI";

function SuperAdminDashboard() {
  const navigate = useNavigate();
  const [showAddOrgModal, setShowAddOrgModal] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const token = localStorage.getItem('superAdminToken');

  const getOrganizations = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const response = await getOrganizationsAPI(reqHeader);
      if (response.status === 200) {
        setOrganizations(response.data.organizations);
      }
    } catch (err) {
      toast.error('Failed to load organizations');
    }
  };

  useEffect(() => {
    getOrganizations();
  }, []);

  const handleActivate = async (org) => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      await updateOrgBillingStatusAPI(org.id, { status: 'active' }, reqHeader);
      toast.success(`${org.name} activated`);
      getOrganizations();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to activate organization');
    }
  };

  const totalOrgs = organizations.length;
  const activeOrgs = organizations.filter((o) => o.billing_status === 'active').length;
  const pendingOrgs = organizations.filter((o) => o.billing_status !== 'active').length;

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

        <div className="flex items-center justify-between mb-8 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-4">
          <div>
            <h1 className="text-[26px] font-semibold text-white">SuperAdmin Dashboard</h1>
            <p className="text-sm text-[#6a6f7b] mt-1">Manage client organizations and billing</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/superadmin/billing")}
              className="flex items-center gap-2 h-[46px] px-5 text-sm font-medium text-[#a8abb8] bg-white/[0.04] border border-white/10 rounded-[3px] cursor-pointer hover:text-white hover:border-white/20"
            >
              <HiOutlineCreditCard className="w-4 h-4" />
              Billing
            </button>

            <button
              onClick={() => setShowAddOrgModal(true)}
              className="flex items-center gap-2 h-[46px] px-5 text-sm font-bold text-[#0d0f14] bg-[#f0a83b] border-none rounded-[3px] cursor-pointer transition-colors hover:bg-[#f5bc6b]"
            >
              <HiOutlinePlus className="w-4 h-4" />
              Add Organization
            </button>
          </div>
        </div>

        {showAddOrgModal && (
          <AddOrganizationModal
            onClose={() => setShowAddOrgModal(false)}
            onCreated={getOrganizations}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] p-6">
            <p className="text-sm text-[#6a6f7b]">Total Organizations</p>
            <p className="text-3xl font-bold text-white mt-2">{totalOrgs}</p>
          </div>
          <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] p-6">
            <p className="text-sm text-[#6a6f7b]">Active Clients</p>
            <p className="text-3xl font-bold text-[#4ade80] mt-2">{activeOrgs}</p>
          </div>
          <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] p-6">
            <p className="text-sm text-[#6a6f7b]">Inactive / Pending Billing</p>
            <p className="text-3xl font-bold text-[#f87171] mt-2">{pendingOrgs}</p>
          </div>
        </div>

        <div className="bg-[#161922] border border-white/[0.06] rounded-[14px] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-2.5">
            <HiOutlineOfficeBuilding className="w-4 h-4 text-[#f0a83b]" />
            <h2 className="text-base font-semibold text-white">Client Organizations</h2>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-[#6a6f7b] text-xs uppercase tracking-wide">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Contact Email</th>
                <th className="px-6 py-3 font-medium">Billing Status</th>
                <th className="px-6 py-3 font-medium">Created At</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {organizations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[#5b606c] text-sm">
                    No organizations yet
                  </td>
                </tr>
              ) : (
                organizations.map((org) => (
                  <tr key={org.id}>
                    <td className="px-6 py-4 text-white font-medium">{org.name}</td>
                    <td className="px-6 py-4 text-[#a8abb8] text-sm">{org.contact_email || "—"}</td>
                    <td className="px-6 py-4">
                      {org.billing_status === 'active' ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#4ade80]/10 text-[#4ade80] text-xs font-medium px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-[#f87171]/10 text-[#f87171] text-xs font-medium px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#6a6f7b] text-sm">
                      {org.created_at ? new Date(org.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => navigate(`/superadmin/orgdetails/${org.id}`)}
                          className="text-[#f0a83b] text-sm font-medium hover:underline cursor-pointer"
                        >
                          View
                        </button>
                        {org.billing_status !== 'active' && (
                          <button
                            onClick={() => handleActivate(org)}
                            className="text-[#4ade80] text-sm font-medium hover:underline cursor-pointer"
                          >
                            Activate
                          </button>
                        )}
                      </div>
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

export default SuperAdminDashboard;