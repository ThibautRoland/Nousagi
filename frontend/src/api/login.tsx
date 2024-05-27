import dotenv from 'dotenv';
dotenv.config();
import React from 'react';

const API_HOST = process.env.API_HOST
const API_PORT = process.env.API_PORT

export async function loginFromApi(credentials: Credentials) : Promise<any> {
    const url = `http://${API_HOST}:${API_PORT}/login`
    console.log('url', url)
}