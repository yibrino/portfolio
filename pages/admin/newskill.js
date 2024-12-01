import SkillForm from "../../components/admin/skillform/SkillForm";
import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";

const NewSkill = () => {
  return (
    <AdminLayout>
      <SkillForm />
    </AdminLayout>
  );
};

export default withAuthGuard(NewSkill);
