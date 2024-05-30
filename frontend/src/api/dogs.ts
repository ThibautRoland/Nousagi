const API_HOST = process.env.API_HOST;
const API_PORT = process.env.API_PORT;

export async function getUserDogs(id: number, token: string) : Promise<Dog[] | null> {
    const url = `http://${API_HOST}:${API_PORT}/sessions/login`
    
    return null
    
}