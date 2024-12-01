import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../utlis/loadingSpinner";
import CarouseForm from "../../components/admin/newcarousel/newcarousel";
import { getAllCarousels } from "../../features/carousel/helpers";
import AdminLayout from "../../components/AdminLayout";
import withAuthGuard from "../../components/HOC/Authguard";

const EditCarousel = () => {
  return (
    <AdminLayout>
      <CarouseForm />
    </AdminLayout>
  );
};

export default withAuthGuard(EditCarousel);
