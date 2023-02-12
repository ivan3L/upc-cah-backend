create or replace function fn_create_user(_param jsonb)
    returns jsonb language plpgsql
    as $$
        declare
            context text;
            data jsonb = '{}';
			error jsonb = '{}';
            next_user_id smallint;
        begin
            select nextval(pg_get_serial_sequence('ts_user', 'id')) into next_user_id;
            insert into ts_user (
                id,
                email_address,
                password,
                firstname,
                lastname,
                profile_picture_url,
                user_type_id,
                created_at
            ) values (
                next_user_id,
                _param->>'email_address',
                _param->>'password',
                _param->>'firstname',
                _param->>'lastname',
                _param->>'profile_picture_url',
                cast(_param->>'user_type_id' as smallint),
                current_timestamp
            );
            select fn_retrieve_user(jsonb_build_object('id', next_user_id))->'data'->0 into data;
            return jsonb_build_object('data', data, 'error', error);
      END
    $$;
