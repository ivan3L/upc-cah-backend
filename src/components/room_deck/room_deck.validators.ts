import { Joi, celebrate, Segments } from 'celebrate';

const createRoom_DeckSchema = Joi.object({
    room_id: Joi.number().default(null).max(6),
    deck_id: Joi.number().default(null).max(6)
})
const updateRoom_DeckSchema = Joi.object({
    room_id: Joi.number().default(null).max(6),
    deck_id: Joi.number().default(null).max(6)
})
const deleteRoom_DeckSchema = Joi.object({
	id: Joi.number().required().positive()
})

const validateCreateRoom_DeckRequest = () => {
	return celebrate({
		[Segments.BODY]: createRoom_DeckSchema
	})
}
const validateUpdateRoom_DeckRequest = () => {
	return celebrate({
		[Segments.BODY]: updateRoom_DeckSchema
	})
}
const validateDeleteRoom_DeckRequest = () => {
	return celebrate({
		[Segments.BODY]: deleteRoom_DeckSchema
	})
}

export {
	validateCreateRoom_DeckRequest,
	validateUpdateRoom_DeckRequest,
	validateDeleteRoom_DeckRequest
}