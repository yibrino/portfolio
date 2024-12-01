import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";
import ExperienceForm from "../../components/admin/experienceform/experienceforn";
const EditExperience = () => {
  return (
    <AdminLayout>
      <ExperienceForm />
    </AdminLayout>
  );
};

export default withAuthGuard(EditExperience);
