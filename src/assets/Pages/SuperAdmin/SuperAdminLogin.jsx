import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBug } from "react-icons/fa6";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { superAdminloginAPI } from "../../../../services/allAPI";
import toast from "react-hot-toast";

function SuperAdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      toast.error("please fill the form");
      return;
    }
    try {
      const response = await superAdminloginAPI(loginData);
      if (response.status === 200) {
        localStorage.setItem("superAdminToken", response.data.token);
        localStorage.setItem("superAdmin", JSON.stringify(response.data.superAdmin));
        toast.success("Login Successfully");
        setTimeout(() => {
          navigate('/superadmin/dashboard')
        }, 1000);
      } else {
        toast.error(response.data.message || 'invalid email or password');
      }
    }
    catch (err) {
      console.log(err);
      toast.error('something went wrong');
    }
  };

  return (
    <div
      className="min-h-screen font-['DM_Sans',sans-serif] relative overflow-hidden flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 900px 600px at 15% 10%, rgba(240,168,59,0.10), transparent 60%), radial-gradient(ellipse 900px 700px at 85% 90%, rgba(87,106,255,0.14), transparent 60%), #0d0f14",
      }}
    >
      {/* ambient grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* logo top-left, same as normal login */}
      <a href="#" aria-label="BugTester home" className="absolute top-8 left-8 flex items-center gap-2.5 max-[640px]:top-6 max-[640px]:left-6">
        <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]">
          <FaBug className="w-[18px] h-[18px] text-[#0d0f14]" />
        </span>
        <span className="text-[19px] font-bold tracking-tight text-white">
          BugTester
        </span>
      </a>

      {/* card */}
      <section
        className="relative flex flex-col items-start w-[460px] max-w-[92vw] px-[46px] pt-[52px] pb-[48px] bg-[#161922] border border-white/[0.06] rounded-[14px] shadow-[0_8px_40px_rgba(0,0,0,0.35)] max-[400px]:px-6 max-[400px]:pt-10 max-[400px]:pb-9"
        aria-labelledby="superadmin-login-title"
      >
        {/* badge */}
        <div className="flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
          <HiOutlineShieldCheck className="w-4 h-4 text-[#f0a83b]" />
          <span className="text-[12px] font-medium text-[#a8abb8] tracking-wide">
            PLATFORM ACCESS
          </span>
        </div>

        <h2
          id="superadmin-login-title"
          className="mb-2 text-[24px] font-semibold leading-normal text-white"
        >
          SuperAdmin Sign in
        </h2>
        <p className="mb-9 text-sm text-[#6a6f7b]">
          Manage client organizations and billing. Not for regular team members.
        </p>

        <div className="flex flex-col items-start self-stretch w-full gap-[10px]">
          <label className="block text-sm font-medium leading-normal text-[#a8abb8]" htmlFor="sa-email">
            Email
          </label>
          <div className="flex items-center gap-[10px] h-[52px] px-[14px] w-full bg-white/[0.03] border border-white/10 rounded-[4px] transition-colors focus-within:border-[#f0a83b]">
            <span className="flex-none w-5 h-5 text-[#6a6f7b]" aria-hidden="true">
              <HiOutlineMail className="w-5 h-5" />
            </span>
            <input
              className="flex-1 w-full min-w-0 h-full text-base font-normal text-white bg-transparent border-none outline-none placeholder:font-medium placeholder:text-[#5b606c]"
              type="text"
              id="sa-email"
              name="email"
              placeholder="superadmin@mindlabs.com"
              autoComplete="username"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col items-start self-stretch w-full gap-[10px] mt-[28px]">
          <label className="block text-sm font-medium leading-normal text-[#a8abb8]" htmlFor="sa-password">
            Password
          </label>
          <div className="flex items-center gap-[10px] h-[52px] px-[14px] w-full bg-white/[0.03] border border-white/10 rounded-[4px] transition-colors focus-within:border-[#f0a83b]">
            <span className="flex-none w-5 h-5 text-[#6a6f7b]" aria-hidden="true">
              <HiOutlineLockClosed className="w-5 h-5" />
            </span>
            <input
              className="flex-1 w-full min-w-0 h-full text-base font-normal text-white bg-transparent border-none outline-none placeholder:font-medium placeholder:text-[#5b606c]"
              type={showPassword ? "text" : "password"}
              id="sa-password"
              name="password"
              placeholder="Enter password"
              autoComplete="current-password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <span
              className="text-[#6a6f7b] ml-2 cursor-pointer hover:text-[#a8abb8]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          className="flex items-center justify-center self-stretch w-full h-[56px] mt-[30px] text-base font-bold text-[#0d0f14] bg-[#f0a83b] border-none rounded-[3px] cursor-pointer transition-colors hover:bg-[#f5bc6b] active:scale-[0.995]"
        >
          Sign in
        </button>

        <p className="self-stretch mt-6 text-center text-xs text-[#5b606c]">
          Client team members should use the regular BugTester login instead.
        </p>
        <button
          type="button"
          onClick={() => navigate('/admin/login')}
          className="self-stretch mt-3 text-center text-xs text-[#f0a83b] hover:text-[#f5bc6b] underline underline-offset-2 bg-transparent border-none cursor-pointer"
        >
          Go to client login
        </button>
      </section>
    </div>
  );
}

export default SuperAdminLogin;