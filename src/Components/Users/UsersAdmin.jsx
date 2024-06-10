import React, { useState } from 'react'
import UserList from './UserList'
import UserModal from './UserModal';

const UsersAdmin = () => {
  const [form, setForm] = useState({});
  return (
    <>
      <UserList setForm={setForm}/>
      <UserModal form={form} setForm={setForm} />
    </>
  )
}

export default UsersAdmin