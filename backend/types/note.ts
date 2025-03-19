import { z } from "zod";

export const newNoteSchema = z.object({
  title: z.string(),
  text_body: z.string(),
});
export type NewNote = z.infer<typeof newNoteSchema>;

export const savedNoteSchema = newNoteSchema.extend({
  id: z.string(),
  created_on: z.string().datetime(),
  updated_on: z.string().datetime().optional(),
});
export type SavedNote = z.infer<typeof savedNoteSchema>;

export type Note = NewNote | SavedNote;
