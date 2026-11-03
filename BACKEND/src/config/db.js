import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tenzoads';
  const isAtlas = uri.startsWith('mongodb+srv://') || uri.includes('mongodb.net');
  const hasPlaceholders =
    uri.includes('<username>') ||
    uri.includes('<password>') ||
    uri.includes('xxxxx');

  // Mask password for safe logging
  const maskedUri = uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');

  try {
    if (hasPlaceholders) {
      throw new Error(
        'Placeholder credentials (<username>/<password>) detected in MONGODB_URI. Please update BACKEND/.env with your actual MongoDB Atlas cluster credentials.'
      );
    }

    if (isAtlas) {
      console.log(`[Database] Connecting to MongoDB Atlas cluster at ${maskedUri}...`);
    } else {
      console.log(`[Database] Connecting to local MongoDB at ${maskedUri}...`);
    }

    // Connect with 8s timeout for Atlas or 3s for local
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: isAtlas ? 8000 : 3000,
    });

    console.log(`[Database] Successfully connected to ${isAtlas ? 'MongoDB Atlas' : 'MongoDB'}`);
  } catch (err) {
    console.warn(`[Database] Could not connect to primary MongoDB (${err.message}). Starting in-memory MongoDB fallback...`);
    try {
      mongoMemoryServer = await MongoMemoryServer.create();
      const memUri = mongoMemoryServer.getUri();
      await mongoose.connect(memUri);
      console.log(`[Database] In-memory MongoDB connected successfully at ${memUri}`);
    } catch (memErr) {
      console.error('[Database] Failed to start in-memory MongoDB:', memErr.message);
      throw memErr;
    }
  }

  mongoose.connection.on('error', (err) => {
    console.error('[Database] MongoDB connection error:', err);
  });
};

export const closeDB = async () => {
  await mongoose.disconnect();
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
};
