import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";
import ExperienceForm from "../../components/admin/experienceform/experienceforn";
const NewExperience = () => {
  return (
    <AdminLayout>
      <ExperienceForm />
    </AdminLayout>
  );
};
export default withAuthGuard(NewExperience);
