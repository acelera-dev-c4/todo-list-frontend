import { useState, useEffect } from 'react';
import './DynamicBackground.css';

const imageList: string[] = [
  require('../../assets/backgroundImages/image1.png'),
  require('../../assets/backgroundImages/image2.png'),
  require('../../assets/backgroundImages/image3.png'),
  require('../../assets/backgroundImages/image4.png'),
  require('../../assets/backgroundImages/image5.png'),
  require('../../assets/backgroundImages/image6.png'),
  require('../../assets/backgroundImages/image7.png'),
  require('../../assets/backgroundImages/image8.png'),
  require('../../assets/backgroundImages/image9.png'),
  require('../../assets/backgroundImages/image10.png'),
  require('../../assets/backgroundImages/image11.png'),
  require('../../assets/backgroundImages/image12.png'),
  require('../../assets/backgroundImages/image13.png'),
];

const initIndices = Array.from(Array(imageList.length).keys());

function partialShuffleArray(array: number[]) {
  let shuffled = [...array];
  for (let i = 0; i < 4; i++) {
    const j = i + Math.floor(Math.random() * (shuffled.length - i));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function DynamicBackground() {
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([...initIndices]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShuffledIndices(prevIndices => partialShuffleArray(prevIndices));
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="dynamic-background-container">
      {shuffledIndices.map((index, idx) => (
        <div key={idx} className={`dynamic-background-image bg-image-${index}`}></div>
      ))}
    </div>
  );
}
