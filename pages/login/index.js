import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInHandler } from "../../features/auth/helpers";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import styles from "./login.module.css";
import { successMessage } from "../../utlis/sucessMessage";
import { useRouter } from "next/router";

const Signin = () => {
  const loginInputs = {
    user_email: "",
    password: "",
  };

  const router = useRouter();
  const [formInputs, setFormInputs] = useState(loginInputs);
  const [showHide, setShowHide] = useState(false);

  const { user_email, password } = formInputs;
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formSignInHandler = async (e) => {
    e.preventDefault();

    if (!user_email || !password) {
      toast.error("All fields are required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }

    try {
      // Dispatching the login action and waiting for the result
      await dispatch(signInHandler({ user_email, password }));

      // Redirecting on successful login
      router.push("/admin");
      successMessage("User Logged In Successfully");
    } catch (error) {
      // General error handling for any kind of issue
      toast.error("An error occurred during login. Please try again.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className={styles.signinContainer}>
      <div className={styles.formContainer}>
        {isLoading && (
          <div className={styles.loaderOverlay}>
            <ClipLoader color={"#3498db"} loading={isLoading} size={50} />
          </div>
        )}

        <form className={styles.form} onSubmit={formSignInHandler}>
          <h2 className={styles.title}>Sign In</h2>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              name="user_email"
              value={user_email}
              type="email"
              required
              onChange={(e) =>
                setFormInputs({
                  ...formInputs,
                  user_email: e.target.value,
                })
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                name="password"
                value={password}
                type={showHide ? "text" : "password"}
                required
                onChange={(e) =>
                  setFormInputs({
                    ...formInputs,
                    password: e.target.value,
                  })
                }
              />
              <i
                className={`fa-solid ${showHide ? "fa-eye" : "fa-eye-slash"} ${
                  styles.eyeIcon
                }`}
                onClick={() => setShowHide((prev) => !prev)}
              ></i>
            </div>
          </div>

          <button className={styles.submitButton} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
Signin.noLayout = true;
export default Signin;
