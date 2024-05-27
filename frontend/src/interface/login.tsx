interface Credentials {
    email: string,
    password: string
}

interface userAuth {
    token: string,
    id: number,
    refreshToken?: string
}