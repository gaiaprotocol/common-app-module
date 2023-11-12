import { v4 as uuidv4 } from "uuid";
import Supabase from "./Supabase.js";
class UploadManager {
    async uploadFile(bucketId, folderPath, file) {
        const { data, error } = await Supabase.client.storage.from(bucketId).upload(`${folderPath}/${uuidv4()}_${file.name}`, file);
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
    async uploadImage(bucketId, folderPath, file, expiresIn) {
        return await this.createSignedUrl(bucketId, await this.uploadFile(bucketId, folderPath, file), expiresIn);
    }
}
export default new UploadManager();
//# sourceMappingURL=UploadManager.js.map