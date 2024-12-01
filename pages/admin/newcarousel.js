import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";
import NewCarousel from "../../components/admin/newcarousel/newcarousel";
const UsersPage = () => {
  return (
    <AdminLayout>
      <NewCarousel />
    </AdminLayout>
  );
};
export default withAuthGuard(UsersPage);
