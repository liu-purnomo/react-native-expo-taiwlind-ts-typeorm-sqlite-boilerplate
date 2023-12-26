import axios from "axios";
import * as FileSystem from "expo-file-system";

class MediaController {
  private static mediaDir = `${FileSystem.documentDirectory}media/`;

  private static mediaFileUri(mediaId: string, extension: string) {
    return `${MediaController.mediaDir}${mediaId}.${extension}`;
  }

  private static async ensureDirectoryExists() {
    const dirInfo = await FileSystem.getInfoAsync(MediaController.mediaDir);
    if (!dirInfo.exists) {
      console.log("Media directory not found, creating directory...");
      await FileSystem.makeDirectoryAsync(MediaController.mediaDir, {
        intermediates: true,
      });
    }
  }

  public static async downloadAndSaveMedia(
    url: string,
    mediaId: string,
    extension: string
  ) {
    try {
      await MediaController.ensureDirectoryExists();
      const fileUri = MediaController.mediaFileUri(mediaId, extension);

      console.log("Downloading and saving media file...");
      const response = await axios.get(url, { responseType: "arraybuffer" });

      // Convert arraybuffer to base64
      const base64Data = Buffer.from(response.data, "binary").toString(
        "base64"
      );

      // Write base64 data to file
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return fileUri;
    } catch (e) {
      console.error("Failed to download and save media file:", e);
      throw e;
    }
  }

  public static async getLocalMediaPath(mediaId: string, extension: string) {
    try {
      await MediaController.ensureDirectoryExists();
      const fileUri = MediaController.mediaFileUri(mediaId, extension);

      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        console.log("Media file not found locally.");
        return null;
      }

      return fileUri;
    } catch (e) {
      console.error("Failed to get local media path:", e);
      throw e;
    }
  }

  public static async deleteLocalMedia(mediaId: string, extension: string) {
    try {
      const fileUri = MediaController.mediaFileUri(mediaId, extension);
      await FileSystem.deleteAsync(fileUri, { idempotent: true });

      console.log("Deleted local media file:", fileUri);
    } catch (e) {
      console.error("Failed to delete local media file:", e);
      throw e;
    }
  }

  // ... remaining part of the class remains unchanged
}

export default MediaController;
