import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import NewDashboard from './pages/NewDashboard'
import Contacts from './pages/Contacts'
import Accounts from './pages/Accounts'
import Opportunities from './pages/Opportunities'
import Projects from './pages/Projects'
import Campaigns from './pages/Campaigns'
import Tasks from './pages/Tasks'
import Login from './components/login'

// V2 Imports
import LoginV2Layout from './components/v2/loginLayout'
import LoginV2 from './components/v2/login'
import LoginV2Form from './components/v2/loginForm'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/v2/login" element={<LoginV2Layout />}>
        <Route index element={<LoginV2 />} />
        <Route path="admin" element={<LoginV2Form role="admin" title="Admin Login" subtitle="Access the dashboard as an administrator" />} />
        <Route path="employee" element={<LoginV2Form role="employee" title="Employee Login" subtitle="Access your employee portal and tasks" />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newdashboard" element={<NewDashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/tasks" element={<Tasks />} />
      </Route>

      {/* Redirect fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App;