import React from "react";
import AdminLayout from "../../components/AdminLayout";
import AdminDashboard from "../../components/dashboard/AdminDashboard";
import withAuthGuard from "../../components/HOC/Authguard";
const Admin = () => {
  return (
    <div>
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </div>
  );
};
Admin.noLayout = true;

export default withAuthGuard(Admin);
