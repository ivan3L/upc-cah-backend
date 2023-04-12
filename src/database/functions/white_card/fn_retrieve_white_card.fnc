create or replace function fn_retrieve_white_card(_param jsonb default '{}')
    returns jsonb language plpgsql
    as $$
    declare
        context text;
        data jsonb = '{}';
		error jsonb = '{}';
    begin
        select coalesce(jsonb_agg(white_cards), data)
        from (
            select * from ts_white_card
            where (
                case
                    when _param->'id' is not null
                    then id = cast(_param->>'id' as bigint)
                    else true
                end
            ) 
            and (
                case 
                    when _param->'answer' is not null
                    then(
                        case
                            when _param->>'answer' is null
                            then answer is null
                            else lower(answer) like lower(concat('%', _param->>'answer', '%'))
                        end
                    )
                    else true
                end
            )
            and (
                case 
                    when _param->'is_correct' is not null
                    then(
                        case
                            when _param->>'is_correct' is null
                            then is_correct is null
                            else is_correct = cast(_param->>'is_correct' as boolean)
                        end
                    )
                    else true
                end
            )
            and (
                case 
                    when _param->'black_card_id' is not null
                    then(
                        case
                            when _param->>'black_card_id' is null
                            then black_card_id is null
                            else black_card_id = cast(_param->>'black_card_id' as smallint)
                        end
                    )
                    else true
                end
            )
        ) as white_cards into data;
        return jsonb_build_object('data', data, 'error', error);
    end;
$$;
