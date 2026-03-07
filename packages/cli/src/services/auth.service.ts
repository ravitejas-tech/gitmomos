import { getSupabaseClient } from '@gitmomos/shared';
import { saveSession, getSession, clearSession } from '../store/session';
import { config } from '../utils/config';

export class AuthService {
    private _supabase: any;

    private get supabase() {
        if (!this._supabase) {
            if (!config.supabaseUrl || !config.supabaseAnonKey) {
                throw new Error('Supabase configuration missing. Ensure SUPABASE_URL and SUPABASE_ANON_KEY are set in .env');
            }
            this._supabase = getSupabaseClient(config.supabaseUrl, config.supabaseAnonKey);
        }
        return this._supabase;
    }

    async login(email: string, pass: string) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password: pass,
        });

        if (error) throw error;
        if (data.session) {
            await saveSession(JSON.stringify(data.session));
        }
        return data.user;
    }

    async logout() {
        await clearSession();
    }

    async isAuthenticated() {
        const session = await getSession();
        return !!session;
    }
}

export const authService = new AuthService();
