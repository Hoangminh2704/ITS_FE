// QuizSettings.tsx
import React from "react";
import "./QuizSettings.css";
import type { QuizSettingsProps } from "../../../types/quizTypes";

const QuizSettings: React.FC<QuizSettingsProps> = ({ saving }) => {
  return (
    <div className="quiz-card quiz-settings-card">
      <h3 className="quiz-card-title">Quiz Settings</h3>
      <div>
        <label className="form-label" htmlFor="time-limit">
          Time Limit (minutes)
        </label>
        <input
          className="form-input"
          id="time-limit"
          type="number"
          defaultValue="60"
          disabled={saving}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="attempts">
          Attempts Allowed
        </label>
        <select
          className="form-select"
          id="attempts"
          defaultValue="Unlimited"
          disabled={saving}
        >
          <option>Unlimited</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <div className="checkbox-group">
        <div className="checkbox-item">
          <input
            className="form-checkbox"
            id="randomize-questions"
            type="checkbox"
            defaultChecked
            disabled={saving}
          />
          <label className="checkbox-label" htmlFor="randomize-questions">
            Randomize question order
          </label>
        </div>
        <div className="checkbox-item">
          <input
            className="form-checkbox"
            id="show-results"
            type="checkbox"
            defaultChecked
            disabled={saving}
          />
          <label className="checkbox-label" htmlFor="show-results">
            Show results immediately
          </label>
        </div>
      </div>
    </div>
  );
};

export default QuizSettings;
