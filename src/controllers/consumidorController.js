import {getAllConsumers, getConsumerByID, postConsumer} from '../models/consumidorModel.js'

export const listaConsumidores = async (req, res) => {
  try {
    const consumidores = await getAllConsumers()
    res.json(consumidores)
  } catch (error) {
    res.error
  } 
} 

export const listaConsumidorId = async (req, res) => {
  try {
    const consumidorID = req.params
    const consumidor = await getConsumerByID(consumidorID.consumerID)
    res.json(consumidor)
  } catch (error){
    res.error
  }
}

export const novoConsumidor = async (req, res) => {
  try {
    const consumidor = req.body
    console.log(`a request é do tipo: ${req.method}`)
    console.log(`body da request: ${JSON.stringify(consumidor, null, 2) }`)

    const novoConsumidor = await postConsumer(consumidor.nome, consumidor.telefone, consumidor.instagram, consumidor.dataNascimento, consumidor.organizacaoId)
    res.json(novoConsumidor)
  } catch {
    res.error
  }
}

