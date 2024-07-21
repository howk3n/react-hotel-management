import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "@/services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: handleCreateCabin, isLoading: isCreatingCabin } = useMutation(
    {
      mutationFn: createEditCabin,
      onSuccess: () => {
        toast.success("New cabin successfully created!");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
        // reset();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );
  return { isCreatingCabin, handleCreateCabin };
}
