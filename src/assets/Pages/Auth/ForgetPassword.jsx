import { Link } from "react-router-dom"

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="bg-white rounded-xl2 w-full max-w-sm p-9">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">B</div>
          <span className="font-display text-xl font-semibold">BugTester</span>
        </div>
        <p className="text-sm text-slate-500 mb-7">Reset your password</p>

        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email</label>
        <input
          type="email"
          placeholder="name@company.com"
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />

        <button className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-indigo-700">
          Send reset link
        </button>

        <p className="text-center mt-5">
          <Link to="/login" className="text-sm text-slate-500 hover:text-indigo-600">
            ← Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}
