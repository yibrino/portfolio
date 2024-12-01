import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";
import SpecializationFrom from "../../components/admin/specializationForm/specializationform";
const NewSpecialization = () => {
  return (
    <AdminLayout>
      <SpecializationFrom />
    </AdminLayout>
  );
};

export default withAuthGuard(NewSpecialization);
