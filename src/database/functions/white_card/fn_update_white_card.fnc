create or replace function fn_update_white_card(_param jsonb)
    returns jsonb language plpgsql
    as $$
        declare
            context text;
            data jsonb = '{}';
			error jsonb = '{}';
            _id bigint = cast(_param->>'id' as bigint);
        begin
            if _param->'answer' is not null then
                    update ts_white_card set answer = _param->>'answer'
                    where id = _id;
            end if;
            if _param->'is_correct' is not null then
                    update ts_white_card set is_correct = cast(_param->>'is_correct' as boolean)
                    where id = _id;
            end if;
            if _param->'black_card_id' is not null then
                    update ts_white_card set black_card_id = cast(_param->>'black_card_id' as smallint)
                    where id = _id;
            end if;
            if (_param->'updated_by' is not null) then
                    update ts_white_card set
                        updated_by = cast(_param->>'updated_by' as bigint),
                        updated_at = current_timestamp
                        where id = _id;
                else
                    update ts_white_card set
                        deleted_by = cast(_param->>'deleted_by' as bigint),
                        deleted_at = current_timestamp
                        where id = _id;
            end if;
            select fn_retrieve_white_card(jsonb_build_object('id', _id))->'data'->0 into data;
                return jsonb_build_object('data', data, 'error', error);
        end;
    $$;

    
