const List = require('../models/list');
const Task = require('../models/card');

exports.createList = async(req,res) => {
  const { boardId } = req.params;
  const { title } = req.body;
  try {
    const listCount = await List.find({ board: boardId }).count();
    const list = await List.create({
      board: boardId,
      title,
      position: listCount > 0 ? listCount : 0
    })
    list._doc.cards = [];
    res.status(201).json({
      message: 'success',
      list,
    });
  }catch(e){
    console.log(e)
    res.status(500).json(e)
  }
}

exports.updatePosition = async (req, res) => {
  const { lists } = req.body
  try {
    for (const key in lists ) {
      await List.findByIdAndUpdate(
        lists[key].id,
        {
          $set: {
            position: key
          }
        }
      )
    }
    const newlists = await List.find();
    res.status(200).json('updated')
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.updateList = async (req, res) => {
  const { listId } = req.params
  const { title } = req.body

  try {
    await List.findByIdAndUpdate(
      listId,
      { $set: { title }}
    )
    const list = await List.findById(listId) 
    res.status(200).json(list)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.deleteList = async (req, res) => {
  const { listId } = req.params
  try {
    await Task.deleteMany({ list: listId })
    await List.deleteOne({ _id: listId })
    res.status(200).json('deleted')
  } catch (err) {
    res.status(500).josn(err)
  }
}
