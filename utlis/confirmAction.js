import Swal from "sweetalert2";
import { toast } from "react-toastify";
import styles from "./confirmaction.module.css";

/**
 * Displays a confirmation dialog and executes a callback if confirmed.
 *
 * @param {string} title - The title of the confirmation dialog.
 * @param {string} text - The text body of the confirmation dialog.
 * @param {string} confirmText - The text for the confirm button.
 * @param {string} cancelText - The text for the cancel button.
 * @param {Function} onConfirm - The callback to execute if confirmed.
 */
const confirmAction = async ({
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  confirmText = "Yes, do it!",
  cancelText = "Cancel",
  onConfirm,
}) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    customClass: {
      popup: styles.customSwalPopup,
      title: styles.customSwalTitle,
      content: styles.customSwalContent,
      confirmButton: styles.customSwalConfirmButton,
      cancelButton: styles.customSwalCancelButton,
    },
  });

  if (result.isConfirmed && onConfirm) {
    try {
      await onConfirm();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error during confirmed action:", error);
    }
  }
};

export default confirmAction;
