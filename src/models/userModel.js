import pool from '../config/connect-db.js' 


  
export const getAllUsers = async () => {
  try {
    const [rows] = await pool.promise().query('SELECT * FROM usuario')
    console.log('Resultado da consulta:', rows)
    return rows
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    throw error
  }
}

