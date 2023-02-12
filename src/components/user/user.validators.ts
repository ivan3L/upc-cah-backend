import { Joi, celebrate, Segments } from 'celebrate';

const createUserSchema = Joi.object({
    email_address: Joi.string().default(null).email().max(100).required(),
    password: Joi.string().required(),
    firstname: Joi.string().default(null).max(100),
    lastname: Joi.string().default(null).max(100),
    profile_picture_url: Joi.string().default(null).max(512),
    user_type_id: Joi.number().default(null).max(2)

})

 const updateUserSchema = Joi.object({
    email_address: Joi.string().default(null).email().max(100).required(),
    password: Joi.string().required(),
    firstname: Joi.string().default(null).max(100),
    lastname: Joi.string().default(null).max(100),
    profile_picture_url: Joi.string().default(null).max(512),
    user_type_id: Joi.number().default(null).max(2)
 })
 const deleteUserSchema = Joi.object({
	id: Joi.number().required().positive()
})

const validateCreateUserRequest = () => {
	return celebrate({
		[Segments.BODY]: createUserSchema
	})
}
const validateUpdateUserRequest = () => {
	return celebrate({
		[Segments.BODY]: updateUserSchema
	})
}
const validateDeleteUserRequest = () => {
	return celebrate({
		[Segments.BODY]: deleteUserSchema
	})
}

export {
	validateCreateUserRequest,
	validateUpdateUserRequest,
	validateDeleteUserRequest
}