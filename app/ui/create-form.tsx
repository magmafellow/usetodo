"use client";

import { useFormState } from "react-dom";
import { createTodo } from "../lib/actions";

export default function Form() {
    const initState = {
        message: null,
        errors: {},
    };
    const [state, dispatch] = useFormState(createTodo, initState);

    return (
        <form action={dispatch} className="mb-2 flex items-center gap-4">
            <label className="font-bold text-lg underline-offset-4 underline" htmlFor='todoText'>Todo text: </label>
            <input className="border border-black p-1 rounded-sm" type='text' id='todoText' name='todoText' />
            <button className="h-10 w-10 bg-black hover:bg-gray-700 text-white rounded-md" type="submit">+</button>
            {state.errors?.text ? <span className="text-sm text-red-600">Error</span> : ''}
        </form>
    );
}
