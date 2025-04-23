import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

function Question({ question = "", options = [], onAnswered = () => { } }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    let timerId;

    if (timeRemaining > 0) {
      timerId = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else {
      onAnswered(false);
      setTimeRemaining(10);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timeRemaining, onAnswered]);

  return (
    <div>
      <h2>{question}</h2>
      <p>Time Remaining: {timeRemaining} seconds</p>
      <ul>
        {options && options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  onAnswered: PropTypes.func
};

export default Question;