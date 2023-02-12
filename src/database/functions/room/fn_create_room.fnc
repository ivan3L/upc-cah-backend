create or replace function fn_create_room(_param jsonb)
    returns jsonb language plpgsql
    as $$
        declare
            context text;
            data jsonb = '{}';
			error jsonb = '{}';
            next_room_id smallint;
        begin
            select nextval(pg_get_serial_sequence('ts_room', 'id')) into next_room_id;
            insert into ts_room (
                id,
                number,
                name,
                password,
                max_number_player,
                owner_id,
                created_at
            ) values (
                next_room_id,
                cast(_param->>'number' as smallint),
                _param->>'name',
                _param->>'password',
                cast(_param->>'max_number_player' as smallint),
                cast(_param->>'owner_id' as bigint),
                current_timestamp
            );
            select fn_retrieve_room(jsonb_build_object('id', next_room_id))->'data'->0 into data;
            return jsonb_build_object('data', data, 'error', error);
      END
    $$;
