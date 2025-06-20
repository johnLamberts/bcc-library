import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { IBooks } from "../models/books.interface";
import { firestore } from "src/shared/firebase/firebase";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { uploadFileOrImage, downloadUrl } from "src/shared/services/storage";

const addCatalogue = async (catalogue: Partial<IBooks>) => {
  try {
    const bookIsbnSnapshot = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE),
        where("bookISBN", "==", catalogue.bookISBN)
      )
    );

    const callNumberSnapshot = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE),
        where("callNumber", "==", catalogue.callNumber)
      )
    );

    if (bookIsbnSnapshot.size)
      throw new Error(
        "Oops! It seems that the ISBN you entered already exists in our library system."
      );

    if (callNumberSnapshot.size)
      throw new Error(
        "Oops! It seems that the Call Number you entered already exists in our library system."
      );

    const defaultImageUrl =
      "https://firebasestorage.googleapis.com/v0/b/zidel-posev.appspot.com/o/user.png?alt=media&token=883b6c53-4b75-4f60-a741-abe99f992fb7";

    // Set default values if bookImageCover or bookFile is null or undefined
    catalogue.bookImageCover = catalogue.bookImageCover || defaultImageUrl;
    catalogue.bookFile = catalogue.bookFile || defaultImageUrl;

    // // Upload bookImageCover
    const uploadResultImage = await uploadFileOrImage(catalogue.bookImageCover);
    const imagePathUrl = uploadResultImage
      ? await downloadUrl(uploadResultImage.ref)
      : defaultImageUrl;

    // Upload bookFile
    const uploadResultFile = await uploadFileOrImage(catalogue.bookFile);
    const filePathUrl = uploadResultFile
      ? await downloadUrl(uploadResultFile.ref)
      : defaultImageUrl;

    // Add document to Firestore
    return await addDoc(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE),
      {
        ...catalogue,
        bookFile: filePathUrl,
        bookImageCover: imagePathUrl,
        createdAt: serverTimestamp(),
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const updateCatalogue = async (
  catalogue: Partial<IBooks>,
  booksId: string | undefined
) => {
  try {
 
    const uploadResultImage = await uploadFileOrImage(catalogue.bookImageCover);
    const imagePathUrl = uploadResultImage ?  await downloadUrl(uploadResultImage!.ref) : catalogue.bookImageCover;

    const uploadResultFile = await uploadFileOrImage(catalogue?.bookFile);
    const filePathUrl = uploadResultFile ? await downloadUrl(uploadResultFile!.ref) : catalogue.bookFile;

    return await updateDoc(
      doc(
        firestore,
        FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE,
        booksId as string
      ),
      {
        ...catalogue,
        bookFile: filePathUrl,
        bookImageCover: imagePathUrl,
        modifiedAt: serverTimestamp(),
      } as Partial<IBooks>
    );
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`${err?.message}`);
    }
  }
};
const getAllBooksCatalogue = async () => {
  const booksCatalogueSnapshot = await getDocs(
    collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE)
  );

  return booksCatalogueSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IBooks[];
};

export { addCatalogue, getAllBooksCatalogue, updateCatalogue };
