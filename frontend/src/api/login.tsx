import { Credentials, userAuth } from '@/interface/login';
import dotenv from 'dotenv';
dotenv.config();
import React from 'react';

const API_HOST = process.env.API_HOST
const API_PORT = process.env.API_PORT

export async function loginFromApi(credentials: Credentials) : Promise<userAuth | null> {
    const url = `http://${API_HOST}:${API_PORT}/sessions/login`
    
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(credentials)
        })
        if (res.status === 200) {
            return await res.json() as userAuth
        }

        return null
    } catch (error) {
        return null
    }
}

export function logoutFromApi() {
    
    
}
