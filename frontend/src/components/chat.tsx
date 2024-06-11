import { WebsocketContext } from "@/context/WebsocketContext"
import { useContext, useEffect, useState } from "react"

export const Chat = () => {

    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<string[]>([])
    const socket = useContext(WebsocketContext)

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected!!!!!!!!!!')
        });
        socket.on('onMessage', (data) => {
            console.log("onMessage event received!")
            console.log(data)
            setMessages((prev) => [...prev, data.content])
        });

        return () => {
            console.log('unregistering events...')
            socket.off('connect');
            socket.off('onConnect')
        }
    }, [])

    function sendMessage() {
        socket.emit('newMessage', message);
        setMessage('');
        // setMessages((prev) => [...prev, message])
        console.log(messages)
    }

    return (<div>
        <div>
            <h1>Chat component</h1>
            {messages.length === 0 ? <div>No messages</div> : <div>
                {(messages.map((msg, i) => (
                    <div key={i}>{msg}</div>
                )))}
            </div> }
            <input type="text" value={message} onChange={(e) => {setMessage(e.target.value)}}/>
            <button onClick={sendMessage}>send message</button>
        </div>
    </div>)
}