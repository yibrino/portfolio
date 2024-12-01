import AdminLayout from "../../../components/AdminLayout";
import Categories from "../../../components/admin/categories/categories";
import withAuthGuard from "../../../components/HOC/Authguard";
const Category = () => {
  return (
    <AdminLayout>
      <Categories />
    </AdminLayout>
  );
};
export default withAuthGuard(Category);
