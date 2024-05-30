const API_HOST = process.env.API_HOST;
const API_PORT = process.env.API_PORT;

export async function getUserDogsFromApi(id: number, token: string) : Promise<Dog[] | null> {
    const url = `http://${API_HOST}:${API_PORT}/user/${id}/dogs`

    try {
        const res = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type':'application/json', 
                'Authorization': `Bearer ${token}`
            }
        })
        return (res.status === 200) ? await res.json() as Dog[] : null

    } catch (error) {
        console.log("getUserDogsFromApi error -> ",error)
        return null
    }    
}