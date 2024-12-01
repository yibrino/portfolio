import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";
import ProjectForm from "../../components/admin/projectform/projectform";
const EditProject = () => {
  return (
    <AdminLayout>
      <ProjectForm />
    </AdminLayout>
  );
};

export default withAuthGuard(EditProject);
