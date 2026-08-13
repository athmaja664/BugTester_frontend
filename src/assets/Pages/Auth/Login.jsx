import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaBug } from "react-icons/fa6";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

function Login() {
    const navigate = useNavigate();
  // UI-only state — kept purely for the show/hide password interaction.
  // No API calls, no auth, no navigation wired in.
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen font-['DM_Sans',sans-serif] relative overflow-hidden"
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

      <div className="relative flex flex-col items-center gap-[104px] w-full max-w-[1920px] min-h-screen mx-auto px-[164px] pt-[26px] pb-[167px] max-[1639px]:px-12 max-[1639px]:gap-[72px] max-[1200px]:px-10 max-[1200px]:pb-16 max-[640px]:px-5 max-[640px]:pb-12 max-[640px]:gap-12 max-[400px]:px-4 max-[400px]:gap-10">

        {/* navbar */}
        <header className="flex items-center justify-between w-full shrink-0 max-[640px]:flex-col max-[640px]:gap-5">

          {/* Logo */}
          <a href="#" aria-label="BugTester home" className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#f0a83b]">
              <FaBug className="w-[18px] h-[18px] text-[#0d0f14]" />
            </span>
            <span className="text-[19px] font-bold tracking-tight text-white">
              BugTester
            </span>
          </a>

          {/* status pill (design only) */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/10 max-[400px]:px-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
            <span className="text-[13px] font-medium text-[#a8abb8]">
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
                className="mb-[26px] text-[46px] font-bold tracking-[-1.38px] leading-normal text-white"
              >
                Track every bug from report to close
              </h1>
              
{/* project note */}
<div className="mt-10 max-w-[400px] px-4 py-4 rounded-[8px] bg-white/[0.03] border border-white/[0.06]">
  <p className="text-sm font-medium text-[#a8abb8] mb-1">
    One place for your entire QA workflow
  </p>
  <p className="text-xs leading-5 text-[#6a6f7b]">
    Report bugs, assign them to developers, track progress, and verify
    fixes — all from one organized workspace.
  </p>
</div>


              {/* lifecycle strip — signature visual, not a stock illustration */}
              <div className="flex flex-col gap-0 mt-8">
                {[
                  { label: "Reported", color: "#6b7280" },
                  { label: "In Progress", color: "#f0a83b" },
                  { label: "Verified", color: "#4ade80" },
                ].map((step, i, arr) => (
                  <div key={step.label} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: step.color, boxShadow: `0 0 0 4px ${step.color}22` }}
                      />
                      {i < arr.length - 1 && <span className="w-px h-10 bg-white/10" />}
                    </div>
                    <span className="pb-10 text-[14px] font-mono text-[#c7c9d1]">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* form */}
            <section
              className="flex flex-col items-start self-center flex-[0_0_585px] w-[585px] max-w-full h-[589px] px-[46px] pt-[65px] pb-[87px] bg-[#161922] border border-white/[0.06] rounded-[14px] shadow-[0_8px_40px_rgba(0,0,0,0.35)] max-[1200px]:flex-none max-[1200px]:w-full max-[1200px]:max-w-[585px] max-[1200px]:h-auto max-[640px]:px-7 max-[640px]:py-12 max-[400px]:px-5 max-[400px]:py-9"
              aria-labelledby="login-title"
            >
              <h2
                id="login-title"
                className="self-stretch mb-9 text-[26px] font-semibold leading-normal text-white text-center after:content-[''] after:block after:w-16 after:h-[3px] after:mt-[10px] after:mx-auto after:bg-[#f0a83b] after:rounded-[2px] max-[400px]:text-2xl max-[400px]:mb-7"
              >
                Sign in
              </h2>

              <div className="flex flex-col items-start self-stretch w-full gap-[10px]">
                <label className="block text-lg font-medium leading-normal text-[#a8abb8] max-[400px]:text-base" htmlFor="email">
                  Email
                </label>
                <div className="flex items-center gap-[10px] h-[54px] px-[14px] w-full bg-white/[0.03] border border-white/10 rounded-[4px] transition-colors focus-within:border-[#f0a83b]">
                  <span className="flex-none w-5 h-5 text-[#6a6f7b]" aria-hidden="true">
                    <HiOutlineMail className="w-5 h-5" />
                  </span>
                  <input
                    className="flex-1 w-full min-w-0 h-full text-base font-normal text-white bg-transparent border-none outline-none placeholder:font-medium placeholder:text-[#5b606c]"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="you@company.com"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="flex flex-col items-start self-stretch w-full gap-[10px] mt-[34px]">
                <label className="block text-lg font-medium leading-normal text-[#a8abb8] max-[400px]:text-base" htmlFor="password">
                  Password
                </label>
                <div className="flex items-center gap-[10px] h-[54px] px-[14px] w-full bg-white/[0.03] border border-white/10 rounded-[4px] transition-colors focus-within:border-[#f0a83b]">
                  <span className="flex-none w-5 h-5 text-[#6a6f7b]" aria-hidden="true">
                    <HiOutlineLockClosed className="w-5 h-5" />
                  </span>
                  <input
                    className="flex-1 w-full min-w-0 h-full text-base font-normal text-white bg-transparent border-none outline-none placeholder:font-medium placeholder:text-[#5b606c]"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    autoComplete="current-password"
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
                className="flex items-center justify-center self-stretch w-full max-w-[493px] h-[62px] mt-[33px] p-[10px] text-lg font-bold text-[#0d0f14] bg-[#f0a83b] border-none rounded-[3px] cursor-pointer transition-colors hover:bg-[#f5bc6b] active:scale-[0.995] max-[400px]:h-[54px] max-[400px]:text-base"
              >
                Sign in
              </button>
 
{/* Role navigation - UI prototype only */}
<div className="flex flex-col items-center self-stretch w-full mt-5">
  <p className="mb-3 text-xs text-[#6a6f7b]">
    Preview dashboard as:
  </p>

  <div className="flex items-center justify-center gap-2 w-full">
    <button
      type="button"
      onClick={() => navigate("/admindashboard")}
      className="flex-1 h-9 px-2 rounded-[4px] border border-white/10 bg-white/[0.03] text-xs font-medium text-[#a8abb8] hover:border-[#f0a83b] hover:text-[#f0a83b] transition-colors"
    >
      Admin
    </button>

    <button
      type="button"
      onClick={() => navigate("/leaddashboard")}
      className="flex-1 h-9 px-2 rounded-[4px] border border-white/10 bg-white/[0.03] text-xs font-medium text-[#a8abb8] hover:border-[#f0a83b] hover:text-[#f0a83b] transition-colors"
    >
      Lead
    </button>

    <button
      type="button"
      onClick={() => navigate("/developerdashboard")}
      className="flex-1 h-9 px-2 rounded-[4px] border border-white/10 bg-white/[0.03] text-xs font-medium text-[#a8abb8] hover:border-[#f0a83b] hover:text-[#f0a83b] transition-colors"
    >
      Developer
    </button>

    <button
      type="button"
      onClick={() => navigate("/tester/dashboard")}
      className="flex-1 h-9 px-2 rounded-[4px] border border-white/10 bg-white/[0.03] text-xs font-medium text-[#a8abb8] hover:border-[#f0a83b] hover:text-[#f0a83b] transition-colors"
    >
      Tester
    </button>
  </div>
</div>


             
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Login;
