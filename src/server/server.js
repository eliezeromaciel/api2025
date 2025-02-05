import express from 'express'



const server = express()

// AQUI TEREMOS TODA CONFIGURACAO DO NOSSO SERVIDOR, LOGINS, ROTAS

server.get('/', (req, res) =>{
  return res.send('testando, servidor ligado huhuhuh')
} )


// para testar as conexoes com o banco de dados, usando thunderclient

// import { getAllUsers } from '../models/userModel.js'
// server.get('/allusers', async (req, res) => {
//   const users = await getAllUsers()
//   console.log(users)

//   return res.send('resultado do allusers')
// })



export default server

