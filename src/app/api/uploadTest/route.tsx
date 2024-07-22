import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import streamifier from "streamifier";
dotenv.config();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("file");
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
function runMiddleware(req:any, res:any, fn:any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result:any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
export default async function handler(req:any, res:any) {
  await runMiddleware(req, res, uploadMiddleware);
  console.log(req.file.buffer);
  const stream = await cloudinary.uploader.upload_stream(
    {
      folder: "demo",
    },
    (error:any, result:any) => {
      if (error) return console.error(error);
      res.status(200).json(result);
    }
  );
  streamifier.createReadStream(req.file.buffer).pipe(stream);
}
export const config = {
  api: {
    bodyParser: false,
  },
};
