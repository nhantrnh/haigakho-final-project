// scripts/update-products.js

const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");

mongoose.connect(
  "mongodb+srv://haigakho:haigakho@hcmus.iiqtx.mongodb.net/hagako-web?retryWrites=true&w=majority&appName=HCMUS"
);

async function updateProducts() {
  try {
    // update ratings field
    await Product.updateMany(
      {},
      {
        $set: {
          ratings: {
            average: 0,
            count: 0,
          },
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
        name: "DANAIL Industrial Wood Dining Table/L 75x75x75cm",
        description:
          "Tables, often considered the heart of a room, serve as central hubs for activity, interaction, and shared experiences. They are more than just surfaces; they are foundational elements that define the purpose and flow of a space, whether it's a dining room, a living area, a workspace, or a creative studio. Their design, materials, and placement are carefully considered to optimize functionality, enhance aesthetics, and foster a sense of connection among those who gather around them.\nThe world of tables is incredibly diverse, encompassing a wide range of shapes, sizes, and purposes. The classic dining table, often rectangular or oval, provides a dedicated space for shared meals and conversation. Its size and form are often determined by the number of people it needs to accommodate and the formality of the dining experience. Coffee tables, typically lower in height, anchor living room seating arrangements, providing a surface for drinks, books, and decorative objects, while also contributing to the room's overall style. Console tables, often placed against walls or behind sofas, offer a platform for displaying art, lamps, or personal treasures, adding both visual interest and functional surface area. Side tables or end tables, smaller in scale, flank sofas and armchairs, providing convenient spots for lamps, drinks, or personal items.",
        price: 45,
        discount: 0,
        categoryId: categories[0]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 75,
          depth: 75,
          height: 75,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/2/120025292_s_danail_l_wt.jpg",
        ],
        stock: 20,
        material: "Particle  board",
        colors: ["White"],
        ratings: {
          average: 3.8,
          count: 374,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:05:00.404561+00:00",
        updatedAt: "2025-01-10T11:05:00.404561+00:00",
      },
      {
        name: "BRUNO Rubber Wood Dining Table 210x90x75 cm",
        description:
          "Tables, often considered the heart of a room, serve as central hubs for activity, interaction, and shared experiences. They are more than just surfaces; they are foundational elements that define the purpose and flow of a space, whether it's a dining room, a living area, a workspace, or a creative studio. Their design, materials, and placement are carefully considered to optimize functionality, enhance aesthetics, and foster a sense of connection among those who gather around them.\nThe world of tables is incredibly diverse, encompassing a wide range of shapes, sizes, and purposes. The classic dining table, often rectangular or oval, provides a dedicated space for shared meals and conversation. Its size and form are often determined by the number of people it needs to accommodate and the formality of the dining experience. Coffee tables, typically lower in height, anchor living room seating arrangements, providing a surface for drinks, books, and decorative objects, while also contributing to the room's overall style. Console tables, often placed against walls or behind sofas, offer a platform for displaying art, lamps, or personal treasures, adding both visual interest and functional surface area. Side tables or end tables, smaller in scale, flank sofas and armchairs, providing convenient spots for lamps, drinks, or personal items.",
        price: 647,
        discount: 0,
        categoryId: categories[0]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 210,
          depth: 90,
          height: 75,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110041651_f_bruno_210cm_nt.jpg",
        ],
        stock: 8,
        material: "Rubber",
        colors: ["Natural"],
        ratings: {
          average: 2.8,
          count: 965,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:05:03.198778+00:00",
        updatedAt: "2025-01-10T11:05:03.198778+00:00",
      },
      {
        name: "MISSONI Stone Top Dining Table 200x100x76 cm",
        description:
          "Tables, often considered the heart of a room, serve as central hubs for activity, interaction, and shared experiences. They are more than just surfaces; they are foundational elements that define the purpose and flow of a space, whether it's a dining room, a living area, a workspace, or a creative studio. Their design, materials, and placement are carefully considered to optimize functionality, enhance aesthetics, and foster a sense of connection among those who gather around them.\nThe world of tables is incredibly diverse, encompassing a wide range of shapes, sizes, and purposes. The classic dining table, often rectangular or oval, provides a dedicated space for shared meals and conversation. Its size and form are often determined by the number of people it needs to accommodate and the formality of the dining experience. Coffee tables, typically lower in height, anchor living room seating arrangements, providing a surface for drinks, books, and decorative objects, while also contributing to the room's overall style. Console tables, often placed against walls or behind sofas, offer a platform for displaying art, lamps, or personal treasures, adding both visual interest and functional surface area. Side tables or end tables, smaller in scale, flank sofas and armchairs, providing convenient spots for lamps, drinks, or personal items.",
        price: 1153,
        discount: 0,
        categoryId: categories[0]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 100,
          depth: 200,
          height: 76,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110031475_c_missoni_200cm_bk.jpg",
        ],
        stock: 8,
        material: "Artificial Stone",
        colors: ["Black"],
        ratings: {
          average: 4.8,
          count: 721,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:05:06.053179+00:00",
        updatedAt: "2025-01-10T11:05:06.053179+00:00",
      },
      {
        name: "MAKALU Rubber Wood Dining Table 180x100x75 cm",
        description:
          "Tables, often considered the heart of a room, serve as central hubs for activity, interaction, and shared experiences. They are more than just surfaces; they are foundational elements that define the purpose and flow of a space, whether it's a dining room, a living area, a workspace, or a creative studio. Their design, materials, and placement are carefully considered to optimize functionality, enhance aesthetics, and foster a sense of connection among those who gather around them.\nThe world of tables is incredibly diverse, encompassing a wide range of shapes, sizes, and purposes. The classic dining table, often rectangular or oval, provides a dedicated space for shared meals and conversation. Its size and form are often determined by the number of people it needs to accommodate and the formality of the dining experience. Coffee tables, typically lower in height, anchor living room seating arrangements, providing a surface for drinks, books, and decorative objects, while also contributing to the room's overall style. Console tables, often placed against walls or behind sofas, offer a platform for displaying art, lamps, or personal treasures, adding both visual interest and functional surface area. Side tables or end tables, smaller in scale, flank sofas and armchairs, providing convenient spots for lamps, drinks, or personal items.",
        price: 586,
        discount: 0,
        categoryId: categories[0]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 100,
          depth: 180,
          height: 75,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110027308_1534478112676kakm_1.jpg",
        ],
        stock: 6,
        material: "Oak",
        colors: ["Natural Oak"],
        ratings: {
          average: 2.9,
          count: 744,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:05:08.723012+00:00",
        updatedAt: "2025-01-10T11:05:08.723012+00:00",
      },
      {
        name: "MAGARITA Rubber Wood Dining Table/L 200x100x75cm",
        description:
          "Tables, often considered the heart of a room, serve as central hubs for activity, interaction, and shared experiences. They are more than just surfaces; they are foundational elements that define the purpose and flow of a space, whether it's a dining room, a living area, a workspace, or a creative studio. Their design, materials, and placement are carefully considered to optimize functionality, enhance aesthetics, and foster a sense of connection among those who gather around them.\nThe world of tables is incredibly diverse, encompassing a wide range of shapes, sizes, and purposes. The classic dining table, often rectangular or oval, provides a dedicated space for shared meals and conversation. Its size and form are often determined by the number of people it needs to accommodate and the formality of the dining experience. Coffee tables, typically lower in height, anchor living room seating arrangements, providing a surface for drinks, books, and decorative objects, while also contributing to the room's overall style. Console tables, often placed against walls or behind sofas, offer a platform for displaying art, lamps, or personal treasures, adding both visual interest and functional surface area. Side tables or end tables, smaller in scale, flank sofas and armchairs, providing convenient spots for lamps, drinks, or personal items.",
        price: 456,
        discount: 0,
        categoryId: categories[0]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 200,
          depth: 100,
          height: 75,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/2/120024931_c_magrita_bn_bk.jpg",
        ],
        stock: 15,
        material: "Rubber",
        colors: ["Brown"],
        ratings: {
          average: 1.9,
          count: 565,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:05:11.574675+00:00",
        updatedAt: "2025-01-10T11:05:11.574675+00:00",
      },
      {
        name: "FEMMIE Rubber Wood Dining Table/120x80x75cm",
        description:
          "Tables, often considered the heart of a room, serve as central hubs for activity, interaction, and shared experiences. They are more than just surfaces; they are foundational elements that define the purpose and flow of a space, whether it's a dining room, a living area, a workspace, or a creative studio. Their design, materials, and placement are carefully considered to optimize functionality, enhance aesthetics, and foster a sense of connection among those who gather around them.\nThe world of tables is incredibly diverse, encompassing a wide range of shapes, sizes, and purposes. The classic dining table, often rectangular or oval, provides a dedicated space for shared meals and conversation. Its size and form are often determined by the number of people it needs to accommodate and the formality of the dining experience. Coffee tables, typically lower in height, anchor living room seating arrangements, providing a surface for drinks, books, and decorative objects, while also contributing to the room's overall style. Console tables, often placed against walls or behind sofas, offer a platform for displaying art, lamps, or personal treasures, adding both visual interest and functional surface area. Side tables or end tables, smaller in scale, flank sofas and armchairs, providing convenient spots for lamps, drinks, or personal items.",
        price: 173,
        discount: 0,
        categoryId: categories[0]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 120,
          depth: 80,
          height: 75,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/2/120024487_c_femmie_120cm_nt.jpg",
        ],
        stock: 12,
        material: "Rubber",
        colors: ["Natural"],
        ratings: {
          average: 1.6,
          count: 509,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:05:14.638768+00:00",
        updatedAt: "2025-01-10T11:05:14.638768+00:00",
      },
      {
        name: "RENATO Rubber Wood Dining Table 160x80x75cm",
        description:
          "Tables, often considered the heart of a room, serve as central hubs for activity, interaction, and shared experiences. They are more than just surfaces; they are foundational elements that define the purpose and flow of a space, whether it's a dining room, a living area, a workspace, or a creative studio. Their design, materials, and placement are carefully considered to optimize functionality, enhance aesthetics, and foster a sense of connection among those who gather around them.\nThe world of tables is incredibly diverse, encompassing a wide range of shapes, sizes, and purposes. The classic dining table, often rectangular or oval, provides a dedicated space for shared meals and conversation. Its size and form are often determined by the number of people it needs to accommodate and the formality of the dining experience. Coffee tables, typically lower in height, anchor living room seating arrangements, providing a surface for drinks, books, and decorative objects, while also contributing to the room's overall style. Console tables, often placed against walls or behind sofas, offer a platform for displaying art, lamps, or personal treasures, adding both visual interest and functional surface area. Side tables or end tables, smaller in scale, flank sofas and armchairs, providing convenient spots for lamps, drinks, or personal items.",
        price: 195,
        discount: 0,
        categoryId: categories[0]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 160,
          depth: 80,
          height: 75,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/2/120022638_pc_renato_nt.jpg",
        ],
        stock: 10,
        material: "Rubber",
        colors: ["Natural"],
        ratings: {
          average: 4.9,
          count: 426,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:05:17.539888+00:00",
        updatedAt: "2025-01-10T11:05:17.539888+00:00",
      },
      {
        name: "HENRY Iron Dining Table/L 110x75x73.6cm",
        description:
          "Tables, often considered the heart of a room, serve as central hubs for activity, interaction, and shared experiences. They are more than just surfaces; they are foundational elements that define the purpose and flow of a space, whether it's a dining room, a living area, a workspace, or a creative studio. Their design, materials, and placement are carefully considered to optimize functionality, enhance aesthetics, and foster a sense of connection among those who gather around them.\nThe world of tables is incredibly diverse, encompassing a wide range of shapes, sizes, and purposes. The classic dining table, often rectangular or oval, provides a dedicated space for shared meals and conversation. Its size and form are often determined by the number of people it needs to accommodate and the formality of the dining experience. Coffee tables, typically lower in height, anchor living room seating arrangements, providing a surface for drinks, books, and decorative objects, while also contributing to the room's overall style. Console tables, often placed against walls or behind sofas, offer a platform for displaying art, lamps, or personal treasures, adding both visual interest and functional surface area. Side tables or end tables, smaller in scale, flank sofas and armchairs, providing convenient spots for lamps, drinks, or personal items.",
        price: 173,
        discount: 0,
        categoryId: categories[0]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 110,
          depth: 75,
          height: 73,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/2/120021627_pc_henry_110cm_bk.jpg",
        ],
        stock: 17,
        material: "Iron",
        colors: ["Black"],
        ratings: {
          average: 4.9,
          count: 785,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:05:20.367414+00:00",
        updatedAt: "2025-01-10T11:05:20.367414+00:00",
      },
      {
        name: "MAWIN/L MDF Industrial Wood Dining Table 150x90x75cm",
        description:
          "Tables, often considered the heart of a room, serve as central hubs for activity, interaction, and shared experiences. They are more than just surfaces; they are foundational elements that define the purpose and flow of a space, whether it's a dining room, a living area, a workspace, or a creative studio. Their design, materials, and placement are carefully considered to optimize functionality, enhance aesthetics, and foster a sense of connection among those who gather around them.\nThe world of tables is incredibly diverse, encompassing a wide range of shapes, sizes, and purposes. The classic dining table, often rectangular or oval, provides a dedicated space for shared meals and conversation. Its size and form are often determined by the number of people it needs to accommodate and the formality of the dining experience. Coffee tables, typically lower in height, anchor living room seating arrangements, providing a surface for drinks, books, and decorative objects, while also contributing to the room's overall style. Console tables, often placed against walls or behind sofas, offer a platform for displaying art, lamps, or personal treasures, adding both visual interest and functional surface area. Side tables or end tables, smaller in scale, flank sofas and armchairs, providing convenient spots for lamps, drinks, or personal items.",
        price: 217,
        discount: 0,
        categoryId: categories[0]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 150,
          depth: 90,
          height: 75,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/2/120020149_1552549011733jmxm_1.jpg",
        ],
        stock: 19,
        material: "MDF board",
        colors: ["Black"],
        ratings: {
          average: 4.2,
          count: 858,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:05:23.247824+00:00",
        updatedAt: "2025-01-10T11:05:23.247824+00:00",
      },
      {
        name: "BRIGHTON Tempered Glass Dining Table/L 160x90x75cm",
        description:
          "Tables, often considered the heart of a room, serve as central hubs for activity, interaction, and shared experiences. They are more than just surfaces; they are foundational elements that define the purpose and flow of a space, whether it's a dining room, a living area, a workspace, or a creative studio. Their design, materials, and placement are carefully considered to optimize functionality, enhance aesthetics, and foster a sense of connection among those who gather around them.\nThe world of tables is incredibly diverse, encompassing a wide range of shapes, sizes, and purposes. The classic dining table, often rectangular or oval, provides a dedicated space for shared meals and conversation. Its size and form are often determined by the number of people it needs to accommodate and the formality of the dining experience. Coffee tables, typically lower in height, anchor living room seating arrangements, providing a surface for drinks, books, and decorative objects, while also contributing to the room's overall style. Console tables, often placed against walls or behind sofas, offer a platform for displaying art, lamps, or personal treasures, adding both visual interest and functional surface area. Side tables or end tables, smaller in scale, flank sofas and armchairs, providing convenient spots for lamps, drinks, or personal items.",
        price: 260,
        discount: 0,
        categoryId: categories[0]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 160,
          depth: 90,
          height: 75,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/2/120017348_1529899958062oooc.jpg",
        ],
        stock: 3,
        material: "Tempered Glass",
        colors: ["Clear"],
        ratings: {
          average: 3.6,
          count: 976,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:05:26.116259+00:00",
        updatedAt: "2025-01-10T11:05:26.116259+00:00",
      },

      {
        name: "TOSHINO Round side table NT",
        description:
          "Sofas are more than just pieces of furniture; they are the heart of a living space, providing a haven for relaxation, a hub for social interaction, and a defining element of a room's style. They are where we unwind after a long day, gather with loved ones, entertain guests, and create lasting memories. From the plush embrace of a traditional sectional to the sleek lines of a modern loveseat, sofas offer a diverse range of forms, materials, and styles to suit any taste and lifestyle.\nThe world of sofas encompasses a vast array of styles, reflecting both historical influences and evolving design trends. Chesterfield sofas, with their deep button tufting, rolled arms, and luxurious leather upholstery, are iconic symbols of traditional elegance, evoking a sense of timeless sophistication. Lawson sofas, characterized by their clean lines, comfortable cushions, and tailored appearance, offer a more relaxed and versatile style that complements both traditional and contemporary interiors. Mid-century modern sofas, with their low profiles, tapered legs, and streamlined silhouettes, embody the minimalist aesthetic of the era, adding a touch of retro chic to any space.",
        price: 60,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 40,
          depth: 40,
          height: 46,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/7/170134126---toshino-2.jpg",
        ],
        stock: 3,
        material: "Bamboo",
        colors: ["Natural"],
        ratings: {
          average: 3.3,
          count: 940,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:55:39.961931+00:00",
        updatedAt: "2025-01-10T11:55:39.961931+00:00",
      },
      {
        name: "MORETTO H/L sofa 3/S GY",
        description:
          "Sofas are more than just pieces of furniture; they are the heart of a living space, providing a haven for relaxation, a hub for social interaction, and a defining element of a room's style. They are where we unwind after a long day, gather with loved ones, entertain guests, and create lasting memories. From the plush embrace of a traditional sectional to the sleek lines of a modern loveseat, sofas offer a diverse range of forms, materials, and styles to suit any taste and lifestyle.\nThe world of sofas encompasses a vast array of styles, reflecting both historical influences and evolving design trends. Chesterfield sofas, with their deep button tufting, rolled arms, and luxurious leather upholstery, are iconic symbols of traditional elegance, evoking a sense of timeless sophistication. Lawson sofas, characterized by their clean lines, comfortable cushions, and tailored appearance, offer a more relaxed and versatile style that complements both traditional and contemporary interiors. Mid-century modern sofas, with their low profiles, tapered legs, and streamlined silhouettes, embody the minimalist aesthetic of the era, adding a touch of retro chic to any space.",
        price: 970,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 202,
          depth: 93,
          height: 94,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110037228_op9_gy.jpg",
        ],
        stock: 17,
        material: "Other Genuine Leather",
        colors: ["Grey"],
        ratings: {
          average: 1.7,
          count: 577,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:55:42.529344+00:00",
        updatedAt: "2025-01-10T11:55:42.529344+00:00",
      },
      {
        name: "HENDERSON Manual recliner 3/S CHO",
        description:
          "Sofas are more than just pieces of furniture; they are the heart of a living space, providing a haven for relaxation, a hub for social interaction, and a defining element of a room's style. They are where we unwind after a long day, gather with loved ones, entertain guests, and create lasting memories. From the plush embrace of a traditional sectional to the sleek lines of a modern loveseat, sofas offer a diverse range of forms, materials, and styles to suit any taste and lifestyle.\nThe world of sofas encompasses a vast array of styles, reflecting both historical influences and evolving design trends. Chesterfield sofas, with their deep button tufting, rolled arms, and luxurious leather upholstery, are iconic symbols of traditional elegance, evoking a sense of timeless sophistication. Lawson sofas, characterized by their clean lines, comfortable cushions, and tailored appearance, offer a more relaxed and versatile style that complements both traditional and contemporary interiors. Mid-century modern sofas, with their low profiles, tapered legs, and streamlined silhouettes, embody the minimalist aesthetic of the era, adding a touch of retro chic to any space.",
        price: 954,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 98,
          depth: 202,
          height: 98,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110032232_f_henderson_cho.jpg",
        ],
        stock: 17,
        material: "Other Genuine Leather",
        colors: ["Chocolate"],
        ratings: {
          average: 1.8,
          count: 291,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:55:44.989819+00:00",
        updatedAt: "2025-01-10T11:55:44.989819+00:00",
      },
      {
        name: "PVC Long Chair CLARK/L 126x 46x50cm",
        description:
          "Sofas are more than just pieces of furniture; they are the heart of a living space, providing a haven for relaxation, a hub for social interaction, and a defining element of a room's style. They are where we unwind after a long day, gather with loved ones, entertain guests, and create lasting memories. From the plush embrace of a traditional sectional to the sleek lines of a modern loveseat, sofas offer a diverse range of forms, materials, and styles to suit any taste and lifestyle.\nThe world of sofas encompasses a vast array of styles, reflecting both historical influences and evolving design trends. Chesterfield sofas, with their deep button tufting, rolled arms, and luxurious leather upholstery, are iconic symbols of traditional elegance, evoking a sense of timeless sophistication. Lawson sofas, characterized by their clean lines, comfortable cushions, and tailored appearance, offer a more relaxed and versatile style that complements both traditional and contemporary interiors. Mid-century modern sofas, with their low profiles, tapered legs, and streamlined silhouettes, embody the minimalist aesthetic of the era, adding a touch of retro chic to any space.",
        price: 243,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 126,
          depth: 46,
          height: 50,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/2/120024760_f_clark_bn.jpg",
        ],
        stock: 17,
        material: "PVC Leather",
        colors: ["Brown"],
        ratings: {
          average: 4.6,
          count: 679,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:55:47.540691+00:00",
        updatedAt: "2025-01-10T11:55:47.540691+00:00",
      },
      {
        name: "PVC Long Chair CLARK/L 126x 46x50cm",
        description:
          "Sofas are more than just pieces of furniture; they are the heart of a living space, providing a haven for relaxation, a hub for social interaction, and a defining element of a room's style. They are where we unwind after a long day, gather with loved ones, entertain guests, and create lasting memories. From the plush embrace of a traditional sectional to the sleek lines of a modern loveseat, sofas offer a diverse range of forms, materials, and styles to suit any taste and lifestyle.\nThe world of sofas encompasses a vast array of styles, reflecting both historical influences and evolving design trends. Chesterfield sofas, with their deep button tufting, rolled arms, and luxurious leather upholstery, are iconic symbols of traditional elegance, evoking a sense of timeless sophistication. Lawson sofas, characterized by their clean lines, comfortable cushions, and tailored appearance, offer a more relaxed and versatile style that complements both traditional and contemporary interiors. Mid-century modern sofas, with their low profiles, tapered legs, and streamlined silhouettes, embody the minimalist aesthetic of the era, adding a touch of retro chic to any space.",
        price: 151,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 126,
          depth: 46,
          height: 50,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/2/120024759_f_clark_stool_gy.jpg",
        ],
        stock: 14,
        material: "PVC Leather",
        colors: ["Grey"],
        ratings: {
          average: 2.4,
          count: 66,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:55:50.061165+00:00",
        updatedAt: "2025-01-10T11:55:50.061165+00:00",
      },
      {
        name: "DOMINIC fabric L-shape sofa-bed/R GY",
        description:
          "Sofas are more than just pieces of furniture; they are the heart of a living space, providing a haven for relaxation, a hub for social interaction, and a defining element of a room's style. They are where we unwind after a long day, gather with loved ones, entertain guests, and create lasting memories. From the plush embrace of a traditional sectional to the sleek lines of a modern loveseat, sofas offer a diverse range of forms, materials, and styles to suit any taste and lifestyle.\nThe world of sofas encompasses a vast array of styles, reflecting both historical influences and evolving design trends. Chesterfield sofas, with their deep button tufting, rolled arms, and luxurious leather upholstery, are iconic symbols of traditional elegance, evoking a sense of timeless sophistication. Lawson sofas, characterized by their clean lines, comfortable cushions, and tailored appearance, offer a more relaxed and versatile style that complements both traditional and contemporary interiors. Mid-century modern sofas, with their low profiles, tapered legs, and streamlined silhouettes, embody the minimalist aesthetic of the era, adding a touch of retro chic to any space.",
        price: 912,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 255,
          depth: 167,
          height: 96,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/2/120023699_c_dominic_gy.jpg",
        ],
        stock: 5,
        material: "Polyester",
        colors: ["Grey"],
        ratings: {
          average: 2.9,
          count: 259,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:55:55.123950+00:00",
        updatedAt: "2025-01-10T11:55:55.123950+00:00",
      },
      {
        name: "DOMINIC fabric L-shape sofa-bed/L GY",
        description:
          "Sofas are more than just pieces of furniture; they are the heart of a living space, providing a haven for relaxation, a hub for social interaction, and a defining element of a room's style. They are where we unwind after a long day, gather with loved ones, entertain guests, and create lasting memories. From the plush embrace of a traditional sectional to the sleek lines of a modern loveseat, sofas offer a diverse range of forms, materials, and styles to suit any taste and lifestyle.\nThe world of sofas encompasses a vast array of styles, reflecting both historical influences and evolving design trends. Chesterfield sofas, with their deep button tufting, rolled arms, and luxurious leather upholstery, are iconic symbols of traditional elegance, evoking a sense of timeless sophistication. Lawson sofas, characterized by their clean lines, comfortable cushions, and tailored appearance, offer a more relaxed and versatile style that complements both traditional and contemporary interiors. Mid-century modern sofas, with their low profiles, tapered legs, and streamlined silhouettes, embody the minimalist aesthetic of the era, adding a touch of retro chic to any space.",
        price: 912,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 255,
          depth: 167,
          height: 96,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/2/120023696_f_dominic_gy.jpg",
        ],
        stock: 4,
        material: "Velvet",
        colors: ["Grey"],
        ratings: {
          average: 2.2,
          count: 90,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:55:57.635717+00:00",
        updatedAt: "2025-01-10T11:55:57.635717+00:00",
      },
      {
        name: "KLASSIKER Leather 3/S sofa BN",
        description:
          "Sofas are more than just pieces of furniture; they are the heart of a living space, providing a haven for relaxation, a hub for social interaction, and a defining element of a room's style. They are where we unwind after a long day, gather with loved ones, entertain guests, and create lasting memories. From the plush embrace of a traditional sectional to the sleek lines of a modern loveseat, sofas offer a diverse range of forms, materials, and styles to suit any taste and lifestyle.\nThe world of sofas encompasses a vast array of styles, reflecting both historical influences and evolving design trends. Chesterfield sofas, with their deep button tufting, rolled arms, and luxurious leather upholstery, are iconic symbols of traditional elegance, evoking a sense of timeless sophistication. Lawson sofas, characterized by their clean lines, comfortable cushions, and tailored appearance, offer a more relaxed and versatile style that complements both traditional and contemporary interiors. Mid-century modern sofas, with their low profiles, tapered legs, and streamlined silhouettes, embody the minimalist aesthetic of the era, adding a touch of retro chic to any space.",
        price: 1004,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 220,
          depth: 93,
          height: 73,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110032852-ghe-sofa-3-cho-klassiker-indexlivingmallvn_1.jpg",
        ],
        stock: 19,
        material: "Genuine Leather",
        colors: ["Brown"],
        ratings: {
          average: 3.1,
          count: 780,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:56:00.199837+00:00",
        updatedAt: "2025-01-10T11:56:00.199837+00:00",
      },
      {
        name: "MOMENTO H/L Electric recliner 3S LBN",
        description:
          "Sofas are more than just pieces of furniture; they are the heart of a living space, providing a haven for relaxation, a hub for social interaction, and a defining element of a room's style. They are where we unwind after a long day, gather with loved ones, entertain guests, and create lasting memories. From the plush embrace of a traditional sectional to the sleek lines of a modern loveseat, sofas offer a diverse range of forms, materials, and styles to suit any taste and lifestyle.\nThe world of sofas encompasses a vast array of styles, reflecting both historical influences and evolving design trends. Chesterfield sofas, with their deep button tufting, rolled arms, and luxurious leather upholstery, are iconic symbols of traditional elegance, evoking a sense of timeless sophistication. Lawson sofas, characterized by their clean lines, comfortable cushions, and tailored appearance, offer a more relaxed and versatile style that complements both traditional and contemporary interiors. Mid-century modern sofas, with their low profiles, tapered legs, and streamlined silhouettes, embody the minimalist aesthetic of the era, adding a touch of retro chic to any space.",
        price: 1460,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 203,
          depth: 98,
          height: 102,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110025269-ghe-sofa-doi-thu-gian-momento-indexlivingmallvn_02-photoroom.jpg",
        ],
        stock: 10,
        material: "Other Genuine Leather",
        colors: ["Light Brown"],
        ratings: {
          average: 3.8,
          count: 671,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:56:02.759414+00:00",
        updatedAt: "2025-01-10T11:56:02.759414+00:00",
      },
      {
        name: "MOMENTO H/L Electric recliner 1S LBN",
        description:
          "Sofas are more than just pieces of furniture; they are the heart of a living space, providing a haven for relaxation, a hub for social interaction, and a defining element of a room's style. They are where we unwind after a long day, gather with loved ones, entertain guests, and create lasting memories. From the plush embrace of a traditional sectional to the sleek lines of a modern loveseat, sofas offer a diverse range of forms, materials, and styles to suit any taste and lifestyle.\nThe world of sofas encompasses a vast array of styles, reflecting both historical influences and evolving design trends. Chesterfield sofas, with their deep button tufting, rolled arms, and luxurious leather upholstery, are iconic symbols of traditional elegance, evoking a sense of timeless sophistication. Lawson sofas, characterized by their clean lines, comfortable cushions, and tailored appearance, offer a more relaxed and versatile style that complements both traditional and contemporary interiors. Mid-century modern sofas, with their low profiles, tapered legs, and streamlined silhouettes, embody the minimalist aesthetic of the era, adding a touch of retro chic to any space.",
        price: 938,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 103,
          depth: 98,
          height: 102,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110025267-ghe-sofa-don-thu-gian-momento-indexlivingmallvn_01.jpg",
        ],
        stock: 20,
        material: "Other Genuine Leather",
        colors: ["Light Brown"],
        ratings: {
          average: 4.7,
          count: 675,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:56:05.336575+00:00",
        updatedAt: "2025-01-10T11:56:05.336575+00:00",
      },
      {
        name: "SOPRANO Half leather 1/S sofa BN",
        description:
          "Sofas are more than just pieces of furniture; they are the heart of a living space, providing a haven for relaxation, a hub for social interaction, and a defining element of a room's style. They are where we unwind after a long day, gather with loved ones, entertain guests, and create lasting memories. From the plush embrace of a traditional sectional to the sleek lines of a modern loveseat, sofas offer a diverse range of forms, materials, and styles to suit any taste and lifestyle.\nThe world of sofas encompasses a vast array of styles, reflecting both historical influences and evolving design trends. Chesterfield sofas, with their deep button tufting, rolled arms, and luxurious leather upholstery, are iconic symbols of traditional elegance, evoking a sense of timeless sophistication. Lawson sofas, characterized by their clean lines, comfortable cushions, and tailored appearance, offer a more relaxed and versatile style that complements both traditional and contemporary interiors. Mid-century modern sofas, with their low profiles, tapered legs, and streamlined silhouettes, embody the minimalist aesthetic of the era, adding a touch of retro chic to any space.",
        price: 521,
        discount: 0,
        categoryId: categories[1]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 123,
          depth: 101,
          height: 95,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110019724_ghe-sofa-don-soprano-indexlivingmallvn_1.jpg",
        ],
        stock: 13,
        material: "Other Genuine Leather",
        colors: ["Brown"],
        ratings: {
          average: 2.3,
          count: 44,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:56:07.908207+00:00",
        updatedAt: "2025-01-10T11:56:07.908207+00:00",
      },

      {
        name: "BALI Red Plastic Dining Chair 47.6x53.80x78.2cm",
        description:
          "Chairs, more than just functional pieces of furniture, are integral elements of interior design, seamlessly blending comfort, aesthetics, and practicality. They serve as fundamental components in shaping the character and ambiance of a space, whether it's a cozy living room, a bustling office, a formal dining area, or a tranquil bedroom retreat. Their diverse forms, materials, and styles reflect not only evolving design trends but also the unique personalities and needs of those who inhabit the space.\nFrom the sleek lines of contemporary minimalism to the ornate carvings of traditional craftsmanship, chairs offer an almost limitless array of stylistic expressions. The iconic Eames Lounge Chair, with its molded plywood and supple leather, embodies mid-century modern elegance, while a classic wingback chair, upholstered in rich fabric and featuring stately rolled arms, evokes a sense of timeless sophistication. Scandinavian designs emphasize simplicity and functionality with natural materials and clean lines, while industrial styles incorporate metal and distressed wood for a raw, urban aesthetic. Bohemian or eclectic spaces might feature a vibrant mix of colors, patterns, and textures, with chairs serving as focal points of artistic expression. Each chair, in essence, tells a story, contributing to the overall narrative of the room's design language",
        price: 28,
        discount: 0,
        categoryId: categories[2]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 47,
          depth: 53,
          height: 78,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/2/120025033_f_bali_rd.jpg",
        ],
        stock: 5,
        material: "Other Plastic",
        colors: ["Red"],
        ratings: {
          average: 0.1,
          count: 554,
        },
        status: "onStock",
        createdAt: "2025-01-10T10:55:26.664976+00:00",
        updatedAt: "2025-01-10T10:55:26.664976+00:00",
      },
      {
        name: "GRAHAM Synthetic Fiber Dining Chair 52x64.5x96cm",
        description:
          "Chairs, more than just functional pieces of furniture, are integral elements of interior design, seamlessly blending comfort, aesthetics, and practicality. They serve as fundamental components in shaping the character and ambiance of a space, whether it's a cozy living room, a bustling office, a formal dining area, or a tranquil bedroom retreat. Their diverse forms, materials, and styles reflect not only evolving design trends but also the unique personalities and needs of those who inhabit the space.\nFrom the sleek lines of contemporary minimalism to the ornate carvings of traditional craftsmanship, chairs offer an almost limitless array of stylistic expressions. The iconic Eames Lounge Chair, with its molded plywood and supple leather, embodies mid-century modern elegance, while a classic wingback chair, upholstered in rich fabric and featuring stately rolled arms, evokes a sense of timeless sophistication. Scandinavian designs emphasize simplicity and functionality with natural materials and clean lines, while industrial styles incorporate metal and distressed wood for a raw, urban aesthetic. Bohemian or eclectic spaces might feature a vibrant mix of colors, patterns, and textures, with chairs serving as focal points of artistic expression. Each chair, in essence, tells a story, contributing to the overall narrative of the room's design language",
        price: 136,
        discount: 0,
        categoryId: categories[2]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 92,
          depth: 55,
          height: 98,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110031559_3_.jpg",
        ],
        stock: 19,
        material: "Polyester",
        colors: ["Cream"],
        ratings: {
          average: 0.3,
          count: 434,
        },
        status: "onStock",
        createdAt: "2025-01-10T10:55:32.408937+00:00",
        updatedAt: "2025-01-10T10:55:32.408937+00:00",
      },
      {
        name: "RYKER/L Synthetic Fiber Dining Chair 52x65x100cm",
        description:
          "Chairs, more than just functional pieces of furniture, are integral elements of interior design, seamlessly blending comfort, aesthetics, and practicality. They serve as fundamental components in shaping the character and ambiance of a space, whether it's a cozy living room, a bustling office, a formal dining area, or a tranquil bedroom retreat. Their diverse forms, materials, and styles reflect not only evolving design trends but also the unique personalities and needs of those who inhabit the space.\nFrom the sleek lines of contemporary minimalism to the ornate carvings of traditional craftsmanship, chairs offer an almost limitless array of stylistic expressions. The iconic Eames Lounge Chair, with its molded plywood and supple leather, embodies mid-century modern elegance, while a classic wingback chair, upholstered in rich fabric and featuring stately rolled arms, evokes a sense of timeless sophistication. Scandinavian designs emphasize simplicity and functionality with natural materials and clean lines, while industrial styles incorporate metal and distressed wood for a raw, urban aesthetic. Bohemian or eclectic spaces might feature a vibrant mix of colors, patterns, and textures, with chairs serving as focal points of artistic expression. Each chair, in essence, tells a story, contributing to the overall narrative of the room's design language",
        price: 117,
        discount: 0,
        categoryId: categories[2]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 52,
          depth: 65,
          height: 100,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110031553-ghe-an-tua-lung-ryker-indexlivingmallvn_1.jpg",
        ],
        stock: 5,
        material: "Polyester",
        colors: ["Grey"],
        ratings: {
          average: 1.8,
          count: 796,
        },
        status: "onStock",
        createdAt: "2025-01-10T10:55:40.113013+00:00",
        updatedAt: "2025-01-10T10:55:40.113013+00:00",
      },
      {
        name: "PVC Dining Chair JULIA/P/L 56X51x83cm",
        description:
          "Chairs, more than just functional pieces of furniture, are integral elements of interior design, seamlessly blending comfort, aesthetics, and practicality. They serve as fundamental components in shaping the character and ambiance of a space, whether it's a cozy living room, a bustling office, a formal dining area, or a tranquil bedroom retreat. Their diverse forms, materials, and styles reflect not only evolving design trends but also the unique personalities and needs of those who inhabit the space.\nFrom the sleek lines of contemporary minimalism to the ornate carvings of traditional craftsmanship, chairs offer an almost limitless array of stylistic expressions. The iconic Eames Lounge Chair, with its molded plywood and supple leather, embodies mid-century modern elegance, while a classic wingback chair, upholstered in rich fabric and featuring stately rolled arms, evokes a sense of timeless sophistication. Scandinavian designs emphasize simplicity and functionality with natural materials and clean lines, while industrial styles incorporate metal and distressed wood for a raw, urban aesthetic. Bohemian or eclectic spaces might feature a vibrant mix of colors, patterns, and textures, with chairs serving as focal points of artistic expression. Each chair, in essence, tells a story, contributing to the overall narrative of the room's design language",
        price: 65,
        discount: 0,
        categoryId: categories[2]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 56,
          depth: 51,
          height: 83,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/2/120020430_1551241180378thji_2.jpg",
        ],
        stock: 20,
        material: "PVC Leather",
        colors: ["Black"],
        ratings: {
          average: 4.8,
          count: 541,
        },
        status: "onStock",
        createdAt: "2025-01-10T10:55:42.843890+00:00",
        updatedAt: "2025-01-10T10:55:42.843890+00:00",
      },
      {
        name: "SAVA/L PVC Dining Chair 43x60.5x100.5cm",
        description:
          "Chairs, more than just functional pieces of furniture, are integral elements of interior design, seamlessly blending comfort, aesthetics, and practicality. They serve as fundamental components in shaping the character and ambiance of a space, whether it's a cozy living room, a bustling office, a formal dining area, or a tranquil bedroom retreat. Their diverse forms, materials, and styles reflect not only evolving design trends but also the unique personalities and needs of those who inhabit the space.\nFrom the sleek lines of contemporary minimalism to the ornate carvings of traditional craftsmanship, chairs offer an almost limitless array of stylistic expressions. The iconic Eames Lounge Chair, with its molded plywood and supple leather, embodies mid-century modern elegance, while a classic wingback chair, upholstered in rich fabric and featuring stately rolled arms, evokes a sense of timeless sophistication. Scandinavian designs emphasize simplicity and functionality with natural materials and clean lines, while industrial styles incorporate metal and distressed wood for a raw, urban aesthetic. Bohemian or eclectic spaces might feature a vibrant mix of colors, patterns, and textures, with chairs serving as focal points of artistic expression. Each chair, in essence, tells a story, contributing to the overall narrative of the room's design language",
        price: 108,
        discount: 0,
        categoryId: categories[2]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 43,
          depth: 60,
          height: 100,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110033128-ghe-an-tua-lung-sava-l_-indexlivingmallvn_01.jpg",
        ],
        stock: 12,
        material: "PVC Leather",
        colors: ["Brown"],
        ratings: {
          average: 0.1,
          count: 814,
        },
        status: "onStock",
        createdAt: "2025-01-10T10:55:45.426456+00:00",
        updatedAt: "2025-01-10T10:55:45.426456+00:00",
      },
      {
        name: "MACYS/L Synthetic Fiber Dining Chair 62x61x83cm",
        description:
          "Chairs, more than just functional pieces of furniture, are integral elements of interior design, seamlessly blending comfort, aesthetics, and practicality. They serve as fundamental components in shaping the character and ambiance of a space, whether it's a cozy living room, a bustling office, a formal dining area, or a tranquil bedroom retreat. Their diverse forms, materials, and styles reflect not only evolving design trends but also the unique personalities and needs of those who inhabit the space.\nFrom the sleek lines of contemporary minimalism to the ornate carvings of traditional craftsmanship, chairs offer an almost limitless array of stylistic expressions. The iconic Eames Lounge Chair, with its molded plywood and supple leather, embodies mid-century modern elegance, while a classic wingback chair, upholstered in rich fabric and featuring stately rolled arms, evokes a sense of timeless sophistication. Scandinavian designs emphasize simplicity and functionality with natural materials and clean lines, while industrial styles incorporate metal and distressed wood for a raw, urban aesthetic. Bohemian or eclectic spaces might feature a vibrant mix of colors, patterns, and textures, with chairs serving as focal points of artistic expression. Each chair, in essence, tells a story, contributing to the overall narrative of the room's design language",
        price: 173,
        discount: 0,
        categoryId: categories[2]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 62,
          depth: 61,
          height: 83,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110031593-ghe-an-tua-lung-macys-indexlivingmallvn_1.jpg",
        ],
        stock: 6,
        material: "Polyester",
        colors: ["Blue"],
        ratings: {
          average: 2.4,
          count: 294,
        },
        status: "onStock",
        createdAt: "2025-01-10T10:55:47.977073+00:00",
        updatedAt: "2025-01-10T10:55:47.977073+00:00",
      },
      {
        name: "BETTINA Velvet Dining Chair/L 50x62x104cm",
        description:
          "Chairs, more than just functional pieces of furniture, are integral elements of interior design, seamlessly blending comfort, aesthetics, and practicality. They serve as fundamental components in shaping the character and ambiance of a space, whether it's a cozy living room, a bustling office, a formal dining area, or a tranquil bedroom retreat. Their diverse forms, materials, and styles reflect not only evolving design trends but also the unique personalities and needs of those who inhabit the space.\nFrom the sleek lines of contemporary minimalism to the ornate carvings of traditional craftsmanship, chairs offer an almost limitless array of stylistic expressions. The iconic Eames Lounge Chair, with its molded plywood and supple leather, embodies mid-century modern elegance, while a classic wingback chair, upholstered in rich fabric and featuring stately rolled arms, evokes a sense of timeless sophistication. Scandinavian designs emphasize simplicity and functionality with natural materials and clean lines, while industrial styles incorporate metal and distressed wood for a raw, urban aesthetic. Bohemian or eclectic spaces might feature a vibrant mix of colors, patterns, and textures, with chairs serving as focal points of artistic expression. Each chair, in essence, tells a story, contributing to the overall narrative of the room's design language",
        price: 86,
        discount: 0,
        categoryId: categories[2]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 50,
          depth: 62,
          height: 104,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110031550-ghe-an-tua-lung-bettina-indexlivingmallvn_1.jpg",
        ],
        stock: 5,
        material: "Velvet",
        colors: ["Dark Grey"],
        ratings: {
          average: 1.6,
          count: 83,
        },
        status: "onStock",
        createdAt: "2025-01-10T10:55:50.527667+00:00",
        updatedAt: "2025-01-10T10:55:50.527667+00:00",
      },
      {
        name: "BETTINA Velvet Dining Chair/L 50x62x104cm",
        description:
          "Chairs, more than just functional pieces of furniture, are integral elements of interior design, seamlessly blending comfort, aesthetics, and practicality. They serve as fundamental components in shaping the character and ambiance of a space, whether it's a cozy living room, a bustling office, a formal dining area, or a tranquil bedroom retreat. Their diverse forms, materials, and styles reflect not only evolving design trends but also the unique personalities and needs of those who inhabit the space.\nFrom the sleek lines of contemporary minimalism to the ornate carvings of traditional craftsmanship, chairs offer an almost limitless array of stylistic expressions. The iconic Eames Lounge Chair, with its molded plywood and supple leather, embodies mid-century modern elegance, while a classic wingback chair, upholstered in rich fabric and featuring stately rolled arms, evokes a sense of timeless sophistication. Scandinavian designs emphasize simplicity and functionality with natural materials and clean lines, while industrial styles incorporate metal and distressed wood for a raw, urban aesthetic. Bohemian or eclectic spaces might feature a vibrant mix of colors, patterns, and textures, with chairs serving as focal points of artistic expression. Each chair, in essence, tells a story, contributing to the overall narrative of the room's design language",
        price: 86,
        discount: 0,
        categoryId: categories[2]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 50,
          depth: 62,
          height: 104,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110031549-ghe-an-tua-lung-bettina-indexlivingmallvn_1.jpg",
        ],
        stock: 16,
        material: "Velvet",
        colors: ["Brown"],
        ratings: {
          average: 0.8,
          count: 189,
        },
        status: "onStock",
        createdAt: "2025-01-10T10:55:53.188646+00:00",
        updatedAt: "2025-01-10T10:55:53.188646+00:00",
      },
      {
        name: "LANA/L Rubber Wood Dining Chair 51x65x105cm",
        description:
          "Chairs, more than just functional pieces of furniture, are integral elements of interior design, seamlessly blending comfort, aesthetics, and practicality. They serve as fundamental components in shaping the character and ambiance of a space, whether it's a cozy living room, a bustling office, a formal dining area, or a tranquil bedroom retreat. Their diverse forms, materials, and styles reflect not only evolving design trends but also the unique personalities and needs of those who inhabit the space.\nFrom the sleek lines of contemporary minimalism to the ornate carvings of traditional craftsmanship, chairs offer an almost limitless array of stylistic expressions. The iconic Eames Lounge Chair, with its molded plywood and supple leather, embodies mid-century modern elegance, while a classic wingback chair, upholstered in rich fabric and featuring stately rolled arms, evokes a sense of timeless sophistication. Scandinavian designs emphasize simplicity and functionality with natural materials and clean lines, while industrial styles incorporate metal and distressed wood for a raw, urban aesthetic. Bohemian or eclectic spaces might feature a vibrant mix of colors, patterns, and textures, with chairs serving as focal points of artistic expression. Each chair, in essence, tells a story, contributing to the overall narrative of the room's design language",
        price: 136,
        discount: 0,
        categoryId: categories[2]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 51,
          depth: 65,
          height: 105,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110031548-ghe-an-tua-lung-lana-indexlivingmallvn_1.jpg",
        ],
        stock: 8,
        material: "Rubber",
        colors: ["Dark Brown"],
        ratings: {
          average: 2.9,
          count: 956,
        },
        status: "onStock",
        createdAt: "2025-01-10T10:55:56.063204+00:00",
        updatedAt: "2025-01-10T10:55:56.063204+00:00",
      },
      {
        name: "PVC Dining Chair MARZIA/L 47x56x107cm",
        description:
          "Chairs, more than just functional pieces of furniture, are integral elements of interior design, seamlessly blending comfort, aesthetics, and practicality. They serve as fundamental components in shaping the character and ambiance of a space, whether it's a cozy living room, a bustling office, a formal dining area, or a tranquil bedroom retreat. Their diverse forms, materials, and styles reflect not only evolving design trends but also the unique personalities and needs of those who inhabit the space.\nFrom the sleek lines of contemporary minimalism to the ornate carvings of traditional craftsmanship, chairs offer an almost limitless array of stylistic expressions. The iconic Eames Lounge Chair, with its molded plywood and supple leather, embodies mid-century modern elegance, while a classic wingback chair, upholstered in rich fabric and featuring stately rolled arms, evokes a sense of timeless sophistication. Scandinavian designs emphasize simplicity and functionality with natural materials and clean lines, while industrial styles incorporate metal and distressed wood for a raw, urban aesthetic. Bohemian or eclectic spaces might feature a vibrant mix of colors, patterns, and textures, with chairs serving as focal points of artistic expression. Each chair, in essence, tells a story, contributing to the overall narrative of the room's design language",
        price: 119,
        discount: 0,
        categoryId: categories[2]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 47,
          depth: 56,
          height: 107,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110027514-ghe-an-marzia-indexlivingmallvn_1.jpg",
        ],
        stock: 8,
        material: "PVC Leather",
        colors: ["White"],
        ratings: {
          average: 1.8,
          count: 354,
        },
        status: "onStock",
        createdAt: "2025-01-10T10:55:58.725395+00:00",
        updatedAt: "2025-01-10T10:55:58.725395+00:00",
      },

      {
        name: "NARA Wardrobe 120cm. WN",
        description:
          "Shelves and cabinets, often working in tandem, are the unsung heroes of interior design, providing essential structure for organization, storage, and the display of cherished possessions. They are the foundational elements that transform clutter into curated collections, maximizing space utilization while simultaneously contributing to the aesthetic character of a room. From the sleek minimalism of floating shelves to the stately presence of antique cabinets, these pieces offer a diverse range of styles and functionalities to suit any design vision.\nShelves, in their simplest form, are horizontal surfaces that provide an open platform for displaying objects. Their versatility lies in their ability to adapt to various needs and spaces. Floating shelves, seemingly suspended in mid-air, create a clean, contemporary look, perfect for showcasing artwork, books, or decorative items without the visual weight of traditional brackets. Built-in shelves, integrated seamlessly into walls, offer a customized storage solution, often used to create libraries, display collections, or maximize space in alcoves and niches. Freestanding shelving units, ranging from simple etageres to elaborate modular systems, provide flexibility and portability, allowing for easy rearrangement and adaptation as needs evolve",
        price: 975,
        discount: 0,
        categoryId: categories[3]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 120,
          depth: 57,
          height: 200,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110042213_f_nara_120cm_wn.jpg",
        ],
        stock: 3,
        material: "Rubber",
        colors: ["Walnut"],
        ratings: {
          average: 4.8,
          count: 823,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:31:19.767808+00:00",
        updatedAt: "2025-01-10T11:31:19.767808+00:00",
      },
      {
        name: "TAKAYAMA SOLID WOOD WARDROBE120 LTK",
        description:
          "Shelves and cabinets, often working in tandem, are the unsung heroes of interior design, providing essential structure for organization, storage, and the display of cherished possessions. They are the foundational elements that transform clutter into curated collections, maximizing space utilization while simultaneously contributing to the aesthetic character of a room. From the sleek minimalism of floating shelves to the stately presence of antique cabinets, these pieces offer a diverse range of styles and functionalities to suit any design vision.\nShelves, in their simplest form, are horizontal surfaces that provide an open platform for displaying objects. Their versatility lies in their ability to adapt to various needs and spaces. Floating shelves, seemingly suspended in mid-air, create a clean, contemporary look, perfect for showcasing artwork, books, or decorative items without the visual weight of traditional brackets. Built-in shelves, integrated seamlessly into walls, offer a customized storage solution, often used to create libraries, display collections, or maximize space in alcoves and niches. Freestanding shelving units, ranging from simple etageres to elaborate modular systems, provide flexibility and portability, allowing for easy rearrangement and adaptation as needs evolve",
        price: 416,
        discount: 0,
        categoryId: categories[3]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 45,
          depth: 120,
          height: 200,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/2/120024999_1689671860151ahgt.jpg",
        ],
        stock: 6,
        material: "Rubber",
        colors: ["Natural Teak"],
        ratings: {
          average: 4.4,
          count: 798,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:31:22.346480+00:00",
        updatedAt: "2025-01-10T11:31:22.346480+00:00",
      },
      {
        name: "HAPPY VACATION Wardrobe 120cm. WW",
        description:
          "Shelves and cabinets, often working in tandem, are the unsung heroes of interior design, providing essential structure for organization, storage, and the display of cherished possessions. They are the foundational elements that transform clutter into curated collections, maximizing space utilization while simultaneously contributing to the aesthetic character of a room. From the sleek minimalism of floating shelves to the stately presence of antique cabinets, these pieces offer a diverse range of styles and functionalities to suit any design vision.\nShelves, in their simplest form, are horizontal surfaces that provide an open platform for displaying objects. Their versatility lies in their ability to adapt to various needs and spaces. Floating shelves, seemingly suspended in mid-air, create a clean, contemporary look, perfect for showcasing artwork, books, or decorative items without the visual weight of traditional brackets. Built-in shelves, integrated seamlessly into walls, offer a customized storage solution, often used to create libraries, display collections, or maximize space in alcoves and niches. Freestanding shelving units, ranging from simple etageres to elaborate modular systems, provide flexibility and portability, allowing for easy rearrangement and adaptation as needs evolve",
        price: 347,
        discount: 0,
        categoryId: categories[3]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 122,
          depth: 339,
          height: 33,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110041281_happy_vacation_3.jpg",
        ],
        stock: 17,
        material: "Rubber",
        colors: ["White"],
        ratings: {
          average: 3.9,
          count: 610,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:31:27.499477+00:00",
        updatedAt: "2025-01-10T11:31:27.499477+00:00",
      },
      {
        name: "ARISTO Chest 3drawers 84cm. BK/DGY",
        description:
          "Shelves and cabinets, often working in tandem, are the unsung heroes of interior design, providing essential structure for organization, storage, and the display of cherished possessions. They are the foundational elements that transform clutter into curated collections, maximizing space utilization while simultaneously contributing to the aesthetic character of a room. From the sleek minimalism of floating shelves to the stately presence of antique cabinets, these pieces offer a diverse range of styles and functionalities to suit any design vision.\nShelves, in their simplest form, are horizontal surfaces that provide an open platform for displaying objects. Their versatility lies in their ability to adapt to various needs and spaces. Floating shelves, seemingly suspended in mid-air, create a clean, contemporary look, perfect for showcasing artwork, books, or decorative items without the visual weight of traditional brackets. Built-in shelves, integrated seamlessly into walls, offer a customized storage solution, often used to create libraries, display collections, or maximize space in alcoves and niches. Freestanding shelving units, ranging from simple etageres to elaborate modular systems, provide flexibility and portability, allowing for easy rearrangement and adaptation as needs evolve",
        price: 216,
        discount: 0,
        categoryId: categories[3]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 47,
          depth: 84,
          height: 75,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110041154_f_aristo_bk_dgy.jpg",
        ],
        stock: 3,
        material: "Particle  board",
        colors: ["Black"],
        ratings: {
          average: 4.7,
          count: 816,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:31:30.189481+00:00",
        updatedAt: "2025-01-10T11:31:30.189481+00:00",
      },
      {
        name: "BRONX PLUS Wardrobe 4 doors DGY#01",
        description:
          "Shelves and cabinets, often working in tandem, are the unsung heroes of interior design, providing essential structure for organization, storage, and the display of cherished possessions. They are the foundational elements that transform clutter into curated collections, maximizing space utilization while simultaneously contributing to the aesthetic character of a room. From the sleek minimalism of floating shelves to the stately presence of antique cabinets, these pieces offer a diverse range of styles and functionalities to suit any design vision.\nShelves, in their simplest form, are horizontal surfaces that provide an open platform for displaying objects. Their versatility lies in their ability to adapt to various needs and spaces. Floating shelves, seemingly suspended in mid-air, create a clean, contemporary look, perfect for showcasing artwork, books, or decorative items without the visual weight of traditional brackets. Built-in shelves, integrated seamlessly into walls, offer a customized storage solution, often used to create libraries, display collections, or maximize space in alcoves and niches. Freestanding shelving units, ranging from simple etageres to elaborate modular systems, provide flexibility and portability, allowing for easy rearrangement and adaptation as needs evolve",
        price: 782,
        discount: 0,
        categoryId: categories[3]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 57,
          depth: 200,
          height: 230,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110040869_bronx_plus.jpg",
        ],
        stock: 7,
        material: "Particle  board",
        colors: ["Dark Grey"],
        ratings: {
          average: 1.3,
          count: 577,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:31:32.984697+00:00",
        updatedAt: "2025-01-10T11:31:32.984697+00:00",
      },
      {
        name: "HAZE Chest 3drawers 80cm.  LGY",
        description:
          "Shelves and cabinets, often working in tandem, are the unsung heroes of interior design, providing essential structure for organization, storage, and the display of cherished possessions. They are the foundational elements that transform clutter into curated collections, maximizing space utilization while simultaneously contributing to the aesthetic character of a room. From the sleek minimalism of floating shelves to the stately presence of antique cabinets, these pieces offer a diverse range of styles and functionalities to suit any design vision.\nShelves, in their simplest form, are horizontal surfaces that provide an open platform for displaying objects. Their versatility lies in their ability to adapt to various needs and spaces. Floating shelves, seemingly suspended in mid-air, create a clean, contemporary look, perfect for showcasing artwork, books, or decorative items without the visual weight of traditional brackets. Built-in shelves, integrated seamlessly into walls, offer a customized storage solution, often used to create libraries, display collections, or maximize space in alcoves and niches. Freestanding shelving units, ranging from simple etageres to elaborate modular systems, provide flexibility and portability, allowing for easy rearrangement and adaptation as needs evolve",
        price: 173,
        discount: 0,
        categoryId: categories[3]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 39,
          depth: 80,
          height: 75,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/1/110037923_haze_1.jpeg",
        ],
        stock: 6,
        material: "Particle  board",
        colors: ["Light Grey"],
        ratings: {
          average: 1.2,
          count: 722,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:31:35.520617+00:00",
        updatedAt: "2025-01-10T11:31:35.520617+00:00",
      },
      {
        name: "FASH 3D+Drawer NT",
        description:
          "Shelves and cabinets, often working in tandem, are the unsung heroes of interior design, providing essential structure for organization, storage, and the display of cherished possessions. They are the foundational elements that transform clutter into curated collections, maximizing space utilization while simultaneously contributing to the aesthetic character of a room. From the sleek minimalism of floating shelves to the stately presence of antique cabinets, these pieces offer a diverse range of styles and functionalities to suit any design vision.\nShelves, in their simplest form, are horizontal surfaces that provide an open platform for displaying objects. Their versatility lies in their ability to adapt to various needs and spaces. Floating shelves, seemingly suspended in mid-air, create a clean, contemporary look, perfect for showcasing artwork, books, or decorative items without the visual weight of traditional brackets. Built-in shelves, integrated seamlessly into walls, offer a customized storage solution, often used to create libraries, display collections, or maximize space in alcoves and niches. Freestanding shelving units, ranging from simple etageres to elaborate modular systems, provide flexibility and portability, allowing for easy rearrangement and adaptation as needs evolve",
        price: 173,
        discount: 0,
        categoryId: categories[3]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 55,
          depth: 120,
          height: 180,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/3/7/370000249_f_fash_120cm_nt_.jpg",
        ],
        stock: 12,
        material: "Particle  board",
        colors: ["Natural"],
        ratings: {
          average: 3.6,
          count: 271,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:31:38.072756+00:00",
        updatedAt: "2025-01-10T11:31:38.072756+00:00",
      },
      {
        name: "FEST 2 Doors Wardrobe NT",
        description:
          "Shelves and cabinets, often working in tandem, are the unsung heroes of interior design, providing essential structure for organization, storage, and the display of cherished possessions. They are the foundational elements that transform clutter into curated collections, maximizing space utilization while simultaneously contributing to the aesthetic character of a room. From the sleek minimalism of floating shelves to the stately presence of antique cabinets, these pieces offer a diverse range of styles and functionalities to suit any design vision.\nShelves, in their simplest form, are horizontal surfaces that provide an open platform for displaying objects. Their versatility lies in their ability to adapt to various needs and spaces. Floating shelves, seemingly suspended in mid-air, create a clean, contemporary look, perfect for showcasing artwork, books, or decorative items without the visual weight of traditional brackets. Built-in shelves, integrated seamlessly into walls, offer a customized storage solution, often used to create libraries, display collections, or maximize space in alcoves and niches. Freestanding shelving units, ranging from simple etageres to elaborate modular systems, provide flexibility and portability, allowing for easy rearrangement and adaptation as needs evolve",
        price: 173,
        discount: 0,
        categoryId: categories[3]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 55,
          depth: 120,
          height: 180,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/3/7/370000246_c_fest_120cm_nt.jpg",
        ],
        stock: 5,
        material: "Particle  board",
        colors: ["Natural"],
        ratings: {
          average: 2.7,
          count: 667,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:31:40.592051+00:00",
        updatedAt: "2025-01-10T11:31:40.592051+00:00",
      },
      {
        name: "SANTORINI Chest of 6 drawers WT",
        description:
          "Shelves and cabinets, often working in tandem, are the unsung heroes of interior design, providing essential structure for organization, storage, and the display of cherished possessions. They are the foundational elements that transform clutter into curated collections, maximizing space utilization while simultaneously contributing to the aesthetic character of a room. From the sleek minimalism of floating shelves to the stately presence of antique cabinets, these pieces offer a diverse range of styles and functionalities to suit any design vision.\nShelves, in their simplest form, are horizontal surfaces that provide an open platform for displaying objects. Their versatility lies in their ability to adapt to various needs and spaces. Floating shelves, seemingly suspended in mid-air, create a clean, contemporary look, perfect for showcasing artwork, books, or decorative items without the visual weight of traditional brackets. Built-in shelves, integrated seamlessly into walls, offer a customized storage solution, often used to create libraries, display collections, or maximize space in alcoves and niches. Freestanding shelving units, ranging from simple etageres to elaborate modular systems, provide flexibility and portability, allowing for easy rearrangement and adaptation as needs evolve",
        price: 451,
        discount: 0,
        categoryId: categories[3]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 43,
          depth: 160,
          height: 81,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/i/m/image_7.jpg",
        ],
        stock: 15,
        material: "Particle  board",
        colors: ["White"],
        ratings: {
          average: 2.5,
          count: 615,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:31:43.191507+00:00",
        updatedAt: "2025-01-10T11:31:43.191507+00:00",
      },
      {
        name: "SANTORINI Chest of 3 drawers WT",
        description:
          "Shelves and cabinets, often working in tandem, are the unsung heroes of interior design, providing essential structure for organization, storage, and the display of cherished possessions. They are the foundational elements that transform clutter into curated collections, maximizing space utilization while simultaneously contributing to the aesthetic character of a room. From the sleek minimalism of floating shelves to the stately presence of antique cabinets, these pieces offer a diverse range of styles and functionalities to suit any design vision.\nShelves, in their simplest form, are horizontal surfaces that provide an open platform for displaying objects. Their versatility lies in their ability to adapt to various needs and spaces. Floating shelves, seemingly suspended in mid-air, create a clean, contemporary look, perfect for showcasing artwork, books, or decorative items without the visual weight of traditional brackets. Built-in shelves, integrated seamlessly into walls, offer a customized storage solution, often used to create libraries, display collections, or maximize space in alcoves and niches. Freestanding shelving units, ranging from simple etageres to elaborate modular systems, provide flexibility and portability, allowing for easy rearrangement and adaptation as needs evolve",
        price: 225,
        discount: 0,
        categoryId: categories[3]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 43,
          depth: 86,
          height: 81,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/2/120024596_f_santorini_wt.jpg",
        ],
        stock: 7,
        material: "Particle  board",
        colors: ["White"],
        ratings: {
          average: 0.1,
          count: 593,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:31:45.752279+00:00",
        updatedAt: "2025-01-10T11:31:45.752279+00:00",
      },

      {
        name: "CRYSTALANA TABLE LAMP GD/WT",
        description:
          "Decorative lamps are more than just sources of light; they are essential design elements that contribute to the mood, character, and aesthetic appeal of a space. They are the jewels of interior design, casting a warm glow, highlighting architectural features, and adding a touch of personality and artistry. From the soft, diffused light of a table lamp to the dramatic statement of a chandelier, decorative lamps offer a diverse range of styles, materials, and illumination techniques to transform any room.\nThe world of decorative lamps encompasses a vast spectrum of styles, reflecting both historical influences and contemporary design trends. Tiffany lamps, with their intricate stained-glass shades, are iconic examples of Art Nouveau craftsmanship, adding a touch of vintage charm and vibrant color. Mid-century modern lamps, characterized by their clean lines, geometric shapes, and innovative use of materials, embody the sleek aesthetic of the era. Industrial-style lamps, often incorporating exposed bulbs, metal pipes, and distressed finishes, bring a raw, urban edge to a space. Art Deco lamps, with their bold geometric patterns and luxurious materials like chrome and glass, evoke the glamour and sophistication of the 1920s and 30s.",
        price: 91,
        discount: 0,
        categoryId: categories[4]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 37,
          depth: 37,
          height: 60,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/7/170132830---crystalana.jpg",
        ],
        stock: 8,
        material: "Iron",
        colors: ["Gold"],
        ratings: {
          average: 1.9,
          count: 17,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:48:51.834983+00:00",
        updatedAt: "2025-01-10T11:48:51.834983+00:00",
      },
      {
        name: "TYROLA TABLE LAMP SV",
        description:
          "Decorative lamps are more than just sources of light; they are essential design elements that contribute to the mood, character, and aesthetic appeal of a space. They are the jewels of interior design, casting a warm glow, highlighting architectural features, and adding a touch of personality and artistry. From the soft, diffused light of a table lamp to the dramatic statement of a chandelier, decorative lamps offer a diverse range of styles, materials, and illumination techniques to transform any room.\nThe world of decorative lamps encompasses a vast spectrum of styles, reflecting both historical influences and contemporary design trends. Tiffany lamps, with their intricate stained-glass shades, are iconic examples of Art Nouveau craftsmanship, adding a touch of vintage charm and vibrant color. Mid-century modern lamps, characterized by their clean lines, geometric shapes, and innovative use of materials, embody the sleek aesthetic of the era. Industrial-style lamps, often incorporating exposed bulbs, metal pipes, and distressed finishes, bring a raw, urban edge to a space. Art Deco lamps, with their bold geometric patterns and luxurious materials like chrome and glass, evoke the glamour and sophistication of the 1920s and 30s.",
        price: 91,
        discount: 0,
        categoryId: categories[4]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 31,
          depth: 53,
          height: 68,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/7/170106355_1533632720506xdrk_2.jpg",
        ],
        stock: 16,
        material: "Painted glass",
        colors: ["Silver"],
        ratings: {
          average: 3.3,
          count: 132,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:48:54.466527+00:00",
        updatedAt: "2025-01-10T11:48:54.466527+00:00",
      },
      {
        name: "ILLUME Table lamp BK",
        description:
          "Decorative lamps are more than just sources of light; they are essential design elements that contribute to the mood, character, and aesthetic appeal of a space. They are the jewels of interior design, casting a warm glow, highlighting architectural features, and adding a touch of personality and artistry. From the soft, diffused light of a table lamp to the dramatic statement of a chandelier, decorative lamps offer a diverse range of styles, materials, and illumination techniques to transform any room.\nThe world of decorative lamps encompasses a vast spectrum of styles, reflecting both historical influences and contemporary design trends. Tiffany lamps, with their intricate stained-glass shades, are iconic examples of Art Nouveau craftsmanship, adding a touch of vintage charm and vibrant color. Mid-century modern lamps, characterized by their clean lines, geometric shapes, and innovative use of materials, embody the sleek aesthetic of the era. Industrial-style lamps, often incorporating exposed bulbs, metal pipes, and distressed finishes, bring a raw, urban edge to a space. Art Deco lamps, with their bold geometric patterns and luxurious materials like chrome and glass, evoke the glamour and sophistication of the 1920s and 30s.",
        price: 24,
        discount: 0,
        categoryId: categories[4]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 13,
          depth: 13,
          height: 32,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/7/170090272_1.jpg",
        ],
        stock: 18,
        material: "Iron",
        colors: ["Black"],
        ratings: {
          average: 3.6,
          count: 71,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:48:57.040236+00:00",
        updatedAt: "2025-01-10T11:48:57.040236+00:00",
      },
      {
        name: "AVIANNA Floor lamp D39xH149cm. WT/GD",
        description:
          "Decorative lamps are more than just sources of light; they are essential design elements that contribute to the mood, character, and aesthetic appeal of a space. They are the jewels of interior design, casting a warm glow, highlighting architectural features, and adding a touch of personality and artistry. From the soft, diffused light of a table lamp to the dramatic statement of a chandelier, decorative lamps offer a diverse range of styles, materials, and illumination techniques to transform any room.\nThe world of decorative lamps encompasses a vast spectrum of styles, reflecting both historical influences and contemporary design trends. Tiffany lamps, with their intricate stained-glass shades, are iconic examples of Art Nouveau craftsmanship, adding a touch of vintage charm and vibrant color. Mid-century modern lamps, characterized by their clean lines, geometric shapes, and innovative use of materials, embody the sleek aesthetic of the era. Industrial-style lamps, often incorporating exposed bulbs, metal pipes, and distressed finishes, bring a raw, urban edge to a space. Art Deco lamps, with their bold geometric patterns and luxurious materials like chrome and glass, evoke the glamour and sophistication of the 1920s and 30s.",
        price: 139,
        discount: 0,
        categoryId: categories[4]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 39,
          depth: 39,
          height: 149,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/7/170110679.jpg",
        ],
        stock: 4,
        material: "Natural Stone",
        colors: ["White"],
        ratings: {
          average: 0.1,
          count: 489,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:48:59.692631+00:00",
        updatedAt: "2025-01-10T11:48:59.692631+00:00",
      },
      {
        name: "ROKSIDA Pendant BK",
        description:
          "Decorative lamps are more than just sources of light; they are essential design elements that contribute to the mood, character, and aesthetic appeal of a space. They are the jewels of interior design, casting a warm glow, highlighting architectural features, and adding a touch of personality and artistry. From the soft, diffused light of a table lamp to the dramatic statement of a chandelier, decorative lamps offer a diverse range of styles, materials, and illumination techniques to transform any room.\nThe world of decorative lamps encompasses a vast spectrum of styles, reflecting both historical influences and contemporary design trends. Tiffany lamps, with their intricate stained-glass shades, are iconic examples of Art Nouveau craftsmanship, adding a touch of vintage charm and vibrant color. Mid-century modern lamps, characterized by their clean lines, geometric shapes, and innovative use of materials, embody the sleek aesthetic of the era. Industrial-style lamps, often incorporating exposed bulbs, metal pipes, and distressed finishes, bring a raw, urban edge to a space. Art Deco lamps, with their bold geometric patterns and luxurious materials like chrome and glass, evoke the glamour and sophistication of the 1920s and 30s.",
        price: 78,
        discount: 0,
        categoryId: categories[4]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 75,
          depth: 24,
          height: 135,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/7/170104851_1.jpg",
        ],
        stock: 15,
        material: "Iron",
        colors: ["Black"],
        ratings: {
          average: 1.4,
          count: 957,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:49:02.254386+00:00",
        updatedAt: "2025-01-10T11:49:02.254386+00:00",
      },
      {
        name: "TRIOZA Pendant BK",
        description:
          "Decorative lamps are more than just sources of light; they are essential design elements that contribute to the mood, character, and aesthetic appeal of a space. They are the jewels of interior design, casting a warm glow, highlighting architectural features, and adding a touch of personality and artistry. From the soft, diffused light of a table lamp to the dramatic statement of a chandelier, decorative lamps offer a diverse range of styles, materials, and illumination techniques to transform any room.\nThe world of decorative lamps encompasses a vast spectrum of styles, reflecting both historical influences and contemporary design trends. Tiffany lamps, with their intricate stained-glass shades, are iconic examples of Art Nouveau craftsmanship, adding a touch of vintage charm and vibrant color. Mid-century modern lamps, characterized by their clean lines, geometric shapes, and innovative use of materials, embody the sleek aesthetic of the era. Industrial-style lamps, often incorporating exposed bulbs, metal pipes, and distressed finishes, bring a raw, urban edge to a space. Art Deco lamps, with their bold geometric patterns and luxurious materials like chrome and glass, evoke the glamour and sophistication of the 1920s and 30s.",
        price: 60,
        discount: 0,
        categoryId: categories[4]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 76,
          depth: 27,
          height: 105,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/7/170100543_1.jpg",
        ],
        stock: 16,
        material: "Iron",
        colors: ["Black"],
        ratings: {
          average: 0.5,
          count: 768,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:49:05.043179+00:00",
        updatedAt: "2025-01-10T11:49:05.043179+00:00",
      },
      {
        name: "ILLUME Table Lamp SV",
        description:
          "Decorative lamps are more than just sources of light; they are essential design elements that contribute to the mood, character, and aesthetic appeal of a space. They are the jewels of interior design, casting a warm glow, highlighting architectural features, and adding a touch of personality and artistry. From the soft, diffused light of a table lamp to the dramatic statement of a chandelier, decorative lamps offer a diverse range of styles, materials, and illumination techniques to transform any room.\nThe world of decorative lamps encompasses a vast spectrum of styles, reflecting both historical influences and contemporary design trends. Tiffany lamps, with their intricate stained-glass shades, are iconic examples of Art Nouveau craftsmanship, adding a touch of vintage charm and vibrant color. Mid-century modern lamps, characterized by their clean lines, geometric shapes, and innovative use of materials, embody the sleek aesthetic of the era. Industrial-style lamps, often incorporating exposed bulbs, metal pipes, and distressed finishes, bring a raw, urban edge to a space. Art Deco lamps, with their bold geometric patterns and luxurious materials like chrome and glass, evoke the glamour and sophistication of the 1920s and 30s.",
        price: 20,
        discount: 0,
        categoryId: categories[4]._id,
        brand: "Index Living Mall",
        dimensions: {
          width: 13,
          depth: 13,
          height: 32,
        },
        imageUrl: [
          "https://indexlivingmallvn.com/media/catalog/product/cache/31b97d86bb13aa87aea6547a93559187/1/7/170066983_6_1.jpg",
        ],
        stock: 12,
        material: "Iron",
        colors: ["Silver"],
        ratings: {
          average: 2.2,
          count: 660,
        },
        status: "onStock",
        createdAt: "2025-01-10T11:49:07.797765+00:00",
        updatedAt: "2025-01-10T11:49:07.797765+00:00",
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
