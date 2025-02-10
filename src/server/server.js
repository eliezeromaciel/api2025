// AQUI TEREMOS TODA CONFIGURACAO DO NOSSO SERVIDOR, LOGINS, ROTAS

import express from 'express'
import { listaUsuarioId, listaUsuarios } from '../controllers/userController.js'
import { listaConsumidores } from '../controllers/consumidorController.js'

const server = express()


server.get('/allusers', listaUsuarios)
server.get('/user/:userID',listaUsuarioId)
server.get('/allconsumers',listaConsumidores)




export default server

