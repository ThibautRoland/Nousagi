import { getItemFromContext } from "@/api/cookies"

export default function dashboard() {

    return (
        <h1>yooo that's the dashboard in case you were wondering</h1>

    )
}

export async function getServerSideProps(context : any) {

    const token = getItemFromContext(context, "token")
    const userId = 
    
    
    console.log("token from dashboard -> ", token)

        return {
          props: {
            token: token,

          }
        }
  }