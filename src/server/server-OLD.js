import express from 'express'
import bodyParser from 'body-parser'
import con from './connect-db-OLD.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import login from '../MarceloEscolheNome/validatoken.js'
import moment from 'moment'
moment().format()

config() 

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const options = {
  definition: {
    info: {
      title: 'API NODE JS',
      version: '1.0.0'
    }
  },
  apis: ['server.js']
}
const swaggerSpec = swaggerJSDoc(options)
app.use('/swagger-ui', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

const useMock = false

/**LISTA TODOS CLIENTES
 * @swagger
 * 
 * /clientes:
 *  get:
 *    description: lista todos os clientes, ordenados pelo ID.
 *    produces: 
 *      - application/json
 *    responses: 
 *      200:
 *        description: exibe todos os clientes, em um vetor.
 */
app.get('/clientes', login, (req, res) => {
  if (useMock) {
    res.send('usar o mock')
    return  
  }
  con.query('SELECT * FROM CLIENTE', (err, result) => {
    if (err) {
      res.status(500)
      res.send(err)
    }
    res.send(result)
  })
})

/** ADICIONA NOVO CLIENTE 
 * @swagger
 * 
 * /clientes:
 *  post:
 *    description: Insere um cliente na base
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: formData
 *        name: nome
 *        description: nome do cliente 
 *        required: true
 *        type: string
 *      - in: formData
 *        name: telefone
 *        description: telefone do cliente (unique)
 *        required: true
 *        type: string
 *      - in: formData
 *        name: dataNascimento
 *        description: nascimento do cliente 
 *        required: true
 *        type: string
 *      - in: formData
 *        name: instagram
 *        description: instagram do cliente
 *        required: false
 *        type: string
 *    responses:
 *      200:
 *        description: registro inserido com sucesso
 *      500:
 *        description: erro do banco de dados
 */
app.post('/clientes', login, (req, res) => {  // PRECISA ATUALIZAR SWAGGER, por causa do LOGIN ????
  if (useMock) {
    res.send('usar o mock')
    return  
  }

  const { nome, telefone, dataNascimento, instagram } = req.body

  // FAZ REQUEST SE TEM TODOS CAMPOS
  if (nome && telefone && dataNascimento && instagram){  
    con.query(`INSERT INTO Cliente (nome, telefone, dataNascimento, instagram) VALUES ('${nome}','${telefone}','${dataNascimento}', '${instagram}')`, (err, result) => {
      if (err) {
        res.status(500)
        res.send(err)
        return   
      }
  
      if (result.insertId) {
        res.send({
          message: 'Register inserted with success',
          insertId: result.insertId
        })  
        return
      }

      res.send(result)
    })
  }

  // FAZ REQUEST SEM CAMPO INSTAGRAM
  if (nome && telefone && dataNascimento && instagram === undefined){  
    con.query(`INSERT INTO Cliente (nome, telefone, dataNascimento) VALUES ('${nome}','${telefone}','${dataNascimento}')`, (err, result) => {
      if (err) {
        res.status(500)
        res.send(err)
        return   
      }
  
      if (result.insertId) {
        res.send({
          message: 'Register inserted with success',
          insertId: result.insertId
        })  
        return
      }

      res.send(result)
    })
  }

})

// ADICIONA NOVO USUARIO
app.post('/usuarios', async (req, res) => {
  if (useMock) {
    res.send('usar o mock')
    return  
  }
  
  const {perfil, email, senha} = req.body
  function validaEmail (param) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return re.test(param)
  }
  const emailEhValido = (validaEmail(email))

  try { 
    if (perfil && emailEhValido==true && senha) {
      // await bcrypt.hash(senha, 10, (err, hash)=> {
      //   if (err) {
      //     console.log(`erro com bcrypt.hash: ${err}`)
      //   } 
      //   console.log(`nao deu erro, mas nao sei o que vai acontecer, e a hash eh ${hash}`)
      // })
      const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(senha, 10, (err, hash) => {
          if (err) {
            reject(err)
          } else {
            resolve(hash)
          }
        })
      })
      
      con.query(`INSERT INTO Usuario (perfil, email, senha) VALUES ('${perfil}','${email}', '${hash}')`, (err, result) => {
        if (err) {
          res.status(500)
          res.send(`Deu erro no INSERT ====>   ${err}`)
          return   
        }
        
        if (result.insertId) {
          res.send({
            message: 'Register inserted with success',
            insertId: result.insertId
          })  
          return
        }
        res.send(`nao deu pra inserir, mas gerou insert e result foi :  ${result}`)
        return
      })
    }
    else {
      if (emailEhValido == false)
        res.send('e-mail inválido')  
      return
    }

  } catch (err) {
    console.error(err)
    res.status(500)
    res.send(err)
    return
  }

})

// FAZ LOGIN
app.post('/login', async (req, res) => {
  const {email, senha} = req.body

  try {
    const usuario = await pegaUsuarioPeloEmail(email)
    if(usuario == null)
      return res.send('Usuário não encontrado ou senha incorreta!')

    // verifica se senha eh igual a hash do banco de dados
    let senhaEhValida = true
    await bcrypt.compare(senha,usuario.senha, (error, senhaEhValida) => {
      if (error) {
        return res.send(error)
      }
      console.log(`senha digitada pelo usuario => ${senha}`)
      console.log(`hash do banco de dados => ${usuario.senha}`)
      console.log(senhaEhValida)
      
      senhaEhValida
    }) 
    
    if(!senhaEhValida) {
      return res.send(`Usuário não encontrado ou senha incorreta! ${senhaEhValida}`)  }

    return res.send(usuario)        

  } catch (error) {
    res.status(500)
    res.send(error)
  }
}) 

const pegaUsuarioPeloEmail = (email) => {
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM Usuario WHERE email='${email}' LIMIT 1`, (err, result) => {
      if (err) {
        reject(err)
        return
      }

      if(result == undefined) {
        resolve(null) 
        return
      } else {
        resolve(result[0])}
    })
  })
} 





app.listen(3033, () => {
  console.log('Server is running!')
})