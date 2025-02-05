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

// já testa a obtenção de conexão temporária , retornando uma query de usuário.
async function testSelect() {
  try {
    const connection = await pool.getConnection()
    console.log('✅ Conexão bem-sucedida!')

    const [rows] = await connection.execute('SELECT * FROM usuario') 
    console.log('📌 Dados encontrados:', rows)

    connection.release()
  } catch (error) {
    console.error('❌ Erro ao conectar ou buscar dados:', error)
  }

  // fecha o pool para não trancar o terminal (estou testando arquivo connect-db.js diretamente no terminal)
  pool.end((endErr) => {  
    if (endErr) console.error('❌ Erro ao fechar o pool:', endErr)
    else console.log('🔌 Pool de conexões fechado.')
  })
}

testSelect()


export default pool

