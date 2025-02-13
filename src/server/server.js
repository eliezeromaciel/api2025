// AQUI TEREMOS TODA CONFIGURACAO DO NOSSO SERVIDOR, LOGINS, ROTAS

import express from 'express'
import { listaUsuarioId, listaUsuarios } from '../controllers/usuarioController.js'
import { listaConsumidorId, listaConsumidores, novoConsumidor } from '../controllers/consumidorController.js'
import {listamodeloMensagemServicoId, listamodelosMensagensServicos, novomodeloMensagemServico} from '../controllers/modeloMensagemServicoController.js'

const server = express()
// Middleware para processar JSON no body
server.use(express.json()) 

server.get('/allusers', listaUsuarios)
server.get('/user/:userID',listaUsuarioId)

server.get('/allconsumers',listaConsumidores)
server.get('/consumer/:consumerID',listaConsumidorId)
server.post('/consumer/new',novoConsumidor)

server.get('/allmodelmsgservices',listamodelosMensagensServicos)
server.get('/modelmsgservice/:modelmsgserviceID',listamodeloMensagemServicoId)
server.post('/modelmsgservice/new',novomodeloMensagemServico)



export default server

