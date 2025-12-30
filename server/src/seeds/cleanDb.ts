import models from '../models/index.js';
import db from '../config/connection.js';

const cleanDB = async (modelName: "Question", collectionName: string) => {
  try {
    const model = models[modelName];
    
    if (!model || !model.db) {
      throw new Error(`Model or database connection not found for: ${modelName}`);
    }

    const collections = await model.db.db?.listCollections({ name: collectionName }).toArray();
    
    if (collections && collections.length > 0) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};

export default cleanDB;