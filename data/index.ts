const Woman = require("@/assets/images/shop/woman.png");
const Man = require("@/assets/images/shop/man.png");
const Teen = require("@/assets/images/shop/teen.png");
const Kid = require("@/assets/images/shop/kid.png");
const Baby = require("@/assets/images/shop/baby.png");
const Pet = require("@/assets/images/shop/pet.png");

const t1 = require("@/assets/images/shop/t1.png");
const t2 = require("@/assets/images/shop/t2.png");
const t3 = require("@/assets/images/shop/t3.png");
const t4 = require("@/assets/images/shop/t4.png");

const w1 = require("@/assets/images/shop/w1.png");
const w2 = require("@/assets/images/shop/w2.png");
const w3 = require("@/assets/images/shop/w3.png");
const w4 = require("@/assets/images/shop/w4.png");
const w5 = require("@/assets/images/shop/w5.png");

const c1 = require("@/assets/images/shop/c1.png");
const c2 = require("@/assets/images/shop/c2.png");
const c3 = require("@/assets/images/shop/c3.png");

export const categories = [
  { id: "uuid1", name: "Men", image: Man },
  { id: "uuid2", name: "Women", image: Woman },
  { id: "uuid3", name: "Teens", image: Teen },
  { id: "uuid4", name: "Kids", image: Kid },
  { id: "uuid5", name: "Babies", image: Baby },
  { id: "uuid6", name: "Pets", image: Pet },
  { id: "uuid7", name: "Women", image: Woman },
  { id: "uuid8", name: "Men", image: Man },
  { id: "uuid9", name: "Teens", image: Teen },
  { id: "uuid10", name: "Kids", image: Kid },
  { id: "uuid11", name: "Babies", image: Baby },
  { id: "uuid12", name: "Pets", image: Pet },
];

export const description =
  "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.";

