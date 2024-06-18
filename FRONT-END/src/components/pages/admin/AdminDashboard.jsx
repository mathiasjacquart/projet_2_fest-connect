import React from 'react';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { ItemList, ItemEdit, ItemCreate } from './components/ItemComponents';

const dataProvider = simpleRestProvider('http://localhost:4560/api');

export default function AdminDashboard() {
  return (
    <Admin dataProvider={dataProvider}>
    <Resource name="items" list={ItemList} edit={ItemEdit} create={ItemCreate} />
  </Admin>
  )
}
