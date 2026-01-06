import React, { useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

const DeletePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");
      await api.delete(`/posts/${id}`);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete this Post");
    } finally {
      setLoading(false);
    }

    // After delete
  };

  return (
    <div
      className="min-h-screen  px-4 py-12 flex items-center justify-center"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      <div
        className="max-w-xl w-full rounded-xl shadow-md p-8"
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
        }}
      >
        {/* Header */}
        <div
          className="mb-6"
          style={{
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
          }}
        >
          <h1 className="text-3xl font-bold text-red-600">Delete Post</h1>
          <p className=" mt-2">This action cannot be undone.</p>
        </div>

        {/* Warning Box */}
        <div
          className=" rounded-lg p-4 mb-6"
          style={{
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
          }}
        >
          <p className="text-sm text-red-700">
            Are you sure you want to permanently delete this post? Once deleted,
            it cannot be recovered.
          </p>
        </div>
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            disabled={loading}
            onClick={() => navigate(-1)}
            className="btn btn-ghost rounded-3xl"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleDelete}
            className="btn bg-red-600 hover:bg-red-700 text-white rounded-3xl"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;
