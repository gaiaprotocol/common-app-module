import { v4 as uuidv4 } from "uuid";
import Supabase from "./Supabase.js";
class UploadManager {
    async _uploadFile(bucketId, folderPath, file) {
        const { data, error } = await Supabase.client.storage.from(bucketId).upload(`${folderPath}/${uuidv4()}_${file.name.replace(/[^(\w\/!-.*'() &@$=;:+,?)]/g, "")}`, file, { cacheControl: "31536000" });
        if (error)
            throw error;
        return data.path;
    }
    async createSignedUrl(bucketId, path, expiresIn) {
        const { data, error } = await Supabase.client.storage.from(bucketId)
            .createSignedUrl(path, expiresIn);
        if (error)
            throw error;
        return data.signedUrl;
    }
    async uploadAttachment(bucketId, folderPath, file, expiresIn) {
        return await this.createSignedUrl(bucketId, await this._uploadFile(bucketId, folderPath, file), expiresIn);
    }
    async uploadFile(bucketId, folderPath, file) {
        const path = await this._uploadFile(bucketId, folderPath, file);
        return Supabase.client.storage.from(bucketId).getPublicUrl(path).data
            .publicUrl;
    }
}
export default new UploadManager();
//# sourceMappingURL=UploadManager.js.map