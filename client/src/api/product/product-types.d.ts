interface Product {
  name: string;
  description: string;
  price: number;
  category: typeof ObjectId;
  quantity: number;
  sold: number;
  image: {
    data: Buffer;
    contentType: string;
  };
}
