import { supabase } from "./supabase";

export async function testConnection() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Supabase Error:", error);
    return;
  }

  console.log("Supabase Connected ✅");
  console.log(data);
}
