import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { IBooks } from "../models/books.interface";
import { firestore } from "src/shared/firebase/firebase";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { uploadFileOrImage, downloadUrl } from "src/shared/services/storage";
import isValidDate from "src/utils/validators/isValidDate";

const addCatalogue = async (catalogue: Partial<IBooks>) => {
  try {
    const bookIsbnSnapshot = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE),
        where("bookISBN", "==", catalogue.bookISBN)
      )
    );

    if (
      !catalogue.bookISBN?.trim().toLowerCase().includes("n/a") &&
      bookIsbnSnapshot.size
    ) {
      throw new Error(
        "Oops! It seems that the Book ISBN you entered already exists in our library system."
      );
    }

    const callNumberSnapshot = await getDocs(
      query(
        collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE),
        where("callNumber", "==", catalogue.callNumber)
      )
    );

    if (callNumberSnapshot.size)
      throw new Error(
        "Oops! It seems that the Call Number you entered already exists in our library system."
      );

    if (isValidDate(catalogue.milliseconds!)) {
      const defaultImageUrl =
        "https://firebasestorage.googleapis.com/v0/b/library-management-syste-fb3e9.appspot.com/o/def_cover.png?alt=media&token=7062b5d5-b452-47a3-9304-f4a52fd1d772";

      // Set default values if bookImageCover or bookFile is null or undefined
      catalogue.bookImageCover = catalogue.bookImageCover || defaultImageUrl;
      catalogue.bookFile = catalogue.bookFile || defaultImageUrl;

      // // Upload bookImageCover
      const uploadResultImage = await uploadFileOrImage(
        catalogue.bookImageCover
      );
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
          bookStatus: "Active",
        }
      );
    } else {
      throw new Error("Invalid Date. Please enter a valid value.");
    }
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
    const availabilityRef = await getDocs(
      query(
        collection(
          firestore,
          FIRESTORE_COLLECTION_QUERY_KEY.AVAILABILITY_TRANSACTION
        ),
        where("booksId", "==", booksId as string)
      )
    );

    if (availabilityRef.size > 0) {
      throw new Error(
        "This books cannot be modified, there are still active books in borrowed transaction."
      );
    }

    const uploadResultImage = await uploadFileOrImage(catalogue.bookImageCover);
    const imagePathUrl = uploadResultImage
      ? await downloadUrl(uploadResultImage!.ref)
      : catalogue.bookImageCover;

    const uploadResultFile = await uploadFileOrImage(catalogue?.bookFile);
    const filePathUrl = uploadResultFile
      ? await downloadUrl(uploadResultFile!.ref)
      : catalogue.bookFile;

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
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE),
      orderBy("createdAt", "desc")
    )
  );

  return booksCatalogueSnapshot.docs.map((doc) => ({
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    id: doc.id,
  })) as IBooks[];
};

const getActiveBooks = async () => {
  const booksCatalogueSnapshot = await getDocs(
    query(
      collection(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE),
      where("bookStatus", "==", "Active")
    )
  );

  return booksCatalogueSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IBooks[];
};

const updateCatalogueAvailability = async (books: Partial<IBooks>) => {
  const { id, bookStatus } = books;

  await updateDoc(
    doc(firestore, FIRESTORE_COLLECTION_QUERY_KEY.CATALOGUE, id as string),
    {
      bookStatus: bookStatus === "Active" ? "Inactive" : "Active",
      modifiedAt: serverTimestamp(),
    }
  );
};

export {
  addCatalogue,
  getAllBooksCatalogue,
  updateCatalogue,
  updateCatalogueAvailability,
  getActiveBooks,
};
