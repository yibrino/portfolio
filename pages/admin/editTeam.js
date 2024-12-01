import TeamForm from "../../components/admin/teamform/TeamForm";
import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";

const EditTeam = () => {
  return (
    <AdminLayout>
      <TeamForm />
    </AdminLayout>
  );
};

export default withAuthGuard(EditTeam);
