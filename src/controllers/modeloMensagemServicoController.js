import {getAllmodelMsgServices, getmodeloMensagemServicoByID , postModelMessageService} from '../models/modeloMensagemServicoModel.js'


export const listamodelosMensagensServicos = async (req, res) => {
  try {
    const consumidores = await getAllmodelMsgServices()
    res.json(consumidores)
  } catch (error) {
    res.error
  } 
} 

export const listamodeloMensagemServicoId = async (req, res) => {
  try {
    const modeloMensagemServicoID = req.params
    const modeloMensagemServico = await getmodeloMensagemServicoByID(modeloMensagemServicoID.modelmsgserviceID)
    res.json(modeloMensagemServico)
  } catch (error){
    res.error
  }
}

export const novomodeloMensagemServico = async (req, res) => {
  try {
    const postModelMsgService = req.body
    console.log(`a request é do tipo: ${req.method}`)
    console.log(`body da request: ${JSON.stringify(postModelMsgService, null, 2) }`)

    // eslint-disable-next-line max-len
    const novopostmodeloMensagemServico = await postModelMessageService(postModelMsgService.nomeMensagemServico, postModelMsgService.textoModelo, postModelMsgService.quantidadeDias, postModelMsgService.tipoServicoId)
    res.json(novopostmodeloMensagemServico)
  } catch {
    res.error
  }
}

