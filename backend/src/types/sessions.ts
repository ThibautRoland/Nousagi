type userAuth = {
    token: string,
    id: number,
    refreshToken?: string,
    name: string,
    email: string
}

type loginRequest = {
    email: string,
    password: string
}