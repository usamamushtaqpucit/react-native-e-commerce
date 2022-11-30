import { firebase } from "../config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const uploadImage = async (uri) => {
  const img = await fetch(uri);
  const blob = await img.blob();
  const date = Date.now().toString();
  const filename = uri.substring(uri.lastIndexOf("/") + 1);
  const fileRef = ref(firebase.storage(), `images/${filename + date}`);

  try {
    await uploadBytesResumable(fileRef, blob);

    blob.close();
    let url = await getDownloadURL(fileRef);
    console.log(url);

    return url;
  } catch (e) {
    console.log(e);
    return false;
  }
};
