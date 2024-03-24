import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addStockCatalogueBook } from "../services/stock.service";

export function useCreateStockAcquisition() {
  const queryClient = useQueryClient();
  const { isPending: isCreatingStock, mutateAsync: createStock } = useMutation({
    mutationFn: addStockCatalogueBook,
    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.title} requested stock has been added successfully. `
      );
      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.STOCK_QTY_ACQUISITION],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreatingStock, createStock };
}
