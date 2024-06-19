// src/UserList.js
import * as React from "react";
import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton } from "react-admin";

const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="firstname" />
      <TextField source="surname" />
      <TextField source="username" />
      <EmailField source="email" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default UserList;
