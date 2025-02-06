import express from 'express'

import { getAllUsers, getUserByID } from '../models/userModel.js'


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

server.get('/user/:userID', async (req, res) => {
  const usuarioID = req.params
 
  const user = await getUserByID(usuarioID.userID)

  console.log('❌❌❌❌❌❌❌❌❌❌')
  return res.send()
  
})




export default server

