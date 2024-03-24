import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

const VideoComponent = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
const navigate=  useNavigate()



  const handleSelectVideo = () => {

  };


  return (
    <div className="">
      <video

        controls
        width="100%"
        height="100%"
        onClick={handleSelectVideo}
      >
        <source src={video.videoSource} type="video/mp4" />
      </video>
      <p>{video.text}</p>
    </div>
  );
};

export default VideoComponent;














import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

const VideoPlayer = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
const navigate=  useNavigate()

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
    <div className="">
      <video
        ref={videoRef}
        controls
        width="100%"
        height="100%"
        onClick={togglePlay}
      >
        <source src={video.videoSource} type="video/mp4" />
      </video>
      <p>{video.text}</p>
    </div>
  );
};

export default VideoPlayer;
