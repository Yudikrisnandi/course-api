const router = require('express').Router();
const { 
  createBoard, 
  getAllBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
} = require('../controllers/board');
const tokenHandler = require('../middleware/tokenHandler');

router.post(
  '/', 
  tokenHandler.verifyToken,
  createBoard
);

router.get(
  '/', 
  tokenHandler.verifyToken,
  getAllBoard
);

router.get(
  '/:boardId', 
  tokenHandler.verifyToken,
  getBoardById
);

router.put(
  '/:boardId', 
  tokenHandler.verifyToken,
  updateBoard
);

router.delete(
  '/:boardId', 
  tokenHandler.verifyToken,
  deleteBoard,
);


module.exports = router;
