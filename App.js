import React, { useEffect, useState } from 'react';
import './App.css';
import kx1 from './assets/kx1.png';
import kx2 from './assets/kx2.png';
import kx3 from './assets/kx3.png';
import dorothee from './assets/dorothee-richter.jpeg';
import gaza from './assets/gaza.jpeg';
import hells from './assets/artificial-hells.png';
import miguel from './assets/miguel-uribe.jpg';
import audioFile from './assets/audio.mp3';

const App = () => {
  const [entered, setEntered] = useState(false);
  const [audio, setAudio] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [cycle, setCycle] = useState("dorothee");

  useEffect(() => {
    const handleMove = () => {
      if (!audio) {
        const newAudio = new Audio(audioFile);
        newAudio.loop = true;
        newAudio.play();
        setAudio(newAudio);
      }
      window.removeEventListener("pointermove", handleMove);
    };
    window.addEventListener("pointermove", handleMove);
  }, [audio]);

  const handleLandingClick = () => setEntered(true);

  const handleMainClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount % 3 === 0) {
      setShowImage(kx1);
    } else if (clickCount % 3 === 1) {
      setShowImage(kx2);
    } else {
      setShowImage(kx3);
    }
  };

  const handleImageClick = () => {
    if (showImage === kx2) {
      window.open('/poema.docx', '_blank');
    } else if (showImage === miguel) {
      const newWindow = window.open("", "_blank");
      newWindow.document.write("<div style='font-family: Geo; font-size: 24px;'>estamos mamados, solo queremos la paz<br/></div>");
      newWindow.document.body.style.backgroundColor = "black";
      newWindow.document.body.style.color = "white";
      newWindow.document.body.style.overflow = "scroll";
    } else {
      setShowImage(miguel);
    }
  };

  const handleCycleClick = () => {
    if (cycle === "dorothee") {
      setShowImage(gaza);
      setCycle("gaza");
    } else if (cycle === "gaza") {
      setShowImage(hells);
      setCycle("hells");
    } else {
      setShowImage(dorothee);
      setCycle("dorothee");
    }
  };

  return (
    <div className="app" onClick={entered ? handleMainClick : handleLandingClick}>
      {!entered ? (
        <h1 className="title">Tramas Imaginarias</h1>
      ) : (
        <div className="image-container" onClick={handleImageClick}>
          {showImage && <img src={showImage} alt="obra" className="obra" />}
          <div onClick={handleCycleClick} className="cycle-zone"></div>
        </div>
      )}
    </div>
  );
};

export default App;