import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

function getCabinImageData(cabin) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random() * 100}-${cabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  return { imageName, imagePath, shouldUploadImage: !hasImagePath };
}

export async function createEditCabin(newCabin, id) {
  const { imageName, imagePath, shouldUploadImage } =
    getCabinImageData(newCabin);
  // 1. Create/edit cabin
  let query = supabase.from("cabins");
  // A. Create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  // B. Edit
  else {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created/updated");
  }

  // 2. Upload image
  if (!shouldUploadImage) return data;
  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  // 3. Delete cabin if there was error with image
  if (uploadError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(uploadError);
    throw new Error(
      "Cabin image could not be uploaded so cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
