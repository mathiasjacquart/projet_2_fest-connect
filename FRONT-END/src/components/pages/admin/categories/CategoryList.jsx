import React from 'react';
import { List, Datagrid, TextField, ArrayField, SingleFieldList, ChipField, EditButton, DeleteButton } from 'react-admin';
import CategoryEdit from './CategoryUpdate'; // Ensure the path is correct

const CategoryList = (props) => (
  <List {...props}>
    <Datagrid rowClick={CategoryEdit}>
      <TextField source="nameCategory" label="Catégorie" />
      <TextField source="urlCategory" label="Catégorie Image" />
      <ArrayField source="subCategories" label="Sous catégories">
        <Datagrid>
          <TextField source="nameSubCategory" label="Sous catégorie" />
          <TextField source="urlSubCategory" label="Sous catégorie Image" />
          <ArrayField source="keywords" label="Mots clés">
            <SingleFieldList>
              <ChipField source="keywords" />
            </SingleFieldList>
          </ArrayField>
        </Datagrid>
      </ArrayField>
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default CategoryList;
