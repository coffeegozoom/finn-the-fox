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
  // COUNTING - Level 1
  { id: 1, skill: 'counting', level: 1, type: 'count', prompt: 'How many acorns does Finn have?', items: '🌰🌰🌰', answer: 3, choices: [2, 3, 4] },
  { id: 2, skill: 'counting', level: 1, type: 'count', prompt: 'How many rabbits did Finn meet?', items: '🐰🐰🐰🐰', answer: 4, choices: [3, 4, 5] },
  { id: 3, skill: 'counting', level: 1, type: 'count', prompt: 'How many mushrooms are in the forest?', items: '🍄🍄🍄🍄🍄', answer: 5, choices: [4, 5, 6] },
  { id: 4, skill: 'counting', level: 1, type: 'count', prompt: 'How many frogs jumped past Finn?', items: '🐸🐸', answer: 2, choices: [1, 2, 3] },
  { id: 5, skill: 'counting', level: 1, type: 'count', prompt: 'How many owls did Finn see in the trees?', items: '🦉🦉🦉', answer: 3, choices: [2, 3, 4] },
  { id: 6, skill: 'counting', level: 1, type: 'count', prompt: 'How many ducks are swimming?', items: '🦆🦆🦆🦆', answer: 4, choices: [3, 4, 5] },

  // COUNTING - Level 2
  { id: 7, skill: 'counting', level: 2, type: 'count', prompt: 'How many berries did Finn find?', items: '🫐🫐🫐🫐🫐🫐🫐', answer: 7, choices: [6, 7, 8] },
  { id: 8, skill: 'counting', level: 2, type: 'count', prompt: 'How many butterflies flew past Finn?', items: '🦋🦋🦋🦋🦋🦋🦋🦋🦋', answer: 9, choices: [8, 9, 10] },
  { id: 9, skill: 'counting', level: 2, type: 'count', prompt: 'How many fish are in the pond?', items: '🐟🐟🐟🐟🐟🐟', answer: 6, choices: [5, 6, 7] },
  { id: 10, skill: 'counting', level: 2, type: 'count', prompt: 'How many snails did Finn pass?', items: '🐌🐌🐌🐌🐌🐌🐌🐌', answer: 8, choices: [7, 8, 9] },
  { id: 11, skill: 'counting', level: 2, type: 'count', prompt: 'How many birds are singing?', items: '🐦🐦🐦🐦🐦🐦🐦', answer: 7, choices: [6, 7, 8] },
  { id: 12, skill: 'counting', level: 2, type: 'count', prompt: 'How many bees flew by?', items: '🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝', answer: 10, choices: [9, 10, 11] },

  // COUNTING - Level 3
  { id: 13, skill: 'counting', level: 3, type: 'count', prompt: 'How many flowers did Finn pass?', items: '🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸', answer: 12, choices: [11, 12, 13] },
  { id: 14, skill: 'counting', level: 3, type: 'count', prompt: 'How many ants marched by?', items: '🐜🐜🐜🐜🐜🐜🐜🐜🐜🐜🐜🐜🐜🐜🐜', answer: 15, choices: [14, 15, 16] },
  { id: 15, skill: 'counting', level: 3, type: 'count', prompt: 'How many leaves fell from the tree?', items: '🍂🍂🍂🍂🍂🍂🍂🍂🍂🍂🍂🍂🍂', answer: 13, choices: [12, 13, 14] },

  // ADDITION - Level 1
  { id: 16, skill: 'addition', level: 1, type: 'math', prompt: 'Finn has 2 acorns. He finds 1 more. How many now?', equation: '2 + 1 = ?', answer: 3, choices: [2, 3, 4] },
  { id: 17, skill: 'addition', level: 1, type: 'math', prompt: 'Finn sees 1 rabbit. Then 2 more hop over. How many rabbits?', equation: '1 + 2 = ?', answer: 3, choices: [2, 3, 4] },
  { id: 18, skill: 'addition', level: 1, type: 'math', prompt: 'Finn has 3 berries. He picks 2 more. How many now?', equation: '3 + 2 = ?', answer: 5, choices: [4, 5, 6] },
  { id: 19, skill: 'addition', level: 1, type: 'math', prompt: 'Two frogs sit on a log. One more jumps on. How many frogs?', equation: '2 + 1 = ?', answer: 3, choices: [2, 3, 4] },
  { id: 20, skill: 'addition', level: 1, type: 'math', prompt: 'Finn found 2 feathers. Then 2 more. How many feathers?', equation: '2 + 2 = ?', answer: 4, choices: [3, 4, 5] },
  { id: 21, skill: 'addition', level: 1, type: 'math', prompt: 'One owl is hooting. Then 4 more owls join. How many owls?', equation: '1 + 4 = ?', answer: 5, choices: [4, 5, 6] },

  // ADDITION - Level 2
  { id: 22, skill: 'addition', level: 2, type: 'math', prompt: 'Finn found 4 mushrooms. Then 3 more! How many?', equation: '4 + 3 = ?', answer: 7, choices: [6, 7, 8] },
  { id: 23, skill: 'addition', level: 2, type: 'math', prompt: 'Finn saw 5 butterflies then 4 more flew by. How many?', equation: '5 + 4 = ?', answer: 9, choices: [8, 9, 10] },
  { id: 24, skill: 'addition', level: 2, type: 'math', prompt: 'Three deer are drinking. Five more arrive. How many deer?', equation: '3 + 5 = ?', answer: 8, choices: [7, 8, 9] },
  { id: 25, skill: 'addition', level: 2, type: 'math', prompt: 'Finn counted 6 fish. Then 2 more swam up. How many fish?', equation: '6 + 2 = ?', answer: 8, choices: [7, 8, 9] },
  { id: 26, skill: 'addition', level: 2, type: 'math', prompt: 'Four squirrels are playing. Three more join them. How many?', equation: '4 + 3 = ?', answer: 7, choices: [6, 7, 8] },

  // ADDITION - Level 3
  { id: 27, skill: 'addition', level: 3, type: 'math', prompt: 'Finn collected 6 flowers and 5 leaves. How many things?', equation: '6 + 5 = ?', answer: 11, choices: [10, 11, 12] },
  { id: 28, skill: 'addition', level: 3, type: 'math', prompt: 'Seven frogs plus four more frogs. How many frogs total?', equation: '7 + 4 = ?', answer: 11, choices: [10, 11, 12] },
  { id: 29, skill: 'addition', level: 3, type: 'math', prompt: 'Finn sees 8 birds and 4 butterflies. How many total?', equation: '8 + 4 = ?', answer: 12, choices: [11, 12, 13] },

  // SUBTRACTION - Level 1
  { id: 30, skill: 'subtraction', level: 1, type: 'math', prompt: 'Finn had 4 acorns. He gave 1 to a squirrel. How many left?', equation: '4 - 1 = ?', answer: 3, choices: [2, 3, 4] },
  { id: 31, skill: 'subtraction', level: 1, type: 'math', prompt: 'Finn had 5 berries. He ate 2. How many left?', equation: '5 - 2 = ?', answer: 3, choices: [2, 3, 4] },
  { id: 32, skill: 'subtraction', level: 1, type: 'math', prompt: 'Three rabbits were sitting. One hopped away. How many left?', equation: '3 - 1 = ?', answer: 2, choices: [1, 2, 3] },
  { id: 33, skill: 'subtraction', level: 1, type: 'math', prompt: 'Finn had 4 feathers. He lost 2. How many left?', equation: '4 - 2 = ?', answer: 2, choices: [1, 2, 3] },
  { id: 34, skill: 'subtraction', level: 1, type: 'math', prompt: 'Five frogs on a log. Two jumped off. How many left?', equation: '5 - 2 = ?', answer: 3, choices: [2, 3, 4] },

  // SUBTRACTION - Level 2
  { id: 35, skill: 'subtraction', level: 2, type: 'math', prompt: 'Finn had 8 mushrooms. He dropped 3. How many left?', equation: '8 - 3 = ?', answer: 5, choices: [4, 5, 6] },
  { id: 36, skill: 'subtraction', level: 2, type: 'math', prompt: 'Finn had 9 flowers. He gave 4 to a deer. How many left?', equation: '9 - 4 = ?', answer: 5, choices: [4, 5, 6] },
  { id: 37, skill: 'subtraction', level: 2, type: 'math', prompt: 'Seven birds were singing. Two flew away. How many left?', equation: '7 - 2 = ?', answer: 5, choices: [4, 5, 6] },
  { id: 38, skill: 'subtraction', level: 2, type: 'math', prompt: 'Finn counted 9 fish. Three swam away. How many left?', equation: '9 - 3 = ?', answer: 6, choices: [5, 6, 7] },

  // SUBTRACTION - Level 3
  { id: 39, skill: 'subtraction', level: 3, type: 'math', prompt: 'Finn had 10 acorns. A bird took 6! How many left?', equation: '10 - 6 = ?', answer: 4, choices: [3, 4, 5] },
  { id: 40, skill: 'subtraction', level: 3, type: 'math', prompt: 'Twelve butterflies were flying. Five landed. How many still flying?', equation: '12 - 5 = ?', answer: 7, choices: [6, 7, 8] },
  { id: 41, skill: 'subtraction', level: 3, type: 'math', prompt: 'Finn had 11 berries. He shared 4 with a rabbit. How many left?', equation: '11 - 4 = ?', answer: 7, choices: [6, 7, 8] },

  // SHAPES - Level 1
  { id: 42, skill: 'shapes', level: 1, type: 'shape', prompt: 'Finn found a shape on a tree. What shape is this?', shape: '⬜', answer: 'square', choices: ['circle', 'square', 'triangle'] },
  { id: 43, skill: 'shapes', level: 1, type: 'shape', prompt: 'Finn sees a shape in the pond. What shape is this?', shape: '⭕', answer: 'circle', choices: ['circle', 'square', 'triangle'] },
  { id: 44, skill: 'shapes', level: 1, type: 'shape', prompt: 'A rabbit showed Finn this shape. What shape is it?', shape: '🔺', answer: 'triangle', choices: ['circle', 'square', 'triangle'] },
  { id: 45, skill: 'shapes', level: 1, type: 'shape', prompt: 'An owl drew this shape in the dirt. What shape is it?', shape: '⭕', answer: 'circle', choices: ['circle', 'square', 'triangle'] },

  // SHAPES - Level 2
  { id: 46, skill: 'shapes', level: 2, type: 'shape', prompt: 'Finn found a sign in the forest. What shape is this?', shape: '🔺', answer: 'triangle', choices: ['circle', 'triangle', 'rectangle'] },
  { id: 47, skill: 'shapes', level: 2, type: 'shape', prompt: 'Finn sees a shape on the barn door. What shape is this?', shape: '▬', answer: 'rectangle', choices: ['square', 'triangle', 'rectangle'] },
  { id: 48, skill: 'shapes', level: 2, type: 'shape', prompt: 'A deer showed Finn this shape. What shape is it?', shape: '⬜', answer: 'square', choices: ['rectangle', 'square', 'triangle'] },
  { id: 49, skill: 'shapes', level: 2, type: 'shape', prompt: 'Finn found this shape carved in a tree. What shape is it?', shape: '▬', answer: 'rectangle', choices: ['square', 'circle', 'rectangle'] },

  // SHAPES - Level 3
  { id: 50, skill: 'shapes', level: 3, type: 'shape', prompt: 'Finn found a gem! What shape is this?', shape: '♦️', answer: 'diamond', choices: ['square', 'diamond', 'rectangle'] },
  { id: 51, skill: 'shapes', level: 3, type: 'shape', prompt: 'A wise owl showed Finn this special shape. What is it?', shape: '♦️', answer: 'diamond', choices: ['triangle', 'diamond', 'circle'] },

  // COMPARING - Level 1
  { id: 52, skill: 'comparing', level: 1, type: 'compare', prompt: 'Which group has more?', left: '🌰🌰', right: '🌰🌰🌰🌰', answer: 'right group', choices: ['left group', 'right group', 'they are equal'] },
  { id: 53, skill: 'comparing', level: 1, type: 'compare', prompt: 'Which group has fewer?', left: '🐰🐰🐰', right: '🐰🐰', answer: 'right group', choices: ['left group', 'right group', 'they are equal'] },
  { id: 54, skill: 'comparing', level: 1, type: 'compare', prompt: 'Which group has more?', left: '🐸🐸🐸', right: '🐸', answer: 'left group', choices: ['left group', 'right group', 'they are equal'] },
  { id: 55, skill: 'comparing', level: 1, type: 'compare', prompt: 'Which group has fewer?', left: '🦆', right: '🦆🦆🦆🦆', answer: 'left group', choices: ['left group', 'right group', 'they are equal'] },
  { id: 56, skill: 'comparing', level: 1, type: 'compare', prompt: 'Are these groups equal?', left: '🐦🐦🐦', right: '🐦🐦🐦', answer: 'they are equal', choices: ['left group has more', 'right group has more', 'they are equal'] },

  // COMPARING - Level 2
  { id: 57, skill: 'comparing', level: 2, type: 'compare', prompt: 'Which group has more?', left: '🫐🫐🫐🫐🫐', right: '🫐🫐🫐', answer: 'left group', choices: ['left group', 'right group', 'they are equal'] },
  { id: 58, skill: 'comparing', level: 2, type: 'compare', prompt: 'Are these groups equal?', left: '🌸🌸🌸🌸', right: '🌸🌸🌸🌸', answer: 'they are equal', choices: ['left group has more', 'right group has more', 'they are equal'] },
  { id: 59, skill: 'comparing', level: 2, type: 'compare', prompt: 'Which group has fewer?', left: '🐜🐜🐜🐜🐜🐜', right: '🐜🐜🐜🐜', answer: 'right group', choices: ['left group', 'right group', 'they are equal'] },
  { id: 60, skill: 'comparing', level: 2, type: 'compare', prompt: 'Which group has more?', left: '🦋🦋', right: '🦋🦋🦋🦋🦋🦋', answer: 'right group', choices: ['left group', 'right group', 'they are equal'] },

  // COMPARING - Level 3
  { id: 61, skill: 'comparing', level: 3, type: 'compare', prompt: 'Which number is bigger?', left: '14', right: '9', answer: 'left number', choices: ['left number', 'right number', 'they are equal'] },
  { id: 62, skill: 'comparing', level: 3, type: 'compare', prompt: 'Which number is smaller?', left: '17', right: '12', answer: 'right number', choices: ['left number', 'right number', 'they are equal'] },
  { id: 63, skill: 'comparing', level: 3, type: 'compare', prompt: 'Which number is bigger?', left: '8', right: '15', answer: 'right number', choices: ['left number', 'right number', 'they are equal'] },

  // ORDERING - Level 1
  { id: 64, skill: 'ordering', level: 1, type: 'order', prompt: 'What number comes next? 1, 2, 3, blank', sequence: '1, 2, 3, __', answer: 4, choices: [3, 4, 5] },
  { id: 65, skill: 'ordering', level: 1, type: 'order', prompt: 'What number comes next? 5, 6, 7, blank', sequence: '5, 6, 7, __', answer: 8, choices: [7, 8, 9] },
  { id: 66, skill: 'ordering', level: 1, type: 'order', prompt: 'What number comes next? 2, 3, 4, blank', sequence: '2, 3, 4, __', answer: 5, choices: [4, 5, 6] },
  { id: 67, skill: 'ordering', level: 1, type: 'order', prompt: 'What number comes next? 7, 8, 9, blank', sequence: '7, 8, 9, __', answer: 10, choices: [9, 10, 11] },
  { id: 68, skill: 'ordering', level: 1, type: 'order', prompt: 'What number comes next? 3, 4, 5, blank', sequence: '3, 4, 5, __', answer: 6, choices: [5, 6, 7] },

  // ORDERING - Level 2
  { id: 69, skill: 'ordering', level: 2, type: 'order', prompt: 'What number is missing? 3, 4, blank, 6', sequence: '3, 4, __, 6', answer: 5, choices: [4, 5, 7] },
  { id: 70, skill: 'ordering', level: 2, type: 'order', prompt: 'What number comes next? 10, 20, 30, blank', sequence: '10, 20, 30, __', answer: 40, choices: [35, 40, 50] },
  { id: 71, skill: 'ordering', level: 2, type: 'order', prompt: 'What number is missing? 6, 7, blank, 9', sequence: '6, 7, __, 9', answer: 8, choices: [7, 8, 10] },
  { id: 72, skill: 'ordering', level: 2, type: 'order', prompt: 'What number is missing? 1, blank, 3, 4', sequence: '1, __, 3, 4', answer: 2, choices: [1, 2, 5] },
  { id: 73, skill: 'ordering', level: 2, type: 'order', prompt: 'What number comes next? 20, 30, 40, blank', sequence: '20, 30, 40, __', answer: 50, choices: [45, 50, 60] },

  // ORDERING - Level 3
  { id: 74, skill: 'ordering', level: 3, type: 'order', prompt: 'What number is missing? 15, blank, 17, 18', sequence: '15, __, 17, 18', answer: 16, choices: [14, 16, 19] },
  { id: 75, skill: 'ordering', level: 3, type: 'order', prompt: 'What number is missing? 11, 12, blank, 14', sequence: '11, 12, __, 14', answer: 13, choices: [11, 13, 15] },
  { id: 76, skill: 'ordering', level: 3, type: 'order', prompt: 'What number comes next? 16, 17, 18, blank', sequence: '16, 17, 18, __', answer: 19, choices: [18, 19, 20] },
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
  correct: [
    'Yay! You got it!',
    'Wow, you are so smart!',
    'Amazing! Finn is so happy!',
    'That is right! Let us keep going!',
    'You are a math superstar!',
    'Incredible! You are helping Finn so much!',
    'Fantastic job! The forest animals are cheering for you!',
    'You are so good at this!',
  ],
  incorrect: [
    'Oops! Let us try the next one!',
    'Almost! Finn still believes in you!',
    'Not quite, but you are doing great!',
    'Keep trying, you have got this!',
    'That was a tricky one! Let us keep going!',
  ],
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function buildSessionQueue() {
  const skills = Object.keys(SKILL_NAMES);
  const queue = [];

  skills.forEach(skill => {
    // Pick one Level 1 question
    const level1 = shuffleArray(QUESTIONS.filter(q => q.skill === skill && q.level === 1));
    if (level1.length > 0) queue.push({ ...level1[0], attemptInSkill: 1 });

    // Pick one harder question (Level 2 or 3)
    const harder = shuffleArray(QUESTIONS.filter(q => q.skill === skill && q.level >= 2));
    if (harder.length > 0) queue.push({ ...harder[0], attemptInSkill: 1 });
  });

  return shuffleArray(queue);
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
          onPlayAgain={() => setScreen('welcome')}
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
        setTimeout(() => onStart(), 8000);
      }}>
        Let's Go! 🌲
      </button>
    </div>
  );
}

