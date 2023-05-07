const router = require('express').Router({ mergeParams: true })
const { 
  createCard, 
  updatePosition, 
  updateCard, 
  deleteCard, 
} = require('../controllers/card');
const { param } = require('express-validator');
const tokenHandler = require('../middleware/tokenHandler');
const validation = require('../middleware/validation');

router.post(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  createCard
)

router.put(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  updatePosition
)

router.put(
  '/:cardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  updateCard
)

router.delete(
  '/:cardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  deleteCard
)

module.exports = router;
