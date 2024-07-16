import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vrydnvuglbaketouznwr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyeWRudnVnbGJha2V0b3V6bndyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5MDQxMDYsImV4cCI6MjAzNjQ4MDEwNn0.xKASq_Uv0dfH4d7oHCTfgeNh4Px8f7b-S72xf4ruKZU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
