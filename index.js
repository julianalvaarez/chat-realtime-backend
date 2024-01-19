import express from 'express'
import http from 'http'
import cors from 'cors'
// Importa el módulo Server de socket.io para gestionar conexiones WebSocket
import {Server as SocketServer} from 'socket.io'

const PORT = process.env.PORT ?? 3000
const app = express()
const server = http.createServer(app) // Crea un servidor HTTP usando Express
const io = new SocketServer(server) // Crea una instancia de SocketServer asociada al servidor HTTP
server.use(cors())


// Maneja el evento de cuando alguien se conecta en el servidor de socket.io
io.on('connection', socket => {
    // Maneja el evento 'message' cuando un cliente envía un mensaje
    socket.on('message', (messageData) => {
        // Emite el mensaje a todos los clientes excepto al remitente
        socket.broadcast.emit('message', {
            body: messageData,
            from: socket.id.slice(0,8)
        })
    })

})

server.listen(PORT, () => console.log(`Server on port ${PORT}`))
