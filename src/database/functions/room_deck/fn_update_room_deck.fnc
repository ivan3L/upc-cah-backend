create or replace function fn_update_room_deck(_param jsonb)
    returns jsonb language plpgsql
    as $$
        declare
            context text;
            data jsonb = '{}';
			error jsonb = '{}';
            _id bigint = cast(_param->>'id' as bigint);
        begin
            if _param->'room_id' is not null then
                    update ts_room_deck set room_id = cast(_param->>'room_id' as smallint)
                    where id = _id;
            end if;
            if _param->'deck_id' is not null then
                    update ts_room_deck set deck_id = cast(_param->>'deck_id' as smallint)
                    where id = _id;
            end if;

            if (_param->'updated_by' is not null) then
                    update ts_room_deck set
                        updated_by = cast(_param->>'updated_by' as bigint),
                        updated_at = current_timestamp
                        where id = _id;
                else
                    update ts_room_deck set
                        deleted_by = cast(_param->>'deleted_by' as bigint),
                        deleted_at = current_timestamp
                        where id = _id;
            end if;
            select fn_retrieve_room_deck(jsonb_build_object('id', _id))->'data'->0 into data;
                return jsonb_build_object('data', data, 'error', error);
        end;
    $$;

    
