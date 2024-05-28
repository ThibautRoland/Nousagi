import { saveTokenInCookie, saveUserIdInCookie } from "@/api/cookies";
import { loginFromApi } from "@/api/login";
import { useRouter } from "next/router";
import { format } from "path";
import { FormEvent, FormEventHandler } from "react";

export default function Login() {
    const router = useRouter()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const credentials : Credentials = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }
        console.log('credentials', credentials)
        const userAuth = loginFromApi(credentials);
        console.log('userAuth', userAuth);
        userAuth.then(
            function(value) {
                if (!value) {
                    return
                }
                saveTokenInCookie(value.token)
                saveUserIdInCookie(value.id.toString())

                router.push("/dashboard")
            },
            function(error) { throw error.message }
        )
    }

    return (<div className="p-4">
        <div className="flex flex-row">
            <div className="basis-1/3"></div>
            <div className="basis-1/3">
                <h1 className="text-center text-2xl py-3">Log into your account</h1>
                <form onSubmit={onSubmit}>
                    <p className="my-2">email</p>
                    <input type="text" className="slate-input w-full" placeholder="blabla@example.com" name="email" value="Gail92@yahoo.com"/>
                    <p className="my-2">password</p>
                    <input type="password" className="slate-input w-full" placeholder="your secret password" name="password" value="password"/>
                    <input type="submit" value="login" className="rounded-lg border-slate-600 border-2 mt-3 p-3"/>
                    
                </form>
            </div>
            <div className="basis-1/3"></div>

        </div>

        
    </div>);
  }