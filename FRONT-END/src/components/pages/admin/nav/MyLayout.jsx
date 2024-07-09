// src/nav/MyLayout.js
import { Layout, Menu } from 'react-admin';
import { MyAppBar} from "./MyAppBar"
import BookIcon from '@mui/icons-material/Book';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PeopleIcon from '@mui/icons-material/People';
import LabelIcon from '@mui/icons-material/Label';
import ImageIcon from "@mui/icons-material/Photo"
import ReviewIcon from "@mui/icons-material/Reviews"
const MyMenu = () => (
  <Menu>
    <Menu.DashboardItem primaryText="Tableau de bord" />
    <Menu.Item to="/admin-dashboard/users" primaryText="Utilisateurs" leftIcon={<PeopleIcon />}/>
    <Menu.Item to="/admin-dashboard/prestataires" primaryText="Publications" leftIcon={<BookIcon />}/>
    <Menu.Item to="/admin-dashboard/categories" primaryText="Catégories" leftIcon={<LabelIcon />}/>

    <Menu.Item to="/admin-dashboard/images" primaryText="Images" leftIcon={<ImageIcon />}/>
    <Menu.Item to="/admin-dashboard/images" primaryText="Avis" leftIcon={<ReviewIcon />}/>
  </Menu>
);

export const MyLayout = (props) => <Layout {...props} menu={MyMenu} appBar={MyAppBar} sx={{minHeight:"100vh"}} />;
