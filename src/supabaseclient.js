const dotenv = require("dotenv").config();
// Initialize and export the Supabase client
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY,
);

const supabaseTachio = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY,
  { db: { schema: "tachio" } },
);

module.exports = { supabase, supabaseTachio };
