"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../lib/actions";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch}>
      <div className="mb-4">
        <label htmlFor="email" className="w-[100px] inline-block">
          Email:{" "}
        </label>
        <input className="w-56 p-0.5" type="email" id="email" name="email" />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="w-[100px] inline-block">
          Password:{" "}
        </label>
        <input
          type="text"
          className="w-56 p-0.5"
          id="password"
          name="password"
        />
      </div>
      <div className="text-center">
        <Button />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function Button() {
  return (
    <button type="submit" className="bg-amber-400 hover:bg-amber-300 py-2 px-4 font-bold">
      Submit
    </button>
  );
}
