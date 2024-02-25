create table
  public.awards (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    award_name character varying not null,
    category character varying not null,
    status public.status not null default 'active'::status,
    slug character varying not null,
    constraint awards_award_name_key unique (award_name),
    constraint awards_slug_key unique (slug),
    constraint awards_category_fkey foreign key (category) references award_categories (friendly_name) on update cascade on delete cascade
  ) tablespace pg_default;

create trigger trg_slug_insert before insert on awards for each row when (
  new.award_name is not null
  and new.slug is null
)
execute function set_awards_slug_from_name ();