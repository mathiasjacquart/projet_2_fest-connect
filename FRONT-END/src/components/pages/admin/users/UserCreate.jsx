// src/UserCreate.js
import * as React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

const UserCreate = (props) => (
  <Create {...props} redirect="list">
    <SimpleForm>
      <TextInput source="firstname" />
      <TextInput source="surname" />
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="password" />
    </SimpleForm>
  </Create>
);

export default UserCreate;
