// AllPosts.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIClient } from "@/api";
import "../styles/posts-style.css";

export default function AllPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await APIClient.get("/posts");
        const rawPosts = response.data;

        const enrichedPosts = await Promise.all(
          rawPosts.map(async (post) => {
            try {
              const userRes = await APIClient.get(`/users/${post.userId}`);
              const avatarFileName = userRes.data.avatar;

              const fullAvatarURL = avatarFileName
                ? `http://localhost:3000/uploads/${avatarFileName}`
                : "/default-avatar.png";

              return {
                ...post,
                author: {
                  name: userRes.data.name,
                  avatar: fullAvatarURL,
                },
                createdAt: new Date().toISOString(),
              };
            } catch {
              return {
                ...post,
                author: {
                  name: "Unknown",
                  avatar: "/default-avatar.png",
                },
                createdAt: new Date().toISOString(),
              };
            }
          })
        );

        setPosts(enrichedPosts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const handleView = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const formatDate = (dateStr) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  return (
    <div className="container mt-4 pastel-section">
      <h2 className="section-title">All Posts</h2>

      {posts.length === 0 ? (
        <p className="text-muted text-center">No posts found.</p>
      ) : (
        <div className="row g-4">
          {posts.map((post) => (
            <div key={post.id} className="col-md-6 col-lg-4">
              <div className="post-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">{post.title}</h5>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleView(post.id)}>
                      View
                    </button>
                  </div>

                  <p className="text-muted small">
                    {post.content.length > 100 ? post.content.slice(0, 100) + "..." : post.content}
                  </p>
                </div>

                <div className="author mt-3">
                  <img
                    src={post.author?.avatar}
                    alt="Author avatar"
                    className="rounded-circle"
                  />
                  <div>
                    <div className="author-name">{post.author?.name}</div>
                    <div className="date">{formatDate(post.createdAt)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
