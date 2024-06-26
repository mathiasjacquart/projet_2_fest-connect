// src/nav/MyLayout.js
import { Layout, Menu } from 'react-admin';
import { MyAppBar} from "./MyAppBar"
import BookIcon from '@mui/icons-material/Book';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PeopleIcon from '@mui/icons-material/People';
import LabelIcon from '@mui/icons-material/Label';
const MyMenu = () => (
  <Menu>
    <Menu.DashboardItem />
    <Menu.Item to="/admin-dashboard/posts" primaryText="Posts" leftIcon={<BookIcon />}/>
    <Menu.Item to="/admin-dashboard/comments" primaryText="Comments" leftIcon={<ChatBubbleIcon />}/>
    <Menu.Item to="/admin-dashboard/users" primaryText="Users" leftIcon={<PeopleIcon />}/>
    <Menu.Item to="/admin-dashboard/custom-route" primaryText="Miscellaneous" leftIcon={<LabelIcon />}/>
  </Menu>
);

export const MyLayout = (props) => <Layout {...props} menu={MyMenu} appBar={MyAppBar} sx={{minHeight:"100vh"}} />;
