import {getAllConsumers} from '../models/consumidorModel.js'

export const listaConsumidores = async (req, res) => {
  try {
    const usuarios = await getAllConsumers()
    res.json(usuarios)
  } catch (error) {
    res.error
  } 
} 