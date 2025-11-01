import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Workspace from "./pages/Workspace/Workspace";
import AddWorkspace from "./pages/Workspace/AddWorkspace";
import "./App.css";
import OTPVerify from "./pages/auth//VerifyOtp";
import CreateProfile from "./pages/auth/profile/CreateProfile";
import SignIn from "./pages/auth/SignIn";
import CreateOrganization from "./pages/auth/organization/CreateOrganization";
import NewHome from "./pages/Home/NewHome";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Network from "./pages/Network/Network";
import Roles from "./pages/Users/Roles/Roles";
import AddNetwork from "./pages/Network/AddNetwork";
import Setting from "./pages/Setting/Setting";
import WorkspaceDashboardLayout from "./layouts/Workspace/WorkspaceDashboardLayout";
import WorkspaceHome from "./pages/Workspace/Home/WorkspaceHome";
import Cluster from "./pages/Cluster/Cluster";
import AddCluster from "./pages/Cluster/AddCluster";
import ClusterDetails from "./pages/Cluster/ClusterDetails";
import CloudResourceIAMRole from "./pages/CloudResourceIAMRole/CloudResourceIAMRole";
import AddCloudResourceIAMRole from "./pages/CloudResourceIAMRole/AddCloudResourceIAMRole";
export default function App() {
  return (
    <div className="layouts">
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/verify-otp" element={<OTPVerify />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/create-organization" element={<CreateOrganization />} />
        {/* workspace routes nested under dashboard so Sidebar stays visible */}
        {/* these will render inside DashboardLayout's <Outlet /> */}


        {/* Main Dashboard Layout */}

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="workspace" element={<Workspace />} />
          <Route path="workspace/add-workspace" element={<AddWorkspace />} />
          <Route path="users" element={<Users />} />
          <Route path="users/roles" element={<Roles />} />
          <Route path="network" element={<Network />} />
          <Route path="network/add-network" element={<AddNetwork />} />
          <Route path="setting" element={<Setting />} />
          <Route path="home" element={<NewHome />} />
          <Route path="home2" element={<Home />} />
        </Route>

        {/* Workspace Dashboard Layout */}
        <Route
          path="/workspace/:workspaceId/*"
          element={
            <ProtectedRoute>
              <WorkspaceDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<WorkspaceHome />} />
          <Route path="cluster" element={<Cluster/>} />
          <Route path="cluster/add-cluster" element={<AddCluster/>} />
          <Route path="cluster/:clusterId/cluster-detail" element={<ClusterDetails/>} />
          <Route path="cloude-resource" element={<CloudResourceIAMRole/>} />
          <Route path="cloude-resource/add-cloude-resource" element={<AddCloudResourceIAMRole/>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
