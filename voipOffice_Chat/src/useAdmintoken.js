import { useState } from 'react';

export default function useAdmintoken() {
  const getAdmin = () => {
    const tokenString = sessionStorage.getItem('admin');
    const userAdmin = JSON.parse(tokenString);
    return userAdmin?.admin
  };

  const [admin, setAdmin]  = useState(getAdmin())

  const saveToken = userAdmin => {
    sessionStorage.setItem('admin', JSON.stringify(userAdmin));
    setAdmin(userAdmin.admin);
  };

  return {
    setAdmin: saveToken,
    admin
  }
}