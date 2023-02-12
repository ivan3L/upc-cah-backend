import { Joi, celebrate, Segments } from 'celebrate';

const createWhite_CardSchema = Joi.object({
    answer: Joi.string().default(null).max(512),
    is_correct: Joi.boolean().default(false),
    black_card_id: Joi.number().default(null).max(6)
})
const updateWhite_CardSchema = Joi.object({
    answer: Joi.string().default(null).max(512),
    is_correct: Joi.boolean().default(false),
    black_card_id: Joi.number().default(null).max(6)
})
const deleteWhite_CardSchema = Joi.object({
    id: Joi.number().required().positive()
})

const validateCreateWhite_CardRequest = () => {
	return celebrate({
		[Segments.BODY]: createWhite_CardSchema
	})
}
const validateUpdateWhite_CardRequest = () => {
	return celebrate({
		[Segments.BODY]: updateWhite_CardSchema
	})
}
const validateDeleteWhite_CardRequest = () => {
	return celebrate({
		[Segments.BODY]: deleteWhite_CardSchema
	})
}

export {
	validateCreateWhite_CardRequest,
	validateUpdateWhite_CardRequest,
	validateDeleteWhite_CardRequest
}