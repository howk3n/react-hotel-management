import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/button/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createEditCabin } from "@/services/apiCabins";
import FormRow from "@/ui/FormRow";

const REQUIRED_FIELD_MESSAGE = "This field is required.";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { mutate: handleCreateCabin, isLoading: isCreatingCabin } = useMutation(
    {
      mutationFn: createEditCabin,
      onSuccess: () => {
        toast.success("New cabin successfully created!");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
        reset();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  function onSubmit(data) {
    handleCreateCabin({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          defaultValue="test"
          disabled={isCreatingCabin}
          {...register("name", {
            required: REQUIRED_FIELD_MESSAGE,
            validate: (value) =>
              value.trim().length > 0 ||
              "Please insert a valid name (no whitespace)",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          defaultValue={4}
          disabled={isCreatingCabin}
          {...register("maxCapacity", {
            required: REQUIRED_FIELD_MESSAGE,
            min: {
              value: 1,
              message: "Capacity should be at least 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          defaultValue={500}
          disabled={isCreatingCabin}
          {...register("regularPrice", {
            required: REQUIRED_FIELD_MESSAGE,
            min: {
              value: 1,
              message: "Price should be at least 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={20}
          disabled={isCreatingCabin}
          {...register("discount", {
            required: REQUIRED_FIELD_MESSAGE,
            min: {
              value: 0,
              message: "Discount should be at least 0.",
            },
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount can't be more than the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for webside"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue="Some description...."
          disabled={isCreatingCabin}
          {...register("description", {
            required: REQUIRED_FIELD_MESSAGE,
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreatingCabin}
          {...register("image", {
            required: REQUIRED_FIELD_MESSAGE,
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isCreatingCabin}>
          Cancel
        </Button>
        <Button disabled={isCreatingCabin}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
