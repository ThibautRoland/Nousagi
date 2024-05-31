import { WebsocketContext } from "@/context/WebsocketContext"
import { useContext, useEffect } from "react"

export const Chat = () => {

    const socket = useContext(WebsocketContext)

    useEffect(() => {
        socket.on('connection', () => {
            console.log('connected!')
        });
        socket.on('onMessage', (data) => {
            console.log("onMessage event received!")
            console.log(data)
        });

        return () => {
            console.log('unregistering events...')
            socket.off('connect');
            socket.off('onConnect')
        }
    }, [])

    return (<div>
        <div>
            <h1>Chat component</h1>
        </div>
    </div>)
}