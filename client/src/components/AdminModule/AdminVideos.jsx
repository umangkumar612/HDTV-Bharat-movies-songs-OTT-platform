import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminVideos.css";

function AdminVideos({ status }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadVideos = async () => {
      try {
        const response = await api.get(`/admin/videos/${status}`);

        if (!cancelled && response.data.success) {
          setVideos(response.data.videos || []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load videos:", error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadVideos();

    return () => {
      cancelled = true;
    };
  }, [status]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/videos/${status}`);

      if (response.data.success) {
        setVideos(response.data.videos || []);
      }
    } catch (error) {
      console.error("Failed to load videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await api.put(`/admin/videos/${id}/approve`);

      if (response.data.success) {
        await fetchVideos();
      }
    } catch (error) {
      console.error("Failed to approve video:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?",
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/admin/videos/${id}`);

      if (response.data.success) {
        setVideos((currentVideos) =>
          currentVideos.filter((video) => video.id !== id),
        );
      }
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  };

  if (loading) {
    return <div className="admin-videos-loading">Loading videos...</div>;
  }

  return (
    <div className="admin-videos">
      <div className="admin-videos-header">
        <div>
          <h1>{status === "pending" ? "Pending Videos" : "Approved Videos"}</h1>
          <p>Manage all {status} videos</p>
        </div>
        <span className="admin-video-count">{videos.length} Videos</span>
      </div>

      {videos.length === 0 ? (
        <div className="admin-empty-videos">No {status} videos found</div>
      ) : (
        <div className="admin-videos-grid">
          {videos.map((video) => (
            <div className="admin-video-card" key={video.id}>
              <div className="admin-video-thumbnail">
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt={video.title} />
                ) : (
                  <span>No Thumbnail</span>
                )}
              </div>

              <div className="admin-video-info">
                <h3>{video.title}</h3>

                {video.description && <p>{video.description}</p>}

                <div className="admin-video-actions">
                  {status === "pending" && (
                    <button
                      className="admin-approve-btn"
                      onClick={() => handleApprove(video.id)}
                    >
                      Approve
                    </button>
                  )}

                  <button
                    className="admin-delete-btn"
                    onClick={() => handleDelete(video.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminVideos;
