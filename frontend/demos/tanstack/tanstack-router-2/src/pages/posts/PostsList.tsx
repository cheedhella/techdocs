type Post = { 
    id: number; 
    title: string 
};

export default function PostsList({ posts }: { posts: Post[] }) {
    return (
        <ul>
            {posts.map((p) => (
                <li key={p.id}>{p.title}</li>
            ))}
        </ul>
    );
}
