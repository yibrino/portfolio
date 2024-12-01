import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";
import EducationFrom from "../../components/admin/educationForm/educationform";
const EditEducation = () => {
  return (
    <AdminLayout>
      <EducationFrom />
    </AdminLayout>
  );
};
export default withAuthGuard(EditEducation);
