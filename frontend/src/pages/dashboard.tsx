import { getItemFromContext, getItemFromCookie, removeUserAuthInCookie } from "@/api/cookies"
import { getUserDogsFromApi } from "@/api/dogs"
import { AuthContext } from "@/context/authContext"
import { parseCookies } from "@/utils/cookies"
import { IncomingMessage, ServerResponse } from "http"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { useContext } from "react"

type props = {
    userDogs: Dog[] | null
}

export default function dashboard({userDogs} : props) {
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
        <button onClick={logout}>logout</button>

        <div>
            {userDogs?.map((dog, i) => (
                <div key={i}>
                    <p>{dog.name}</p>
                    <p>{dog.race}</p>
                </div>
            ))}
        </div>
    </div>)
}

export async function getServerSideProps(context : GetServerSidePropsContext) {

    const userAuthCookie = getItemFromCookie(context, 'userAuth')
    const userDogs = await getUserDogsFromApi(userAuthCookie.id, userAuthCookie.token)

        return {
          props: {
            userDogs,

          }
        }
  }