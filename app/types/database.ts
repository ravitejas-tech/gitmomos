
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  
  "graphql_public": {
          Tables: {
            [_ in never]: never
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            "graphql":
{ Args: { "extensions"?: Json,"operationName"?: string,"query"?: string,"variables"?: Json }; Returns: Json
                           }
          }
          Enums: {
            [_ in never]: never
          }
          CompositeTypes: {
            [_ in never]: never
          }
        },"public": {
          Tables: {
            "commits": {
                  Row: {
                    "author_email": string | null,"author_name": string | null,"committed_at": string,"created_at": string,"html_url": string | null,"id": string,"kind": Database["public"]['Enums']["work_kind"],"message": string,"repository_id": string,"sha": string,"user_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "author_email"?: string | null,"author_name"?: string | null,"committed_at": string,"created_at"?: string,"html_url"?: string | null,"id"?: string,"kind"?: never,"message": string,"repository_id": string,"sha": string,"user_id": string
                  }
                  Update: {
                    "author_email"?: string | null,"author_name"?: string | null,"committed_at"?: string,"created_at"?: string,"html_url"?: string | null,"id"?: string,"kind"?: never,"message"?: string,"repository_id"?: string,"sha"?: string,"user_id"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "commits_repository_id_fkey"
      columns: ["repository_id"]
isOneToOne: false
      referencedRelation: "repositories"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "commits_user_id_fkey"
      columns: ["user_id"]
isOneToOne: false
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    }
                  ]
                },"connections": {
                  Row: {
                    "account_login": string,"account_name": string | null,"avatar_url": string | null,"base_url": string,"created_at": string,"id": string,"last_error": string | null,"last_synced_at": string | null,"provider": Database["public"]['Enums']["provider_name"],"status": Database["public"]['Enums']["connection_status"],"token_secret_id": string | null,"user_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "account_login": string,"account_name"?: string | null,"avatar_url"?: string | null,"base_url": string,"created_at"?: string,"id"?: string,"last_error"?: string | null,"last_synced_at"?: string | null,"provider": Database["public"]['Enums']["provider_name"],"status"?: Database["public"]['Enums']["connection_status"],"token_secret_id"?: string | null,"user_id": string
                  }
                  Update: {
                    "account_login"?: string,"account_name"?: string | null,"avatar_url"?: string | null,"base_url"?: string,"created_at"?: string,"id"?: string,"last_error"?: string | null,"last_synced_at"?: string | null,"provider"?: Database["public"]['Enums']["provider_name"],"status"?: Database["public"]['Enums']["connection_status"],"token_secret_id"?: string | null,"user_id"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "connections_user_id_fkey"
      columns: ["user_id"]
isOneToOne: false
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    }
                  ]
                },"oauth_states": {
                  Row: {
                    "created_at": string,"provider": Database["public"]['Enums']["provider_name"],"state": string,"user_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"provider": Database["public"]['Enums']["provider_name"],"state": string,"user_id": string
                  }
                  Update: {
                    "created_at"?: string,"provider"?: Database["public"]['Enums']["provider_name"],"state"?: string,"user_id"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "oauth_states_user_id_fkey"
      columns: ["user_id"]
isOneToOne: false
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    }
                  ]
                },"profiles": {
                  Row: {
                    "created_at": string,"email": string,"full_name": string | null,"id": string,"timezone": string,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"email": string,"full_name"?: string | null,"id": string,"timezone"?: string,"updated_at"?: string
                  }
                  Update: {
                    "created_at"?: string,"email"?: string,"full_name"?: string | null,"id"?: string,"timezone"?: string,"updated_at"?: string
                  }
                  Relationships: [
                    
                  ]
                },"reports": {
                  Row: {
                    "commit_count": number,"content": Json | null,"created_at": string,"date": string,"edited_at": string | null,"error": string | null,"id": string,"status": Database["public"]['Enums']["report_status"],"updated_at": string,"user_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "commit_count"?: number,"content"?: Json | null,"created_at"?: string,"date": string,"edited_at"?: string | null,"error"?: string | null,"id"?: string,"status": Database["public"]['Enums']["report_status"],"updated_at"?: string,"user_id": string
                  }
                  Update: {
                    "commit_count"?: number,"content"?: Json | null,"created_at"?: string,"date"?: string,"edited_at"?: string | null,"error"?: string | null,"id"?: string,"status"?: Database["public"]['Enums']["report_status"],"updated_at"?: string,"user_id"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "reports_user_id_fkey"
      columns: ["user_id"]
isOneToOne: false
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    }
                  ]
                },"repositories": {
                  Row: {
                    "connection_id": string,"created_at": string,"default_branch": string | null,"enabled": boolean,"external_id": string,"full_name": string,"html_url": string,"id": string,"is_private": boolean,"last_synced_at": string | null,"pushed_at": string | null,"user_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "connection_id": string,"created_at"?: string,"default_branch"?: string | null,"enabled"?: boolean,"external_id": string,"full_name": string,"html_url": string,"id"?: string,"is_private"?: boolean,"last_synced_at"?: string | null,"pushed_at"?: string | null,"user_id": string
                  }
                  Update: {
                    "connection_id"?: string,"created_at"?: string,"default_branch"?: string | null,"enabled"?: boolean,"external_id"?: string,"full_name"?: string,"html_url"?: string,"id"?: string,"is_private"?: boolean,"last_synced_at"?: string | null,"pushed_at"?: string | null,"user_id"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "repositories_connection_id_fkey"
      columns: ["connection_id"]
isOneToOne: false
      referencedRelation: "connections"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "repositories_user_id_fkey"
      columns: ["user_id"]
isOneToOne: false
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    }
                  ]
                }
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            "commit_kind":
{ Args: { "message": string }; Returns: Database["public"]['Enums']["work_kind"]
                           },
"enqueue_daily_syncs":
{ Args: Record<PropertyKey, never>; Returns: number
                           },
"get_activity":
{ Args: { "p_from": string,"p_to": string }; Returns: Json
                           },
"get_connection_token":
{ Args: { "p_connection_id": string }; Returns: string
                           },
"import_repositories":
{ Args: { "p_connection_id": string,"p_repositories": Json }; Returns: number
                           },
"is_valid_timezone":
{ Args: { "tz": string }; Returns: boolean
                           },
"record_repository_commits":
{ Args: { "p_commits": Json,"p_repository_id": string }; Returns: undefined
                           },
"save_connection":
{ Args: { "p_account_login": string,"p_account_name"?: string,"p_avatar_url"?: string,"p_base_url": string,"p_provider": Database["public"]['Enums']["provider_name"],"p_token": string,"p_user_id": string }; Returns: string
                           }
          }
          Enums: {
            "connection_status": "active"|"error","provider_name": "github"|"gitea","report_status": "generated"|"failed","work_kind": "feature"|"fix"|"improvement"|"maintenance"|"docs"|"tests"|"other"
          }
          CompositeTypes: {
            [_ in never]: never
          }
        }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  "graphql_public": {
          Enums: {
            
          }
        },"public": {
          Enums: {
            "connection_status": ["active", "error"],"provider_name": ["github", "gitea"],"report_status": ["generated", "failed"],"work_kind": ["feature", "fix", "improvement", "maintenance", "docs", "tests", "other"]
          }
        }
} as const
