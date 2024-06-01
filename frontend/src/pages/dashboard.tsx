import { getItemFromContext, getItemFromCookie, removeUserAuthInCookie } from "@/api/cookies"
import { getUserDogsFromApi } from "@/api/dogs"
import { Chat } from "@/components/chat"
import { AuthContext } from "@/context/authContext"
import { WebsocketProvider, socket } from "@/context/WebsocketContext"
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
    // console.log('AuthContext in dashboard -> ', authContext?.userAuth)

    function logout() {
        authContext?.setUserAuth(null)
        removeUserAuthInCookie();
        router.push('/login')
    }

    return (<div>
        <h1>yooo that's the dashboard in case you were wondering</h1>
        <button onClick={logout}>logout</button>
        <div className="flex flex-row mt-5 px-5 mx-5">
            <div className="basis-2/3">
                <div className="grid grid-cols-2 gap-5">
                    {userDogs?.map((dog, i) => (
                        <div key={i} className="border-2 border-indigo-600 p-4">
                            <p>{dog.name}</p>
                            <p>{dog.race}</p>
                        </div>
                    ))}
                </div>

            </div>
            <div className="basis-1/3">
                {/* <WebsocketProvider value={socket}> */}
                    <Chat />
                {/* </WebsocketProvider> */}
            </div>
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