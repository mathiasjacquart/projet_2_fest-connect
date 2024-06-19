// src/App.js
import * as React from "react";
import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import UserList from "./users/UserList"; // Créez ce composant pour lister les utilisateurs
import UserEdit from "./users/UserEdit"; // Créez ce composant pour éditer les utilisateurs
import UserCreate from "./users/UserCreate" // Créez ce composant pour créer des utilisateurs
import Dashboard from "./Dashboard";

const AdminApp = () => (
  <Admin dataProvider={dataProvider}
  dashboard={Dashboard}
   basename="/admin-dashboard">
    
    <Resource
      name="posts"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}

    />
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}

    />
  </Admin>
);

export default AdminApp;

