import { Router } from 'express'
import {
  atualizarObra,
  buscarObra,
  criarObra,
  excluirObra,
  listarObras
} from '../controllers/obraController'

const router = Router()

router.get('/', listarObras)
router.get('/:id', buscarObra)
router.post('/', criarObra)
router.put('/:id', atualizarObra)
router.delete('/:id', excluirObra)

export default router
