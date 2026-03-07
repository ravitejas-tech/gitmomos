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
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
    supabaseProjectId: process.env.SUPABASE_PROJECT_ID || '',
};
