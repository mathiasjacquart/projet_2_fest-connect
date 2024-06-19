// src/UserEdit.js
import * as React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="firstname" />
      <TextInput source="surname" />
      <TextInput source="username" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
