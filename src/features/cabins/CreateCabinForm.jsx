import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Input from "@/ui/Input";
import Form from "@/ui/Form";
import Button from "@/ui/button/Button";
import FileInput from "@/ui/FileInput";
import Textarea from "@/ui/Textarea";
import FormRow from "@/ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const REQUIRED_FIELD_MESSAGE = "This field is required.";

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
};
function CreateCabinForm({ cabinToEdit = {} }) {
  const { isCreatingCabin, handleCreateCabin } = useCreateCabin();
  const { isEditingCabin, handleEditCabin } = useEditCabin();
  const isWorking = isCreatingCabin || isEditingCabin;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      handleEditCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => reset(),
        }
      );
    else
      handleCreateCabin(
        { ...data, image },
        {
          onSuccess: (data) => reset(),
        }
      );
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          {...register("description", {
            required: REQUIRED_FIELD_MESSAGE,
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : REQUIRED_FIELD_MESSAGE,
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isWorking}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
