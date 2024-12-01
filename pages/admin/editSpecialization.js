import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";
import SpecializationFrom from "../../components/admin/specializationForm/specializationform";
const EditSpecialization = () => {
  return (
    <AdminLayout>
      <SpecializationFrom />
    </AdminLayout>
  );
};

export default withAuthGuard(EditSpecialization);
