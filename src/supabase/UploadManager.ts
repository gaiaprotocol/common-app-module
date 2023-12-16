import { v4 as uuidv4 } from "uuid";
import Supabase from "./Supabase.js";

class UploadManager {
  private async _uploadFile(
    bucketId: string,
    folderPath: string,
    file: File,
  ): Promise<string> {
    const { data, error } = await Supabase.client.storage.from(bucketId).upload(
      `${folderPath}/${uuidv4()}_${
        file.name.replace(/[^(\w\/!-.*'() &@$=;:+,?)]/g, "")
      }`,
      file,
      { cacheControl: "31536000" },
    );
    if (error) throw error;
    return data.path;
  }

  public async createSignedUrl(
    bucketId: string,
    path: string,
    expiresIn: number,
  ): Promise<string> {
    const { data, error } = await Supabase.client.storage.from(bucketId)
      .createSignedUrl(path, expiresIn);
    if (error) throw error;
    return data.signedUrl;
  }

  public async uploadAttachment(
    bucketId: string,
    folderPath: string,
    file: File,
    expiresIn: number,
  ): Promise<string> {
    return await this.createSignedUrl(
      bucketId,
      await this._uploadFile(bucketId, folderPath, file),
      expiresIn,
    );
  }

  public async uploadFile(
    bucketId: string,
    folderPath: string,
    file: File,
  ): Promise<string> {
    const path = await this._uploadFile(bucketId, folderPath, file);
    return Supabase.client.storage.from(bucketId).getPublicUrl(path).data
      .publicUrl;
  }
}

export default new UploadManager();
