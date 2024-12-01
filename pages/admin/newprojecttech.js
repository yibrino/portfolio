import ProjecttechForm from "../../components/admin/projecttechform/projecttechform";
import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";

const NewProjecttech = () => {
  return (
    <AdminLayout>
      <ProjecttechForm />
    </AdminLayout>
  );
};

export default withAuthGuard(NewProjecttech);
