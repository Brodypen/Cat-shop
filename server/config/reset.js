import { pool } from "./database.js";
import dotenv from "./dotenv.js";
import giftData from "../data/gifts.js";

const createGiftsTable = async () => {
const createTableQuery = `
    DROP TABLE IF EXISTS gifts;

    CREATE TABLE IF NOT EXISTS gifts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        tags VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        submitted_by VARCHAR(255) NOT NULL,
        submitted_on DATE NOT NULL
    )


`;

try {
  const res = await pool.query(createTableQuery);
  console.log("Table created successfully!");
} catch (err) {
  console.log(err);
}
};

const seedGiftsTable = async () => {
  await createGiftsTable();
  giftData.forEach((gift) => {
    const insertGiftQuery = {
      text: "INSERT INTO gifts (name, age, tags, image, description, submitted_by, submitted_on) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    };
    const values = [
      gift.name,
      gift.age,
      gift.tags,
      gift.image,
      gift.description,
      gift.submittedBy,
      gift.submittedOn,
    ];

    pool.query(insertGiftQuery, values, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("Inserted gift into table");
      }
    });
  });
};

seedGiftsTable();
