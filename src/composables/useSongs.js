import { supabase } from "@/supabase";

const useSongs = async () => {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return data || [];
};

export default useSongs;
