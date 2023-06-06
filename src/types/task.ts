interface ITask {
  id: string | number;
  order: number;
  title: string;
  completed: boolean;
  date: number;
}

export type { ITask };
