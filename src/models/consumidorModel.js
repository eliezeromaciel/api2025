import pool from '../config/connect-db.js' 

export const getAllConsumers = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM consumidor')
    console.log('Resultado da consulta:', rows)
    return rows
  } catch (error) {
    console.error('❌ Erro ao buscar consumidores:', error)
    throw error
  }
}
  
export const getConsumerByID = async (id) => {
  console.log(`O ID É ${id}`)
  try {
    const [rows] = await pool.query(`SELECT * FROM consumidor WHERE consumidorId=${id}`)
    console.log('Resultado da consulta:', rows)
    return rows
  } catch (error) {
    console.error('❌ Erro ao buscar consumidor por ID:', error)
    throw error
  }
}

export const postConsumer = async (nome, telefone, instagram, dataNascimento, organizacaoId) => {
  console.log(`Os parametros recebidos de consumidorcontroller: ${nome, telefone, instagram, dataNascimento, organizacaoId}`)
  try {
    const [rows] = await pool.query(`INSERT INTO Consumidor (nome, telefone, instagram, dataNascimento, organizacaoId) VALUES 
      ('${nome}', '${telefone}', '${instagram}', '${dataNascimento}', ${organizacaoId} )`)
    console.log('Resultado do novo consumidor:', rows)
    return rows
  } catch (error) {
    console.error('❌ Erro ao inserir novo consumidor:', error)
    throw error
  }
}
