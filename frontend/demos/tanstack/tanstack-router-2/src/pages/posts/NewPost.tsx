import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { router } from "../../router";

export default function NewPost() {
    const navigate = useNavigate();
    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");
    const [isSaving, setIsSaving] = React.useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSaving(true);

        await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({ title, body }),
            headers: { "Content-Type": "application/json" },
        });

        await router.invalidate();
        navigate({ to: "/posts" });
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
            <div>
                <label>
                    Title<br />
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
            </div>
            <div>
                <label>
                    Body<br />
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
                </label>
            </div>
            <button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Create Post"}
            </button>
        </form>
    );
}
