import { useEffect, useState } from "react";
import "./PostsList.css";
import PostCard from "./PostCard";

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(10);

    const fetchPosts = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");

            if (!response.ok) {
                throw new Error(`Błąd serwera: ${response.status}`);
            }

            const data = await response.json();
            setPosts(data.slice(0, limit));
        } catch (err) {
            setError(err.message || "Nie udało się pobrać danych.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="posts-section">
            <div className="posts-container">
                <div className="posts-header">
                    <div>
                        <h1>Lista postów</h1>
                        <p>Pobieranie danych z API w React</p>
                    </div>
                    <button className="reload-btn" onClick={fetchPosts}>
                        Pobierz ponownie
                    </button>
                </div>

                <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
                    <input
                        type="text"
                        placeholder="Szukaj po tytule..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            padding: "10px 14px",
                            borderRadius: "10px",
                            border: "1px solid #d1d5db",
                            fontSize: "15px",
                            flex: "1",
                            minWidth: "200px",
                        }}
                    />
                    <select
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        style={{
                            padding: "10px 14px",
                            borderRadius: "10px",
                            border: "1px solid #d1d5db",
                            fontSize: "15px",
                            cursor: "pointer",
                        }}
                    >
                        <option value={5}>5 postów</option>
                        <option value={10}>10 postów</option>
                        <option value={20}>20 postów</option>
                    </select>
                </div>

                {loading && (
                    <p className="info-message">Ładowanie danych...</p>
                )}

                {error && (
                    <div className="error-box">
                        <p>{error}</p>
                        <button className="retry-btn" onClick={fetchPosts}>
                            Spróbuj ponownie
                        </button>
                    </div>
                )}

                {!loading && !error && filteredPosts.length === 0 && (
                    <p className="info-message">Brak postów pasujących do wyszukiwania.</p>
                )}

                <div className="posts-grid">
                    {filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default PostsList;
