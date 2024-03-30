"use server";

import { z } from "zod";
import { pool } from "./data";
import { revalidatePath } from "next/cache";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type State = {
  errors?: {
    text?: string[];
    some?: string;
  };
  message: string | null;
};

const st: State = {
  message: null,
  errors: {},
};

const FormSchemaTodo = z.object({
  text: z
    .string({
      invalid_type_error: "Please select a customer.",
    })
    .min(1),
});

const CreateTodo = FormSchemaTodo;

export async function createTodo(
  previousState: State,
  formData: FormData
): Promise<State> {
  // Validate form using Zod
  const validatedFields = CreateTodo.safeParse({
    text: formData.get("todoText"),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create Todo.",
    };
  }

  try {
    const res = await pool.query("INSERT INTO todos (text) VALUES ($1)", [
      validatedFields.data.text,
    ]);
    revalidatePath("/");
    return {
      message: "All is good",
    };
  } catch (error) {
    return {
      errors: { some: "db error" },
      message: "Database failed to create todo.",
    };
  }
}

export async function deleteTodo(id: number) {
  try {
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    signIn("credentials", formData);
    console.log('after signIn')
  } catch (error) {
    console.log('catch block is reached')
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    console.log('Error from authenticate, actions')
    throw error;
  }
}
