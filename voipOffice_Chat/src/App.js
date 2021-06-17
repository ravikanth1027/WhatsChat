import React, { useState }  from 'react';
import { fetchUtils, Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import Login from './components/Login/Login';
import AdminLogin from './components/Login/AdminLogin';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register';
import MainWelcome from './components/MainWelcome';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css'
import useToken from './useToken';
import useAdmintoken from './useAdmintoken';
import  { UserList, UserEdit, UserCreate }  from './components/Admin/users';
import  { PostList, PostEdit, PostCreate }  from './components/Admin/PostList';
import authProvider from './authProvider';

const fetchJson = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
    const token = localStorage.getItem('token');
    console.log("tokennnnnnnnn:", token)
    options.headers.set('Authorization', `Bearer ${token}`);
    options.headers.set('X-Custom-Header', 'foobar');
    return fetchUtils.fetchJson(url, options);
}

const dataProvider =
  simpleRestProvider("http://localhost:8080", fetchJson);




function App() {
    const { token, setToken } = useToken();
    const { admin, setAdmin } = useAdmintoken();
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login setToken={setToken}></Login>
          </Route>
          <Route path="/adminlogin">
            <AdminLogin setAdmin={setAdmin}></AdminLogin>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Route path="/dashboard">
            <Dashboard user={token}></Dashboard>
          </Route>
          <Route path="/admin">
            {admin
                 ? <Admin dataProvider={dataProvider} authProvider={authProvider}>
              <Resource name="contacts" list={UserList}  create={UserCreate}/>
            </Admin>
                  : <Login setToken={setToken}/>
            }
             
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
