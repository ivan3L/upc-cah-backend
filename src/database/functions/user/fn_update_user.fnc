create or replace function fn_update_user(_param jsonb)
    returns jsonb language plpgsql
    as $$
        declare
            context text;
            data jsonb = '{}';
			error jsonb = '{}';
            _id bigint = cast(_param->>'id' as bigint);
        begin
            if _param->'email_address' is not null then
                    update ts_user set email_address = _param->>'email_address'
                    where id = _id;
            end if;
            if _param->'password' is not null then
                    update ts_user set password = _param->>'password'
                    where id = _id;
            end if;
            if _param->'firstname' is not null then
                    update ts_user set firstname = _param->>'firstname'
                    where id = _id;
            end if;
            if _param->'lastname' is not null then
                    update ts_user set lastname = _param->>'lastname'
                    where id = _id;
            end if;
            if _param->'profile_picture_url' is not null then
                    update ts_user set profile_picture_url = _param->>'profile_picture_url'
                    where id = _id;
            end if;
            if _param->'user_type_id' is not null then
                    update ts_user set user_type_id = cast(_param->>'user_type_id' as smallint)
                    where id = _id;
            end if;
            if (_param->'updated_by' is not null) then
                    update ts_user set
                        updated_by = cast(_param->>'updated_by' as bigint),
                        updated_at = current_timestamp
                        where id = _id;
                else
                    update ts_user set
                        deleted_by = cast(_param->>'deleted_by' as bigint),
                        deleted_at = current_timestamp
                        where id = _id;
            end if;
            select fn_retrieve_user(jsonb_build_object('id', _id))->'data'->0 into data;
                return jsonb_build_object('data', data, 'error', error);
        end;
    $$;

    
