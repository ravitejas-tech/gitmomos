export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      ai_keys: {
        Row: {
          chat_model: string
          created_at: string
          hint: string
          provider: Database["public"]["Enums"]["ai_provider"]
          report_model: string
          secret_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          chat_model: string
          created_at?: string
          hint: string
          provider: Database["public"]["Enums"]["ai_provider"]
          report_model: string
          secret_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          chat_model?: string
          created_at?: string
          hint?: string
          provider?: Database["public"]["Enums"]["ai_provider"]
          report_model?: string
          secret_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      commits: {
        Row: {
          author_email: string | null
          author_name: string | null
          committed_at: string
          created_at: string
          html_url: string | null
          id: string
          kind: Database["public"]["Enums"]["work_kind"]
          message: string
          repository_id: string
          sha: string
          user_id: string
        }
        Insert: {
          author_email?: string | null
          author_name?: string | null
          committed_at: string
          created_at?: string
          html_url?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["work_kind"]
          message: string
          repository_id: string
          sha: string
          user_id: string
        }
        Update: {
          author_email?: string | null
          author_name?: string | null
          committed_at?: string
          created_at?: string
          html_url?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["work_kind"]
          message?: string
          repository_id?: string
          sha?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "commits_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      connections: {
        Row: {
          account_login: string
          account_name: string | null
          avatar_url: string | null
          base_url: string
          created_at: string
          id: string
          last_error: string | null
          last_synced_at: string | null
          provider: Database["public"]["Enums"]["provider_name"]
          status: Database["public"]["Enums"]["connection_status"]
          token_secret_id: string | null
          user_id: string
        }
        Insert: {
          account_login: string
          account_name?: string | null
          avatar_url?: string | null
          base_url: string
          created_at?: string
          id?: string
          last_error?: string | null
          last_synced_at?: string | null
          provider: Database["public"]["Enums"]["provider_name"]
          status?: Database["public"]["Enums"]["connection_status"]
          token_secret_id?: string | null
          user_id: string
        }
        Update: {
          account_login?: string
          account_name?: string | null
          avatar_url?: string | null
          base_url?: string
          created_at?: string
          id?: string
          last_error?: string | null
          last_synced_at?: string | null
          provider?: Database["public"]["Enums"]["provider_name"]
          status?: Database["public"]["Enums"]["connection_status"]
          token_secret_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "connections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      milestone_scans: {
        Row: {
          created_at: string
          id: string
          report_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          report_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          report_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestone_scans_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: true
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_scans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          created_at: string
          date: string
          detail: string
          hidden: boolean
          id: string
          report_id: string
          repository_id: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          detail?: string
          hidden?: boolean
          id?: string
          report_id: string
          repository_id: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          detail?: string
          hidden?: boolean
          id?: string
          report_id?: string
          repository_id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestones_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestones_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestones_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      oauth_states: {
        Row: {
          created_at: string
          provider: Database["public"]["Enums"]["provider_name"]
          state: string
          user_id: string
        }
        Insert: {
          created_at?: string
          provider: Database["public"]["Enums"]["provider_name"]
          state: string
          user_id: string
        }
        Update: {
          created_at?: string
          provider?: Database["public"]["Enums"]["provider_name"]
          state?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "oauth_states_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_comments: {
        Row: {
          body: string
          created_at: string
          id: string
          profile_id: string
          replied_at: string | null
          reply: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          profile_id: string
          replied_at?: string | null
          reply?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          profile_id?: string
          replied_at?: string | null
          reply?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_comments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_questions: {
        Row: {
          client_hash: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          client_hash: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          client_hash?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_questions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_path: string | null
          banner_path: string | null
          created_at: string
          email: string
          full_name: string | null
          handle: string | null
          id: string
          is_public: boolean
          tagline: string | null
          timezone: string
          updated_at: string
        }
        Insert: {
          avatar_path?: string | null
          banner_path?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          handle?: string | null
          id: string
          is_public?: boolean
          tagline?: string | null
          timezone?: string
          updated_at?: string
        }
        Update: {
          avatar_path?: string | null
          banner_path?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          handle?: string | null
          id?: string
          is_public?: boolean
          tagline?: string | null
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_repositories: {
        Row: {
          created_at: string
          id: string
          project_id: string
          repository_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          repository_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          repository_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_repositories_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_repositories_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_repositories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          name: string
          slug: string
          tracks_milestones: boolean
          updated_at: string
          url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name: string
          slug: string
          tracks_milestones?: boolean
          updated_at?: string
          url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name?: string
          slug?: string
          tracks_milestones?: boolean
          updated_at?: string
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      report_embeddings: {
        Row: {
          created_at: string
          embedding: string
          id: string
          report_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          embedding: string
          id?: string
          report_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          embedding?: string
          id?: string
          report_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_embeddings_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: true
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_embeddings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          commit_count: number
          content: Json | null
          created_at: string
          date: string
          edited_at: string | null
          error: string | null
          id: string
          status: Database["public"]["Enums"]["report_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          commit_count?: number
          content?: Json | null
          created_at?: string
          date: string
          edited_at?: string | null
          error?: string | null
          id?: string
          status: Database["public"]["Enums"]["report_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          commit_count?: number
          content?: Json | null
          created_at?: string
          date?: string
          edited_at?: string | null
          error?: string | null
          id?: string
          status?: Database["public"]["Enums"]["report_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      repositories: {
        Row: {
          connection_id: string
          created_at: string
          default_branch: string | null
          enabled: boolean
          external_id: string
          full_name: string
          html_url: string
          id: string
          is_private: boolean
          last_synced_at: string | null
          on_profile: boolean
          pushed_at: string | null
          user_id: string
        }
        Insert: {
          connection_id: string
          created_at?: string
          default_branch?: string | null
          enabled?: boolean
          external_id: string
          full_name: string
          html_url: string
          id?: string
          is_private?: boolean
          last_synced_at?: string | null
          on_profile?: boolean
          pushed_at?: string | null
          user_id: string
        }
        Update: {
          connection_id?: string
          created_at?: string
          default_branch?: string | null
          enabled?: boolean
          external_id?: string
          full_name?: string
          html_url?: string
          id?: string
          is_private?: boolean
          last_synced_at?: string | null
          on_profile?: boolean
          pushed_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "repositories_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repositories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      stars: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stars_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stars_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      timesheet_entries: {
        Row: {
          created_at: string
          date: string
          id: string
          minutes: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          minutes: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          minutes?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "timesheet_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      array_or_empty: { Args: { p_value: Json }; Returns: Json }
      claim_profile_question: {
        Args: {
          p_client_hash: string
          p_daily_limit: number
          p_hourly_limit: number
          p_user_id: string
        }
        Returns: boolean
      }
      comment_page: {
        Args: { p_limit: number; p_offset: number; p_profile_id: string }
        Returns: Json
      }
      commit_kind: {
        Args: { message: string }
        Returns: Database["public"]["Enums"]["work_kind"]
      }
      commit_leaderboard: {
        Args: never
        Returns: {
          commits: number
          handle: string
          profile_id: string
          rank: number
        }[]
      }
      community_counts: { Args: { p_profile_id: string }; Returns: Json }
      community_member: { Args: { p_profile_id: string }; Returns: Json }
      delete_profile_comment: { Args: { p_id: string }; Returns: undefined }
      enqueue_daily_syncs: { Args: never; Returns: number }
      enqueue_milestone_scans: { Args: never; Returns: number }
      get_activity: { Args: { p_from: string; p_to: string }; Returns: Json }
      get_ai_key: {
        Args: { p_user_id: string }
        Returns: {
          api_key: string
          chat_model: string
          provider: Database["public"]["Enums"]["ai_provider"]
          report_model: string
        }[]
      }
      get_community: { Args: never; Returns: Json }
      get_connection_token: {
        Args: { p_connection_id: string }
        Returns: string
      }
      get_feed: { Args: { p_from: string; p_to: string }; Returns: Json }
      get_leaderboard: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: Json
      }
      get_people: {
        Args: { p_relation: Database["public"]["Enums"]["community_relation"] }
        Returns: Json
      }
      get_profile_comments: {
        Args: { p_handle: string; p_limit?: number; p_offset?: number }
        Returns: Json
      }
      get_profile_community: { Args: { p_handle: string }; Returns: Json }
      get_projects: { Args: never; Returns: Json }
      get_public_profile: { Args: { p_handle: string }; Returns: Json }
      get_public_project: {
        Args: { p_handle: string; p_slug: string }
        Returns: Json
      }
      get_public_projects: { Args: { p_handle: string }; Returns: Json }
      get_public_report: {
        Args: { p_date: string; p_handle: string }
        Returns: Json
      }
      get_public_timesheet: {
        Args: { p_from: string; p_handle: string; p_to: string }
        Returns: Json
      }
      get_received_comments: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: Json
      }
      get_timesheet: { Args: { p_from: string; p_to: string }; Returns: Json }
      import_repositories: {
        Args: { p_connection_id: string; p_repositories: Json }
        Returns: number
      }
      is_profile_report: {
        Args: { p_content: Json; p_user_id: string }
        Returns: boolean
      }
      is_valid_timezone: { Args: { tz: string }; Returns: boolean }
      match_profile_reports: {
        Args: {
          p_embedding: string
          p_recent: number
          p_similar: number
          p_user_id: string
        }
        Returns: {
          content: Json
          date: string
        }[]
      }
      match_profile_reports_by_text: {
        Args: {
          p_query: string
          p_recent: number
          p_similar: number
          p_user_id: string
        }
        Returns: {
          content: Json
          date: string
        }[]
      }
      pending_milestone_reports: {
        Args: { p_limit: number; p_user_id: string }
        Returns: {
          content: Json
          date: string
          id: string
          updated_at: string
        }[]
      }
      project_milestones: {
        Args: { p_project_id: string }
        Returns: {
          date: string
          detail: string
          id: string
          report_id: string
          title: string
        }[]
      }
      public_profile_id: { Args: { p_handle: string }; Returns: string }
      public_projects: {
        Args: { p_handle: string }
        Returns: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          name: string
          slug: string
          tracks_milestones: boolean
          updated_at: string
          url: string | null
          user_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "projects"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      record_milestones: {
        Args: { p_milestones: Json; p_reports: Json; p_user_id: string }
        Returns: undefined
      }
      record_repository_commits: {
        Args: { p_commits: Json; p_repository_id: string }
        Returns: undefined
      }
      reply_to_profile_comment: {
        Args: { p_id: string; p_reply?: string }
        Returns: undefined
      }
      report_repository_ids: {
        Args: { p_content: Json; p_user_id: string }
        Returns: {
          repository_id: string
        }[]
      }
      save_ai_key: {
        Args: {
          p_chat_model: string
          p_key: string
          p_provider: Database["public"]["Enums"]["ai_provider"]
          p_report_model: string
          p_user_id: string
        }
        Returns: undefined
      }
      save_connection: {
        Args: {
          p_account_login: string
          p_account_name?: string
          p_avatar_url?: string
          p_base_url: string
          p_provider: Database["public"]["Enums"]["provider_name"]
          p_token: string
          p_user_id: string
        }
        Returns: string
      }
      save_profile_comment: {
        Args: { p_body: string; p_handle: string }
        Returns: undefined
      }
      save_project: {
        Args: {
          p_description?: string
          p_id?: string
          p_is_public: boolean
          p_name: string
          p_repository_ids: string[]
          p_tracks_milestones: boolean
          p_url?: string
        }
        Returns: string
      }
      search_profiles: {
        Args: { p_limit?: number; p_query?: string }
        Returns: Json
      }
      search_public_reports: {
        Args: {
          p_from?: string
          p_handle: string
          p_limit?: number
          p_offset?: number
          p_query?: string
          p_to?: string
        }
        Returns: Json
      }
      set_follow: {
        Args: { p_following: boolean; p_handle: string }
        Returns: undefined
      }
      set_star: {
        Args: { p_handle: string; p_starred: boolean }
        Returns: undefined
      }
      set_timesheet_entry: {
        Args: { p_date: string; p_minutes?: number }
        Returns: undefined
      }
      shared_reports: {
        Args: { p_handle: string }
        Returns: {
          content: Json
          date: string
        }[]
      }
      timesheet: {
        Args: {
          p_from: string
          p_shared_only: boolean
          p_to: string
          p_user_id: string
        }
        Returns: {
          commits: number
          date: string
          edited: boolean
          estimated: number
          minutes: number
        }[]
      }
    }
    Enums: {
      ai_provider: "gemini" | "groq" | "claude" | "openai"
      community_relation: "followers" | "following" | "stargazers"
      connection_status: "active" | "error"
      provider_name: "github" | "gitea"
      report_status: "generated" | "failed"
      work_kind:
        | "feature"
        | "fix"
        | "improvement"
        | "maintenance"
        | "docs"
        | "tests"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      ai_provider: ["gemini", "groq", "claude", "openai"],
      community_relation: ["followers", "following", "stargazers"],
      connection_status: ["active", "error"],
      provider_name: ["github", "gitea"],
      report_status: ["generated", "failed"],
      work_kind: [
        "feature",
        "fix",
        "improvement",
        "maintenance",
        "docs",
        "tests",
        "other",
      ],
    },
  },
} as const
