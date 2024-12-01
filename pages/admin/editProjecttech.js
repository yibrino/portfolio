import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";
import ProjecttechForm from "../../components/admin/projecttechform/projecttechform";
const EditProjecttech = () => {
  return (
    <AdminLayout>
      <ProjecttechForm />
    </AdminLayout>
  );
};

export default withAuthGuard(EditProjecttech);
