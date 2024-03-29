import { deleteTodo } from "../lib/actions";

export default function DeleteTodo({ id }: { id: number }) {
    const deleteTodoWithId = deleteTodo.bind(null, id)
    
    return (
        <form action={deleteTodoWithId}>
            <button className='h-10 w-10 text-white bg-red-900 hover:bg-red-700 rounded'>
                -
            </button>
        </form>
    );
}
