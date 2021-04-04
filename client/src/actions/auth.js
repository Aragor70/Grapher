import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { gql } from '@apollo/client';

export const loadUser = async(client) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    
    try {

        const token = localStorage.token.split(' / ')
        const res = await client
        .query({
          query: gql`
            query RootQueryType {
              user(email: "${token[0]}", password: "${token[1]}") {
                id,
                name,
                email,
                password
              }
            }
          `
        });

        return { user: res.data.user, isAuthenticated: true }
        

    } catch(err) {
        console.log(err.message)
        
    }
}


export const login = async(formData, client, history) => {
    try {
        const { email, password } = formData;

        const res = await client
        .query({
          query: gql`
            query RootQueryType {
              user(email: "${email}", password: "${password}") {
                id,
                name,
                email,
                password
              }
            }
          `
        })

        localStorage.setItem('token', `${res.data.user.email} / ${res.data.user.password}`);
        
        
        await loadUser(client)

        history.push('/')

        
    } catch (err) {
        console.log(err.message)
        
    }
}

export const register = async(formData, client, history) => {
    try {
        const { name, email, password } = formData;

        const res = await client
        .mutate({
            mutation: gql`
            mutation {
            addUser(name: "${name}", email: "${email}", password: "${password}") {
                name,
                email,
                password
              }
            }
          `
        });


        localStorage.setItem('token', `${res.data.user.email} / ${res.data.user.password}`);

        await loadUser(client)
        
        history.push('/')
        
    } catch (err) {
        console.log(err.message)
        
    }
}

export const logout = async(history, setUser, setIsAuthenticated) => {
    try {
        await localStorage.removeItem('token');
        

        setUser(null)
        setIsAuthenticated(false)

        history.push('/')

    } catch (err) {
        console.log(err.message)
    }
}
