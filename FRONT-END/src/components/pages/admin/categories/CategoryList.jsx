import React from 'react';
import { List, Datagrid, TextField, ArrayField, SingleFieldList, ChipField, ReferenceManyField } from 'react-admin';

const CategoryList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
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
    </Datagrid>
  </List>
);

export default CategoryList;
