import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";
import HeroForm from "../../components/admin/heroform/HeroForm";
const NewHero = () => {
  return (
    <AdminLayout>
      <HeroForm />
    </AdminLayout>
  );
};
export default withAuthGuard(NewHero);
