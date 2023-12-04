import { supabase } from "@/supabase";

import useSongs from "./useSongs";

const useSongsByTitle = async (title) => {
  if (!title) {
    const allSongs = await useSongs();
    return allSongs;
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return data || [];
};

export default useSongsByTitle;
