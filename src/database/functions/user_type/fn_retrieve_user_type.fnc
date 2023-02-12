create or replace function fn_retrieve_user_type(_param jsonb default '{}')
    returns jsonb language plpgsql
    as $$
    declare
        context text;
        data jsonb = '{}';
		error jsonb = '{}';
    begin
        select coalesce(jsonb_agg(user_types), data)
        from (
            select * from ts_user_type
            where (
                case
                    when _param->'id' is not null
                    then id = cast(_param->>'id' as bigint)
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
        ) as rooms into data;
        return jsonb_build_object('data', data, 'error', error);
    end;
$$;
