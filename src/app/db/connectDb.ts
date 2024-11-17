import mongoose from "mongoose";

export async function connectDb() {
  try {
    await mongoose.connect("mongodb+srv://jony4:jony1131@atlascluster.w3zog30.mongodb.net/ramot_online");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// // src/app/db/connectDb.ts
// import mongoose from "mongoose";

// const MONGODB_URI = "mongodb+srv://jony4:jony1131@atlascluster.w3zog30.mongodb.net/ramot_online";

// // מונע חיבורים מרובים מיותרים
// let connectionPromise: Promise<typeof mongoose> | null = null;

// export async function connectDb() {
//   try {
//     if (connectionPromise) {
//       return await connectionPromise;
//     }

//     // הגדרות מומלצות לביצועים טובים יותר
//     const options = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       // הגדרות לאינדקס הווקטורי שנצטרך בשביל ה-RAG
//       autoIndex: true,
//       serverSelectionTimeoutMS: 5000,
//     };

//     // יצירת האינדקס הווקטורי אם לא קיים
//     connectionPromise = mongoose.connect(MONGODB_URI).then(async (mongoose) => {
//       try {
//         const db = mongoose.connection.db;
//         const collections = await db.listCollections().toArray();
        
//         if (!collections.find(c => c.name === 'embeddings')) {
//           await db.createCollection('embeddings');
//           await db.collection('embeddings').createIndex(
//             { embedding: "vector" },
//             {
//               name: "vector_index",
//               background: true
//             }
//           );
//         }
//       } catch (error) {
//         console.error("Error creating vector index:", error);
//       }
//       return mongoose;
//     });

//     await connectionPromise;
//     console.log("MongoDB connected successfully with vector index");
//     return connectionPromise;

//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     connectionPromise = null;
//     throw error;
//   }
// }

// // מוודא שהחיבור נסגר כשהאפליקציה נסגרת
// process.on('SIGINT', async () => {
//   try {
//     await mongoose.connection.close();
//     console.log('MongoDB connection closed through app termination');
//     process.exit(0);
//   } catch (err) {
//     console.error('Error closing MongoDB connection:', err);
//     process.exit(1);
//   }
// });