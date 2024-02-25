create table
  public.donations (
    id uuid not null default gen_random_uuid (),
    currency character varying not null,
    amount bigint not null,
    created_at timestamp with time zone not null default now(),
    message text null,
    constraint donations_pkey primary key (id)
  ) tablespace pg_default;