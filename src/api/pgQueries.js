import supabaseClient from "../utils/supabase.js";

export async function addPG(token, _,pgData) {
  const supabase = await supabaseClient(token);
  const { data, error} = await supabase
    .from("listpg")
    .insert([pgData])
    .select();

    if (error) {
      console.error("Error Creating New Blogs :", error);
      return null;
    }
    return data;
}
