import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const withAuthGuard = (WrappedComponent) => {
  const AuthGuard = (props) => {
    const { token } = useSelector((state) => state.auth); // Redux token
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        // Redirect to login if no token
        router.push("/login");
      }
    }, [token, router]);

    // Show nothing until redirect completes
    if (!token) return null;

    return <WrappedComponent {...props} />;
  };

  return AuthGuard;
};

export default withAuthGuard;
