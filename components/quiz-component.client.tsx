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

  const getNextQuestionIndex = (currentQuestionIndex: number) => {
    // After Q4, check if we need to skip based on Q1's answer
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
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [selectedAnswer.questionId]: selectedAnswer,
    }));

    if (selectedAnswer.questionId === "Q4") {
      const newSelected = new Set(selectedQ4Answers);
      if (newSelected.has(selectedAnswer.value.toString())) {
        newSelected.delete(selectedAnswer.value.toString());
      } else {
        newSelected.add(selectedAnswer.value.toString());
      }
      setSelectedQ4Answers(newSelected);
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
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
    }
  }, [answers]);

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

  const dynamicQ4Options = {
    Male: [
      {
        category: "Men’s Health",
        options: [
          "Hormone Therapy",
          "Testosterone Replacement Therapy (TRT)",
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
          "Cognitive support- thinking, learning, decision making",
          "Emotional support - stress, depression, well-being",
          "Neurological conditions - Alzheimer's, dementia, Parkinson's, epilepsy (prevention and therapies)",
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
          "Chronic Obstructive Pulmonary Disease (COPD)",
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
          "Cognitive support- thinking, learning, decision making",
          "Emotional support - stress, depression, well-being",
          "Neurological conditions - Alzheimer's, dementia, Parkinson's, epilepsy (prevention and therapies)",
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
          "Chronic Obstructive Pulmonary Disease (COPD)",
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
          "Testosterone Replacement Therapy (TRT)",
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
          "Cognitive support- thinking, learning, decision making",
          "Emotional support - stress, depression, well-being",
          "Neurological conditions - Alzheimer's, dementia, Parkinson's, epilepsy (prevention and therapies)",
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
          "Chronic Obstructive Pulmonary Disease (COPD)",
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
    questionId: string,
    questionHeading: string,
    answerOptions: string[]
  }


  const quizQuestions: IQuizQuestion[] = [
    {
      questionId: "Q1",
      questionHeading: "What are you looking for help with?",
      answerOptions: ["Current Symptoms", "Preventative Care", "General Health"] 
    },
  ]

  const RenderQuizQuestion = ({currentQuestion}:{currentQuestion: number}) => {
    if(!currentQuestion && currentQuestion !== 0) return;
    const {questionId, questionHeading, answerOptions} = quizQuestions[currentQuestion];
    return (<div className="question">
    <p>{questionHeading}</p>
    <div className="answers">
      {answerOptions.map(answer => (
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
    </div></div>)
  }

  const renderQuestion = () => {
    console.log("Rendering question for index:", currentQuestion);
    switch (currentQuestion) {
      // Question 1: What are you looking for help with?
      case 0:
        return (
          <RenderQuizQuestion currentQuestion={currentQuestion}/>
        );

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
          <div className="question question-4">
            <p>
              Digging a little deeper, are you looking for care for any of the
              following?
            </p>
            <p>
              <strong>Select all that apply.</strong>
            </p>
            <div className="answers">
              {optionsToDisplay.map((category) => (
                <React.Fragment key={category.category}>
                  <h3>{category.category}</h3>
                  {category.options.map((option) => (
                    <button
                      key={option}
                      className={`answer-bubble ${
                        selectedQ4Answers.has(option) ? "selected" : ""
                      }`}
                      onClick={() => handleQ4AnswerSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <button
              className="next-button"
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
                  "I’m training for something",
                  "Lifestyle Factors",
                  "Genetics",
                  "Not sure",
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
                Not sure
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
                    value: "Medical Doctor (MD)",
                  })
                }
              >
                Medical Doctor (MD)
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({
                    questionId: "Q7",
                    value: "Doctor of Osteopathic Medicine (DO)",
                  })
                }
              >
                Doctor of Osteopathic Medicine (DO)
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q7", value: "Acupuncturist (LAc, OMD, DoCM)" })
                }
              >
                Acupuncturist (LAc, OMD, DoCM)
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q7", value: "Chiropractor (DC)" })
                }
              >
                Chiropractor (DC)
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q7", value: "Naturopathic Doctor (ND)" })
                }
              >
                Naturopathic Doctor (ND)
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q7", value: "Physical Therapist (PT)" })
                }
              >
                Physical Therapist (PT)
              </button>
              <button
                className="answer-bubble"
                onClick={() =>
                  handleAnswerSelect({ questionId: "Q7", value: "Massage Therapist (LMT)" })
                }
              >
                Massage Therapist (LMT)
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
      <div style={{ position: 'absolute', top: 410, left: 0, width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', zIndex: 1 }}>
        <PageIllustration2 pageName="quizLeft" /> {/* Illustration to the left */}
      </div>
      <div style={{ position: 'absolute', top: 0, right: -50, width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', zIndex: 1 }}>
        <PageIllustration pageName="quizRight" /> {/* Illustration to the right */}
      </div>

      {/* Quiz content container, ensuring it's above the illustrations with a higher zIndex */}
      <div className="quiz-content-container relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="quiz-container text-deep-slate">
          {currentQuestion < totalQuestions ? (
            <>
              {renderProgressBar()}
              {renderQuestion()}
            </>
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
