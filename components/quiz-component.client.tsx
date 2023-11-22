"use client";
import "../app/css/additional-styles/quiz.css";
import React, { useState, useEffect } from "react";

interface Answer {
  questionId: string;
  value: string | number;
  input?: boolean; // This is the new optional property
}

interface Answers {
  [key: string]: Answer;
}

const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [temporaryInput, setTemporaryInput] = useState<Answers>({});
  const totalQuestions = 11;

  const handleAnswerSelect = (selectedAnswer: Answer) => {
    // Existing code to handle input fields remains the same

    // Update the answers state
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [selectedAnswer.questionId]: selectedAnswer,
    }));

    // Removed the direct call to setCurrentQuestion here
  };

  useEffect(() => {
    const lastAnsweredQuestionId = Object.keys(answers).pop(); // Get the ID of the last answered question

    // Ensure that the effect runs only if there's an answer for the current question
    if (lastAnsweredQuestionId && answers[lastAnsweredQuestionId]) {
      if (lastAnsweredQuestionId === "Q1") {
        // Branching logic for Q1
        switch (answers["Q1"].value) {
          case "Help with current symptoms":
            setCurrentQuestion(1);
            break;
          case "Proactive care":
            setCurrentQuestion(2);
            break;
          case "Just exploring":
            setCurrentQuestion(3);
            break;
          // Handle default or error case if needed
        }
      } else {
        // For other questions, increment linearly
        setCurrentQuestion((prev) => prev + 1);
      }
    }
  }, [answers]);

  // Function to handle the submission of text input answers
  const handleInputSubmit = (questionId: string) => {
    const inputValue = temporaryInput[questionId];
    console.log("Input submitted for:", questionId, "with value:", inputValue);
    if (inputValue) {
      console.log("inputValue:", JSON.stringify(inputValue, null, 2));
      console.log("temporaryInput:", JSON.stringify(temporaryInput, null, 2));
      setAnswers((prevAnswers) => {
        console.log(
          "prevAnswers before update:",
          JSON.stringify(prevAnswers, null, 2)
        );
        const newAnswers = {
          ...prevAnswers,
          [questionId]: { questionId, value: inputValue.value }, // Make sure to use inputValue.value
        };
        console.log(
          "newAnswers after update:",
          JSON.stringify(newAnswers, null, 2)
        );
        return newAnswers;
      });
      // Logic to set the next question goes here
      setCurrentQuestion((prevCurrentQuestion) => {
        // Determine the next question based on current logic
        const nextQuestionIndex = prevCurrentQuestion + 1;
        console.log(
          "Updating currentQuestion from:",
          prevCurrentQuestion,
          "to:",
          prevCurrentQuestion + 1
        );
        return nextQuestionIndex;
      });
    }
  };

  const handleSubmit = () => {
    console.log("Final Answers:", answers);
    // Add any other submission logic here
  };

  const renderProgressBar = () => {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100; // Ensure this is 100 to represent the percentage
    return (
      <div className="progress-bar-wrapper">
        {" "}
        {/* Wrapper added */}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  };

  const renderQuestion = () => {
    console.log("Rendering question for index:", currentQuestion);
    switch (currentQuestion) {
      // Question 1: Are you looking for?
      case 0:
        return (
          <div className="question">
            <p>Are you looking for?</p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q1", value: "Help with current symptoms" })
                }
              >
                Help with current symptoms
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q1", value: "Proactive care" })
                }
              >
                Proactive care
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q1", value: "Just exploring" })
                }
              >
                Just exploring
              </button>
            </div>
          </div>
        );

      // Question 2: Are you looking for specific care?
      case 1:
        return (
          <div className="question">
            <p>Are you looking for specific care?</p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q2", value: "Yes" })
                }
              >
                Yes
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q2", value: "No" })
                }
              >
                No
              </button>
            </div>
          </div>
        );

      // Question 3: Are there specific areas you’re interested in exploring?
      case 2:
        return (
          <div className="question">
            <p>What specific area are you interested in exploring?</p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q3", value: "Digestive" })
                }
              >
                Digestive
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q3", value: "Cognitive" })
                }
              >
                Cognitive
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q3", value: "Hormones" })
                }
              >
                Hormones
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q3",
                    value: "Respiratory",
                  })
                }
              >
                Respiratory
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q3", value: "Pain" })
                }
              >
                Pain
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q3", value: "Movement" })
                }
              >
                Movement
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q3", value: "Pregnancy" })
                }
              >
                Pregnancy
              </button>
            </div>
          </div>
        );

      // Question 4: Digging a little deeper, what else are you looking for help with?
      case 3:
        return (
          <div className="question">
            <p>
              Digging a little deeper, what else are you looking for help with?
            </p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q4", value: "Sleep" })
                }
              >
                Sleep
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q4", value: "Movement" })
                }
              >
                Movement
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q4", value: "Digestion" })
                }
              >
                Digestion
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q4", value: "Allergies" })
                }
              >
                Allergies
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q4", value: "Poop" })
                }
              >
                Poop
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q4", value: "Nutrition" })
                }
              >
                Nutrition
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q4", value: "Supplements" })
                }
              >
                Supplements
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q4", value: "Vaccines" })
                }
              >
                Vaccines
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q4", value: "Sexual" })
                }
              >
                Sexual
              </button>
            </div>
          </div>
        );
      // Question 5: How long have you experienced your symptoms?
      case 4:
        return (
          <div className="question">
            <p>How long have you experienced your symptoms?</p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q5",
                    value: "Less Than 1 Month",
                  })
                }
              >
                Less Than 1 Month
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q5",
                    value: "2-6 Months",
                  })
                }
              >
                2-6 Months
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q5",
                    value: "Over 6 Months",
                  })
                }
              >
                Over 6 Months
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q5",
                    value: "Over 1 Year",
                  })
                }
              >
                Over 1 Year
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q5",
                    value: "N/A",
                  })
                }
              >
                N/A
              </button>
            </div>
          </div>
        );

      // Question 6: Are there specific reasons you’re looking for care?
      case 5:
        return (
          <div className="question">
            <p>Are there specific reasons you’re looking for care?</p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q7",
                    value: "General Health",
                  })
                }
              >
                General Health
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q7",
                    value: "Family History",
                  })
                }
              >
                Family History
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q7",
                    value: "I'm Training For Something",
                  })
                }
              >
                I'm Training For Something
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q7",
                    value: "I'm just interested",
                  })
                }
              >
                I'm just interested
              </button>
            </div>
          </div>
        );

      // Question 7: Have you had experience with any of the following?
      case 6:
        return (
          <div className="question">
            <p>Have you had experience with any of the following?</p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q7",
                    value: "Chiropractor",
                  })
                }
              >
                Chiropractor
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q7",
                    value: "Acupuncturist",
                  })
                }
              >
                Acupuncturist
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q7", value: "Naturopath" })
                }
              >
                Naturopath
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q7", value: "Osteopath" })
                }
              >
                Osteopath
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q7", value: "None" })
                }
              >
                None
              </button>
            </div>
          </div>
        );
      // Question 8: What is your gender?
      case 7:
        return (
          <div className="question">
            <p>What is your gender?</p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q8", value: "Man" })
                }
              >
                Man
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q8", value: "Woman" })
                }
              >
                Woman
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q8", value: "Non-Binary" })
                }
              >
                Non-Binary
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q8", value: "Genderqueer" })
                }
              >
                Genderqueer
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q8", value: "Genderfluid" })
                }
              >
                Genderfluid
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q8",
                    value: "Transgender Woman",
                  })
                }
              >
                Transgender Woman
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q8",
                    value: "Transgender Man",
                  })
                }
              >
                Transgender Man
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q8",
                    value: "Prefer Not to Say",
                  })
                }
              >
                Prefer not to say
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q8",
                    value: "None of the above",
                  })
                }
              >
                None of the above
              </button>
            </div>
          </div>
        );
      // Question 9: How old are you?
      case 8:
        return (
          <div className="question">
            <p>How old are you?</p>
            <select
              className="age-dropdown" // Add a class for styling
              onChange={(e) =>
                handleAnswerSelect({ questionId: "Q9", value: e.target.value })
              }
            >
              <option value="">Select your age</option>
              <option value="Under 18">Under 18</option>
              <option value="18-24">18-24</option>
              <option value="25-34">25-34</option>
              <option value="35-44">35-44</option>
              <option value="45-54">45-54</option>
              <option value="55-64">55-64</option>
              <option value="65-74">65-74</option>
              <option value="75 or older">75 or older</option>
            </select>
          </div>
        );
      // Question 10: Do you use a wearable fitness device?
      case 9:
        return (
          <div className="question">
            <p>Do you use a wearable fitness device?</p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q10", value: "Whoop" })
                }
              >
                Whoop
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q10", value: "Apple Watch" })
                }
              >
                Apple Watch
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q10", value: "Oura Ring" })
                }
              >
                Oura Ring
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q10", value: "Garmin" })
                }
              >
                Garmin
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q10", value: "Fitbit" })
                }
              >
                Fitbit
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q10", value: "Other" })
                }
              >
                Other
              </button>
            </div>
          </div>
        );
      // Question 11: What is your zip code?
      case 10:
        return (
          <div className="question">
            <p>Zip Code</p>
            <input
              type="text"
              className="input-text"
              placeholder="Enter 5 Digit Zip Code"
              maxLength={25}
              onChange={(e) =>
                setTemporaryInput({
                  ...temporaryInput,
                  ["Q11"]: {
                    questionId: "Q11",
                    value: e.target.value,
                    input: true,
                  },
                })
              }
            />
            <button
              className="next-button"
              onClick={() => handleInputSubmit("Q11")}
            >
              Next
            </button>
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
          <p className="completion-message">
            Thank you for completing the quiz!
          </p>
          <button className="next-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;

