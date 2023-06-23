type Product = {
  _id: string;
  productName: string;
  price: number;
  quantity: number;
  manufacture: string;
  genre: string;
  releaseDate: string;
  language: string;
  system: string;
  description: string;
  file: File | null;
}