import { useState } from "react";

function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "0.75rem",
        background: "#fafafa",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem" }}>
        #{post.id} — {post.title}
      </h3>

      {expanded && (
        <p style={{ margin: "0.5rem 0", color: "#444" }}>{post.body}</p>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        style={{ marginTop: "0.5rem", padding: "0.3rem 0.8rem", cursor: "pointer" }}
      >
        {expanded ? "Ukryj treść ▲" : "Pokaż treść ▼"}
      </button>
    </div>
  );
}

export default PostCard;
