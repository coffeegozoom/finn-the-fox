import React, { useState } from 'react';
import './App.css';

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.pitch = 1.2;
  utterance.volume = 1;

  const trySpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.name.includes('Samantha') ||
      v.name.includes('Karen') ||
      v.name.includes('Moira') ||
      v.name.includes('Daniel')
    );
    if (preferred) utterance.voice = preferred;
    window.speechSynthesis.speak(utterance);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = trySpeak;
  } else {
    trySpeak();
  }
}

const QUESTIONS = [
  { id: 1, skill: 'counting', level: 1, type: 'count', prompt: 'How many acorns does Finn have?', items: '🌰🌰🌰', answer: 3, choices: [2, 3, 4] },
  { id: 2, skill: 'counting', level: 1, type: 'count', prompt: 'How many mushrooms are in the forest?', items: '🍄🍄🍄🍄🍄', answer: 5, choices: [4, 5, 6] },
  { id: 3, skill: 'counting', level: 2, type: 'count', prompt: 'How many berries did Finn find?', items: '🫐🫐🫐🫐🫐🫐🫐', answer: 7, choices: [6, 7, 8] },
  { id: 4, skill: 'counting', level: 2, type: 'count', prompt: 'How many butterflies are flying?', items: '🦋🦋🦋🦋🦋🦋🦋🦋🦋', answer: 9, choices: [8, 9, 10] },
  { id: 5, skill: 'counting', level: 3, type: 'count', prompt: 'How many flowers did Finn pass?', items: '🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸', answer: 12, choices: [11, 12, 13] },
  { id: 6, skill: 'addition', level: 1, type: 'math', prompt: 'Finn has 2 acorns. He finds 1 more. How many now?', equation: '2 + 1 = ?', answer: 3, choices: [2, 3, 4] },
  { id: 7, skill: 'addition', level: 1, type: 'math', prompt: 'Finn has 3 berries. He picks 2 more. How many now?', equation: '3 + 2 = ?', answer: 5, choices: [4, 5, 6] },
  { id: 8, skill: 'addition', level: 2, type: 'math', prompt: 'Finn found 4 mushrooms. Then 3 more! How many?', equation: '4 + 3 = ?', answer: 7, choices: [6, 7, 8] },
  { id: 9, skill: 'addition', level: 2, type: 'math', prompt: 'Finn saw 5 butterflies then 4 more flew by. How many?', equation: '5 + 4 = ?', answer: 9, choices: [8, 9, 10] },
  { id: 10, skill: 'addition', level: 3, type: 'math', prompt: 'Finn collected 6 flowers and 5 leaves. How many things?', equation: '6 + 5 = ?', answer: 11, choices: [10, 11, 12] },
  { id: 11, skill: 'subtraction', level: 1, type: 'math', prompt: 'Finn had 4 acorns. He gave 1 to a squirrel. How many left?', equation: '4 - 1 = ?', answer: 3, choices: [2, 3, 4] },
  { id: 12, skill: 'subtraction', level: 1, type: 'math', prompt: 'Finn had 5 berries. He ate 2. How many left?', equation: '5 - 2 = ?', answer: 3, choices: [2, 3, 4] },
  { id: 13, skill: 'subtraction', level: 2, type: 'math', prompt: 'Finn had 8 mushrooms. He dropped 3. How many left?', equation: '8 - 3 = ?', answer: 5, choices: [4, 5, 6] },
  { id: 14, skill: 'subtraction', level: 2, type: 'math', prompt: 'Finn had 9 flowers. He gave 4 away. How many left?', equation: '9 - 4 = ?', answer: 5, choices: [4, 5, 6] },
  { id: 15, skill: 'subtraction', level: 3, type: 'math', prompt: 'Finn had 10 acorns. A bird took 6! How many left?', equation: '10 - 6 = ?', answer: 4, choices: [3, 4, 5] },
  { id: 16, skill: 'shapes', level: 1, type: 'shape', prompt: 'Finn found a shape on a tree. What shape is this?', shape: '⬜', answer: 'square', choices: ['circle', 'square', 'triangle'] },
  { id: 17, skill: 'shapes', level: 1, type: 'shape', prompt: 'Finn sees a shape in the pond. What shape is this?', shape: '⭕', answer: 'circle', choices: ['circle', 'square', 'triangle'] },
  { id: 18, skill: 'shapes', level: 2, type: 'shape', prompt: 'Finn found a sign in the forest. What shape is this?', shape: '🔺', answer: 'triangle', choices: ['circle', 'triangle', 'rectangle'] },
  { id: 19, skill: 'shapes', level: 2, type: 'shape', prompt: 'Finn sees a shape on the barn door. What shape is this?', shape: '▬', answer: 'rectangle', choices: ['square', 'triangle', 'rectangle'] },
  { id: 20, skill: 'shapes', level: 3, type: 'shape', prompt: 'Finn found a gem! What shape is this?', shape: '⬟', answer: 'diamond', choices: ['square', 'diamond', 'rectangle'] },
  { id: 21, skill: 'comparing', level: 1, type: 'compare', prompt: 'Which group has more?', left: '🌰🌰', right: '🌰🌰🌰🌰', answer: 'right group', choices: ['left group', 'right group', 'they are equal'] },
  { id: 22, skill: 'comparing', level: 1, type: 'compare', prompt: 'Which group has fewer?', left: '🍄🍄🍄', right: '🍄🍄', answer: 'right group', choices: ['left group', 'right group', 'they are equal'] },
  { id: 23, skill: 'comparing', level: 2, type: 'compare', prompt: 'Which group has more?', left: '🫐🫐🫐🫐🫐', right: '🫐🫐🫐', answer: 'left group', choices: ['left group', 'right group', 'they are equal'] },
  { id: 24, skill: 'comparing', level: 2, type: 'compare', prompt: 'Are these groups equal?', left: '🌸🌸🌸🌸', right: '🌸🌸🌸🌸', answer: 'they are equal', choices: ['left group has more', 'right group has more', 'they are equal'] },
  { id: 25, skill: 'comparing', level: 3, type: 'compare', prompt: 'Which number is bigger?', left: '14', right: '9', answer: 'left number', choices: ['left number', 'right number', 'they are equal'] },
  { id: 26, skill: 'ordering', level: 1, type: 'order', prompt: 'What number comes next? 1, 2, 3, blank', sequence: '1, 2, 3, __', answer: 4, choices: [3, 4, 5] },
  { id: 27, skill: 'ordering', level: 1, type: 'order', prompt: 'What number comes next? 5, 6, 7, blank', sequence: '5, 6, 7, __', answer: 8, choices: [7, 8, 9] },
  { id: 28, skill: 'ordering', level: 2, type: 'order', prompt: 'What number is missing? 3, 4, blank, 6', sequence: '3, 4, __, 6', answer: 5, choices: [4, 5, 7] },
  { id: 29, skill: 'ordering', level: 2, type: 'order', prompt: 'What number comes next? 10, 20, 30, blank', sequence: '10, 20, 30, __', answer: 40, choices: [35, 40, 50] },
  { id: 30, skill: 'ordering', level: 3, type: 'order', prompt: 'What number is missing? 15, blank, 17, 18', sequence: '15, __, 17, 18', answer: 16, choices: [14, 16, 19] },
];

