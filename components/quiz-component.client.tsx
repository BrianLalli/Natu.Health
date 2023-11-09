"use client";
import React, { useState } from "react";
import "../app/css/additional-styles/quiz.css";

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
      // Question 2: What is your gender?
      case 1:
        return (
          <div className="question">
            <p>What is your gender?</p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q2", value: "Man" })
                }
              >
                Man
              </button>
              <button
                className="answer-bubble"
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
              className="age-dropdown" // Add a class for styling
              onChange={(e) =>
                handleAnswerSelect({ questionId: "Q3", value: e.target.value })
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
                <input
                  type="text"
                  placeholder="Type in answer"
                  maxLength={25}
                  onChange={(e) =>
                    handleAnswerSelect({
                      questionId: "Help",
                      value: e.target.value,
                    })
                  }
                />
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
                <input
                  type="text"
                  placeholder="Type in answer"
                  maxLength={25}
                  onChange={(e) =>
                    handleAnswerSelect({
                      questionId: "SpecificCare",
                      value: e.target.value,
                    })
                  }
                />
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
                <button
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({ questionId: "Q4", value: "Digestive" })
                  }
                >
                  Digestive
                </button>
                <button
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({ questionId: "Q4", value: "Cognitive" })
                  }
                >
                  Cognitive
                </button>
                <button
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({ questionId: "Q4", value: "Hormones" })
                  }
                >
                  Hormones
                </button>
                <button
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({
                      questionId: "Q4",
                      value: "Respiratory",
                    })
                  }
                >
                  Respiratory
                </button>
                <button
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({ questionId: "Q4", value: "Pain" })
                  }
                >
                  Pain
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
                    handleAnswerSelect({ questionId: "Q4", value: "Pregnancy" })
                  }
                >
                  Pregnancy
                </button>
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
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q5", value: "Sleep" })
                }
              >
                Sleep
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q5", value: "Movement" })
                }
              >
                Movement
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q5", value: "Digestion" })
                }
              >
                Digestion
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q5", value: "Allergies" })
                }
              >
                Allergies
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q5", value: "Poop" })
                }
              >
                Poop
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q5", value: "Nutrition" })
                }
              >
                Nutrition
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q5", value: "Supplements" })
                }
              >
                Supplements
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q5", value: "Vaccines" })
                }
              >
                Vaccines
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q5", value: "Sexual" })
                }
              >
                Sexual
              </button>
              <input
                type="text"
                placeholder="Other"
                maxLength={25}
                onChange={(e) =>
                  handleAnswerSelect({
                    questionId: "Other",
                    value: e.target.value,
                  })
                }
              />
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
                <button
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({
                      questionId: "Q6",
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
                      questionId: "Q6",
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
                      questionId: "Q6",
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
                      questionId: "Q6",
                      value: "Over 1 Year",
                    })
                  }
                >
                  Over 1 Year
                </button>
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
                <input
                  type="text"
                  placeholder="Other"
                  maxLength={25}
                  onChange={(e) =>
                    handleAnswerSelect({
                      questionId: "Other",
                      value: e.target.value,
                    })
                  }
                />
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
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q8",
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
                    questionId: "Q8",
                    value: "Acupuncturist",
                  })
                }
              >
                Acupuncturist
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q8", value: "Naturopath" })
                }
              >
                Naturopath
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q8", value: "Osteopath" })
                }
              >
                Osteopath
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q8", value: "None" })
                }
              >
                None
              </button>
            </div>
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
