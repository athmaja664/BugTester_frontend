import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaBug } from "react-icons/fa6";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import toast from "react-hot-toast";
import { loginAPI } from "../../../../services/allAPI";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // shows the reason once if the user was logged out because their organization was deactivated
  useEffect(() => {
    const notice = sessionStorage.getItem('loginNotice')
    if (notice) {
      toast.error(notice, { id: 'org-inactive' })
      sessionStorage.removeItem('loginNotice')
    }
  }, [])

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill the form", { id: 'login-error' });
      return;
    }
    setLoading(true);
    try {
      const response = await loginAPI(loginData);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Login successful");

        const role = response.data.user.role;
        setTimeout(() => {
          if (role === "Administrator") navigate("/admindashboard");
          else if (role === "Lead") navigate("/leaddashboard");
          else if (role === "Developer") navigate("/developerdashboard");
          else if (role === "Tester") navigate("/tester/dashboard");
          else navigate("/");
        }, 800);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong", { id: 'login-error' });
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen font-['DM_Sans',sans-serif] relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 900px 600px at 15% 10%, rgba(240,168,59,0.14), transparent 60%), radial-gradient(ellipse 900px 700px at 85% 90%, rgba(87,106,255,0.10), transparent 60%), #f6f7fa",
      }}
    >
      {/* ambient grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#1a1d26 1px, transparent 1px), linear-gradient(90deg, #1a1d26 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative flex flex-col items-center gap-[104px] w-full max-w-[1920px] min-h-screen mx-auto px-[164px] pt-[26px] pb-[167px] max-[1639px]:px-12 max-[1639px]:gap-[72px] max-[1200px]:px-10 max-[1200px]:pb-16 max-[640px]:px-5 max-[640px]:pb-12 max-[640px]:gap-12 max-[400px]:px-4 max-[400px]:gap-10">

        {/* navbar */}
        <header className="flex items-center justify-between w-full shrink-0 max-[640px]:flex-col max-[640px]:gap-5">

          {/* Logo */}
          <a href="#" aria-label="BugTester home" className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]">
              <FaBug className="w-[18px] h-[18px] text-[#0d0f14]" />
            </span>
            <span className="text-[19px] font-bold tracking-tight text-[#1a1d26]">
              BugTester
            </span>
          </a>

          {/* status pill (design only) */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#e3e6ec] shadow-sm max-[400px]:px-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span className="text-[13px] font-medium text-[#5b606c]">
              All systems tracked
            </span>
          </div>

        </header>

        <main className="flex justify-center w-full">
          <div className="flex justify-between items-stretch w-[1286px] max-w-full h-[599px] mx-auto max-[1200px]:flex-col-reverse max-[1200px]:items-center max-[1200px]:h-auto max-[1200px]:gap-12 max-[640px]:gap-8">

            {/* hero */}
            <section
              className="flex flex-col flex-[0_0_496px] max-w-[456px] h-full min-h-0 max-[1200px]:hidden"
              aria-labelledby="hero-title"
            >
              <h1
                id="hero-title"
                className="mb-[26px] text-[46px] font-bold tracking-[-1.38px] leading-normal text-[#1a1d26]"
              >
                Track every bug from report to close
              </h1>

              {/* project note */}
              <div className="mt-10 max-w-[400px] px-4 py-4 rounded-[8px] bg-white border border-[#e3e6ec] shadow-sm">
                <p className="text-sm font-medium text-[#3a3f4b] mb-1">
                  One place for your entire QA workflow
                </p>
                <p className="text-xs leading-5 text-[#6a6f7b]">
                  Report bugs, assign them to developers, track progress, and verify
                  fixes — all from one organized workspace.
                </p>
              </div>

              {/* lifecycle strip */}
              <div className="flex flex-col gap-0 mt-8">
                {[
                  { label: "Reported", color: "#6b7280" },
                  { label: "In Progress", color: "#f0a83b" },
                  { label: "Verified", color: "#22c55e" },
                ].map((step, i, arr) => (
                  <div key={step.label} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: step.color, boxShadow: `0 0 0 4px ${step.color}22` }}
                      />
                      {i < arr.length - 1 && <span className="w-px h-10 bg-black/10" />}
                    </div>
                    <span className="pb-10 text-[14px] font-mono text-[#3a3f4b]">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* form */}
            <section
              className="flex flex-col items-start self-center flex-[0_0_585px] w-[585px] max-w-full h-[589px] px-[46px] pt-[65px] pb-[87px] bg-white border border-[#e3e6ec] rounded-[14px] shadow-[0_8px_40px_rgba(26,29,38,0.08)] max-[1200px]:flex-none max-[1200px]:w-full max-[1200px]:max-w-[585px] max-[1200px]:h-auto max-[640px]:px-7 max-[640px]:py-12 max-[400px]:px-5 max-[400px]:py-9"
              aria-labelledby="login-title"
            >
              <h2
                id="login-title"
                className="self-stretch mb-9 text-[26px] font-semibold leading-normal text-[#1a1d26] text-center after:content-[''] after:block after:w-16 after:h-[3px] after:mt-[10px] after:mx-auto after:bg-[#f0a83b] after:rounded-[2px] max-[400px]:text-2xl max-[400px]:mb-7"
              >
                Sign in
              </h2>

              <div className="flex flex-col items-start self-stretch w-full gap-[10px]">
                <label className="block text-lg font-medium leading-normal text-[#5b606c] max-[400px]:text-base" htmlFor="email">
                  Email
                </label>
                <div className="flex items-center gap-[10px] h-[54px] px-[14px] w-full bg-[#f7f8fa] border border-[#e3e6ec] rounded-[4px] transition-colors focus-within:border-[#f0a83b] focus-within:bg-white">
                  <span className="flex-none w-5 h-5 text-[#8a8f9c]" aria-hidden="true">
                    <HiOutlineMail className="w-5 h-5" />
                  </span>
                  <input
                    className="flex-1 w-full min-w-0 h-full text-base font-normal text-[#1a1d26] bg-transparent border-none outline-none placeholder:font-medium placeholder:text-[#9aa0ad]"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    autoComplete="username"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col items-start self-stretch w-full gap-[10px] mt-[34px]">
                <label className="block text-lg font-medium leading-normal text-[#5b606c] max-[400px]:text-base" htmlFor="password">
                  Password
                </label>
                <div className="flex items-center gap-[10px] h-[54px] px-[14px] w-full bg-[#f7f8fa] border border-[#e3e6ec] rounded-[4px] transition-colors focus-within:border-[#f0a83b] focus-within:bg-white">
                  <span className="flex-none w-5 h-5 text-[#8a8f9c]" aria-hidden="true">
                    <HiOutlineLockClosed className="w-5 h-5" />
                  </span>
                  <input
                    className="flex-1 w-full min-w-0 h-full text-base font-normal text-[#1a1d26] bg-transparent border-none outline-none placeholder:font-medium placeholder:text-[#9aa0ad]"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    autoComplete="current-password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                  <span
                    className="text-[#8a8f9c] ml-2 cursor-pointer hover:text-[#1a1d26]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="flex items-center justify-center self-stretch w-full max-w-[493px] h-[62px] mt-[33px] p-[10px] text-lg font-bold text-[#0d0f14] bg-[#f0a83b] border-none rounded-[3px] cursor-pointer transition-colors hover:bg-[#f5bc6b] active:scale-[0.995] disabled:opacity-70 disabled:cursor-not-allowed max-[400px]:h-[54px] max-[400px]:text-base"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Login;