const SKILL_NAMES = {
  counting: 'Counting',
  addition: 'Addition',
  subtraction: 'Subtraction',
  shapes: 'Shapes',
  comparing: 'Comparing Numbers',
  ordering: 'Number Ordering',
};

const FINN_REACTIONS = {
  correct: ['Yay! You got it!', 'Wow, you are so smart!', 'Amazing! Finn is so happy!', 'That is right! Let us keep going!', 'You are a math superstar!'],
  incorrect: ['Oops! Let us try the next one!', 'Almost! Finn still believes in you!', 'Not quite, but you are doing great!', 'Keep trying, you have got this!'],
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [results, setResults] = useState([]);
  const [stars, setStars] = useState(0);

  return (
    <div className="app">
      {screen === 'welcome' && (
        <WelcomeScreen onStart={() => setScreen('assessment')} />
      )}
      {screen === 'assessment' && (
        <AssessmentScreen
          onFinish={(r, s) => {
            setResults(r);
            setStars(s);
            setScreen('celebration');
          }}
        />
      )}
      {screen === 'celebration' && (
        <CelebrationScreen
          stars={stars}
          onReport={() => setScreen('report')}
        />
      )}
      {screen === 'report' && (
        <ReportScreen results={results} onBack={() => setScreen('welcome')} />
      )}
    </div>
  );
}

