import { useState, useEffect } from "react";
import PostCard from "./PostCard";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!response.ok) {
        throw new Error(`Błąd serwera: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = posts
    .filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, limit);

  return (
    <div>
      <h1>Lista postów</h1>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Szukaj po tytule..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "0.4rem", fontSize: "1rem", flex: 1 }}
        />

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          Limit:
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            style={{ padding: "0.4rem" }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>

        <button onClick={fetchPosts} style={{ padding: "0.4rem 1rem" }}>
          Pobierz ponownie
        </button>
      </div>

      {loading && <p>⏳ Ładowanie danych...</p>}
      {error && (
        <p style={{ color: "red" }}>
          ❌ Błąd: {error}
        </p>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p>Brak wyników dla "{search}"</p>
      )}

      {!loading && !error &&
        filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      }
    </div>
  );
}

export default PostsList;
