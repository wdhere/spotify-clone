import { supabase } from "../supabase";

const useSongsByUserId = async (userId) => {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return data || [];
};

export default useSongsByUserId;
