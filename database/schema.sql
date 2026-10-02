create extension if not exists pgcrypto;

create table public.autores (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  nacionalidade text,
  criado_em timestamptz not null default now()
);

create table public.obras (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  ano_publicacao integer,
  autor_id uuid not null references public.autores(id) on delete restrict,
  criado_em timestamptz not null default now()
);

alter table public.autores enable row level security;
alter table public.obras enable row level security;

create policy "Leitura publica de autores"
on public.autores for select to anon using (true);

create policy "Insercao publica de autores"
on public.autores for insert to anon with check (true);

create policy "Atualizacao publica de autores"
on public.autores for update to anon using (true) with check (true);

create policy "Exclusao publica de autores"
on public.autores for delete to anon using (true);

create policy "Leitura publica de obras"
on public.obras for select to anon using (true);

create policy "Insercao publica de obras"
on public.obras for insert to anon with check (true);

create policy "Atualizacao publica de obras"
on public.obras for update to anon using (true) with check (true);

create policy "Exclusao publica de obras"
on public.obras for delete to anon using (true);