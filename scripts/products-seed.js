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
        name: "Hattie 3 Seater Sofa",
        description:
          "Functionality meets flair with the Hattie Green Sofa. This 3 seat sofa is upholstered in soft velvet in a ridged design, perfect for any modern living room. Comfortable and stylish, this retro sofa is a standout design mixing vintage shapes and versatile hues to maximum effect. The Hattie Sofa is a statement piece that will bring a touch of luxury to your home.",
        price: 1599.0,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Toyota",
        dimensions: {
          width: 200,
          height: 90,
          depth: 80,
        },
        imageUrl: ["/images/product/hattie-3-seater-sofa.jpg"],
        stock: 10,
        material: "Polyester Velvet",
        colors: ["Green", "Pink", "Blue"],
        ratings: {
          average: 4.5,
          count: 10,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sylvie 2 Seater Sofa",
        description:
          "The Sylvie Fabric Sofa is a contemporary no-fuss design at its finest. This modern sofa is upholstered in soft orange fabric with wood legs for a classic stylish design, easily integrated into any living space. Let's talk about comfort; this 2 seat sofa has a deep seat, large back cushions and tapered armrests that allow you to relax and unwind after a long day.",
        price: 549.0,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Valio",
        dimensions: {
          width: 200,
          height: 90,
          depth: 80,
        },
        imageUrl: ["/images/product/sylvie-2-seater-sofa.jpg"],
        stock: 15,
        material: "Polyester Fabric",
        colors: ["Orange", "Brown"],
        ratings: {
          average: 4.5,
          count: 10,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Arbor Dining Chair",
        description:
          "The Arbor Dining Chair mixes strong functional design with Luxe 70s Revival. Crafted from speckled stone boucle and a sleek black metal frame, these contrasting materials give retro-sque style. Match your Arbor chairs perfectly with dark wood dining tables and abstract monochrome accessories for that completed 70s luxe vibe.",
        price: 199.0,
        discount: 0,
        categoryId: categories[2]._id,
        brand: "Toyota",
        dimensions: {
          width: 200,
          height: 90,
          depth: 80,
        },
        imageUrl: "/images/product/arbor-dining-chair.jpg",
        stock: 20,
        material: "Sustainable Boucle",
        colors: ["Black", "White"],
        ratings: {
          average: 4.5,
          count: 10,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Taylor Dining Chair",
        description:
          "Classic, stylish, and practical, the Taylor Dining Chair is upholstered in rich vintage dark grey faux leather with vertical stitching on the backrest. With a curved seat and backrest, and black metal legs angled for stability, this industrial and modern dining chair elevates dinner time.",
        price: 149.0,
        discount: 0,
        categoryId: categories[2]._id,
        brand: "Kakie",
        dimensions: {
          width: 200,
          height: 90,
          depth: 80,
        },
        imageUrl: "/images/product/taylor-dining-chair.jpg",
        stock: 6,
        material: "Faux Leather",
        colors: ["Dark Grey", "Black"],
        ratings: {
          average: 4.5,
          count: 10,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bourton Office Desk",
        description:
          "There's much to love with the Bourton Desk. Injecting organic design into home offices and bedrooms, the Bourton wooden desk can double up as a dressing table too, and is crafted from solid mango wood stained in a rich walnut hue. With two spacious drawers with a natural cane front and finished with brass handles, this delicious mix of materials offers a contrast between dark and light. Bring those natural vibes into your home...with a bit of added drama.",
        price: 349.0,
        discount: 0,
        categoryId: categories[0]._id,
        brand: "No brand",
        dimensions: {
          width: 200,
          height: 90,
          depth: 80,
        },
        imageUrl: "/images/product/bourton-office-desk.jpg",
        stock: 14,
        material: "Mango Wood, Cane",
        colors: ["Wood"],
        ratings: {
          average: 4.5,
          count: 10,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Soller Coffee Table",
        description:
          "The Soller Wooden Coffee Table is Scandinavian style for your modern home with its soft curves and natural hues. In a walnut-stained finish with natural cane lower shelf, this minimalist silhouette mixes Nordic style with Japandi influences for a purposeful design made from durable high quality materials. Made from durable and stain-resistant melamine, the Soller Collection is perfect for everyday use with this easy-to-maintain material.",
        price: 199.0,
        discount: 0,
        categoryId: categories[0]._id,
        brand: "Kakie",
        dimensions: {
          width: 200,
          height: 90,
          depth: 80,
        },
        imageUrl: "/images/product/soller-coffee-table.jpg",
        stock: 4,
        material: "Melamine, Cane",
        colors: ["Brown"],
        ratings: {
          average: 4.5,
          count: 10,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Brigitte 3 Seater Corner Sofa",
        description:
          "Made from the highest quality chenille fabric, the Brigitte Corner Sofa is pocket-sprung for comfort and effortless bounce, keeping the shape of your sofa for longer. In a versatile grey blend, the Brigitte 3 Seater is part of our Modular Sofa Range so you can adapt these units seamlessly without compromising on comfort and then connect the sections together with an easy lock mechanism. Whether you decide to use it as a 3-seater sofa and move the corner to the left or right, or move each section to suit your space, you have full versatility with this stylish modular sofa range. What's more, there are no confusing instructions; each section of the Brigitte is already fully assembled.",
        price: 2099.0,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Valio",
        dimensions: {
          width: 200,
          height: 90,
          depth: 80,
        },
        imageUrl: "/images/product/brigitte-3-seater-corner-sofa.jpg",
        stock: 7,
        material: "Chenille Fabric",
        colors: ["Blue", "Grey"],
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
