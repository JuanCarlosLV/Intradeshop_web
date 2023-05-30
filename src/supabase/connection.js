import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://btqlaqloldedvkvyhnzl.supabase.co";
const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0cWxhcWxvbGRlZHZrdnlobnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNDc2MzQsImV4cCI6MTk5NTcyMzYzNH0.zMji4tY1iw8y-Cty-1IANLQBlGxQFLhPwijPKL6skZA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
