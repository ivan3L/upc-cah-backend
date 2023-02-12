create or replace function fn_create_deck(_param jsonb)
    returns jsonb language plpgsql
    as $$
        declare
            context text;
            data jsonb = '{}';
			error jsonb = '{}';
            next_deck_id smallint;
        begin
            select nextval(pg_get_serial_sequence('ts_deck', 'id')) into next_deck_id;
            insert into ts_deck (
                id,
                name,
                created_at
            ) values (
                next_deck_id,
                _param->>'name',
                current_timestamp
            );
            select fn_retrieve_deck(jsonb_build_object('id', next_deck_id))->'data'->0 into data;
            return jsonb_build_object('data', data, 'error', error);
      END
    $$;
