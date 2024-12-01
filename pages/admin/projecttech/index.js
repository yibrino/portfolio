import AdminLayout from "../../../components/AdminLayout";
import Projettech from "../../../components/admin/projecttech/projecttech";
import withAuthGuard from "../../../components/HOC/Authguard";
const Projecttech = () => {
  return (
    <AdminLayout>
      <Projettech />
    </AdminLayout>
  );
};
export default withAuthGuard(Projecttech);
