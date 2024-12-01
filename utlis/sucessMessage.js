import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./sucessmessage.module.css";

export function successMessage(successContent) {
  console.log("Success Message", successContent);
  return toast.success(successContent, {
    position: "bottom-center", // Use top-center to position centrally (we'll adjust it with CSS)
    autoClose: 5000, // Toast stays for 2 seconds
    className: classes.customSuccessToast, // Custom class for toast container
    hideProgressBar: true, // Hide progress bar
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    icon: "✅", // Success icon
  });
}
