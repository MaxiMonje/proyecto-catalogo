// storage/index.ts
export type UploadInput = {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  folder?: string; // opcional, ej: `forms/123`
};

export type UploadOutput = { url: string };

export interface StorageDriver {
  upload(input: UploadInput): Promise<UploadOutput>;
}

export const makeStorage = (): StorageDriver => {
  const driver = (process.env.STORAGE_DRIVER || "cloudinary").toLowerCase();
  if (driver === "local") return new (require("./local").LocalStorage)();
  return new (require("./cloudinary").CloudinaryStorage)(); // default
};
