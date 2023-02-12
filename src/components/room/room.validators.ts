import { Joi, celebrate, Segments } from 'celebrate';

const createRoomSchema = Joi.object({
    number: Joi.number().default(null).max(6),
    name: Joi.string().default(null).max(100),
    password: Joi.string().default(null).max(100),
    max_number_player: Joi.number().default(null).max(8),
    owner_id: Joi.number().default(null).max(3)
})
const updateRoomSchema = Joi.object({
    number: Joi.number().default(null).max(6),
    name: Joi.string().default(null).max(100),
    password: Joi.string().default(null).max(100),
    max_number_player: Joi.number().default(null).max(8),
    owner_id: Joi.number().default(null).max(3)
})
const deleteRoomSchema = Joi.object({
	id: Joi.number().required().positive()
})

const validateCreateRoomRequest = () => {
	return celebrate({
		[Segments.BODY]: createRoomSchema
	})
}
const validateUpdateRoomRequest = () => {
	return celebrate({
		[Segments.BODY]: updateRoomSchema
	})
}
const validateDeleteRoomRequest = () => {
	return celebrate({
		[Segments.BODY]: deleteRoomSchema
	})
}

export {
	validateCreateRoomRequest,
	validateUpdateRoomRequest,
	validateDeleteRoomRequest
}