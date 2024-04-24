import React, { useState, useRef } from "react";

const VideoPlayer = ({ item }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        controls
        width="100%"
        height="100%"
        onClick={togglePlay}
      >
        <source src={item.videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>{item.videoText}</p>
    </div>
  );
};

export default VideoPlayer;
