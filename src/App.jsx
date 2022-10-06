import ImageUploader from "./ImageUploader.jsx";
import { useEffect, useRef, useState } from "react";

function App() {
  const [talkImage, setTalkImage] = useState("");
  const [idleImage, setIdleImage] = useState("");
  const [isMicOn, setIsMicOn] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const audioCtx = useRef(null);
  const analyzer = useRef(null);

  async function getAudio() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setIsMicOn(true);
    audioCtx.current = new AudioContext();
    analyzer.current = audioCtx.current.createAnalyser();
    const source = audioCtx.current.createMediaStreamSource(stream);
    source.connect(analyzer.current);
    // How much data should we collect
    analyzer.fftSize = 2 ** 10;
    // pull the data off the audio

    drawTimeData();
  }

  function drawTimeData() {
    const array = new Uint8Array(analyzer.current.frequencyBinCount);
    analyzer.current.getByteFrequencyData(array);
    const arraySum = array.reduce((a, value) => a + value, 0);
    const average = Math.round(arraySum / array.length);
    if (average > 6) {
      console.log(average);
      setCurrentImage(talkImage);
    } else {
      setCurrentImage(idleImage);
    }

    // call itself as soon as possible
    requestAnimationFrame(() => drawTimeData());
  }

  return (
    <div>
      <h1>hello</h1>
      <button onClick={getAudio}>mic</button>
      <ImageUploader image={talkImage} onImageChange={setTalkImage} />
      <ImageUploader image={idleImage} onImageChange={setIdleImage} />
      <img src={currentImage} width={200} alt="" className="pixel-image" />
    </div>
  );
}

export default App;
