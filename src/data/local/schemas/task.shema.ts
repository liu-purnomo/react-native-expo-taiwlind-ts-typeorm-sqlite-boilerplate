export interface TaskSchema {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
}
