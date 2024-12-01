import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";
import CategoryForm from "../../components/admin/categoryform/categoryform";
const NewCategory = () => {
  return (
    <AdminLayout>
      <CategoryForm />
    </AdminLayout>
  );
};
export default withAuthGuard(NewCategory);
