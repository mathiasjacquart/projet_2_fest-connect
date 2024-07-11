import * as React from "react";
import { Edit, SimpleForm, TextInput, SelectInput, ArrayInput } from "react-admin";

const CategoryEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="nameCategory" />
      <TextInput source="urlCategory" />
      <ArrayInput source="subCategories">
        <TextInput source="nameSubCategory"/>
        <TextInput source="urlSubCategory" />
      </ArrayInput>
      <ArrayInput source="subCategories">
        <TextInput source="keywords" />
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export default CategoryEdit;
