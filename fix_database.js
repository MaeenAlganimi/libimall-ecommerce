import { Pool } from "pg";

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "e-commerce",
  password: "maeen2005",
  port: 5432,
});

async function fixDatabase() {
  try {
    // Check current table structure
    console.log("Checking current table structure...");
    const tableInfo = await pool.query(`
      SELECT column_name, data_type, character_maximum_length
      FROM information_schema.columns
      WHERE table_name = 'user info'
      ORDER BY ordinal_position;
    `);
    
    console.log("Current table structure:");
    tableInfo.rows.forEach(row => {
      console.log(`- ${row.column_name}: ${row.data_type}${row.character_maximum_length ? `(${row.character_maximum_length})` : ''}`);
    });
    
    // Fix the password column type
    console.log("\nAltering password column to VARCHAR(200)...");
    await pool.query(`ALTER TABLE "user info" ALTER COLUMN password TYPE VARCHAR(200);`);
    
    console.log("Password column type changed successfully!");
    
    // Verify the change
    console.log("\nVerifying the change...");
    const updatedInfo = await pool.query(`
      SELECT column_name, data_type, character_maximum_length
      FROM information_schema.columns
      WHERE table_name = 'user info' AND column_name = 'password';
    `);
    
    console.log("Updated password column info:");
    updatedInfo.rows.forEach(row => {
      console.log(`- ${row.column_name}: ${row.data_type}${row.character_maximum_length ? `(${row.character_maximum_length})` : ''}`);
    });
    
    // Test inserting a bcrypt hash
    console.log("\nTesting bcrypt hash insertion...");
    const testHash = "$2b$10$5MsxamCz/LwaEBRUen8.T.hy5WK6LFpRbuoTzvUGEGeEALFlgIpwC";
    
    try {
      await pool.query(
        `INSERT INTO "user info" (email, password) VALUES ($1, $2) RETURNING id, email`,
        ["test@example.com", testHash]
      );
      console.log("✓ Test insertion successful!");
      
      // Clean up test data
      await pool.query(`DELETE FROM "user info" WHERE email = $1`, ["test@example.com"]);
      console.log("✓ Test data cleaned up");
      
    } catch (testError) {
      console.log("✗ Test insertion failed:", testError.message);
    }
    
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Full error:", error);
  } finally {
    await pool.end();
  }
}

fixDatabase();
