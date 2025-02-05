/* eslint-disable no-undef */
import mysql from 'mysql2/promise'
import { config } from 'dotenv'


// Carrega o arquivo .env manualmente
config()


const pool = mysql.createPool({
  connectionLimit: 50, // limites !!!!!!
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

pool.getConnection ((err, connection) => {
  console.log('ATÉ AQUI')
  if (err) {
    console.error('NAO CONECTOU O BANCO-DE-DADOS', err)
    return
  }
  console.log('✅✅✅ Conexão com o banco de dados bem-sucedida!')
  connection.release() // Libera a conexão

  // QUANDO quiser fechar o pool, e nao trava o terminal. .
  pool.end((endErr) => {  
    if (endErr) console.error('❌ Erro ao fechar o pool:', endErr)
    else console.log('🔌 Pool de conexões fechado.')
  })
})

// const testeSelectUsuario = async function testSelect() {
//   try {
//     const connection = await pool.getConnection()
//     console.log('✅ conectou para select usuario')

//     const [rows] = await connection.execute('SELECT * FROM usuario')
//     console.log('📌 Dados encontrados:', rows)

//     connection.release()
//   } catch (error) {
//     console.error('❌ Erro ao conectar ou buscar dados:', error)
//   }

//   pool.end((endErr) => {  
//     if (endErr) console.error('❌ Erro ao fechar o pool:', endErr)
//     else console.log('🔌 Pool de conexões fechado.')
//   })

// }
// testeSelectUsuario()

export default pool

