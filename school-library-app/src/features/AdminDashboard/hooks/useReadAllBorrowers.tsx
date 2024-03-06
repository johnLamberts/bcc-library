import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import {
  getAllTransaction,
  getStudents,
  getTeachers,
} from "../service/admin-dashboard.service";

function useReadAllStudents() {
  return useQuery({
    queryFn: getTeachers,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.TEACHER],

    refetchOnWindowFocus: false,
  });
}

function useReadAllTeachers() {
  return useQuery({
    queryFn: getStudents,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.STUDENT],

    refetchOnWindowFocus: false,
  });
}

function useReadAllTransaction() {
  return useQuery({
    queryFn: getAllTransaction,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ADMIN_DASHBOARD],

    refetchOnWindowFocus: false,
  });
}

export { useReadAllStudents, useReadAllTeachers, useReadAllTransaction };
