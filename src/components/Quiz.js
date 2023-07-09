import React, { useState , useEffect } from 'react';
import { QuizData } from '../Data/QuizData';
import QuizResult from './QuizResult';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(0);
    const [showResult, setShowResult] = useState(false);
  
    useEffect(() => {
      const shuffledQuestions = QuizData.sort(() => 0.5 - Math.random()).slice(0, 5);
      setQuestions(shuffledQuestions);
    }, []);
  
    const changeQuestion = () => {
      updateScore();
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setClickedOption(0);
      } else {
        setShowResult(true);
      }
    };
  
    const updateScore = () => {
      if (clickedOption === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
    };
  
    const resetAll = () => {
      setShowResult(false);
      setCurrentQuestion(0);
      setClickedOption(0);
      setScore(0);
      const shuffledQuestions = QuizData.sort(() => 0.5 - Math.random()).slice(0, 5);
      setQuestions(shuffledQuestions);
    };
  
    return (
      <div>
        <p className="heading-txt">Online Exam</p>
        <div className="container">
          {showResult ? (
            <QuizResult score={score} totalScore={questions.length} tryAgain={resetAll} />
          ) : (
            <>
              {questions.length > 0 && (
                <>
                  <div className="question">
                    <span id="question-number">{currentQuestion + 1}. </span>
                    <span id="question-txt">{questions[currentQuestion].question}</span>
                  </div>
                  <div className="option-container">
                    {questions[currentQuestion].options.map((option, i) => (
                      <button
                        className={`option-btn ${clickedOption === i + 1 ? 'checked' : ''}`}
                        key={i}
                        onClick={() => setClickedOption(i + 1)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              )}
              <input type="button" value="Next" id="next-button" onClick={changeQuestion} />
            </>
          )}
        </div>
      </div>
    );
  }
  
  
  
  
export default Quiz