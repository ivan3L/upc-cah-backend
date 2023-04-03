create or replace function fn_update_room(_param jsonb)
    returns jsonb language plpgsql
    as $$
        declare
            context text;
            data jsonb = '{}';
			error jsonb = '{}';
            _id bigint = cast(_param->>'id' as bigint);
        begin
            if _param->'number' is not null then
                    update ts_room set number = cast(_param->>'number' as smallint)
                    where id = _id;
            end if;
            if _param->'name' is not null then
                    update ts_room set name = _param->>'name'
                    where id = _id;
            end if;
            if _param->'password' is not null then
                    update ts_room set password = _param->>'password'
                    where id = _id;
            end if;
            if _param->'max_number_player' is not null then
                    update ts_room set max_number_player = cast(_param->>'max_number_player' as smallint)
                    where id = _id;
            end if;
            if _param->'owner_id' is not null then
                    update ts_room set owner_id = cast(_param->>'owner_id' as bigint)
                    where id = _id;
            end if;
            if _param->'identificador' is not null then
                    update ts_room set identificador = _param->>'identificador'
                    where id = _id;
            end if;
            if _param->'rounds' is not null then
                    update ts_room set rounds = _param->>'rounds'
                    where id = _id;
            end if;
            if (_param->'updated_by' is not null) then
                    update ts_room set
                        updated_by = cast(_param->>'updated_by' as bigint),
                        updated_at = current_timestamp
                        where id = _id;
                else
                    update ts_room set
                        deleted_by = cast(_param->>'deleted_by' as bigint),
                        deleted_at = current_timestamp
                        where id = _id;
            end if;
            select fn_retrieve_room(jsonb_build_object('id', _id))->'data'->0 into data;
                return jsonb_build_object('data', data, 'error', error);
        end;
    $$;

    
