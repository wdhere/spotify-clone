import { supabase } from "@/supabase";

const useLoadImage = async (song) => {
  if (!song) {
    return null;
  }

  const { data: imageData } = await supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
