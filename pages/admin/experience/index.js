import AdminLayout from "../../../components/AdminLayout";
import Experience from "../../..//components/admin/experience/experience";
import withAuthGuard from "../../../components/HOC/Authguard";
const ExperiencePage = () => {
  return (
    <AdminLayout>
      <Experience />
    </AdminLayout>
  );
};

export default withAuthGuard(ExperiencePage);
