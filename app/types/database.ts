export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Conversation: {
        Row: {
          created_at: string | null
          id: string
          last_message_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_message_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_message_id?: string | null
          updated_at?: string | null
        }
      }
      ConversationParticipant: {
        Row: {
          conversation_id: string
          has_seen_latest_message: boolean
          id: string
          user_id: string
        }
        Insert: {
          conversation_id: string
          has_seen_latest_message?: boolean
          id?: string
          user_id: string
        }
        Update: {
          conversation_id?: string
          has_seen_latest_message?: boolean
          id?: string
          user_id?: string
        }
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
      }
      users: {
        Row: {
          email: string | null
          id: string
          Username: string
        }
        Insert: {
          email?: string | null
          id?: string
          Username?: string
        }
        Update: {
          email?: string | null
          id?: string
          Username?: string
        }
      }
    }
    Views: {
      conversations_with_users: {
        Row: {
          id: string | null
          last_message_id: string | null
          updated_at: string | null
          user_id: string | null
          Username: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
