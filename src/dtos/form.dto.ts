export interface CreateFormDto {
  userId: number;
  title: string;
}

export interface UpdateFormDto {
  userId?: number;
  title?: string;
}
