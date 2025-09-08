import path from "path";
import { promises as fs } from "fs";        
import sharp from "sharp";
import { v4 as uuid } from "uuid";
import { StorageDriver, UploadInput, UploadOutput } from ".";

export class LocalStorage implements StorageDriver {
  async upload(input: UploadInput): Promise<UploadOutput> {
    const baseDir = path.join(process.cwd(), "uploads", "images");
    const subDir = input.folder ? input.folder.replace(/[^a-zA-Z0-9/_-]/g, "") : "";
    const dir = path.join(baseDir, subDir);
    await fs.mkdir(dir, { recursive: true });                 

    const ext = this.extFromMime(input.mimetype) || ".jpg";
    const filename = `${uuid()}${ext}`;
    const full = path.join(dir, filename);

    // procesado básico
    let p = sharp(input.buffer).rotate().resize({ width: 2000, withoutEnlargement: true });
    if (ext === ".png") p = p.png();
    else if (ext === ".webp") p = p.webp();
    else if (ext === ".gif") p = p.gif?.() ?? p.png();        
    else p = p.jpeg();

    const processed = await p.toBuffer();
    await fs.writeFile(full, processed);

    const baseUrl = (process.env.APP_BASE_URL?.replace(/\/+$/, "") || "http://localhost:3000");
    const url = `${baseUrl}/static/images/${subDir ? subDir + "/" : ""}${filename}`;
    return { url };
  }

  private extFromMime(mime: string) {
    if (mime.includes("png")) return ".png";
    if (mime.includes("webp")) return ".webp";
    if (mime.includes("gif")) return ".gif";
    return ".jpg";
  }
}