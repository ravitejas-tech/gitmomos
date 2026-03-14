import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const loadEnv = () => {
    // Try to load .env from the package root or the directory where the binary is executed
    dotenv.config({ path: path.resolve(process.cwd(), '.env') });
    dotenv.config(); // Fallback to current directory
};

export const config = {
    get supabaseUrl() { return process.env.SUPABASE_URL || ''; },
    get supabaseAnonKey() { return process.env.SUPABASE_ANON_KEY || ''; },
    get supabaseProjectId() { return process.env.SUPABASE_PROJECT_ID || ''; },
};
