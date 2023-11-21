"use client";
import "../app/css/additional-styles/quiz.css";
import React, { useState, useEffect } from 'react';



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
  const totalQuestions = 12;

  // const handleAnswerSelect = (selectedAnswer: Answer) => {
  //   // Check if the answer is from an input field
  //   console.log('Selected answer:', selectedAnswer);
  //   console.log('Current question before update:', currentQuestion);
  //   if (selectedAnswer.input) {
  //     // If from an input, update the temporary input state
  //     setTemporaryInput((prevInput) => ({
  //       ...prevInput,
  //       [selectedAnswer.questionId]: {
  //         ...prevInput[selectedAnswer.questionId], // Copy existing answer properties if needed
  //         value: selectedAnswer.value, // Update the value
  //       },
  //     }));
  //     console.log('Current question after update:', currentQuestion);
  //   } else {
  //     // If from a button, update the answers state and move to the next question
  //     setAnswers((prevAnswers) => ({
  //       ...prevAnswers,
  //       [selectedAnswer.questionId]: selectedAnswer, // Ensure selectedAnswer is of type Answer
  //     }));

  //     console.log('Updated answers state:', answers);

  //     // Branching logic after Q1
  //     if (selectedAnswer.questionId === "Q1") {
  //       switch (selectedAnswer.value) {
  //         case "A":
  //           setCurrentQuestion(1);
  //           break;
  //         case "B":
  //           setCurrentQuestion(2);
  //           break;
  //         case "C":
  //           setCurrentQuestion(3);
  //           break;
  //         default:
  //           console.error("Invalid answer for Q1:", selectedAnswer.value);
  //           setCurrentQuestion(0);
  //           break;
  //       }
  //     } else {
  //       // For subsequent questions, move to the next one linearly or based on your specific logic
  //       setCurrentQuestion(currentQuestion + 1);
  //       console.log('Next question index:', currentQuestion + 1);
  //     }
  //   }
  // };

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
      if (lastAnsweredQuestionId === 'Q1') {
        // Branching logic for Q1
        switch (answers['Q1'].value) {
          case "A":
            setCurrentQuestion(1);
            break;
          case "B":
            setCurrentQuestion(2);
            break;
          case "C":
            setCurrentQuestion(3);
            break;
          // Handle default or error case if needed
        }
      } else {
        // For other questions, increment linearly
        setCurrentQuestion(prev => prev + 1);
      }
    }
  }, [answers]);
  
  

  // Function to handle the submission of text input answers
  const handleInputSubmit = (questionId: string) => {
    const inputValue = temporaryInput[questionId];
    console.log('Input submitted for:', questionId, 'with value:', inputValue);
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
        // This is a placeholder for your branching logic
        const nextQuestionIndex = prevCurrentQuestion + 1;
        console.log('Updating currentQuestion from:', prevCurrentQuestion, 'to:', prevCurrentQuestion + 1);
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
    console.log('Rendering question for index:', currentQuestion);
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
                  handleAnswerSelect({ questionId: "Q1", value: "A" })
                }
              >
                Help with current symptoms
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q1", value: "B" })
                }
              >
                Proactive care
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q1", value: "C" })
                }
              >
                Just exploring
              </button>
            </div>
          </div>
        );

      // Question 2A: What do you need help with? (If 'Help with current symptoms' was chosen)
      case 1:
        if (answers["Q1"] && answers["Q1"].value === "A") {
          return (
            <div className="question">
              <p>What do you need help with?</p>
              <div className="answers">
                <input
                  type="text"
                  className="input-text"
                  placeholder="Type in answer"
                  maxLength={25}
                  onChange={(e) =>
                    setTemporaryInput({
                      ...temporaryInput,
                      ["Q2"]: {
                        questionId: "Q2",
                        value: e.target.value,
                        input: true,
                      },
                    })
                  }
                />
              </div>
              <button className="next-button" onClick={() => handleInputSubmit("Q2")}>Next</button>
            </div>
          );
          // } else {
          //   // If this case is reached without the expected answer, reset or handle accordingly
          //   setCurrentQuestion(0);
          //   return null;
        }

      // Question 2B: Are you looking for specific care? (If 'Proactive care' was chosen)
      case 2:
        if (answers["Q1"] && answers["Q1"].value === "B") {
          return (
            <div className="question">
              <p>Are you looking for specific care?</p>
              <div className="answers">
                <input
                  type="text"
                  className="input-text"
                  placeholder="Type in answer"
                  maxLength={25}
                  onChange={(e) =>
                    setTemporaryInput({
                      ...temporaryInput,
                      ["Q2"]: {
                        questionId: "Q2",
                        value: e.target.value,
                        input: true,
                      },
                    })
                  }
                />
              </div>
              <button className="next-button" onClick={() => handleInputSubmit("Q2")}>Next</button>
            </div>
          );
          // } else {
          //   // Handle the unexpected path
          //   setCurrentQuestion(0);
          //   return null;
        }
      // Question 2C: Are there specific areas you’re interested in exploring? (If 'Just exploring' was chosen)
      case 3:
        if (answers["Q1"] && answers["Q1"].value === "C") {
          return (
            <div className="question">
              <p>Are there specific areas you’re interested in exploring?</p>
              <div className="answers">
                <button
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({ questionId: "Q2", value: "Digestive" })
                  }
                >
                  Digestive
                </button>
                <button
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({ questionId: "Q2", value: "Cognitive" })
                  }
                >
                  Cognitive
                </button>
                <button
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({ questionId: "Q2", value: "Hormones" })
                  }
                >
                  Hormones
                </button>
                <button
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({
                      questionId: "Q2",
                      value: "Respiratory",
                    })
                  }
                >
                  Respiratory
                </button>
                <button
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({ questionId: "Q2", value: "Pain" })
                  }
                >
                  Pain
                </button>
                <button
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({ questionId: "Q2", value: "Movement" })
                  }
                >
                  Movement
                </button>
                <button
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({ questionId: "Q2", value: "Pregnancy" })
                  }
                >
                  Pregnancy
                </button>
              </div>
            </div>
          );
          // } else {
          //   // Handle the unexpected path
          //   setCurrentQuestion(0);
          //   return null;
        }
      // Question 3: Digging a little deeper, what else are you looking for help with?
      case 4:
        return (
          <div className="question">
            <p>
              Digging a little deeper, what else are you looking for help with?
            </p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q3", value: "Sleep" })
                }
              >
                Sleep
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
                  handleAnswerSelect({ questionId: "Q3", value: "Digestion" })
                }
              >
                Digestion
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q3", value: "Allergies" })
                }
              >
                Allergies
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q3", value: "Poop" })
                }
              >
                Poop
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q3", value: "Nutrition" })
                }
              >
                Nutrition
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q3", value: "Supplements" })
                }
              >
                Supplements
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q3", value: "Vaccines" })
                }
              >
                Vaccines
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q3", value: "Sexual" })
                }
              >
                Sexual
              </button>
              <input
                type="text"
                className="input-text"
                placeholder="Type in answer"
                maxLength={25}
                onChange={(e) =>
                  setTemporaryInput({
                    ...temporaryInput,
                    ["Q3"]: {
                      questionId: "Q3",
                      value: e.target.value,
                      input: true,
                    },
                  })
                }
              />
            </div>
            <button className="next-button" onClick={() => handleInputSubmit("Q3")}>Next</button>
          </div>
        );
      // Question 4: How long have you experienced your symptoms? (If 'Help with current symptoms' was chosen)
      case 5:
        if (
          answers["Q1"] &&
          answers["Q1"].value === "Help with current symptoms"
        ) {
          return (
            <div className="question">
              <p>How long have you experienced your symptoms?</p>
              <div className="answers">
                <button
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({
                      questionId: "Q4",
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
                      questionId: "Q4",
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
                      questionId: "Q4",
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
                      questionId: "Q4",
                      value: "Over 1 Year",
                    })
                  }
                >
                  Over 1 Year
                </button>
              </div>
            </div>
          );
          // } else {
          //   // Handle the unexpected path
          //   setCurrentQuestion(0);
          //   return null;
        }
      // Question 5: Are there specific reasons you’re looking for proactive care?
      case 6:
        if (answers["Q1"] && answers["Q1"].value === "Proactive care") {
          return (
            <div className="question">
              <p>
                Are there specific reasons you’re looking for proactive care?
              </p>
              <div className="answers">
                <button
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({
                      questionId: "Q5",
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
                      questionId: "Q5",
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
                      questionId: "Q5",
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
                      questionId: "Q5",
                      value: "I'm just interested",
                    })
                  }
                >
                  I'm just interested
                </button>
                <input
                  type="text"
                  className="input-text"
                  placeholder="Type in answer"
                  maxLength={25}
                  onChange={(e) =>
                    setTemporaryInput({
                      ...temporaryInput,
                      ["Q5"]: {
                        questionId: "Q5",
                        value: e.target.value,
                        input: true,
                      },
                    })
                  }
                />
                <button className="next-button" onClick={() => handleInputSubmit("Q5")}>Next</button>
              </div>
            </div>
          );
          // } else {
          //   // Handle the unexpected path
          //   setCurrentQuestion(0);
          //   return null;
        }
      // Question 6: Have you had experience with any of the following?
      case 7:
        return (
          <div className="question">
            <p>Have you had experience with any of the following?</p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q6",
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
                    questionId: "Q6",
                    value: "Acupuncturist",
                  })
                }
              >
                Acupuncturist
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q6", value: "Naturopath" })
                }
              >
                Naturopath
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q6", value: "Osteopath" })
                }
              >
                Osteopath
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q6", value: "None" })
                }
              >
                None
              </button>
            </div>
          </div>
        );
      // Question 7: What is your gender?
      case 8:
        return (
          <div className="question">
            <p>What is your gender?</p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q7", value: "Man" })
                }
              >
                Man
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q7", value: "Woman" })
                }
              >
                Woman
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q7", value: "Non-Binary" })
                }
              >
                Non-Binary
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q7", value: "Genderqueer" })
                }
              >
                Genderqueer
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q7", value: "Genderfluid" })
                }
              >
                Genderfluid
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q7",
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
                    questionId: "Q7",
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
                    questionId: "Q7",
                    value: "Prefer Not to Say",
                  })
                }
              >
                Prefer not to say
              </button>
              <input
                type="text"
                className="input-text"
                placeholder="Type in answer"
                maxLength={25}
                onChange={(e) =>
                  setTemporaryInput({
                    ...temporaryInput,
                    ["Q7"]: {
                      questionId: "Q7",
                      value: e.target.value,
                      input: true,
                    },
                  })
                }
              />
            </div>
            <button className="next-button" onClick={() => handleInputSubmit("Q7")}>Next</button>
          </div>
        );
      // Question 8: How old are you?
      case 9:
        return (
          <div className="question">
            <p>How old are you?</p>
            <select
              className="age-dropdown" // Add a class for styling
              onChange={(e) =>
                handleAnswerSelect({ questionId: "Q8", value: e.target.value })
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
      // Question 9: Do you use a wearable fitness device?
      case 10:
        return (
          <div className="question">
            <p>Do you use a wearable fitness device?</p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q9", value: "Whoop" })
                }
              >
                Whoop
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q9", value: "Apple Watch" })
                }
              >
                Apple Watch
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q9", value: "Oura Ring" })
                }
              >
                Oura Ring
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q9", value: "Garmin" })
                }
              >
                Garmin
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q9", value: "Fitbit" })
                }
              >
                Fitbit
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q9", value: "Other" })
                }
              >
                Other
              </button>
            </div>
          </div>
        );
      // Question 10: What is your zip code?
      case 11:
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
                  ["Q10"]: {
                    questionId: "Q10",
                    value: e.target.value,
                    input: true,
                  },
                })
              }
            />
            <button className="next-button" onClick={() => handleInputSubmit("Q10")}>Next</button>
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
          <p className="completion-message">Thank you for completing the quiz!</p>
          <button className="next-button" onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
