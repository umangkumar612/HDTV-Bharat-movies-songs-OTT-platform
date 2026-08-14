import { Link } from "react-router-dom";
import "./VideoCard.css";

function VideoCard({ video }) {
  return (
    <Link to={`/video/${video.id}`} className="video-card">
      <div className="video-thumbnail">
        <img src={video.thumbnail || "/placeholder.jpg"} alt={video.title} />

        {video.duration && (
          <span className="video-duration">{video.duration}</span>
        )}
      </div>

      <div className="video-info">
        <div className="video-category">{video.category_name}</div>
        <h3>{video.title}</h3>
        <p>{video.views || 0} views</p>
      </div>
    </Link>
  );
}

export default VideoCard;
