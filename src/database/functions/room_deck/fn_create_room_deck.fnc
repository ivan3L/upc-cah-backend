create or replace function fn_create_room_deck(_param jsonb)
    returns jsonb language plpgsql
    as $$
        declare
            context text;
            data jsonb = '{}';
			error jsonb = '{}';
            next_room_deck_id smallint;
        begin
            select nextval(pg_get_serial_sequence('ts_room_deck', 'id')) into next_room_deck_id;
            insert into ts_room_deck (
                id,
                room_id,
                deck_id,
                created_at
            ) values (
                next_room_deck_id,
                cast(_param->>'room_id' as smallint),
                cast(_param->>'deck_id' as smallint),
                current_timestamp
            );
            select fn_retrieve_room_deck(jsonb_build_object('id', next_room_deck_id))->'data'->0 into data;
            return jsonb_build_object('data', data, 'error', error);
      END
    $$;
