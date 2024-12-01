import AdminLayout from "../../../components/AdminLayout";
import withAuthGuard from "../../../components/HOC/Authguard";
import Education from "../../../components/admin/education/education";

const EducationPage = () => {
  return (
    <AdminLayout>
      <Education />
    </AdminLayout>
  );
};
export default withAuthGuard(EducationPage);
