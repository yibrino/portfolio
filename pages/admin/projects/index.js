import AdminLayout from "../../../components/AdminLayout";
import Projects from "../../..//components/admin/projects/projects";
import withAuthGuard from "../../../components/HOC/Authguard";
const ProjectsPage = () => {
  return (
    <AdminLayout>
      <Projects />
    </AdminLayout>
  );
};
export default withAuthGuard(ProjectsPage);
