import { Joi, celebrate, Segments } from 'celebrate';

const createBlack_CardSchema = Joi.object({
    question: Joi.string().default(null).max(512),
    deck_id: Joi.number().default(null).max(6)
})
const updateBlack_CardSchema = Joi.object({
    question: Joi.string().default(null).max(512),
    deck_id: Joi.number().default(null).max(6)
})
const deleteBlack_CardSchema = Joi.object({
    id: Joi.number().required().positive()
})

const validateCreateBlack_CardRequest = () => {
	return celebrate({
		[Segments.BODY]: createBlack_CardSchema
	})
}
const validateUpdateBlack_CardRequest = () => {
	return celebrate({
		[Segments.BODY]: updateBlack_CardSchema
	})
}
const validateDeleteBlack_CardRequest = () => {
	return celebrate({
		[Segments.BODY]: deleteBlack_CardSchema
	})
}

export {
	validateCreateBlack_CardRequest,
	validateUpdateBlack_CardRequest,
	validateDeleteBlack_CardRequest
}