import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";
import SkillForm from "../../components/admin/skillform/SkillForm";
const EditSkill = () => {
  return (
    <AdminLayout>
      <SkillForm />
    </AdminLayout>
  );
};

export default withAuthGuard(EditSkill);
