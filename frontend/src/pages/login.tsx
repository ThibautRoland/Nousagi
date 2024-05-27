import { loginFromApi } from "@/api/login";
import { format } from "path";
import { FormEvent, FormEventHandler } from "react";

export default function Login() {

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const credentials : Credentials = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }
        console.log('credentials', credentials)
        const userAuth = await loginFromApi(credentials);
        console.log('userAuth', userAuth);
    }

    return (<div className="p-4">
        <div className="flex flex-row">
            <div className="basis-1/3"></div>
            <div className="basis-1/3">
                <h1 className="text-center text-2xl py-3">Log into your account</h1>
                <form onSubmit={onSubmit}>
                    <p className="my-2">email</p>
                    <input type="text" className="slate-input w-full" placeholder="blabla@example.com" name="email"/>
                    <p className="my-2">password</p>
                    <input type="password" className="slate-input w-full" placeholder="your secret password" name="password"/>
                    <input type="submit" value="login" className="rounded-lg border-slate-600 border-2 mt-3 p-3"/>
                    
                </form>
            </div>
            <div className="basis-1/3"></div>

        </div>

        
    </div>);
  }