import AdminLayout from "../../../components/AdminLayout";
import Specialization from "../../..//components/admin/specialization/specialization";
import withAuthGuard from "../../../components/HOC/Authguard";
const SpecializationPage = () => {
  return (
    <AdminLayout>
      <Specialization />
    </AdminLayout>
  );
};

export default withAuthGuard(SpecializationPage);
