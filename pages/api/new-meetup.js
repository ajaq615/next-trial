//api/new-meetup
//POST /api/new-meetup

import { MongoClient } from 'mongodb';
const dotenv = require("dotenv")

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    const dbconnect = process.env.DB_CONNECT;
    try {
      const client = await MongoClient.connect(dbconnect);
      const db = client.db();

      const meetupsCollection = db.collection('meetups');
      const result = await meetupsCollection.insertOne(data);
      console.log(result);

      client.close();

      res.status(201).json({ message: 'New meetup added!' });
    } catch (e) {
      res.status(500).json({ message: 'An error occured!' + e });
    }
  }
};

export default handler;