function AssessmentScreen({ onFinish }) {
  const [sessionQueue] = useState(() => buildSessionQueue());
  const [queueIndex, setQueueIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [retryUsed, setRetryUsed] = useState(false);

  const totalQuestions = sessionQueue.length;
  const currentQuestion = sessionQueue[queueIndex];

  const skillEmojis = {
    counting: '🌰',
    addition: '➕',
    subtraction: '➖',
    shapes: '🔺',
    comparing: '⚖️',
    ordering: '🔢',
  };

  function handleAnswer(choice) {
    if (answered || !currentQuestion) return;
    setAnswered(true);

    const isCorrect = String(choice) === String(currentQuestion.answer);
    const reaction = isCorrect
      ? getRandomItem(FINN_REACTIONS.correct)
      : getRandomItem(FINN_REACTIONS.incorrect);

    speak(reaction);
    setFeedback({ isCorrect, reaction });

    const newResult = {
      skill: currentQuestion.skill,
      level: currentQuestion.level,
      correct: isCorrect,
      questionId: currentQuestion.id,
    };
    const newResults = [...results, newResult];
    setResults(newResults);

    const newStars = isCorrect ? stars + 1 : stars;
    if (isCorrect) setStars(newStars);

    const nextIndex = queueIndex + 1;
    const isLastQuestion = nextIndex >= totalQuestions;

    if (isCorrect) {
      setRetryUsed(false);
      setTimeout(() => {
        setFeedback(null);
        setAnswered(false);
        if (isLastQuestion) {
          onFinish(newResults, newStars);
        } else {
          setQueueIndex(nextIndex);
        }
      }, 2000);
    } else {
      if (currentQuestion.level >= 2 && !retryUsed) {
        setRetryUsed(true);
        setTimeout(() => {
          setFeedback(null);
          setAnswered(false);
        }, 2000);
      } else {
        setRetryUsed(false);
        setTimeout(() => {
          setFeedback(null);
          setAnswered(false);
          if (isLastQuestion) {
            onFinish(newResults, newStars);
          } else {
            setQueueIndex(nextIndex);
          }
        }, 2000);
      }
    }
  }

  if (!currentQuestion) return null;

  return (
    <div className="screen assessment-screen">
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${(queueIndex / totalQuestions) * 100}%` }}
        />
      </div>
      <div className="progress-text">{queueIndex + 1} of {totalQuestions}</div>

      <div className="skill-badge">
        {skillEmojis[currentQuestion.skill]} {SKILL_NAMES[currentQuestion.skill]}
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
            <p className="question-prompt">{currentQuestion.prompt}</p>

            {currentQuestion.type === 'count' && (
              <div className="items-display">{currentQuestion.items}</div>
            )}
            {currentQuestion.type === 'math' && (
              <div className="equation">{currentQuestion.equation}</div>
            )}
            {currentQuestion.type === 'shape' && (
              <div className="shape-display">{currentQuestion.shape}</div>
            )}
            {currentQuestion.type === 'compare' && (
              <div className="compare-display">
                <div className="compare-group">{currentQuestion.left}</div>
                <div className="compare-vs">vs</div>
                <div className="compare-group">{currentQuestion.right}</div>
              </div>
            )}
            {currentQuestion.type === 'order' && (
              <div className="sequence-display">{currentQuestion.sequence}</div>
            )}

            <button className="speak-button" onClick={() => speak(currentQuestion.prompt)}>
              🔊 Hear the question
            </button>
          </div>

          <div className="choices">
            {currentQuestion.choices.map((choice, i) => (
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

function CelebrationScreen({ stars, onReport, onPlayAgain }) {
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
      <button className="big-button" onClick={onPlayAgain}>
        Play Again 🦊
      </button>
      <button className="parent-button" onClick={onReport}>
        Parent Report 🐾
      </button>
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