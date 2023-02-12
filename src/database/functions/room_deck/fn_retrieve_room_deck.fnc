create or replace function fn_retrieve_room_deck(_param jsonb default '{}')
    returns jsonb language plpgsql
    as $$
    declare
        context text;
        data jsonb = '{}';
		error jsonb = '{}';
    begin
        select coalesce(jsonb_agg(room_decks), data)
        from (
            select * from ts_room_deck
            where (
                case
                    when _param->'id' is not null
                    then id = cast(_param->>'id' as bigint)
                    else true
                end
            ) 
            and (
                case 
                    when _param->'room_id' is not null
                    then(
                        case
                            when _param->>'room_id' is null
                            then room_id is null
                            else room_id = cast(_param->>'room_id' as smallint)
                        end
                    )
                    else true
                end
            )
            and (
                case 
                    when _param->'deck_id' is not null
                    then(
                        case
                            when _param->>'deck_id' is null
                            then deck_id is null
                            else deck_id = cast(_param->>'deck_id' as smallint)
                        end
                    )
                    else true
                end
            )
        ) as rooms into data;
        return jsonb_build_object('data', data, 'error', error);
    end;
$$;
