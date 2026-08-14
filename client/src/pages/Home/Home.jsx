import { useEffect, useState } from "react";
import api from "../../services/api";
import VideoCard from "../../components/VideoCard/VideoCard";
import "./Home.css";

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api.get("/videos")
      .then((response) => {
        if (response.data.success) {
          setVideos(response.data.videos);
        }
      })
      .catch((error) => {
        console.error("Failed to load videos:", error);
      });
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="home-container">
          <h1>Welcome to HDTV Bharat</h1>
          <p>Watch the latest videos, news, entertainment and more.</p>
        </div>
      </section>

      <section className="videos-section">
        <div className="home-container">
          <h2>Latest Videos</h2>

          <div className="videos-grid">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;