"use client";
import "../app/css/additional-styles/quiz.css";
import React, { useState, useEffect } from "react";
import PageIllustration from "./page-illustration";
import PageIllustration2 from "./page-illustration2";

interface Answer {
  questionId: string;
  value: string | number;
  input?: boolean;
}

interface Answers {
  [key: string]: Answer;
}

const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selectedQ4Answers, setSelectedQ4Answers] = useState<Set<string>>(
    new Set()
  );
  const [zipCode, setZipCode] = useState<string>("");
  const [temporaryInput, setTemporaryInput] = useState<Answers>({});
  const totalQuestions = 9;
  const [history, setHistory] = useState<number[]>([]);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [selectedQ7Answers, setSelectedQ7Answers] = useState(new Set());

  const handleInfoClick = () => {
    setShowInfoPopup(true);
  };

  const closeInfoPopup = () => {
    setShowInfoPopup(false);
  };

  useEffect(() => {
    const closePopup = (e) => {
      if (showInfoPopup) {
        closeInfoPopup();
      }
    };

    window.addEventListener("click", closePopup);
    return () => window.removeEventListener("click", closePopup);
  }, [showInfoPopup]);

  const getNextQuestionIndex = (currentQuestionIndex: number) => {
    // After Q4, check if we need to skip based on Q1's answer
    // Right before setting the new current question
    if (currentQuestionIndex === 4) {
      const q1Answer = answers["Q1"]?.value;
      if (q1Answer === "Current Symptoms") {
        // Move to the next question about symptom duration
        return 5;
      } else {
        // For "Preventative Care" or "General Health", skip as planned
        return 6; // Ensure this aligns with your actual question structure
      }
    }
    // Default behavior: proceed to the next question
    return currentQuestionIndex + 1;
  };

  const handleAnswerSelect = (selectedAnswer: Answer) => {
    // For single-choice questions (not Q4 or Q7), update answers directly
    if (
      selectedAnswer.questionId !== "Q4" &&
      selectedAnswer.questionId !== "Q7"
    ) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [selectedAnswer.questionId]: selectedAnswer,
      }));
    } else {
      // For Q4 or Q7, use a Set to allow multiple selections
      const currentSelectedAnswers =
        selectedAnswer.questionId === "Q4"
          ? selectedQ4Answers
          : selectedQ7Answers;
      const updateSelectedAnswers =
        selectedAnswer.questionId === "Q4"
          ? setSelectedQ4Answers
          : setSelectedQ7Answers;

      const newSelected = new Set(currentSelectedAnswers);
      const answerValue = selectedAnswer.value.toString();

      if (newSelected.has(answerValue)) {
        newSelected.delete(answerValue); // Deselect
      } else {
        newSelected.add(answerValue); // Select
      }

      updateSelectedAnswers(newSelected);
    }

    console.log(
      `Answer selected for question ${selectedAnswer.questionId}:`,
      selectedAnswer.value
    );
  };

  const handleQ4AnswerSelect = (value: string) => {
    setSelectedQ4Answers((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(value)) {
        newSelected.delete(value);
      } else {
        newSelected.add(value);
      }
      return newSelected;
    });
  };

  useEffect(() => {
    const lastAnsweredQuestionId = Object.keys(answers).pop();
    console.log(
      "Last answered question ID:",
      lastAnsweredQuestionId,
      "Current Answers State:",
      answers
    );
    if (
      lastAnsweredQuestionId &&
      answers[lastAnsweredQuestionId] &&
      lastAnsweredQuestionId !== "Q4"
    ) {
      console.log("Effect setting next question");
      // Update to include history management
      setCurrentQuestion((prevCurrentQuestion) => {
        // Before changing the current question, update the history
        setHistory((prevHistory) => [...prevHistory, prevCurrentQuestion]);
        // Then, proceed to set the next question
        return prevCurrentQuestion + 1;
      });
    }
  }, [answers]); // Note: You might need to include history in the dependency array if you experience issues, but it shouldn't be necessary for this case.

  const handleInputSubmit = (questionId: string) => {
    const inputValue = temporaryInput[questionId];
    if (inputValue) {
      const newAnswers = {
        ...answers,
        [questionId]: { questionId, value: inputValue.value },
      };

      // Update answers state
      setAnswers(newAnswers);

      // Log the final answers including the latest input
      console.log("Current Answers:", {
        ...newAnswers,
        Q4: Array.from(selectedQ4Answers),
      });

      // Move to the next question or to the submission
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    const finalAnswers = {
      ...answers,
      Q4: Array.from(selectedQ4Answers),
    };

    // Log the final answers
    console.log("Final Answers:", finalAnswers);

    const focusArea = answers.Q3?.value || "";
    const userZipCode = answers.Q11?.value || "";

    // Redirect or further process
    window.location.href = `/practitioners?focusArea=${encodeURIComponent(
      focusArea
    )}&zipCode=${encodeURIComponent(zipCode)}`;
  };

  const renderProgressBar = () => {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    return (
      <div className="progress-bar-wrapper">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%`, backgroundColor: "#8fcca0" }}
          ></div>
        </div>
      </div>
    );
  };

  const goBack = () => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      const prevQuestion = newHistory.pop(); // Remove the last question and get it
      setHistory(newHistory); // Update the history without the last question

      // Check if there's a previous question. If so, set it as the current question.
      if (prevQuestion !== undefined) {
        setCurrentQuestion(prevQuestion);
      }
      return newHistory; // Return the new history (not actually used here, but required by the setter pattern)
    });
  };

  const dynamicQ4Options = {
    Male: [
      {
        category: "Men’s Health",
        options: [
          "Hormone Therapy",
          "Testosterone Replacement Therapy",
          "Growth Hormones",
          "Peptides",
          "Skin",
          "Fertility",
          "Stem Cells",
          "Platelet-Rich-Plasma Injections",
        ],
      },
      {
        category: "Brain Health",
        options: [
          "Cognitive Support",
          "Emotional Support",
          "Neurological Conditions",
          "Substance abuse",
          "Neurofeedback",
        ],
      },
      {
        category: "Chronic Pain or Injuries",
        options: [
          "Back, Neck & Spine",
          "Knee Joints",
          "Shoulder",
          "Elbow",
          "Wrist & Hand",
          "Ankle & Foot",
        ],
      },
      {
        category: "Sexual",
        options: [
          "Pregnancy",
          "Pelvic Floor",
          "Fertility",
          "Erectile Dysfunction",
        ],
      },
      {
        category: "Sleep",
        options: [
          "Sleep Habits",
          "Insomnia",
          "Sleep Apnea",
          "Restless Leg Syndrome",
          "Narcolepsy",
          "Other Sleep Disorders",
        ],
      },
      {
        category: "Digestive",
        options: [
          "Gut Health",
          "Gastrointestinal Disorders",
          "Nutritional",
          "Leaky Gut",
          "Functional Nutrition",
        ],
      },
      {
        category: "Respiratory",
        options: [
          "Chronic Obstructive Pulmonary Disease",
          "Asthma",
          "Bronchitis",
          "Emphysema",
          "Respiratory Infection",
          "Allergies",
        ],
      },
    ],
    Female: [
      {
        category: "Women’s Health",
        options: [
          "Hormone Therapy",
          "Pregnancy",
          "Peptides",
          "Skin",
          "Fertility",
          "Stem Cells",
          "Platelet-Rich-Plasma Injections",
        ],
      },
      {
        category: "Brain Health",
        options: [
          "Cognitive Support",
          "Emotional Support",
          "Neurological Conditions",
          "Substance abuse",
          "Neurofeedback",
        ],
      },
      {
        category: "Chronic Pain or Injuries",
        options: [
          "Back, Neck & Spine",
          "Knee Joints",
          "Shoulder",
          "Elbow",
          "Wrist & Hand",
          "Ankle & Foot",
        ],
      },
      {
        category: "Sexual",
        options: [
          "Pregnancy",
          "Pelvic Floor",
          "Fertility",
          "Erectile dysfunction",
        ],
      },
      {
        category: "Sleep",
        options: [
          "Sleep Habits",
          "Insomnia",
          "Sleep Apnea",
          "Restless Leg Syndrome",
          "Narcolepsy",
          "Other Sleep Disorders",
        ],
      },
      {
        category: "Digestive",
        options: [
          "Gut Health",
          "Gastrointestinal Disorders (Poop)",
          "Nutritional",
          "Leaky Gut",
          "Functional Nutrition",
        ],
      },
      {
        category: "Respiratory",
        options: [
          "Chronic Obstructive Pulmonary Disease",
          "Asthma",
          "Bronchitis",
          "Emphysema",
          "Respiratory Infection",
          "Allergies",
        ],
      },
    ],
    "Prefer not to say": [
      {
        category: "Men’s Health",
        options: [
          "Hormone Therapy",
          "Testosterone Replacement Therapy",
          "Growth Hormones",
          "Peptides",
          "Skin",
          "Fertility",
          "Stem Cells",
          "Platelet-Rich-Plasma Injections",
        ],
      },
      {
        category: "Women’s Health",
        options: [
          "Hormone Therapy",
          "Pregnancy",
          "Peptides",
          "Skin",
          "Fertility",
          "Stem Cells",
          "Platelet-Rich-Plasma Injections",
        ],
      },
      {
        category: "Brain Health",
        options: [
          "Cognitive Support",
          "Emotional Support",
          "Neurological Conditions",
          "Substance abuse",
          "Neurofeedback",
        ],
      },
      {
        category: "Chronic Pain or Injuries",
        options: [
          "Back, Neck & Spine",
          "Knee Joints",
          "Shoulder",
          "Elbow",
          "Wrist & Hand",
          "Ankle & Foot",
        ],
      },
      {
        category: "Sexual",
        options: [
          "Pregnancy",
          "Pelvic Floor",
          "Fertility",
          "Erectile dysfunction",
        ],
      },
      {
        category: "Sleep",
        options: [
          "Sleep Habits",
          "Insomnia",
          "Sleep Apnea",
          "Restless Leg Syndrome",
          "Narcolepsy",
          "Other Sleep Disorders",
        ],
      },
      {
        category: "Digestive",
        options: [
          "Gut Health",
          "Gastrointestinal Disorders (Poop)",
          "Nutritional",
          "Leaky Gut",
          "Functional Nutrition",
        ],
      },
      {
        category: "Respiratory",
        options: [
          "Chronic Obstructive Pulmonary Disease",
          "Asthma",
          "Bronchitis",
          "Emphysema",
          "Respiratory Infection",
          "Allergies",
        ],
      },
    ],
  };

  interface IQuizQuestion {
    questionId: string;
    questionHeading: string;
    answerOptions: string[];
  }

  const quizQuestions: IQuizQuestion[] = [
    {
      questionId: "Q1",
      questionHeading: "What are you looking for help with?",
      answerOptions: [
        "Current Symptoms",
        "Preventative Care",
        "General Health",
      ],
    },
  ];

  const RenderQuizQuestion = ({
    currentQuestion,
  }: {
    currentQuestion: number;
  }) => {
    if (!currentQuestion && currentQuestion !== 0) return;
    const { questionId, questionHeading, answerOptions } =
      quizQuestions[currentQuestion];
    return (
      <div className="question">
        <p>{questionHeading}</p>
        <div className="answers">
          {answerOptions.map((answer) => (
            <button
              className="answer-bubble"
              key={answer}
              onClick={() =>
                handleAnswerSelect({
                  questionId,
                  value: answer,
                })
              }
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderQuestion = () => {
    console.log("Rendering question for index:", currentQuestion);
    switch (currentQuestion) {
      // Question 1: What are you looking for help with?
      case 0:
        return <RenderQuizQuestion currentQuestion={currentQuestion} />;

      // Question 2: What is your sex?
      case 1:
        console.log("Rendering Q2");
        return (
          <div className="question">
            <p>What is your sex?</p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q2", value: "Male" })
                }
              >
                Male
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q2", value: "Female" })
                }
              >
                Female
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q2",
                    value: "Prefer not to say",
                  })
                }
              >
                Prefer not to say
              </button>
            </div>
          </div>
        );

      // Question 3: What type of care are you looking for?
      case 2:
        return (
          <div className="question">
            <p>What type of care are you looking for?</p>
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
      // Question 4: Digging a little deeper, are you looking for care for any of the following?
      case 3: {
        // Safely determine the key to use for dynamicQ4Options based on answers.Q2.value
        console.log("Rendering Q4", {
          selectedQ4Answers,
          genderKey: answers.Q2?.value,
        });
        const genderKey = answers.Q2?.value
          ? ["Male", "Female", "Prefer not to say"].includes(
              answers.Q2.value.toString()
            )
            ? answers.Q2.value.toString()
            : "Prefer not to say"
          : "Prefer not to say";

        // TypeScript now knows genderKey is one of the keys in dynamicQ4Options or "Prefer not to say"
        const optionsToDisplay =
          dynamicQ4Options[genderKey as keyof typeof dynamicQ4Options];
        return (
          <div className="question question-4" style={{ textAlign: "center" }}>
            <p>
              Digging a little deeper, are you looking for care for any of the
              following?
            </p>
            <p>
              <strong>Select all that apply.</strong>
            </p>
            <div
              className="answers"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {optionsToDisplay.map((category) => (
                <div key={category.category} style={{ width: "70%" }}>
                  <h3 style={{ margin: "10px 0" }}>{category.category}</h3>
                  <div style={{ textAlign: "center" }}>
                    {category.options.map((option) => (
                      <button
                        key={option}
                        className={`answer-bubble ${
                          selectedQ4Answers.has(option) ? "selected" : ""
                        }`}
                        onClick={() => handleQ4AnswerSelect(option)}
                        style={{
                          display: "inline-block",
                          padding: "10px 20px",
                          margin: "5px",
                          textAlign: "center",
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="next-button"
              style={{ marginTop: "20px" }}
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={selectedQ4Answers.size === 0}
            >
              Next
            </button>
          </div>
        );
      }

      // Question 5: How long have you experienced your symptoms?
      case 4: {
        // Determine the user's selection for Question 1
        const q1Answer = answers["Q1"]?.value;

        // Adjust the question and options for Q5 based on the Q1 answer
        if (q1Answer === "Current Symptoms") {
          return (
            <div className="question">
              <p>How long have you experienced your symptoms?</p>
              <div className="answers">
                {[
                  "Less Than 1 Month",
                  "2-6 Months",
                  "Over 6 Months",
                  "Over 1 Year",
                  "I don’t know",
                ].map((option) => (
                  <button
                    key={option}
                    className="answer-bubble"
                    onClick={() =>
                      handleAnswerSelect({ questionId: "Q5", value: option })
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          );
        } else if (
          q1Answer === "Preventative Care" ||
          q1Answer === "General Health"
        ) {
          return (
            <div className="question">
              <p>
                Are there other factors that are important to you when exploring
                care options?
              </p>
              <div className="answers">
                {[
                  "Family History",
                  "Upcoming Event",
                  "Lifestyle Factors",
                  "Genetics",
                  "Not Sure",
                ].map((option) => (
                  <button
                    key={option}
                    className="answer-bubble"
                    onClick={() =>
                      handleAnswerSelect({ questionId: "Q5", value: option })
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          );
        }
      }

      // Question 6: Are there other factors that are important to you when exploring care options?
      case 5:
        return (
          <div className="question">
            <p>
              Are there other factors that are important to you when exploring
              care options?
            </p>
            <div className="answers">
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q6",
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
                    questionId: "Q6",
                    value: "Upcoming Event",
                  })
                }
              >
                Upcoming Event
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q6",
                    value: "Lifestyle Factors",
                  })
                }
              >
                Lifestyle Factors
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q6",
                    value: "Genetics",
                  })
                }
              >
                Genetics
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q6",
                    value: "Not sure",
                  })
                }
              >
                Not Sure
              </button>
            </div>
          </div>
        );

      // Question 7: Have you had experience with any of the following?
      case 6:
        const explanations = {
          "Medical Doctor (MD)": "Traditional primary care physician",
          "Doctor of Osteopathic Medicine (DO)":
            "A traditional primary care physician with the same capabilities as an MD but often practices more holistic, whole-person type of care",
          "Acupuncturist (LAc, OMD, DoCM)":
            "A Chinese medicine provider trained in acupuncture - a therapy that uses thin needles inserted through the skin at specific points on the body to control pain and other symptoms",
          "Chiropractor (DC)":
            "A licensed medical provider that typically treats patients with manual therapy",
          "Naturopathic Doctor (ND)":
            "A physician focused on holistic and nontoxic approaches to therapy with a strong emphasis on disease prevention and optimizing wellness.",
          "Physical Therapist (PT)":
            "A health specialist who evaluates and treats human body disorders",
          "Massage Therapist (LMT)":
            "A health specialist that manipulates clients soft tissues and joints to treat injuries and promote general wellness",
          None: "No previous experience with any of the listed professionals",
        };

        return (
          <div className="question question-7" style={{ textAlign: "center" }}>
            <p>Have you had experience with any of the following?</p>
            <p>
              <strong>Select all that apply.</strong>
            </p>
            <div
              className="answers"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {Object.entries(explanations).map(([category, explanation]) => (
                <button
                  key={category}
                  className="answer-bubble"
                  onClick={() =>
                    handleAnswerSelect({ questionId: "Q7", value: category })
                  }
                  title={explanation}
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    margin: "5px",
                    textAlign: "center",
                    whiteSpace: "normal",
                    maxWidth: "70%",
                    backgroundColor: selectedQ7Answers.has(category)
                      ? "var(--deep-slate)"
                      : "var(--lavender)", // Change color based on selection
                    color: selectedQ7Answers.has(category) ? "white" : "white", // Adjust text color based on selection
                    borderColor: selectedQ7Answers.has(category)
                      ? "var(--deep-slate)"
                      : "initial", // Optional: Change border color if needed
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
            <button
              className="next-button"
              style={{ marginTop: "20px" }}
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={selectedQ7Answers.size === 0}
            >
              Next
            </button>
          </div>
        );

      // Question 9: How old are you?
      case 7:
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

      // Question 11: What is your zip code?
      case 8:
        const zipCodeRegex = /^\d{5}$/; // Regular expression for a 5-digit zip code

        const handleZipCodeChange = (
          e: React.ChangeEvent<HTMLInputElement>
        ) => {
          const userInput = e.target.value;
          console.log("Final Answers:", answers);
          console.log(zipCodeRegex.test(userInput));
          if (zipCodeRegex.test(userInput)) {
            setZipCode(userInput);
            // Valid zip code
            setTemporaryInput({
              ...temporaryInput,
              ["Q11"]: {
                questionId: "Q11",
                value: userInput,
                input: true,
              },
            });
          } else {
            setZipCode("");
            // Invalid zip code, you can take appropriate action here
            console.error("Please enter a valid 5-digit zip code.");
          }
        };

        return (
          <div className="question">
            <p>Zip Code</p>
            <input
              type="text"
              className="input-text"
              placeholder="Enter 5 Digit Zip Code"
              maxLength={5}
              onChange={handleZipCodeChange}
            />
            <button
              disabled={!zipCode}
              className={zipCode ? "next-button" : "disabled-button"}
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </div>
        );
    }
  };

  return (
    <div className="relative bg-off-white text-deep-slate overflow-hidden">
      {/* Page Illustrations similar to how it was done in hero.tsx */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 0,
          width: "50%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          zIndex: 1,
        }}
      >
        <PageIllustration2 pageName="quizLeft" />{" "}
        {/* Illustration to the left */}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: -50,
          width: "50%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          zIndex: 1,
        }}
      >
        <PageIllustration pageName="quizRight" />{" "}
        {/* Illustration to the right */}
      </div>

      {/* Quiz content container, ensuring it's above the illustrations with a higher zIndex */}
      <div className="quiz-content-container relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="quiz-container text-deep-slate">
          {currentQuestion < totalQuestions ? (
            <>
              {renderProgressBar()}
              {renderQuestion()}
            </>
          ) : null}
          {history.length > 0 && (
            <div className="go-back-container">
              <button className="go-back-button" onClick={goBack}>
                Go Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
