create or replace function fn_retrieve_user(_param jsonb default '{}')
    returns jsonb language plpgsql
    as $$
    declare
        context text;
        data jsonb = '{}';
		error jsonb = '{}';
    begin
        select coalesce(jsonb_agg(users), data)
        from (
            select * from ts_user
            where (
                case
                    when _param->'id' is not null
                    then id = cast(_param->>'id' as bigint)
                    else true
                end
            ) 
            and (
                case 
                    when _param->'email_address' is not null
                    then(
                        case
                            when _param->>'email_address' is null
                            then email_address is null
                            else lower(email_address) like lower(concat('%', _param->>'email_address', '%'))
                        end
                    )
                    else true
                end
            )
            and (
                case 
                    when _param->'firstname' is not null
                    then(
                        case
                            when _param->>'firstname' is null
                            then firstname is null
                            else lower(firstname) like lower(concat('%', _param->>'firstname', '%'))
                        end
                    )
                    else true
                end
            )
            and (
                case 
                    when _param->'lastname' is not null
                    then(
                        case
                            when _param->>'lastname' is null
                            then lastname is null
                            else lower(lastname) like lower(concat('%', _param->>'lastname', '%'))
                        end
                    )
                    else true
                end
            )
            and (
                case 
                    when _param->'profile_picture_url' is not null
                    then(
                        case
                            when _param->>'profile_picture_url' is null
                            then profile_picture_url is null
                            else lower(profile_picture_url) like lower(concat('%', _param->>'profile_picture_url', '%'))
                        end
                    )
                    else true
                end
            )
            and (
                case 
                    when _param->'user_type_id' is not null
                    then(
                        case
                            when _param->>'user_type_id' is null
                            then user_type_id is null
                            else user_type_id = cast(_param->>'user_type_id' as smallint)
                        end
                    )
                    else true
                end
            )
        ) as users into data;
        return jsonb_build_object('data', data, 'error', error);
    end;
$$;
