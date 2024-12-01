import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";
import PageForm from "../../components/admin/pageform/pageform";
const NewPage = () => {
  return (
    <AdminLayout>
      <PageForm />
    </AdminLayout>
  );
};

export default withAuthGuard(NewPage);
