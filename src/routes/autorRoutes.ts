import { Router } from 'express'
import {
  atualizarAutor,
  buscarAutor,
  criarAutor,
  excluirAutor,
  listarAutores
} from '../controllers/autorController'

const router = Router()

router.get('/', listarAutores)
router.get('/:id', buscarAutor)
router.post('/', criarAutor)
router.put('/:id', atualizarAutor)
router.delete('/:id', excluirAutor)

export default router