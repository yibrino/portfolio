import React, { useEffect, useState } from "react";
import classes from "./form.module.css";
import { sendEmail } from "../../../../utlis/sendEmail"; // Make sure this utility function is properly defined
import "react-toastify/dist/ReactToastify.css";
import { successMessage } from "../../../../utlis/sucessMessage"; // Assuming successMessage is a toast notification
import { createMessage } from "../../../../features/mesage/helpers"; // Assuming this is the action to create message in Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../../features/categories/helpers";

const Form = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullname, setFullname] = useState(""); // Added state for fullname
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  const validateEmails = (email, confirmEmail) => {
    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Invalid email format.");
      return false;
    }
    if (confirmEmail && email !== confirmEmail) {
      setEmailError("Emails do not match.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmails(value, confirmEmail);
  };

  const handleConfirmEmailChange = (e) => {
    const value = e.target.value;
    setConfirmEmail(value);
    validateEmails(email, value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate emails before proceeding
    if (!validateEmails(email, confirmEmail)) return;

    setIsSubmitting(true);

    try {
      // Dispatch action to store form data in Redux
      dispatch(
        createMessage({
          message_fullname: fullname,
          message_email: email,
          message_category: category,
          message_content: message,
        })
      );

      // Send email using the sendEmail function
      const emailContent = `Category: ${category}. Message: ${message}`;
      const response = await sendEmail({
        user: email,
        message: emailContent,
      });

      if (response) {
        // If email is sent successfully, show a success message
        successMessage("Your Message Was Successfully Submitted!");
        setFullname("");
        setEmail("");
        setConfirmEmail("");
        setCategory("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={`${classes.form}`} onSubmit={submitHandler}>
      <div className={`${classes.form__group}`}>
        <input
          type="text"
          placeholder="Your Full Name"
          value={fullname} // Bind to fullname state
          onChange={(e) => setFullname(e.target.value)}
          required
        />
      </div>
      <div className={`${classes.form__group}`}>
        <select
          className={classes.dropdown}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a Technology Category
          </option>
          {categories &&
            categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
        </select>
      </div>
      <div className={`${classes.form__group}`}>
        <input
          type="email"
          placeholder="Enter Your Email Address"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className={`${classes.form__group}`}>
        <input
          type="email"
          placeholder="Confirm Your Email Address"
          value={confirmEmail}
          onChange={handleConfirmEmailChange}
          required
        />
      </div>
      {emailError && <p className={classes.error}>{emailError}</p>}
      <div className={`${classes.form__group}`}>
        <textarea
          type="text"
          rows={5}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <button
        className={`${classes.primary__btn}`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Your Request"}
      </button>
    </form>
  );
};

export default Form;
