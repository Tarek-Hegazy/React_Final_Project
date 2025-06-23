import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { APIClient } from "@/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function UserPosts() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);

    useEffect(() => {
        const authStore = localStorage.getItem("auth-store");
        if (authStore) {
            const parsed = JSON.parse(authStore);
            const token = parsed.state?.token;
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    setUserId(decoded.id);
                } catch (error) {
                    console.error("Failed to decode token:", error);
                }
            }
        }
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await APIClient.get("/posts");
                setPosts(response.data);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
            }
        };

        fetchPosts();
    }, []);

    const handleCreate = () => {
        navigate("/posts/create");
    };

    const handleView = (postId) => {
        navigate(`/posts/${postId}`);
    };

    const confirmDelete = (postId) => {
        setPostIdToDelete(postId);
        setShowConfirmModal(true);
    };

    const deletePost = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("auth-store"))?.state?.token;

            await APIClient.delete(`/posts/${postIdToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPosts((prev) => prev.filter((post) => post.id !== postIdToDelete));
            toast.success("Post deleted successfully!", { position: "top-right" });
        } catch (err) {
            console.error("Failed to delete post:", err);
            toast.error("Failed to delete post", { position: "top-right" });
        } finally {
            setShowConfirmModal(false);
            setPostIdToDelete(null);
        }
    };

    const filteredPosts = posts.filter((post) => post.userId === userId);

    return (
        <div className="container mt-4">
            <ToastContainer />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>My Posts</h2>
                <button className="btn btn-success" onClick={handleCreate}>
                    Create New Post
                </button>
            </div>

            {filteredPosts.length === 0 ? (
                <p>No posts found.</p>
                
            ) : (
                filteredPosts.map((post, index) => (
                    <div key={post.id} className="post-card d-flex justify-content-between align-items-start mb-3">
                <div className="flex-grow-1 me-3">
                    <h5 className="mb-1">{post.title}</h5>
                    <p className="text-muted small mb-2">
                        {post.content.length > 80 ? post.content.slice(0, 80) + "..." : post.content}
                    </p>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <button className="btn btn-sm btn-outline-primary mb-2" onClick={() => handleView(post.id)}>
                        View
                    </button>
                    <button className="btn btn-sm btn-outline-warning mb-2" onClick={() => navigate(`/posts/${post.id}/edit`)}>
                        Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => confirmDelete(post.id)}>
                        Delete
                    </button>
                </div>
            </div>

                ))
            )}

            {/* Modal تأكيد الحذف */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deletePost}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
