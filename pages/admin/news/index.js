import AdminLayout from "../../../components/AdminLayout";
import News from "../../..//components/admin/news/news";
import withAuthGuard from "../../../components/HOC/Authguard";
const NewsPage = () => {
  return (
    <AdminLayout>
      <News />
    </AdminLayout>
  );
};
export default withAuthGuard(NewsPage);
