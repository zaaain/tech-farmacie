import React, { useEffect } from 'react';
import useLogout from "hooks/useLogout";

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const logout = useLogout()

    useEffect(() => {
      const isVerufy = localStorage.getItem('jwt')

      if (!isVerufy) {
        logout()
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
