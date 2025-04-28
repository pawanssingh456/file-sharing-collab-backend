import mongoose from "mongoose";

class MongoDBConnection {
  private static instance: MongoDBConnection;
  private connection: typeof mongoose | null = null;

  private constructor() { }

  public static getInstance(): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  public async connect(): Promise<void> {
    if (this.connection) {
      console.log("MongoDB already connected");
      return;
    }

    try {
      this.connection = await mongoose.connect(process.env.MONGO_URI!, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("MongoDB Connected");
    } catch (error) {
      console.error("MongoDB Connection Error:", error);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.connection) {
      console.log("No active MongoDB connection to disconnect");
      return;
    }

    await this.connection.disconnect();
    this.connection = null;
    console.log("MongoDB Disconnected");
  }

  public getConnection(): typeof mongoose {
    if (!this.connection) {
      throw new Error("MongoDB not connected");
    }
    return this.connection;
  }
}

export default MongoDBConnection.getInstance();