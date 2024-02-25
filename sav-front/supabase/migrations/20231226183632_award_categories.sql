create table
  public.award_categories (
    friendly_name character varying not null,
    official_name character varying not null,
    description text null,
    created_at timestamp with time zone not null default now(),
    id uuid not null default gen_random_uuid (),
    constraint award_categories_pkey primary key (friendly_name, id),
    constraint award_categories_friendly_name_key unique (friendly_name),
    constraint award_categories_official_name_key unique (official_name)
  ) tablespace pg_default;