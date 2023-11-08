'use client'
import React, { useState } from "react";
// Add your CSS imports here if needed


interface Answer {
  questionId: string;
  value: string | number;
}

interface Answers {
  [key: string]: Answer;
}

const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const totalQuestions = 12;

  const handleAnswerSelect = (selectedAnswer: Answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [selectedAnswer.questionId]: selectedAnswer,
    }));

    let nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
  };

  const handleSubmit = () => {
    console.log("Final Answers:", answers);
    // Add any other submission logic here
  };

  const renderProgressBar = () => {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    return (
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    );
  };

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 0:
        return (
          <div className="question">
            <p>Are you looking for?</p>
            <div className="answers">
              <button
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q1", value: "A" })
                }
              >
                Help with current symptoms
              </button>
              <button
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q1", value: "B" })
                }
              >
                Proactive care
              </button>
              <button
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q1", value: "C" })
                }
              >
                Just exploring
              </button>
            </div>
          </div>
        );
      // Question 2: What is your gender?
      case 1:
        return (
          <div className="question">
            <p>What is your gender?</p>
            <div className="answers">
              <button
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q2", value: "Man" })
                }
              >
                Man
              </button>
              <button
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q2", value: "Woman" })
                }
              >
                Woman
              </button>
            </div>
          </div>
        );
      // Question 3: How old are you?
      case 2:
        return (
          <div className="question">
            <p>How old are you?</p>
            <select
              onChange={(e) =>
                handleAnswerSelect({ questionId: "Q3", value: e.target.value })
              }
            >
              {/* Populate options with ages. Here's an example with a few: */}
              <option value="">Select your age</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              {/* ... other age ranges */}
            </select>
          </div>
        );
      // Question 4A: What do you need help with? (If 'Help with current symptoms' was chosen)
      case 3:
        if (
          answers["Q1"] &&
          answers["Q1"].value === "Help with current symptoms"
        ) {
          return (
            <div className="question">
              <p>What do you need help with?</p>
              <div className="answers">
                {/* List out options similarly to previous questions */}
              </div>
            </div>
          );
        } else {
          // If this case is reached without the expected answer, we can redirect to a default case or throw an error
          setCurrentQuestion(0); // Redirecting back to the first question could be one way to handle it
          return null;
        }
      // Question 4B: Are you looking for specific care? (If 'Proactive care' was chosen)
      case 4:
        if (answers["Q1"] && answers["Q1"].value === "Proactive care") {
          return (
            <div className="question">
              <p>Are you looking for specific care?</p>
              <div className="answers">
                {/* List out options similarly to previous questions */}
              </div>
            </div>
          );
        } else {
          // Handle the unexpected path
          setCurrentQuestion(0);
          return null;
        }
      // Question 4C: Are there specific areas you’re interested in exploring? (If 'Just exploring' was chosen)
      case 5:
        if (answers["Q1"] && answers["Q1"].value === "Just exploring") {
          return (
            <div className="question">
              <p>Are there specific areas you’re interested in exploring?</p>
              <div className="answers">
                {/* List out options similarly to previous questions */}
              </div>
            </div>
          );
        } else {
          // Handle the unexpected path
          setCurrentQuestion(0);
          return null;
        }
      // Question 5: Digging a little deeper, what else are you looking for help with?
      case 6:
        return (
          <div className="question">
            <p>
              Digging a little deeper, what else are you looking for help with?
            </p>
            <div className="answers">
              {/* List out options similarly to previous questions */}
            </div>
          </div>
        );
      // Question 6: How long have you experienced your symptoms? (If 'Help with current symptoms' was chosen)
      case 7:
        if (
          answers["Q1"] &&
          answers["Q1"].value === "Help with current symptoms"
        ) {
          return (
            <div className="question">
              <p>How long have you experienced your symptoms?</p>
              <div className="answers">
                {/* List out options similarly to previous questions */}
              </div>
            </div>
          );
        } else {
          // Handle the unexpected path
          setCurrentQuestion(0);
          return null;
        }
      // Question 7: Are there specific reasons you’re looking for proactive care?
      case 8:
        if (answers["Q1"] && answers["Q1"].value === "Proactive care") {
          return (
            <div className="question">
              <p>
                Are there specific reasons you’re looking for proactive care?
              </p>
              <div className="answers">
                {/* List out options similarly to previous questions */}
              </div>
            </div>
          );
        } else {
          // Handle the unexpected path
          setCurrentQuestion(0);
          return null;
        }
      // Question 8: Have you had experience with any of the following?
      case 9:
        return (
          <div className="question">
            <p>Have you had experience with any of the following?</p>
            <div className="answers">
              {/* List out options similarly to previous questions */}
            </div>
          </div>
        );
      // Question 9: Do you use a wearable fitness device?
      case 10:
        return (
          <div className="question">
            <p>Do you use a wearable fitness device?</p>
            <div className="answers">
              {/* List out options similarly to previous questions */}
            </div>
          </div>
        );
      case 11:
        return (
          <div className="question">
            <p>Zip Code</p>
            <input
              type="text"
              placeholder="Enter 5 digits"
              maxLength={5}
              onChange={(e) =>
                handleAnswerSelect({
                  questionId: "ZipCode",
                  value: e.target.value,
                })
              }
            />
          </div>
        );
    }
  };

  return (
    <div className="quiz-container">
      {currentQuestion < totalQuestions ? (
        <>
          {renderProgressBar()}
          {renderQuestion()}
        </>
      ) : (
        <div>
          <p>Thank you for completing the quiz!</p>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
