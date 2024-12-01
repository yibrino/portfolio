import AdminLayout from "../../../components/AdminLayout";
import Pages from "../../../components/admin/pages/pages";
import withAuthGuard from "../../../components/HOC/Authguard";
const Page = () => {
  return (
    <AdminLayout>
      <Pages />
    </AdminLayout>
  );
};
export default withAuthGuard(Page);
