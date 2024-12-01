import AdminLayout from "../../../components/AdminLayout";
import Skills from "../../..//components/admin/skills/skills";
import withAuthGuard from "../../../components/HOC/Authguard";
const SkillsPage = () => {
  return (
    <AdminLayout>
      <Skills />
    </AdminLayout>
  );
};
export default withAuthGuard(SkillsPage);
