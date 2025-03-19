import { z } from "zod";

export type NewNote = {
  title: string;
  text_body: string;
};

export type SavedNote = NewNote & {
  id: string;
  created_on: string;
  updated_on?: string;
};

export const noteSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  text_body: z.string(),
  created_on: z.string().optional(),
  updated_on: z.string().optional(),
});

export type Note = z.infer<typeof noteSchema>;
