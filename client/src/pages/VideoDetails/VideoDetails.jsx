import { useParams } from "react-router-dom";
import "./VideoDetails.css";

function VideoDetails() {
  const { id } = useParams();

  return (
    <div className="video-details-page">
      <div className="video-details-container">
        <h1>Video Details</h1>
        <p>Video ID: {id}</p>
      </div>
    </div>
  );
}

export default VideoDetails;