export const products = {
  Men: [
    {
      id: 1,
      brand: "H&M",
      title: "Oversized Fit Printed Mesh T-Shirt",
      star: 4.9,
      quantity: 136,
      price: 295.3,
      discount: 550.3,
      image: t1,
      favourite: false,
    },
    {
      id: 2,
      brand: "H&M",
      title: "Loose Fit T-Shirt",
      star: 4.7,
      quantity: 201,
      price: 199.0,
      discount: 0,
      image: t3,
      favourite: false,
    },
    {
      id: 3,
      brand: "H&M",
      title: "Regular Fit Linen",
      star: 4.8,
      quantity: 127,
      price: 255.0,
      discount: 0,
      image: t2,
      favourite: false,
    },
    {
      id: 4,
      brand: "H&M",
      title: "DryMove Fit",
      star: 4.5,
      quantity: 234,
      price: 220.0,
      discount: 0,
      image: t4,
      favourite: false,
    },
    {
      id: 5,
      brand: "H&M",
      title: "Oversized Fit Printed Mesh T-Shirt",
      star: 4.9,
      quantity: 136,
      price: 295.0,
      discount: 550.0,
      image: w1,
      favourite: false,
    },
    {
      id: 6,
      brand: "H&M",
      title: "Regular Fit Linen",
      star: 4.8,
      quantity: 127,
      price: 255.0,
      discount: 0,
      image: w2,
      favourite: false,
    },
    {
      id: 7,
      brand: "H&M",
      title: "DryMove Fit",
      star: 4.5,
      quantity: 234,
      price: 220.0,
      discount: 0,
      image: w4,
      favourite: false,
    },
    {
      id: 8,
      brand: "H&M",
      title: "Loose Fit T-Shirt",
      star: 4.5,
      quantity: 234,
      price: 220.0,
      discount: 0,
      image: w5,
      favourite: false,
    },
  ],
  Women: [
    {
      id: 5,
      brand: "H&M",
      title: "Oversized Fit Printed Mesh T-Shirt",
      star: 4.9,
      quantity: 136,
      price: 295.0,
      discount: 550.0,
      image: w1,
      favourite: false,
    },
    {
      id: 6,
      brand: "H&M",
      title: "Regular Fit Linen",
      star: 4.8,
      quantity: 127,
      price: 255.0,
      discount: 0,
      image: w2,
      favourite: false,
    },
    {
      id: 7,
      brand: "H&M",
      title: "DryMove Fit",
      star: 4.5,
      quantity: 234,
      price: 220.0,
      discount: 0,
      image: w4,
      favourite: false,
    },
    {
      id: 8,
      brand: "H&M",
      title: "Loose Fit T-Shirt",
      star: 4.5,
      quantity: 234,
      price: 220.0,
      discount: 0,
      image: w5,
      favourite: false,
    },
    {
      id: 1,
      brand: "H&M",
      title: "Oversized Fit Printed Mesh T-Shirt",
      star: 4.9,
      quantity: 136,
      price: 295.0,
      discount: 550.0,
      image: t1,
      favourite: false,
    },
    {
      id: 2,
      brand: "H&M",
      title: "Regular Fit Linen",
      star: 4.8,
      quantity: 127,
      price: 255.0,
      discount: 0,
      image: t2,
      favourite: false,
    },
    {
      id: 3,
      brand: "H&M",
      title: "Loose Fit T-Shirt",
      star: 4.7,
      quantity: 201,
      price: 199.0,
      discount: 440.0,
      image: t3,
      favourite: false,
    },
    {
      id: 4,
      brand: "H&M",
      title: "DryMove Fit",
      star: 4.5,
      quantity: 234,
      price: 220.0,
      discount: 0,
      image: t4,
      favourite: false,
    },
  ],
  Teens: [
    {
      id: 3,
      brand: "H&M",
      title: "Regular Fit Linen",
      star: 4.8,
      quantity: 127,
      price: 255.0,
      discount: 0,
      image: t2,
      favourite: false,
    },
    {
      id: 4,
      brand: "H&M",
      title: "DryMove Fit",
      star: 4.5,
      quantity: 234,
      price: 220.0,
      discount: 0,
      image: t4,
      favourite: false,
    },
    {
      id: 5,
      brand: "H&M",
      title: "Oversized Fit Printed Mesh T-Shirt",
      star: 4.9,
      quantity: 136,
      price: 295.0,
      discount: 550.0,
      image: w1,
      favourite: false,
    },
  ],
  Kids: [
    {
      id: 7,
      brand: "H&M",
      title: "DryMove Fit",
      star: 4.5,
      quantity: 234,
      price: 220.0,
      discount: 0,
      image: w4,
      favourite: false,
    },
    {
      id: 8,
      brand: "H&M",
      title: "Loose Fit T-Shirt",
      star: 4.5,
      quantity: 234,
      price: 220.0,
      discount: 0,
      image: w5,
      favourite: false,
    },
    {
      id: 1,
      brand: "H&M",
      title: "Oversized Fit Printed Mesh T-Shirt",
      star: 4.9,
      quantity: 136,
      price: 295.0,
      discount: 550.0,
      image: t1,
      favourite: false,
    },
  ],
  Babies: [
    {
      id: 4,
      brand: "H&M",
      title: "DryMove Fit",
      star: 4.5,
      quantity: 234,
      price: 220.0,
      discount: 0,
      image: t4,
      favourite: false,
    },
    {
      id: 5,
      brand: "H&M",
      title: "Oversized Fit Printed Mesh T-Shirt",
      star: 4.9,
      quantity: 136,
      price: 295.0,
      discount: 550.0,
      image: w1,
      favourite: false,
    },
    {
      id: 6,
      brand: "H&M",
      title: "Regular Fit Linen",
      star: 4.8,
      quantity: 127,
      price: 255.0,
      discount: 0,
      image: w2,
      favourite: false,
    },
  ],
  Pets: [
    {
      id: 8,
      brand: "H&M",
      title: "Loose Fit T-Shirt",
      star: 4.5,
      quantity: 234,
      price: 220.0,
      discount: 0,
      image: w5,
      favourite: false,
    },
    {
      id: 1,
      brand: "H&M",
      title: "Oversized Fit Printed Mesh T-Shirt",
      star: 4.9,
      quantity: 136,
      price: 295.0,
      discount: 550.0,
      image: t1,
      favourite: false,
    },
    {
      id: 2,
      brand: "H&M",
      title: "Regular Fit Linen",
      star: 4.8,
      quantity: 127,
      price: 255.0,
      discount: 0,
      image: t2,
      favourite: false,
    },
  ],
};

export const sample = [
  { key: 1, image: c1 },
  { key: 2, image: c2 },
  { key: 3, image: c3 },
];

export const selectItems = {
  colors: [
    { id: "uuid1", name: "black", bgColor: "#000000", stock: true },
    { id: "uuid2", name: "blue", bgColor: "#2B4CC3", stock: true },
    { id: "uuid3", name: "purple", bgColor: "#6680C2", stock: false },
    { id: "uuid4", name: "white", bgColor: "#ffffff", stock: true },
  ],
  sizes: [
    { id: "uuid5", name: "XS", stock: false },
    { id: "uuid6", name: "S", stock: true },
    { id: "uuid7", name: "M", stock: true },
    { id: "uuid8", name: "L", stock: false },
    { id: "uuid9", name: "XL", stock: true },
    { id: "uuid10", name: "XXL", stock: true },
  ],
};
