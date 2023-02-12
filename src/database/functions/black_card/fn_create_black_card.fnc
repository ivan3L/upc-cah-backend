create or replace function fn_create_black_card(_param jsonb)
    returns jsonb language plpgsql
    as $$
        declare
            context text;
            data jsonb = '{}';
			error jsonb = '{}';
            next_black_card_id smallint;
        begin
            select nextval(pg_get_serial_sequence('ts_black_card', 'id')) into next_black_card_id;
            insert into ts_black_card (
                id,
                question,
                deck_id,
                created_at
            ) values (
                next_black_card_id,
                _param->>'name',
                cast(_param->>'deck_id' as smallint),
                current_timestamp
            );
            select fn_retrieve_black_card(jsonb_build_object('id', next_black_card_id))->'data'->0 into data;
            return jsonb_build_object('data', data, 'error', error);
      END
    $$;
