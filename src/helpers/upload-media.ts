import firebaseApp from "@/config/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@firebase/storage";

export const UploadFilesToFireBaseAndReturnURLs = async (files: []) => {
  try {
    const storage = getStorage(firebaseApp);
    const uploadedFilesResponses = await Promise.all(
      files.map((file: any) => {
        const storageRef = ref(storage, `images/${file.name}`);
        return uploadBytes(storageRef, file);
      }),
    );

    const uploadedFilesURLs = await Promise.all(
      uploadedFilesResponses.map((response: any) => {
        return getDownloadURL(response.ref);
      }),
    );
    return uploadedFilesURLs;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
