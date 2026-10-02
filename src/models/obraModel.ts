import { supabase } from '../config/supabase'

const campos = `
  id,
  titulo,
  ano_publicacao,
  autor_id,
  criado_em,
  autor:autores(id, nome, nacionalidade)
`

export const obraModel = {
  listar: () =>
    supabase.from('obras').select(campos).order('titulo'),

  buscarPorId: (id: string) =>
    supabase.from('obras').select(campos).eq('id', id).maybeSingle(),

  criar: (titulo: string, ano_publicacao: number | undefined, autor_id: string) =>
    supabase
      .from('obras')
      .insert({ titulo, ano_publicacao, autor_id })
      .select(campos)
      .single(),

  atualizar: (
    id: string,
    titulo: string,
    ano_publicacao: number | undefined,
    autor_id: string
  ) =>
    supabase
      .from('obras')
      .update({ titulo, ano_publicacao, autor_id })
      .eq('id', id)
      .select(campos)
      .maybeSingle(),

  excluir: (id: string) =>
    supabase
      .from('obras')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle()
}
