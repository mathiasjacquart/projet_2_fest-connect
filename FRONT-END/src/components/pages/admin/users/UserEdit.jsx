// src/UserEdit.js
import * as React from "react";
import { Edit, SimpleForm, TextInput, SelectInput } from "react-admin";

const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="firstname" />
      <TextInput source="surname" />
      <TextInput source="username" />
      <TextInput source="email" />
      <SelectInput source="role" choices={[
                { id: 'client', name: 'client' },
                { id: 'prestataire', name: 'prestataire' }
            ]} />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
 