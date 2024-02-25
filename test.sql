begin
  insert into public.profiles(id, name, username, avatar_url)
  values (
    new.id,
    case when new.raw_user_meta_data->'name' is null
      then concat(new.raw_user_meta_data ->> 'first_name', ' ', new.raw_user_meta_data ->> 'last_name')
      else new.raw_user_meta_data ->>'full_name'
    end,
    case when new.raw_user_meta_data->'user_name' is null
      then new.email
      else new.raw_user_meta_data ->> 'user_name'
    end,
    case when new.raw_user_meta_data->'avatar_url' is null
      then ''
      else new.raw_user_meta_data ->> 'avatar_url'
    end
  );
  return new;
end;