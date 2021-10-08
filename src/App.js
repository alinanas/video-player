import React, { useRef, useState } from "react";
import './App.css';


export default function App() {
  const videoPlayer = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [seekValue, setSeekValue] = useState(0);
  const play = () => {
    videoPlayer.current.play();
  };
  const pause = () => {
    videoPlayer.current.pause();
  };
  const stop = () => {
    videoPlayer.current.pause();
    videoPlayer.current.currentTime = 0;
  };
  const setSpeed = (speed) => {
    videoPlayer.current.playbackRate = speed;
  };
  const onPlaying = () => {
    setCurrentTime(videoPlayer.current.currentTime);
    setSeekValue(
      (videoPlayer.current.currentTime / videoPlayer.current.duration) * 100
    );
  };
  return (
    <div className="App">
      <video
        width="320"
        height="240"
        ref={videoPlayer}
        onTimeUpdate={onPlaying}
      >
        <source
          src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <br />
      <p>{currentTime}</p>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={seekValue}
        onChange={(e) => {
          const seekto = videoPlayer.current.duration * (+e.target.value / 100);
          videoPlayer.current.currentTime = seekto;
          setSeekValue(e.target.value);
        }}
      />
      <div>
        <button class="btn tooltip" onClick={play} data-tooltip="Play video">play</button>
        <button class="btn tooltip" onClick={pause} data-tooltip="Pause video">pause</button>
        <button class="btn tooltip" onClick={stop} data-tooltip="Stop video">stop</button>
        <button class="btn tooltip" onClick={() => setSpeed(0.5)}>0.5x</button>
        <button class="btn tooltip" onClick={() => setSpeed(1)}>1x</button>
        <button class="btn tooltip" onClick={() => setSpeed(1.5)}>1.5x</button>
        <button class="btn tooltip" onClick={() => setSpeed(2)}>2x</button>
      </div>
    </div>
  );
}
