import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './page.css';
import logoImage from '../../images/NovaByte.png';

const TypeWriter = ({ words, speed }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (displayedText === "") {
        setCurrentWord(words[currentWordIndex]);
        setDisplayedText(words[currentWordIndex].charAt(0));
      } else if (displayedText === words[currentWordIndex]) {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setDisplayedText("");
      } else {
        setDisplayedText((prevText) => prevText + currentWord.charAt(prevText.length));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [currentWord, currentWordIndex, displayedText, speed, words]);

  return <p className="title-word">{displayedText}</p>;
};

const Page = () => {
  const words = ["สำหรับรีวิวรายวิชา   ", "สำหรับรีวิวรายวิชา   "];
  const typingSpeed = 200;

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
    
  return (
      <div className="container-page">
          <div className="right-side">
              <img className='img-page' src={logoImage} alt="โลโก้" />
          </div>
          <div className="left-side">
              <h1>ยินดีต้อนรับเข้าสู่เว็บไซต์</h1>
              <TypeWriter words={words} speed={typingSpeed} />
              <button className="btn-page-1" onClick={() => handleNavigation("/review")} >รีวิวรายวิชา</button>
              <button className="btn-page-2"onClick={() => handleNavigation("/searchSubject")} >ค้นหารายวิชา</button>
          </div>
      </div>
  );
}

export default Page;
