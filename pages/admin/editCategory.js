import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";
import CategoryForm from "../../components/admin/categoryform/categoryform";
const EditCategory = () => {
  return (
    <AdminLayout>
      <CategoryForm />
    </AdminLayout>
  );
};
export default withAuthGuard(EditCategory);
