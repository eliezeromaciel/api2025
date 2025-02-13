import { getAllUsers, getUserByID } from '../models/usuarioModel.js'

export const listaUsuarios = async (req, res) => {
  try {
    const usuarios = await getAllUsers()
    res.json(usuarios)
  } catch (error) {
    res.error
  } 
} 

export const listaUsuarioId = async (req, res) => {
  try {
    const usuarioID = req.params
    const usuario = await getUserByID(usuarioID.userID)
    res.json(usuario)
  } catch (error){
    res.error
  }
}

