// scripts/update-products.js

const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");

mongoose.connect(
  "mongodb+srv://haigakho:haigakho@hcmus.iiqtx.mongodb.net/hagako-web?retryWrites=true&w=majority&appName=HCMUS"
);

async function updateProducts() {
  try {
    // Example: Update a specific product by name
    await Product.updateOne(
      { name: "Erin Armchair" },
      {
        $set: {
          price: 499.0,
          description: "Updated description...",
          // Add other fields to update
        },
      }
    );

    // Example: Update multiple products matching a condition
    await Product.updateMany(
      { categoryId: "673bf03378dc2d50619a2945" }, // Chair category
      {
        $set: {
          discount: 10,
          // Add other common updates
        },
      }
    );

    console.log("Products updated successfully!");
  } catch (error) {
    console.error("Error updating products:", error);
  } finally {
    mongoose.disconnect();
  }
}

// Hàm chạy seed
const seedDatabase = async () => {
  try {
    // First fetch all categories
    const categories = await Category.find();

    // Make sure we have categories
    if (!categories.length) {
      console.error("No categories found - run categories seed first");
      return;
    }

    const products = [
      {
        name: "Hayden 2 Seater Sofa",
        description:
          "Contemporary flair with ease, the Hayden Sofa Range offers exceptional comfort and style in one swoop. Upholstered in soft chenille fabric, the Hayden 2 Seat Sofa features seat cushions that are pocket-sprung for a sublime seat. We love the curves and soft lines of this luxurious cream sofa, ideal for modern homes looking for a practical and design-led sofa. And with no assembly, there won't be hours wasted searching for that missing bolt...",
        price: 1199.0,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Toyota",
        dimensions: {
          width: 185,
          height: 83,
          depth: 108,
        },
        imageUrl: ["/images/product/hayden-2-seater-sofa.jpg"],
        stock: 10,
        material: "Chenille Fabric",
        colors: ["Cream", "Grey"],
        ratings: {
          average: 4.5,
          count: 4,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kupu Kupu 3 Seater Rattan Sofa",
        description:
          "The Handmade Kupu Kupu 3 Seat Sofa from A TOKO mixes natural rattan and soft khaki green cotton for an irresistible combination. Bold and beautiful, we love the organic curves of the sustainably sourced wood from the frame to the natural rattan lattice. The backrest resembles butterfly wings, or 'Kupu Kupu' in Indonesian; the country that inspires A TOKO's ethos of 'beauty and functionalism available for all'.",
        price: 999.0,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Valio",
        dimensions: {
          width: 180,
          height: 70,
          depth: 70,
        },
        imageUrl: ["/images/product/kupu-kupu-3-seater-rattan-sofa.jpg"],
        stock: 15,
        material: "Fabric",
        colors: ["Orange", "Brown"],
        ratings: {
          average: 4.5,
          count: 10,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Paddington Accent Chair",
        description:
          "For refined Italian design, the Paddington Accent Armchair radiates the 70s and 80s Mad Men aesthetic. Taking inspiration from brutalism with its clean lines and muted colour palette, this exceptional armchair is created from premium materials including a curved chrome frame and soft nougat fabric with speckles of green, orange, and golden yellow intricately woven within.",
        price: 599.0,
        discount: 0,
        categoryId: categories[2]._id,
        brand: "Toyota",
        dimensions: {
          width: 200,
          height: 90,
          depth: 80,
        },
        imageUrl: "/images/product/paddington-accent-chair.jpg",
        stock: 20,
        material: "Fabric",
        colors: ["Brown", "White"],
        ratings: {
          average: 4.5,
          count: 12,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ophelia Carver Dining Chair",
        description:
          "The Ophelia Velvet Dining Chair oozes style with its sculptural silhouette in soft velvet for that mimimaluxe all-in-one look. This supportive and comfortable seat is both durable and stylish; with contemporary charm with added durability. With a rich warming hue, the Ophelia is Minimalist Cool from top-to-toe.",
        price: 229.0,
        discount: 0,
        categoryId: categories[2]._id,
        brand: "Kakie",
        dimensions: {
          width: 56,
          height: 71,
          depth: 52,
        },
        imageUrl: "/images/product/ophelia-carver-dining-chair.jpg",
        stock: 6,
        material: "Velvet",
        colors: ["Red", "Green"],
        ratings: {
          average: 4.5,
          count: 10,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Naxos Large 4 Seat Round Dining Table",
        description:
          "For an effortless fusion of Italian design and elegant functionality, the Naxos Marble Dining Table is crafted from marble in soft light browns and creams; the perfect statement piece with Roman and Ancient Greek influences. This natural stone dining table has a sculptural design that could easily be a work of art. The hexagonal marble pillar base and curved round top with spacious surface for up to 4 people, all in the same latte marble for refined elevated style.",
        price: 1399.0,
        discount: 0,
        categoryId: categories[0]._id,
        brand: "No brand",
        dimensions: {
          width: 130,
          height: 75,
          depth: 130,
        },
        imageUrl: "/images/product/naxos-large-4-seat-round-dining-table.jpg",
        stock: 14,
        material: "Marble",
        colors: ["Wood"],
        ratings: {
          average: 4.5,
          count: 10,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Soller Round Side Table",
        description:
          "The Soller Wooden Side Table is Scandinavian style for your modern home with its soft curves and natural hues. In a walnut-stained finish with natural cane lower shelf, this minimalist silhouette mixes Nordic style with Japandi influences for a purposeful design made from durable high quality materials. Made from durable and stain-resistant melamine, the Soller Collection is perfect for everyday use with this easy-to-maintain material.",
        price: 129.0,
        discount: 0,
        categoryId: categories[0]._id,
        brand: "Kakie",
        dimensions: {
          width: 50,
          height: 45,
          depth: 50,
        },
        imageUrl: "/images/product/soller-round-side-table.jpg",
        stock: 7,
        material: "Melamine",
        colors: ["Brown"],
        ratings: {
          average: 4.5,
          count: 10,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wickham 2 Seater Sofa",
        description:
          "Catering to those who like their furniture with an industrial feel, this Wickham wood and metal two seater sofa, upholstered in brown faux leather, will make every living room comfortable. The design is inspired by Robin Day's Chevron Chair and adapted to suit the modern home.",
        price: 449.0,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Valio",
        dimensions: {
          width: 102,
          height: 80,
          depth: 70,
        },
        imageUrl: "/images/product/wickham-2-seater-sofa.jpg",
        stock: 7,
        material: "Faux Leather",
        colors: ["Brown"],
        ratings: {
          average: 4.5,
          count: 10,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Thêm dữ liệu mới
    await Product.insertMany(products);
    console.log("Data seeded successfully");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    mongoose.connection.close();
  }
};

//updateProducts();
seedDatabase();
