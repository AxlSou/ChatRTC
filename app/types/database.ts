/* eslint-disable no-unused-vars */
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
          id: number
          last_message_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          last_message_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          last_message_id?: string | null
          updated_at?: string | null
        }
      }
      ConversationParticipant: {
        Row: {
          conversation_id: number
          has_seen_latest_message: boolean
          id: number
          user_id: string
        }
        Insert: {
          conversation_id: number
          has_seen_latest_message?: boolean
          id?: number
          user_id: string
        }
        Update: {
          conversation_id?: number
          has_seen_latest_message?: boolean
          id?: number
          user_id?: string
        }
      }
      messages: {
        Row: {
          content: string
          conversation_id: number | null
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          content: string
          conversation_id?: number | null
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Update: {
          content?: string
          conversation_id?: number | null
          created_at?: string | null
          id?: string
          user_id?: string
        }
      }
      users: {
        Row: {
          email: string | null
          id: string
          Username: string | null
        }
        Insert: {
          email?: string | null
          id: string
          Username?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          Username?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
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
