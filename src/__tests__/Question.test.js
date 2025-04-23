import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Question from "../components/Question";

const testQuestion = {
  prompt: "Test question",
  answers: ["A", "B", "C", "D"]
};

beforeEach(() => {
  jest.useFakeTimers("legacy"); // Critical for React 17/Jest 27
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("calls onAnswered after 10 seconds", () => {
  const onAnswered = jest.fn();
  render(
    <Question
      question={testQuestion.prompt}
      options={testQuestion.answers}
      onAnswered={onAnswered}
    />
  );

  // Initial state
  expect(screen.getByText(/Time Remaining: 10 seconds/i)).toBeInTheDocument();
  expect(onAnswered).not.toHaveBeenCalled();

  // Advance to 9 seconds
  act(() => {
    jest.advanceTimersByTime(9000);
  });
  expect(onAnswered).not.toHaveBeenCalled();

  // Advance to exactly 10 seconds
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Verify callback
  expect(onAnswered).toHaveBeenCalledTimes(1);
  expect(onAnswered).toHaveBeenCalledWith(false);

  // Verify timer reset
  expect(screen.getByText(/Time Remaining: 10 seconds/i)).toBeInTheDocument();
});