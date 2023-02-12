create or replace function fn_retrieve_black_card(_param jsonb default '{}')
    returns jsonb language plpgsql
    as $$
    declare
        context text;
        data jsonb = '{}';
		error jsonb = '{}';
    begin
        select coalesce(jsonb_agg(black_cards), data)
        from (
            select * from ts_black_card
            where (
                case
                    when _param->'id' is not null
                    then id = cast(_param->>'id' as bigint)
                    else true
                end
            ) 
            and (
                case 
                    when _param->'question' is not null
                    then(
                        case
                            when _param->>'question' is null
                            then question is null
                            else lower(question) like lower(concat('%', _param->>'question', '%'))
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
