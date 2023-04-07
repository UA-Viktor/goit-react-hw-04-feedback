import { useState } from 'react';

import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

import './Styles.css';

export default function App() {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleFeedback = key => {
    setFeedback(prevState => ({
      ...prevState,
      [key]: prevState[key] + 1,
    }));
  };

  const countTotalFeedback = () => {
    return Object.values(feedback).reduce((acc, value) => acc + value, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const good = feedback.good;
    return total === 0 ? 0 : Math.floor((good / total) * 100);
  };

  const totalFeedback = countTotalFeedback();
  const positiveFeedbackPercentage = countPositiveFeedbackPercentage();

  return (
    <>
      <div className="container">
        <Section
          text={'Please leave feedback'}
          childComponent={
            <FeedbackOptions
              options={feedback}
              onLeaveFeedback={handleFeedback}
            />
          }
        />
        <Section
          text={'Statistics'}
          childComponent={
            totalFeedback > 0 ? (
              <Statistics
                good={feedback.good}
                neutral={feedback.neutral}
                bad={feedback.bad}
                total={totalFeedback}
                positivePercentage={positiveFeedbackPercentage}
              />
            ) : (
              <Notification text={'There is no feedback'} />
            )
          }
        />
      </div>
    </>
  );
}
