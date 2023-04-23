import { Router } from 'express';
import user from '../components/user/user.routes'
import room from '../components/room/room.routes'
import facebooklogin from '../components/facebooklogin/facebooklogin.routes'
import black_card from '../components/black_card/black_card.routes'
import deck from '../components/deck/deck.routes'
import room_deck from '../components/room_deck/room_deck.routes'
import user_type from '../components/user_type/user_type.routes'
import white_card from '../components/white_card/white_card.routes'
import googlelogin from '../components/googlelogin/googlelogin.routes'

const router = Router();

router.use('/user', user)
router.use('/room',room)
router.use('/facebook', facebooklogin)
router.use('/black_card',black_card)
router.use('/deck', deck)
router.use('/room_deck',room_deck)
router.use('/user_type',user_type)
router.use('/white_card',white_card)
router.use('/google', googlelogin)

export default router;