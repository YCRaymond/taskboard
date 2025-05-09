'use client';
import { useRouter } from "next/navigation";
import { useEffect , useState } from "react";

export default function TaskDetail({ params }) {
    const router = useRouter();
    const { id } = params;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSave = () => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks =savedTasks.map((task) => 
            task.id === Number(id) ? { ...task, title, description } : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        router.push("/");

    }

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const task = savedTasks.find((t) => t.id === Number(id));
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [id]);

    return (
        <div>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <button onClick={() => router.push("/")}>Back to Task List</button>
        </div>
    );
    return(
        <main className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">
                Task Detail
            </h1>
            <input
                className="border p-2 w-full mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                className="border p-2 w-full mb-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={4}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
            >
                Save
            </button>

        </main>   
    )
}    