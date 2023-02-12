create or replace function fn_create_white_card(_param jsonb)
    returns jsonb language plpgsql
    as $$
        declare
            context text;
            data jsonb = '{}';
			error jsonb = '{}';
            next_white_card_id smallint;
        begin
            select nextval(pg_get_serial_sequence('ts_white_card', 'id')) into next_white_card_id;
            insert into ts_white_card (
                id,
                answer,
                is_correct,
                black_card_id,
                created_at
            ) values (
                next_white_card_id,
                _param->>'answer',
                cast(_param->>'is_correct' as boolean),
                cast(_param->>'black_card_id' as smallint),
                current_timestamp
            );
            select fn_retrieve_white_card(jsonb_build_object('id', next_white_card_id))->'data'->0 into data;
            return jsonb_build_object('data', data, 'error', error);
      END
    $$;
