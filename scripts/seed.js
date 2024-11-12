// scripts/seed.js
const mongoose = require("mongoose");
const Product = require("../models/Product");

mongoose.connect(
  "mongodb+srv://hoangtuanstudy:hagako-password@hagako.bbl92.mongodb.net/"
);

const products = [
  {
    name: "Erin Armchair",
    description:
      "Add a classic contemporary finishing touch to your lounge with the Erin Armchair in a soft mocha brown velvet. Featuring a padded seat, curved profile, and brass accent around the rim, this is the perfect place to relax after a long day. Ideal for modern lifestyles and designed for smaller spaces - bedrooms, or living room nooks - this armchair brings character and comfort to any space.",
    price: 449.0,
    imageUrl: "/images/erin-armchair.png",
    category: "Chair",
    stock: 10,
  },
  {
    name: "Moreton Round Side Table",
    description:
      "The Moreton Side Table in an oak finish is a stunning statement piece for contemporary living rooms. With 1940 design influence and that striking sculptural base, you can place the Moreton Side Table wherever you see fit. The soft curves and neutral colour palette blend into countless interior styles. Made from melamine board that is durable and lightweight, the Moreton Side Table is easy to maintain, for a long-lasting piece suitable for everyday use.",
    price: 89.0,
    imageUrl: "/images/moreton-round-side-table.png",
    category: "Table",
    stock: 15,
  },
  {
    name: "Angus 8 Seat Dining Table",
    description:
      "Gather around the Angus dining table. The blend of wood effect and metal will add a welcoming industrial touch to your dining space. Sitting up to 8 people, this is a spacious and sleek table for any environment. ",
    price: 449.0,
    imageUrl: "/images/angus-8-seat-dining-table.png",
    category: "Table",
    stock: 20,
  },
  {
    name: "Kenton Dining Chair",
    description:
      "Inspired by Marcel Breuer's Cesca Chair, the Kenton Range is instantly recognisable for its Bauhaus roots including an S-shaped framework and blend of modernist materials. A staple in homes for its beautifully simple design, this Kenton Cantilever Dining Chair features speckled stone textured boucle seat and chrome metal frame with a walnut-stained wood and cane backrest. Considered one of the most influential designs of the 20th century, this dining chair has a timeless appeal you've just got to have around your dining table.",
    price: 179.0,
    imageUrl: "/images/kenton-dining-chair.png",
    category: "Chair",
    stock: 6,
  },
  {
    name: "Arlet Accent Chair",
    description:
      "Just look at the Arlet. This Accent Chair in textural speckled stone invokes that classic Italian Mid Century design with a blend of simplicity and elegance. A contemporary seat that is upholstered in soft sustainable boucle with wood accents around the base for that elevated feel. With a smooth dipped seat and all-over curves giving 1960s/1970s vibes, this occasional chair is the ideal standalone piece for living rooms and bedrooms.",
    price: 399.0,
    imageUrl: "/images/arlet-accent-chair.png",
    category: "Chair",
    stock: 14,
  },
];

async function seedDB() {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Đã thêm dữ liệu mẫu thành công!");
  } catch (error) {
    console.error("Lỗi:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedDB();
