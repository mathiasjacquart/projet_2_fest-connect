import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
// import { dataProvider } from './dataProvider';
// import { UserList } from "./users";

export default function App() {

  return (
    <Admin>
    <Resource name="users" list={ListGuesser} />
    <Resource name="users" list={UserList} />
  </Admin>
  )
}
