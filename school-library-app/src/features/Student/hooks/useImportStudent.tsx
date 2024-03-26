/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import axios from "axios";
import { useState } from "react";

export function useImportStudents() {
  const queryClient = useQueryClient();
  const [progressTracker, setProgressTracker] = useState(0);

  const { isPending: isImportingStudents, mutate: createImportStudents } =
    useMutation({
      mutationFn: async (students: any[]) => {
        const totalStudents = students.length;
        let processedStudents = 0;

        let progress = 0;

        for (const student of students) {
          // Process each student
          await axios.post<void>(
            `${import.meta.env.VITE_SERVER_URL}api/v1/students/new`,
            student
          );
          processedStudents += 1;

          progress = Math.round((processedStudents / totalStudents) * 100);
          setProgressTracker(progress);

          // Simulate processing time for each student (adjust as needed)
          // You can put your student import logic here
          await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate processing time
        }
      },
      onSuccess: () => {
        toast.success("Students data has been imported successfully");
        queryClient.invalidateQueries({
          queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.STUDENT],
        });
      },
      onError: (err) => toast(`Error occured: ${err.message}`),
    });

  return { isImportingStudents, createImportStudents, progressTracker };
}
