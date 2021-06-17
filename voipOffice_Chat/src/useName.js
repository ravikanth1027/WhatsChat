import { useState } from 'react';

export default function useName() {
  const getName = () => {
    const nameString = sessionStorage.getItem('user');
    const userName = JSON.parse(nameString);
    return userName?.user
  };

  const [user, setName] = useState(getName());
  console.log(user)
  const saveName = userName => {
    sessionStorage.setItem('user', JSON.stringify(userName));
    setName(userName.user);
  };

  return {
    setName: saveName,
    user
  }
}