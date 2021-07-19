import * as React from "react";
import { List, Datagrid, TextField, EmailField , Create , SimpleForm, Edit,
    ReferenceInput,
    SelectInput,
    TextInput,
    Toolbar,
    SaveButton,
    DeleteButton,} from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const CustomToolbar = props => (
    <Toolbar {...props} classes={useStyles()}>
        <SaveButton />
        <DeleteButton mutationMode="pessimistic"/>
    </Toolbar>
);

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

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="username"/>
            <TextInput source="email"/>
            <TextInput source="phonenumber"/>
            <TextInput source="password" />
            <TextInput source="company" />
        </SimpleForm>
    </Edit>
);