function WelcomeScreen({ onStart }) {
  return (
    <div className="screen welcome-screen">
      <div className="fox-container">
        <div className="fox">🦊</div>
      </div>
      <h1 className="title">Hi! I'm Finn!</h1>
      <p className="subtitle">I'm lost in the forest and I need your help to find my way home!</p>
      <p className="subtitle">Can you solve my forest puzzles?</p>
      <button className="big-button" onClick={() => {
        speak("Hi! I am Finn! I am lost in the forest and I need your help to find my way home! Can you solve my forest puzzles?");
        setTimeout(() => onStart(), 9000);
      }}>
        Let's Go! 🌲
      </button>
    </div>
  );
}

function AssessmentScreen({ onFinish }) {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [consecutiveIncorrect, setConsecutiveIncorrect] = useState(0);
  const [results, setResults] = useState([]);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const skills = Object.keys(SKILL_NAMES);
  const currentSkill = skills[currentSkillIndex];

  const skillQuestions = QUESTIONS.filter(
    q => q.skill === currentSkill && q.level === currentLevel
  );
  const question = skillQuestions[questionIndex % skillQuestions.length];


  function handleAnswer(choice) {
    if (answered) return;
    setAnswered(true);

    const isCorrect = String(choice) === String(question.answer);
    const reaction = isCorrect
      ? getRandomItem(FINN_REACTIONS.correct)
      : getRandomItem(FINN_REACTIONS.incorrect);

    speak(reaction);
    setFeedback({ isCorrect, reaction });

    const newResult = {
      skill: currentSkill,
      level: currentLevel,
      correct: isCorrect,
      questionId: question.id,
    };
    const newResults = [...results, newResult];
    setResults(newResults);

    if (isCorrect) {
      setStars(s => s + 1);
      const newCorrect = consecutiveCorrect + 1;
      setConsecutiveCorrect(newCorrect);
      setConsecutiveIncorrect(0);

      setTimeout(() => {
        setFeedback(null);
        setAnswered(false);
        if (newCorrect >= 2 && currentLevel < 3) {
          setCurrentLevel(l => l + 1);
          setConsecutiveCorrect(0);
          setQuestionIndex(0);
        } else {
          advanceSkill(newResults);
        }
      }, 2000);
    } else {
      const newIncorrect = consecutiveIncorrect + 1;
      setConsecutiveIncorrect(newIncorrect);
      setConsecutiveCorrect(0);

      setTimeout(() => {
        setFeedback(null);
        setAnswered(false);
        if (newIncorrect >= 2) {
          setConsecutiveIncorrect(0);
          advanceSkill(newResults);
        } else {
          setQuestionIndex(i => i + 1);
        }
      }, 2000);
    }
  }

  function advanceSkill(currentResults) {
    const nextSkillIndex = currentSkillIndex + 1;
    if (nextSkillIndex >= skills.length) {
      onFinish(currentResults, stars);
    } else {
      setCurrentSkillIndex(nextSkillIndex);
      setCurrentLevel(1);
      setConsecutiveCorrect(0);
      setConsecutiveIncorrect(0);
      setQuestionIndex(0);
    }
  }

  if (!question) {
    advanceSkill(results);
    return null;
  }

  const skillEmojis = {
    counting: '🌰',
    addition: '➕',
    subtraction: '➖',
    shapes: '🔺',
    comparing: '⚖️',
    ordering: '🔢',
  };

  return (
    <div className="screen assessment-screen">
      <div className="skill-badge">
        {skillEmojis[currentSkill]} {SKILL_NAMES[currentSkill]}
      </div>

      <div className="finn-small">🦊</div>

      {feedback && (
        <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
          {feedback.isCorrect ? '🎉' : '🌟'} {feedback.reaction}
        </div>
      )}

      {!feedback && (
        <>
          <div className="question-card">
           <p className="question-prompt">{question.prompt}</p>
            <button className="speak-button" onClick={() => speak(question.prompt)}>
              🔊 Hear the question
            </button>
            {question.type === 'count' && (
              <div className="items-display">{question.items}</div>
            )}
            {question.type === 'math' && (
              <div className="equation">{question.equation}</div>
            )}
            {question.type === 'shape' && (
              <div className="shape-display">{question.shape}</div>
            )}
            {question.type === 'compare' && (
              <div className="compare-display">
                <div className="compare-group">{question.left}</div>
                <div className="compare-vs">vs</div>
                <div className="compare-group">{question.right}</div>
              </div>
            )}
            {question.type === 'order' && (
              <div className="sequence-display">{question.sequence}</div>
            )}
          </div>

          <div className="choices">
            {question.choices.map((choice, i) => (
              <button
                key={i}
                className="choice-button"
                onClick={() => handleAnswer(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="stars-counter">⭐ {stars} stars</div>
    </div>
  );
}

function CelebrationScreen({ stars, onReport }) {
  React.useEffect(() => {
    speak("You did it! Finn made it home! You are an amazing math helper! You earned " + stars + " stars!");
  }, [stars]);

  return (
    <div className="screen celebration-screen">
      <div className="fox-container">
        <div className="fox">🦊</div>
      </div>
      <h1 className="title">Finn made it home!</h1>
      <p className="subtitle">You helped Finn through the whole forest!</p>
      <div className="stars-big">⭐ {stars} stars!</div>
      <p className="subtitle">You are an amazing math helper!</p>
      <div className="paw-button" onClick={onReport}>🐾</div>
    </div>
  );
}

function ReportScreen({ results, onBack }) {
  const skills = Object.keys(SKILL_NAMES);

  const skillStats = skills.map(skill => {
    const skillResults = results.filter(r => r.skill === skill);
    const correct = skillResults.filter(r => r.correct).length;
    const total = skillResults.length;
    const maxLevel = skillResults.length > 0
      ? Math.max(...skillResults.map(r => r.level))
      : 0;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { skill, correct, total, maxLevel, pct };
  });

  const strong = skillStats.filter(s => s.pct >= 70);
  const needsWork = skillStats.filter(s => s.pct < 70 && s.total > 0);

  return (
    <div className="screen report-screen">
      <h2 className="report-title">📊 Jack's Report</h2>
      <p className="report-subtitle">NC Kindergarten Math Assessment</p>

      {strong.length > 0 && (
        <div className="report-section">
          <h3 className="report-section-title">💪 Strong Skills</h3>
          {strong.map(s => (
            <div key={s.skill} className="skill-row strong">
              <span>{SKILL_NAMES[s.skill]}</span>
              <span>{s.pct}% · Level {s.maxLevel}</span>
            </div>
          ))}
        </div>
      )}

      {needsWork.length > 0 && (
        <div className="report-section">
          <h3 className="report-section-title">🌱 Needs Practice</h3>
          {needsWork.map(s => (
            <div key={s.skill} className="skill-row needs-work">
              <span>{SKILL_NAMES[s.skill]}</span>
              <span>{s.pct}% · Level {s.maxLevel}</span>
            </div>
          ))}
        </div>
      )}

      <div className="report-section">
        <h3 className="report-section-title">📋 Full Breakdown</h3>
        {skillStats.map(s => (
          <div key={s.skill} className="skill-row">
            <span>{SKILL_NAMES[s.skill]}</span>
            <span>{s.correct}/{s.total} correct</span>
          </div>
        ))}
      </div>

      <button className="big-button" onClick={onBack}>
        Play Again 🦊
      </button>
    </div>
  );
}