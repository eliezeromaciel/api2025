// AQUI TEREMOS TODA CONFIGURACAO DO NOSSO SERVIDOR, LOGINS, ROTAS

import express from 'express'
import { listaUsuarioId, listaUsuarios } from '../controllers/userController.js'

const server = express()


server.get('/allusers', listaUsuarios)
server.get('/user/:userID',listaUsuarioId)




export default server

