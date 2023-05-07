const router = require('express').Router({ mergeParams: true })
const { 
  createList, 
  deleteList, 
  updatePosition, 
  updateList, 
} = require('../controllers/list');
const tokenHandler = require('../middleware/tokenHandler');
const validation = require('../middleware/validation');
const { param } = require('express-validator')

router.post(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  createList,
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
  updatePosition,
)

router.put(
  '/:listId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  updateList,
)

router.delete(
  '/:listId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('listId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid list id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  deleteList,
)

module.exports = router;
