import { Image, ImageCreationAttributes } from "../models/Image";

const seedImage = async () => {
  const data: ImageCreationAttributes[] = [
    {
      formId: 1,
      url: "https://cdn.example.com/products/101-main.jpg",
      desciption: "Foto principal del producto 101",
      price: "199.99",
      quantity: "3",
      active: true,
    },
    {
      formId: 1,
      url: "https://cdn.example.com/products/101-side.jpg",
      desciption: "Foto lateral del producto 101",
      price: "199.99",
      quantity: "3",
      active: true,
    },
    {
      formId: 2,
      url: "https://cdn.example.com/products/202-main.jpg",
      desciption: "Foto principal del producto 202",
      price: "89.90",
      quantity: "10",
      active: true,
    },
    {
      formId: 2,
      url: "https://cdn.example.com/products/202-pack.jpg",
      desciption: "Foto del pack del producto 202",
      price: "89.90",
      quantity: "10",
      active: true,
    },
    {
      formId: 3,
      url: "https://cdn.example.com/products/303-main.jpg",
      desciption: "Foto principal del producto 303",
      price: "49.00",
      quantity: "5",
      active: true,
    },
  ];

  await Image.bulkCreate(data, {
    validate: true,
    // individualHooks: true, // habilitalo si tu modelo usa hooks
  });
};

export default seedImage;
