import { getItemFromContext, removeUserAuthInCookie } from "@/api/cookies"
import { AuthContext } from "@/context/authContext"
import { parseCookies } from "@/utils/cookies"
import { IncomingMessage, ServerResponse } from "http"
import { useRouter } from "next/router"
import { useContext } from "react"

export default function dashboard() {
    const authContext = useContext(AuthContext)
    const router = useRouter();
    console.log('AuthContext in dashboard -> ', authContext?.userAuth)

    function logout() {
        authContext?.setUserAuth(null)
        removeUserAuthInCookie();
        router.push('/login')
    }

    return (<div>
        <h1>yooo that's the dashboard in case you were wondering</h1>
        <p>token: </p>

        <button onClick={logout}>logout</button>

        </div>)
}

export async function getServerSideProps(context : any) {

    // const token = getItemFromContext(context, "token")
    const blabla = "blabla"
    const cookies = parseCookies(context.req as IncomingMessage, context.res as ServerResponse<IncomingMessage>);
    const encodedUserAuthCookie = cookies.get('userAuth');
    const decodedCookie = decodeURIComponent(encodedUserAuthCookie!);
    const userAuthCookie = JSON.parse(decodedCookie);
    

        return {
          props: {
            blabla: blabla,

          }
        }
  }