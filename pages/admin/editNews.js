import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";
import NewsForm from "../../components/admin/newsform/newsform";

const EditNews = () => {
  return (
    <AdminLayout>
      <NewsForm />
    </AdminLayout>
  );
};

export default withAuthGuard(EditNews);
