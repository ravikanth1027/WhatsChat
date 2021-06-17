import * as React from "react";
import { List, Datagrid, TextField, EmailField , Create , SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,} from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="username" />
            <TextField source="phonenumber" />
            <TextField source="email" />
            <TextField source="company" />
        </Datagrid>
    </List>
);


export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="phonenumber" />
            <TextInput source="password" />
            <TextInput source="company" />
        </SimpleForm>
    </Create>
);