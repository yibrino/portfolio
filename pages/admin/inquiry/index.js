import AdminLayout from "../../../components/AdminLayout";
import withAuthGuard from "../../../components/HOC/Authguard";
import Inquiry from "../../../components/admin/Inquiry/inquiry";
const InquiryPage = () => {
  return (
    <AdminLayout>
      <Inquiry />
    </AdminLayout>
  );
};
export default withAuthGuard(InquiryPage);
