import React, { useState, useRef } from "react";

const VideoComponent = ({ video,onClick }) => {

  return (
    <div className="">
      <video
        controls
        width="100%"
        height="100%"
        onClick={onClick}
      >
        <source src={video.videoSource} type="video/mp4" />
      </video>
      <p>{video.text}</p>
    </div>
  );
};

export default VideoComponent;













const navigate=  useNavigate()


const onClick = (video) => {
  navigate('playVideo', {state:{video}})
};

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
