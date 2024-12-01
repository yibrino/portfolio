import HeroForm from "../../components/admin/heroform/HeroForm";

import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";

const EditHero = () => {
  return (
    <AdminLayout>
      <HeroForm />
    </AdminLayout>
  );
};

export default withAuthGuard(EditHero);
