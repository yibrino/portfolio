import AdminLayout from "../../../components/AdminLayout";
import UserList from "../../../components/userlist/userlist";
import Teams from "../../teams";
import NewsLayout from "../../../layouts/newslayout";
import HomeSection from "../../../components/admin/homeSection/HomeSection";
import withAuthGuard from "../../../components/HOC/Authguard";
const HomeSectionPage = () => {
  return (
    <AdminLayout>
      <HomeSection />
    </AdminLayout>
  );
};
export default withAuthGuard(HomeSectionPage);
