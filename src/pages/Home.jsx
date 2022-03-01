import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import UsersTable from '../components/UserTable';
import users from '../data/users.json';

export default function Home() {
  const [userData, setUserData] = useState(users);
  const convertAccount = (id, conversionType) => {
    const index = userData.findIndex(u => u.id === id);
    const updatedUserData = [...userData];
    updatedUserData[index] = {
      ...updatedUserData[index],
      accountType: conversionType,
    };
    setUserData(updatedUserData);
  };
  return (
    <div>
      <Navbar />
      <UsersTable users={userData} convertAccount={convertAccount} />
    </div>
  );
}
