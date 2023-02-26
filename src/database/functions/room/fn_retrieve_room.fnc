create or replace function fn_retrieve_room(_param jsonb default '{}')
    returns jsonb language plpgsql
    as $$
    declare
        context text;
        data jsonb = '{}';
		error jsonb = '{}';
    begin
        select coalesce(jsonb_agg(rooms), data)
        from (
            select * from ts_room
            where (
                case
                    when _param->'id' is not null
                    then id = cast(_param->>'id' as bigint)
                    else true
                end
            ) 
            and (
                case 
                    when _param->'number' is not null
                    then(
                        case
                            when _param->>'number' is null
                            then number is null
                            else number = cast(_param->>'number' as smallint)
                        end
                    )
                    else true
                end
            )
            and (
                case 
                    when _param->'name' is not null
                    then(
                        case
                            when _param->>'name' is null
                            then name is null
                            else lower(name) like lower(concat('%', _param->>'name', '%'))
                        end
                    )
                    else true
                end
            )
            and (
                case 
                    when _param->'password' is not null
                    then(
                        case
                            when _param->>'password' is null
                            then password is null
                            else lower(password) like lower(concat('%', _param->>'password', '%'))
                        end
                    )
                    else true
                end
            )
            and (
                case 
                    when _param->'max_number_player' is not null
                    then(
                        case
                            when _param->>'max_number_player' is null
                            then max_number_player is null
                            else max_number_player = cast(_param->>'max_number_player' as smallint)
                        end
                    )
                    else true
                end
            )
            and (
                case 
                    when _param->'owner_id' is not null
                    then(
                        case
                            when _param->>'owner_id' is null
                            then owner_id is null
                            else owner_id = cast(_param->>'owner_id' as bigint)
                        end
                    )
                    else true
                end
            )
            and (
                case 
                    when _param->'identificador' is not null
                    then(
                        case
                            when _param->>'identificador' is null
                            then identificador is null
                            else lower(identificador) like lower(concat('%', _param->>'identificador', '%'))
                        end
                    )
                    else true
                end
            )
        ) as rooms into data;
        return jsonb_build_object('data', data, 'error', error);
    end;
$$;
