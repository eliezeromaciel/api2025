import pool from '../config/connect-db.js' 

export const getAllmodelMsgServices = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM modeloMensagemServico')
    console.log('Resultado da consulta:', rows)
    return rows
  } catch (error) {
    console.error('❌ Erro ao buscar modeloMensagemServico:', error)
    throw error
  }
}

export const getmodeloMensagemServicoByID = async (id) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM modeloMensagemServico WHERE modeloMensagemServicoId=${id}`)
    console.log('Resultado da consulta:', rows)
    return rows
  } catch (error) {
    console.error('❌ Erro ao buscar modeloMensagemServico por ID:', error)
    throw error
  }
}
  
export const postModelMessageService = async (nomeMensagemServico, textoModelo, quantidadeDias, tipoServicoId) => {
  console.log(`Os parametros recebidos de modeloMensagemServicocontroller: ${nomeMensagemServico, textoModelo, quantidadeDias, tipoServicoId}`)
  try {
    const [rows] = await pool.query(`INSERT INTO modeloMensagemServico (nomeMensagemServico, textoModelo, quantidadeDias, tipoServicoId) VALUES 
        ('${nomeMensagemServico}', '${textoModelo}', '${quantidadeDias}', '${tipoServicoId}')`)
    console.log('Resultado do novo modeloMensagemServico:', rows)
    return rows
  } catch (error) {
    console.error('❌ Erro ao inserir novo modeloMensagemServico:', error)
    throw error
  }
}