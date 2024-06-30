// src/UserCreate.js
import * as React from "react";
import { Create, SimpleForm, TextInput, SelectInput } from "react-admin";

const UserCreate = (props) => (
  <Create {...props} redirect="list">
    <SimpleForm>
      <TextInput source="firstname" />
      <TextInput source="surname" />
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="password" />
      <SelectInput source="role" choices={[
                { id: 'client', name: 'client' },
                { id: 'prestataire', name: 'prestataire' }
            ]} />
    </SimpleForm>
  </Create>
);

export default UserCreate;
