import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import {
  getAllBookType,
  getArchiveBookType,
} from "../services/book-type.service";

const useReadBookType = () => {
  return useQuery({
    queryFn: getAllBookType,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE],

    refetchOnWindowFocus: false,
  });
};

const useReadArchiveBookType = () => {
  return useQuery({
    queryFn: getArchiveBookType,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ARCHIVE_BOOK_TYPE],

    refetchOnWindowFocus: false,
  });
};
export { useReadBookType, useReadArchiveBookType };
