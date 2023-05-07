const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');

exports.createBoard = async(req,res) => {
  const { title } = req.body;
  try {
    const boardCount = await Board.find().count();
    const board = await Board.create({
      user: req.user._id,
      title,
      position: boardCount > 0 ? boardCount : 0,
    })
    res.status(201).json({
      message: 'success',
      board,
    });
  }catch(e){
    res.status(500).json(e)
  }
}

exports.updateBoard = async (req, res) => {
  const { boardId } = req.params
  try {
    await Board.findByIdAndUpdate(
      boardId,
      { $set: req.body }
    )
    res.status(200).json('updated')
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getAllBoard = async(req, res) => {
  try{
    const boards = await Board.find({ user: req.user._id }).sort('position');
    res.status(200).json({ message: 'success', boards })
  }catch(e){
    res.status(500).json(e)
  }
}


exports.getBoardById = async (req, res) => {
  const { boardId } = req.params
  try {
    const board = await Board.findOne({ user: req.user._id, _id: boardId })
    if (!board) return res.status(404).json('Board not found')
    const lists = await List.find({ board: boardId }).sort('position');
    for (const list of lists ) {
      const cards = await Card.find({ list: list.id }).populate('list').sort('position')
      list._doc.cards = cards
    }
    board._doc.lists = lists
    res.status(200).json(board)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

exports.deleteBoard = async (req, res) => {
  const { boardId } = req.params
  try {
    const lists = await List.find({ board: boardId })
    for (const list of lists) {
      await Card.deleteMany({ list: list.id })
    }

    await List.deleteMany({ board: boardId })

    const currentBoard = await Board.findById(boardId)

    if (currentBoard.favourite) {
      const favourites = await Board.find({
        user: currentBoard.user,
        favourite: true,
        _id: { $ne: boardId }
      }).sort('favouritePosition')

      for (const key in favourites) {
        const element = favourites[key]
        await Board.findByIdAndUpdate(
          element.id,
          { $set: { favouritePosition: key } }
        )
      }
    }

    await Board.deleteOne({ _id: boardId })

    const boards = await Board.find().sort('position')
    for (const key in boards) {
      const board = boards[key]
      await Board.findByIdAndUpdate(
        board.id,
        { $set: { position: key } }
      )
    }

    res.status(200).json('deleted')
  } catch (err) {
    res.status(500).json(err)
  }
}

