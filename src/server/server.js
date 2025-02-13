// AQUI TEREMOS TODA CONFIGURACAO DO NOSSO SERVIDOR, LOGINS, ROTAS

import express from 'express'
import { listaUsuarioId, listaUsuarios } from '../controllers/userController.js'
import { listaConsumidorId, listaConsumidores, novoConsumidor } from '../controllers/consumidorController.js'

const server = express()
// Middleware para processar JSON no body
server.use(express.json()) 

server.get('/allusers', listaUsuarios)
server.get('/user/:userID',listaUsuarioId)

server.get('/allconsumers',listaConsumidores)
server.get('/consumer/:consumerID',listaConsumidorId)
server.post('/consumer/new',novoConsumidor)




export default server

