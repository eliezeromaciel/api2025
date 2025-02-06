import express from 'express'

import { getAllUsers } from '../models/userModel.js'


const server = express()

// AQUI TEREMOS TODA CONFIGURACAO DO NOSSO SERVIDOR, LOGINS, ROTAS

server.get('/', (req, res) =>{
  return res.send('testando, servidor ligado huhuhuh')
} )

server.get('/allusers', async (req, res) => {
  const users = await getAllUsers()
  console.log(users)
  return res.send(`resultado do allusers: ${users}`)
})




export default server

