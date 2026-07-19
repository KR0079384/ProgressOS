export interface DailyLog {
  id: string;
  user_id: string;

  log_date: string;

  mood: number;
  energy: number;

  focus_hours: number;

  wins: string;
  blockers: string;
  notes: string;

  created_at: string;
}

/**
 * The subset of DailyLog fields the ReflectionForm writes.
 * log_date, user_id, id, and created_at are all managed server-side.
 * focus_hours is owned by the Focus Hub; it defaults to 0 on insert.
 */
export interface ReflectionInsertPayload {
  mood: number;
  energy: number;
  wins: string;
  blockers: string;
  notes: string;
}

/**
 * Computed analytics derived from a window of DailyLog rows.
 * Produced by useReflectionInsights — never stored in the DB.
 */
export interface ReflectionInsights {
  averageMood: number | null;
  averageEnergy: number | null;
  topBlocker: string | null;
  topWin: string | null;
  totalEntries: number;
}
