import express from 'express'
import autorRoutes from './routes/autorRoutes'
import obraRoutes from './routes/obraRoutes'

const app = express()

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({
    mensagem: 'Biblioteca API em execução.',
    entidades: ['autores', 'obras']
  })
})

app.use('/autores', autorRoutes)
app.use('/obras', obraRoutes)

app.use((_req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' })
})

export default app
