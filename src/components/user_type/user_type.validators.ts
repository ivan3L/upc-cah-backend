import { Joi, celebrate, Segments } from 'celebrate';

const createUser_typeSchema = Joi.object({
    name: Joi.string().default(null).max(100)
})
const updateUser_typeSchema = Joi.object({
    name: Joi.string().default(null).max(100)
})
const deleteUser_typeSchema = Joi.object({
    id: Joi.number().required().positive()
})

const validateCreateUser_typeRequest = () => {
	return celebrate({
		[Segments.BODY]: createUser_typeSchema
	})
}
const validateUpdateUser_typeRequest = () => {
	return celebrate({
		[Segments.BODY]: updateUser_typeSchema
	})
}
const validateDeleteUser_typeRequest = () => {
	return celebrate({
		[Segments.BODY]: deleteUser_typeSchema
	})
}

export {
	validateCreateUser_typeRequest,
	validateUpdateUser_typeRequest,
	validateDeleteUser_typeRequest
}