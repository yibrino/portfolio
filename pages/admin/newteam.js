import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";
import TeamForm from "../../components/admin/teamform/TeamForm";
const NewsTeam = () => {
  return (
    <AdminLayout>
      <TeamForm />
    </AdminLayout>
  );
};
export default withAuthGuard(NewsTeam);
