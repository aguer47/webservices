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

  const result = await db.db().collection('contacts').find({ _id: userId });

  const contacts = await result.toArray();

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(contacts[0], null, 2));
};

// CREATE a new contact
const createcontact = async (req, res) => {
  //swagger tag: post /contacts
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json({ message: 'some error occurred while updating the contact' });
  }
  
};

const updatecontact = async (req, res) => {
  //swagger tag: put /contacts/{id}
  const contactid = req.params.id;
  const userId = new ObjectId(contactid);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: userId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: 'some error occurred while updating the contact' });
  }
};

const deletecontact = async (req, res) => {
  //swagger tag: delete /contacts/{id}
  const contactid = req.params.id;
  const userId = new ObjectId(contactid);
  const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: 'some error occurred while deleting the contact' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createcontact,
  updatecontact,
  deletecontact
};
