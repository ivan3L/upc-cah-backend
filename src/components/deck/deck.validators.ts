import { Joi, celebrate, Segments } from 'celebrate';

const createDeckSchema = Joi.object({
    name: Joi.string().default(null).max(100)
})
const updateDeckSchema = Joi.object({
    name: Joi.string().default(null).max(100)
})
const deleteDeckSchema = Joi.object({
    id: Joi.number().required().positive()
})

const validateCreateDeckRequest = () => {
	return celebrate({
		[Segments.BODY]: createDeckSchema
	})
}
const validateUpdateDeckRequest = () => {
	return celebrate({
		[Segments.BODY]: updateDeckSchema
	})
}
const validateDeleteDeckRequest = () => {
	return celebrate({
		[Segments.BODY]: deleteDeckSchema
	})
}

export {
	validateCreateDeckRequest,
	validateUpdateDeckRequest,
	validateDeleteDeckRequest
}