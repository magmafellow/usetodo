import { link } from "fs";
import { getAllTodos, getAllUsers } from "./lib/data";
import CreateForm from "./ui/create-form";
import DeleteTodo from "./ui/delete-todo";

export default async function Home() {
    const todos = await getAllTodos();
    const users = await getAllUsers();

    return (
        <main className='min-h-screen bg-gray-300 flex justify-center items-center'>
            <div>
                <CreateForm />
                <ul className='bg-white p-2 flex flex-col gap-2'>
                    {todos.map((todo, index) => (
                        <li
                            key={index}
                            className='text-lg border-2 flex justify-between items-center border-gray-900 py-0.5 px-1'
                        >
                            <span>{todo.text}</span>
                            <DeleteTodo id={todo.id} />
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
