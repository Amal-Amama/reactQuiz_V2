import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import PreviousBtn from "./components/PreviousBtn";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  //["loading", 'error',"ready"(data arrived),"active"(quiz running),"finish"],
  status: "loading",
  error: "",
  questionIndex: 0,
  answers: [],
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.questionIndex);
      return {
        ...state,
        answers: [...state.answers, action.payload],
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, questionIndex: state.questionIndex + 1 };
    case "PreviousQuestion":
      return { ...state, questionIndex: state.questionIndex - 1 };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    default:
      throw new Error("Unknown action");
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    questionIndex,
    answers,
    points,
    highscore,
    secondsRemaining,
  } = state;
  const numQuestions = questions.length;

  const maxPossiblePoints = questions.reduce(function (acc, cur) {
    const sum = acc + cur.points;
    return sum;
  }, 0);

  // console.log({ mawPossiblePoints: mawPossiblePoints });
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              points={points}
              numQuestions={numQuestions}
              index={questionIndex}
              maxPossiblePoints={maxPossiblePoints}
              answers={answers}
            />
            <Question
              question={questions[questionIndex]}
              dispatch={dispatch}
              answers={answers}
              questionIndex={questionIndex}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <div>
                <PreviousBtn dispatch={dispatch} index={questionIndex} />
                <NextButton
                  dispatch={dispatch}
                  index={questionIndex}
                  numQuestions={numQuestions}
                  answers={answers}
                />
              </div>
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
