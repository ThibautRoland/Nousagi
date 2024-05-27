type userAuth = {
    token: string,
    id: number,
    refreshToken?: string
}

type loginRequest = {
    email: string,
    password: string
}