import type { Request, Response } from 'express'
import { autorModel } from '../models/autorModel'

const idDaRota = (id: string | string[]) =>
  Array.isArray(id) ? id[0] : id

export async function listarAutores(_req: Request, res: Response) {
  const { data, error } = await autorModel.listar()

  if (error) return res.status(500).json({ erro: error.message })
  return res.json(data)
}

export async function buscarAutor(req: Request, res: Response) {
  const id = idDaRota(req.params.id)
  const { data, error } = await autorModel.buscarPorId(id)

  if (error) return res.status(500).json({ erro: error.message })
  if (!data) return res.status(404).json({ erro: 'Autor não encontrado.' })

  return res.json(data)
}

export async function criarAutor(req: Request, res: Response) {
  const { nome, nacionalidade } = req.body

  if (typeof nome !== 'string' || nome.trim().length < 3) {
    return res.status(400).json({
      erro: 'O nome do autor é obrigatório e deve ter ao menos 3 caracteres.'
    })
  }

  const { data, error } = await autorModel.criar(nome.trim(), nacionalidade)

  if (error) return res.status(500).json({ erro: error.message })
  return res.status(201).json(data)
}

export async function atualizarAutor(req: Request, res: Response) {
  const id = idDaRota(req.params.id)
  const { nome, nacionalidade } = req.body

  if (typeof nome !== 'string' || nome.trim().length < 3) {
    return res.status(400).json({
      erro: 'O nome do autor é obrigatório e deve ter ao menos 3 caracteres.'
    })
  }

  const { data, error } = await autorModel.atualizar(
    id,
    nome.trim(),
    nacionalidade
  )

  if (error) return res.status(500).json({ erro: error.message })
  if (!data) return res.status(404).json({ erro: 'Autor não encontrado.' })

  return res.json(data)
}

export async function excluirAutor(req: Request, res: Response) {
  const id = idDaRota(req.params.id)
  const { data, error } = await autorModel.excluir(id)

  if (error?.code === '23503') {
    return res.status(409).json({
      erro: 'Não é possível excluir autor que possui obras cadastradas.'
    })
  }

  if (error) return res.status(500).json({ erro: error.message })
  if (!data) return res.status(404).json({ erro: 'Autor não encontrado.' })

  return res.status(204).send()
}