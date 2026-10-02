import { supabase } from '../config/supabase'

export const autorModel = {
  listar: () =>
    supabase.from('autores').select('*').order('nome'),

  buscarPorId: (id: string) =>
    supabase.from('autores').select('*').eq('id', id).maybeSingle(),

  criar: (nome: string, nacionalidade?: string) =>
    supabase
      .from('autores')
      .insert({ nome, nacionalidade })
      .select()
      .single(),

  atualizar: (id: string, nome: string, nacionalidade?: string) =>
    supabase
      .from('autores')
      .update({ nome, nacionalidade })
      .eq('id', id)
      .select()
      .maybeSingle(),

  excluir: (id: string) =>
    supabase
      .from('autores')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle()
}