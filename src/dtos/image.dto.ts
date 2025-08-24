export interface CreateImageDto {
  formId: number;
  url: string;
  desciption: string; // (sic)
  price: string;
  quantity: string;
}

export interface UpdateImageDto {
  formId?: number;
  url?: string;
  desciption?: string; // (sic)
  price?: string;
  quantity?: string;
}
