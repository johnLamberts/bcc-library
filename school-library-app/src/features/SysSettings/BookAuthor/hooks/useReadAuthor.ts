import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import {
  getAllAuthor,
  getArchivedAuthor,
} from "../services/book-author.service";

const useReadAuthor = () => {
  return useQuery({
    queryFn: getAllAuthor,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.AUTHOR],

    refetchOnWindowFocus: false,
  });
};

const useReadArchiveAuthor = () => {
  return useQuery({
    queryFn: getArchivedAuthor,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ARCHIVE_AUTHOR],

    refetchOnWindowFocus: false,
  });
};
export { useReadAuthor, useReadArchiveAuthor };
