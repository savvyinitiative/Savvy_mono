export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      award_categories: {
        Row: {
          created_at: string
          description: string | null
          friendly_name: string
          id: string
          official_name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          friendly_name: string
          id?: string
          official_name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          friendly_name?: string
          id?: string
          official_name?: string
        }
        Relationships: []
      }
      award_nominations: {
        Row: {
          award: string
          created_at: string
          id: number
          nominee_name: string
          slug: string
          summary: string | null
          year: number
        }
        Insert: {
          award: string
          created_at?: string
          id?: number
          nominee_name: string
          slug: string
          summary?: string | null
          year: number
        }
        Update: {
          award?: string
          created_at?: string
          id?: number
          nominee_name?: string
          slug?: string
          summary?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "award_nominations_award_fkey"
            columns: ["award"]
            isOneToOne: false
            referencedRelation: "awards"
            referencedColumns: ["slug"]
          }
        ]
      }
      awards: {
        Row: {
          award_name: string
          category: string
          created_at: string
          id: string
          slug: string
          status: Database["public"]["Enums"]["status"]
        }
        Insert: {
          award_name: string
          category: string
          created_at?: string
          id?: string
          slug: string
          status?: Database["public"]["Enums"]["status"]
        }
        Update: {
          award_name?: string
          category?: string
          created_at?: string
          id?: string
          slug?: string
          status?: Database["public"]["Enums"]["status"]
        }
        Relationships: [
          {
            foreignKeyName: "awards_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "award_categories"
            referencedColumns: ["friendly_name"]
          }
        ]
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          message: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency: string
          id?: string
          message?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          message?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          id: string
          name: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          id: string
          name?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          name?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sira_nominination_votes: {
        Row: {
          award: string
          award_nomination: string
          category: string
          created_at: string
          user_id: string
        }
        Insert: {
          award: string
          award_nomination: string
          category: string
          created_at?: string
          user_id: string
        }
        Update: {
          award?: string
          award_nomination?: string
          category?: string
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sira_nominination_votes_award_fkey"
            columns: ["award"]
            isOneToOne: false
            referencedRelation: "awards"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "sira_nominination_votes_award_nomination_fkey"
            columns: ["award_nomination"]
            isOneToOne: false
            referencedRelation: "award_nominations"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "sira_nominination_votes_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "award_categories"
            referencedColumns: ["friendly_name"]
          },
          {
            foreignKeyName: "sira_nominination_votes_user_id_fkey"
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
      slugify: {
        Args: {
          value: string
        }
        Returns: string
      }
      unaccent: {
        Args: {
          "": string
        }
        Returns: string
      }
      unaccent_init: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
    }
    Enums: {
      status: "active" | "disabled" | "retired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
