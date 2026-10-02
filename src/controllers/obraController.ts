import type { Request, Response } from 'express'
import { obraModel } from '../models/obraModel'

const idDaRota = (id: string | string[]) =>
  Array.isArray(id) ? id[0] : id

const uuidValido = (id: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)

function dadosObraValidos(body: Record<string, unknown>) {
  const { titulo, ano_publicacao, autor_id } = body

  if (typeof titulo !== 'string' || titulo.trim().length < 2) {
    return 'O título é obrigatório e deve ter ao menos 2 caracteres.'
  }

  if (typeof autor_id !== 'string' || !uuidValido(autor_id)) {
    return 'O autor_id deve ser um UUID válido.'
  }

  if (
    ano_publicacao !== undefined &&
    (!Number.isInteger(ano_publicacao) || Number(ano_publicacao) < 0)
  ) {
    return 'O ano_publicacao deve ser um número inteiro válido.'
  }

  return null
}

export async function listarObras(_req: Request, res: Response) {
  const { data, error } = await obraModel.listar()

  if (error) return res.status(500).json({ erro: error.message })
  return res.json(data)
}

export async function buscarObra(req: Request, res: Response) {
  const id = idDaRota(req.params.id)
  const { data, error } = await obraModel.buscarPorId(id)

  if (error) return res.status(500).json({ erro: error.message })
  if (!data) return res.status(404).json({ erro: 'Obra não encontrada.' })

  return res.json(data)
}

export async function criarObra(req: Request, res: Response) {
  const erroValidacao = dadosObraValidos(req.body)

  if (erroValidacao) return res.status(400).json({ erro: erroValidacao })

  const { titulo, ano_publicacao, autor_id } = req.body
  const { data, error } = await obraModel.criar(
    titulo.trim(),
    ano_publicacao,
    autor_id
  )

  if (error) return res.status(500).json({ erro: error.message })
  return res.status(201).json(data)
}

export async function atualizarObra(req: Request, res: Response) {
  const id = idDaRota(req.params.id)
  const erroValidacao = dadosObraValidos(req.body)

  if (erroValidacao) return res.status(400).json({ erro: erroValidacao })

  const { titulo, ano_publicacao, autor_id } = req.body
  const { data, error } = await obraModel.atualizar(
    id,
    titulo.trim(),
    ano_publicacao,
    autor_id
  )

  if (error) return res.status(500).json({ erro: error.message })
  if (!data) return res.status(404).json({ erro: 'Obra não encontrada.' })

  return res.json(data)
}

export async function excluirObra(req: Request, res: Response) {
  const id = idDaRota(req.params.id)
  const { data, error } = await obraModel.excluir(id)

  if (error) return res.status(500).json({ erro: error.message })
  if (!data) return res.status(404).json({ erro: 'Obra não encontrada.' })

  return res.status(204).send()
}