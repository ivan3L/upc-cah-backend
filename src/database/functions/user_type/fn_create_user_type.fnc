create or replace function fn_create_user_type(_param jsonb)
    returns jsonb language plpgsql
    as $$
        declare
            context text;
            data jsonb = '{}';
			error jsonb = '{}';
            next_user_type_id smallint;
        begin
            select nextval(pg_get_serial_sequence('ts_user_type', 'id')) into next_user_type_id;
            insert into ts_user_type (
                id,
                name,
                created_at
            ) values (
                next_user_type_id,
                _param->>'name',
                current_timestamp
            );
            select fn_retrieve_user_type(jsonb_build_object('id', next_user_type_id))->'data'->0 into data;
            return jsonb_build_object('data', data, 'error', error);
      END
    $$;
