import pool from '../config/connect-db.js' 

export const getAllConsumers = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM consumidor')
    console.log('Resultado da consulta:', rows)
    return rows
  } catch (error) {
    console.error('❌ Erro ao buscar usuários:', error)
    throw error
  }
}
  
export const getUserByID = async (id) => {
  console.log(`O ID É ${id}`)
  try {
    const [rows] = await pool.query(`SELECT * FROM usuario WHERE usuarioID=${id}`)
    console.log('Resultado da consulta:', rows)
    return rows
  } catch (error) {
    console.error('❌ Erro ao buscar usuário por ID:', error)
    throw error
  }
}