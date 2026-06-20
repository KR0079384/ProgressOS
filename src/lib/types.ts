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
