import { Database as DB } from "@/supabase/database.types";

declare global {
    type Database = DB
}