const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


// GET ALL contacts
const getAll = async (req, res) => {
  const db = mongodb.getDatabase();

  const result = await db.db().collection('contacts').find();
  const contacts = await result.toArray();

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(contacts, null, 2));
};


// GET ONE contact by ID (supports path or query parameter)
const getSingle = async (req, res) => {
  const id = req.params.id || req.query.id;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }

  const userId = new ObjectId(id);

  const db = mongodb.getDatabase();

  const result = await db
    .db()
    .collection('contacts')
    .find({ _id: userId });

  const contacts = await result.toArray();

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(contacts[0], null, 2));
};


module.exports = {
  getAll,
  getSingle
};