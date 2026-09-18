import { Routes, Route } from 'react-router-dom'
import Login from './assets/Pages/Auth/Login'
// Admin-side
import AdminDashboard from "./assets/Pages/Admin/AdminDashboard";
import AdminUsers from './assets/Pages/Admin/AdminUsers'
import AdminProjects from './assets/Pages/Admin/AdminProjects'
import AdminBugs from './assets/Pages/Admin/AdminBugs'
import AdminProfile from './assets/Pages/Admin/AdminProfile'
// Lead-side
import LeadDashboard from './assets/Pages/Lead/LeadDashboard';
import LeadBugs from './assets/Pages/Lead/LeadBugs';
import LeadProjects from './assets/Pages/Lead/LeadProjects';
import LeadTeams from './assets/Pages/Lead/LeadTeams';
import LeadProfiles from './assets/Pages/Lead/LeadProfiles'
// Developer-side
import DeveloperDashboard from './assets/Pages/Developers/DeveloperDashboard';
import DeveloperProjects from './assets/Pages/Developers/DeveloperProjects';
import DeveloperBugs from './assets/Pages/Developers/DeveloperBugs';
import DeveloperTasks from './assets/Pages/Developers/DevelopetTasks';
import DeveloperProfile from './assets/Pages/Developers/DeveloperProfile';
//Tester-Side
import TesterDashboard from './assets/Pages/Testers/TesterDashboard';
import TesterProjects from './assets/Pages/Testers/TesterProjects';
import TesterBugs from './assets/Pages/Testers/TesterBugs';
import TesterTasks from './assets/Pages/Testers/TesterTasks';
import TesterProfile from './assets/Pages/Testers/TesterProfile';
//SuperAdmin
import SuperAdminLogin from './assets/Pages/SuperAdmin/SuperAdminLogin';
import SuperAdminDashboard from './assets/Pages/SuperAdmin/SuperAdminDashboard';
import SuperAdminOrgDetail from './assets/Pages/SuperAdmin/SuperAdminOrgDetails';
import SuperAdminBilling from './assets/Pages/SuperAdmin/SuperAdminBilling';

function App() {
  return (
    <Routes>
      {/* Admin-Side */}
      <Route path="/" element={<Login />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/adminusers" element={<AdminUsers />} />
      <Route path="/adminprojects" element={<AdminProjects />} />
      <Route path="/adminbugs" element={<AdminBugs />} />
      <Route path="/adminprofile" element={<AdminProfile />} />
      <Route path="/leaddashboard" element={<LeadDashboard />} />
      {/* SuperAdmin */}
      <Route path="/superadmin/login" element={<SuperAdminLogin/>}/>
      <Route path="/superadmin/dashboard" element={<SuperAdminDashboard/>}/>
      <Route path="/superadmin/orgdetails" element={<SuperAdminOrgDetail/>}/>
      <Route path="/superadmin/billing" element={<SuperAdminBilling/>}/>
      {/* Lead-Side */}
      <Route path="/leadbugs" element={<LeadBugs />} />
      <Route path="/leadprojects" element={<LeadProjects />} />
      <Route path="/leadteams" element={<LeadTeams />} />
      <Route path="/leadprofile" element={<LeadProfiles />} />
      {/* Developer-side */}
      <Route path="/developerdashboard" element={<DeveloperDashboard />} />
      <Route path="/developerproject" element={<DeveloperProjects />} />
      <Route path="/developerbugs" element={<DeveloperBugs />} />
      <Route path="/developertasks" element={<DeveloperTasks />} />
      <Route path="/developerprofile" element={<DeveloperProfile />} />
      {/* Tester-Side */}
      <Route path="/tester/dashboard" element={<TesterDashboard />} />
      <Route path="/tester/projects" element={<TesterProjects />} />
      <Route path="/tester/bugs" element={<TesterBugs />} />
      <Route path="/tester/tasks" element={<TesterTasks />} />
      <Route path="/tester/profile" element={<TesterProfile />} />
    </Routes>
  )
}

export default App