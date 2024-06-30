// src/App.js
import * as React from "react";
import { Admin, Menu, Resource, defaultTheme,} from "react-admin";
import { deepmerge } from '@mui/utils';
import dataProvider from "./dataProvider";
import UserList from "./users/UserList"; // Créez ce composant pour lister les utilisateurs
import UserEdit from "./users/UserEdit"; // Créez ce composant pour éditer les utilisateurs
import UserCreate from "./users/UserCreate"; // Créez ce composant pour créer des utilisateurs
import Dashboard from "./Dashboard";
import { MyLayout } from "./nav/MyLayout";
import PostIcon from "@mui/icons-material/Book"
import UserIcon from "@mui/icons-material/Group"
import DashboardIcon from "@mui/icons-material/Dashboard"
import CategoryCreate from "./createContent/CategoryCreate";
import PostList from "./posts/PostList";
import PostCreate from "./posts/PostCreate";
import PostEdit from "./posts/PostEdit";


const AdminApp = () => (
  <Admin
    layout={MyLayout} 
    dataProvider={dataProvider}
    dashboard={Dashboard}
    basename="/admin-dashboard"
  >


    <Resource
      name="prestataires"
      list={PostList}
      edit= {PostEdit}
      create={PostCreate}
      icon={PostIcon}
    />
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
      icon={UserIcon}
    />
    <Resource 
      name="categories"
      create={CategoryCreate}
     />
  </Admin>
);

export default AdminApp;
