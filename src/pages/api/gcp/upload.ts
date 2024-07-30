import { Storage } from "@google-cloud/storage";
import { type NextApiRequest, type NextApiResponse } from "next";
import formidable from "formidable";
import { BUCKET_NAME, CREDENTIALS, PROJECT_ID } from "~/config/gcp";

const storage = new Storage({
  projectId: PROJECT_ID,
  credentials: CREDENTIALS,
});
const bucket = storage.bucket(BUCKET_NAME);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const form = formidable({});

  console.log("Uploading file....", req);

  form.parse(req, async (err, _fields, files) => {
    if (err) {
      res.status(500).json({ message: "Error parsing the form data." });
      return;
    }

    console.log("file....", files);

    if (!files.file) {
      res
        .status(400)
        .json({ message: "File upload error: No file was uploaded." });
      return;
    }

    const [file] = files.file;

    if (file) {
      const options = {
        destination: file.originalFilename!,
      };

      await storage.bucket(BUCKET_NAME).upload(file.filepath, options);
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.originalFilename}`;
      res.status(200).json({ url: publicUrl });
    }
  });
}
