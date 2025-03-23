import { Pool } from "pg";
import { Note } from "../../types/note";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.GCP_DB_USER || process.env.LOCAL_DB_DB_USER,
  host: process.env.GCP_DB_HOST || process.env.LOCAL_DB_DB_HOST,
  database: process.env.GCP_DB_NAME || process.env.LOCAL_DB_DB_NAME,
  password: process.env.GCP_DB_PASSWORD || process.env.LOCAL_DB_DB_PASSWORD,
  port: Number(process.env.GCP_DB_PORT || process.env.LOCAL_DB_DB_PORT),
});

// notes table
// title      | character varying(255)   |           |          |
//  text_body  | text                     |           |          |
//  created_on | timestamp with time zone |           |          | CURRENT_TIMESTAMP
//  updated_on | timestamp with time zone |           |          | CURRENT_TIMESTAMP
//  id

export class NoteService {
  static async getAllNotes(): Promise<Note[]> {
    try {
      const result = await pool.query(
        "SELECT * FROM notes ORDER BY created_on DESC"
      );

      console.log("Fetched rows from DB:", result.rows); // 🔍 Debugging Log

      return result.rows.length > 0 ? result.rows : []; // Ensure an empty array when no results
    } catch (error) {
      console.error("Error fetching notes:", error);
      return []; // Return empty array on error
    }
  }

  static async createNote(title: string, text_body: string): Promise<Note> {
    try {
      const query = `
        INSERT INTO notes (title, text_body, created_on)
        VALUES ($1, $2, NOW())
        RETURNING *;
      `;

      const values = [title, text_body];

      const result = await pool.query(query, values);
      return result.rows[0]; // Return the inserted note
    } catch (error) {
      console.error("Error inserting note into the database:", error);
      throw error; // Propagate the error back to the controller
    }
  }

  static async deleteById(id: string): Promise<boolean> {
    try {
      // console.log("this is deleteby Id,", id);
      const query = `DELETE FROM NOTES WHERE id = $1 RETURNING id;`;
      const result = await pool.query(query, [id]);
      return result.rowCount > 0;
    } catch (e) {
      console.error("Error deleting note:", e);
      throw e;
    }
  }

  static async updateById(
    id: string,
    title: string,
    text_body: string
  ): Promise<boolean> {
    try {
      const query = `
      UPDATE notes 
        SET title = COALESCE($1, title), 
        text_body = COALESCE($2, text_body), 
        updated_on = CURRENT_TIMESTAMP
      WHERE id = $3`;

      console.log(
        `Made it to updateByID, id: ${id}, title: ${{
          title,
        }}, text_body: ${text_body}`
      );

      const result = await pool.query(query, [title, text_body, id]);

      return result.rowCount > 0; // Returns true if at least one row was updated
    } catch (error) {
      console.error("Error updating note:", error);
      throw new Error("Failed to update note.");
    }
  }

  // end of class
}
