const Card = require('../models/card')
const List = require('../models/list')

exports.createCard = async (req, res) => {
  const { listId, title } = req.body
  try {
    const list = await List.findById(listId)
    const cardsCount = await Card.find({ list: listId }).count()
    const card = await Card.create({
      list: listId,
      title,
      position: cardsCount > 0 ? cardsCount : 0
    })
    card._doc.list = list 
    res.status(201).json(card)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.updatePosition = async (req, res) => {
  const {
    resourceList,
    destinationList,
    resourceSectionId,
    destinationSectionId
  } = req.body
  try {
    if (resourceSectionId !== destinationSectionId) {
      for (const key in resourceList) {
        await Card.findByIdAndUpdate(
          resourceList[key].id,
          {
            $set: {
              list: resourceSectionId,
              position: key
            }
          }
        )
      }
    }
    for (const key in destinationList) {
      await Card.findByIdAndUpdate(
        destinationList[key].id,
        {
          $set: {
            list: destinationSectionId,
            position: key
          }
        }
      )
    }
    res.status(200).json('updated')
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.updateCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    await Card.findByIdAndUpdate(
      cardId,
      { $set: req.body }
    )
    const card = await Card.findById(cardId) 
    res.status(200).json(card)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.deleteCard = async (req, res) => {
  const { cardId } = req.params
  try {
    const currentCard = await Card.findById(cardId)
    await Card.deleteOne({ _id: cardId })
    const cards = await Card.find({ list: currentCard.list }).sort('position')
    for (const key in cards) {
      await Card.findByIdAndUpdate(
        cards[key].id,
        { $set: { position: key } }
      )
    }
    res.status(200).json('deleted')
  } catch (err) {
    res.status(500).json(err)
  }
}
