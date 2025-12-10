"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import "./styles.css";

type FixType =
  | "alt-text"
  | "input-validation"
  | "user-login"
  | "database-security";

interface Message {
  id: string;
  source: "boss" | "family" | "agile" | "critical";
  content: string;
  timestamp: number;
  isUrgent: boolean;
  fixType?: FixType;
}

interface Violation {
  type: "disability-act" | "laws-of-tort" | "bankruptcy";
  fixType: FixType;
  timestamp: number;
  message: string;
}

const BOSS_MESSAGES = [
  "Are you done with sprint 1?",
  "Client needs an update on progress",
  "Can you join the standup in 5 minutes?",
  "How's the deadline looking?",
];

const FAMILY_MESSAGES = [
  "Can you pick up the kids after work?",
  "Dinner plans tonight?",
  "Don't forget we have that appointment tomorrow",
  "Can you grab groceries on the way home?",
];

const AGILE_MESSAGES = [
  "Fix Title colour to Red",
  "Update button text to 'Submit'",
  "Change margin to 20px",
  "Add hover effect to links",
];

const CRITICAL_CHALLENGES: Record<
  FixType,
  { initial: string; urgent: string; hint: string }
> = {
  "alt-text": {
    initial: "Fix alt in img1",
    urgent: "URGENT: Fix alt in img1",
    hint: 'Add alt="description" to <img> tag',
  },
  "input-validation": {
    initial: "Fix input validation",
    urgent: "URGENT: Fix input validation",
    hint: "Add validation or sanitize keywords",
  },
  "user-login": {
    initial: "Fix User login",
    urgent: "CAREFUL: Fix User login (don't break it!)",
    hint: "Keep login functionality intact",
  },
  "database-security": {
    initial: "Fix Secure Database",
    urgent: "URGENT: Fix Secure Database",
    hint: "Add encryption or secure keywords",
  },
};

export default function CourtRoomPage() {
  const [gameStatus, setGameStatus] = useState<
    "idle" | "playing" | "paused" | "won" | "lost"
  >("idle");
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [customTime, setCustomTime] = useState(10);
  const [code, setCode] = useState(
    `<img src="example.jpg">\n<input type="text">\n// Add your fixes below\n`
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [completedFixes, setCompletedFixes] = useState<Set<FixType>>(new Set());
  const [warnings, setWarnings] = useState<Map<FixType, number>>(new Map());
  const [violations, setViolations] = useState<Violation[]>([]);
  const [currentScene, setCurrentScene] = useState<"desk" | "court">("desk");
  const [visibleMessageId, setVisibleMessageId] = useState<string | null>(null);

  const messageIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const validateCode = useCallback(() => {
    const fixes = new Set<FixType>();

    if (code.includes('alt="') && code.includes("img")) {
      fixes.add("alt-text");
    }
    if (code.includes("validation") || code.includes("sanitize")) {
      fixes.add("input-validation");
    }
    if (code.includes("encryption") || code.includes("secure")) {
      fixes.add("database-security");
    }
    if (!code.includes("remove login") && code.includes("login")) {
      fixes.add("user-login");
    } else if (code.includes("remove login")) {
      setViolations((prev) => [
        ...prev,
        {
          type: "bankruptcy",
          fixType: "user-login",
          timestamp: Date.now(),
          message:
            "You broke user login! Nobody can access the app. Game Over - Bankruptcy!",
        },
      ]);
      setGameStatus("lost");
      setCurrentScene("court");
    }

    setCompletedFixes(fixes);
  }, [code]);

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const now = Date.now();
    const newWarnings = new Map(warnings);
    const criticalFixes: FixType[] = [
      "alt-text",
      "input-validation",
      "database-security",
    ];

    criticalFixes.forEach((fix) => {
      if (!completedFixes.has(fix)) {
        const warningTime = newWarnings.get(fix);

        if (!warningTime) {
          if (now - startTimeRef.current >= 120000) {
            newWarnings.set(fix, now);
          }
        } else if (now - warningTime >= 120000) {
          let violationType: "disability-act" | "laws-of-tort" = "laws-of-tort";
          let message = "";

          if (fix === "alt-text") {
            violationType = "disability-act";
            message =
              "Failed to fix accessibility issues. You are in violation of the Disability Act!";
          } else {
            message =
              "Security vulnerability exploited after known issue. You are liable under Laws of Tort!";
          }

          setViolations((prev) => [
            ...prev,
            {
              type: violationType,
              fixType: fix,
              timestamp: now,
              message,
            },
          ]);
          setGameStatus("lost");
          setCurrentScene("court");
        }
      }
    });

    setWarnings(newWarnings);
  }, [completedFixes, gameStatus, warnings]);

  const generateMessage = useCallback(() => {
    const sources: Array<"boss" | "family" | "agile" | "critical"> = [
      "boss",
      "family",
      "agile",
      "critical",
    ];
    const source = sources[Math.floor(Math.random() * sources.length)];

    let content = "";
    let fixType: FixType | undefined;
    let isUrgent = false;

    if (source === "boss") {
      content = BOSS_MESSAGES[Math.floor(Math.random() * BOSS_MESSAGES.length)];
    } else if (source === "family") {
      content =
        FAMILY_MESSAGES[Math.floor(Math.random() * FAMILY_MESSAGES.length)];
    } else if (source === "agile") {
      content =
        AGILE_MESSAGES[Math.floor(Math.random() * AGILE_MESSAGES.length)];
    } else {
      const criticalFixes: FixType[] = [
        "alt-text",
        "input-validation",
        "database-security",
        "user-login",
      ];
      const incompleteFixes = criticalFixes.filter(
        (f) => !completedFixes.has(f)
      );

      if (incompleteFixes.length > 0) {
        fixType =
          incompleteFixes[Math.floor(Math.random() * incompleteFixes.length)];
        const challenge = CRITICAL_CHALLENGES[fixType];
        isUrgent = warnings.has(fixType);
        content = isUrgent ? challenge.urgent : challenge.initial;
      } else {
        return;
      }
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random()}`,
      source,
      content,
      timestamp: Date.now(),
      isUrgent,
      fixType,
    };

    setMessages((prev) => [...prev, newMessage]);
    setVisibleMessageId(newMessage.id);

    setTimeout(() => {
      setVisibleMessageId(null);
    }, 5000);
  }, [completedFixes, warnings]);

  const startGame = () => {
    setGameStatus("playing");
    startTimeRef.current = Date.now();
    setMessages([]);
    setCompletedFixes(new Set());
    setWarnings(new Map());
    setViolations([]);
    setCurrentScene("desk");

    const scheduleNextMessage = () => {
      const delay = Math.floor(Math.random() * 10000) + 20000;
      messageIntervalRef.current = setTimeout(() => {
        generateMessage();
        scheduleNextMessage();
      }, delay);
    };
    scheduleNextMessage();
  };

  const pauseGame = () => setGameStatus("paused");
  const resumeGame = () => setGameStatus("playing");

  const resetGame = () => {
    setGameStatus("idle");
    setTimeRemaining(customTime * 60);
    setCode(
      `<img src="example.jpg">\n<input type="text">\n// Add your fixes below\n`
    );
    setMessages([]);
    setCompletedFixes(new Set());
    setWarnings(new Map());
    setViolations([]);
    setCurrentScene("desk");
    setVisibleMessageId(null);

    if (messageIntervalRef.current) clearTimeout(messageIntervalRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const setTime = () => setTimeRemaining(customTime * 60);

  const generateHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Court Room Debugging Challenge</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      min-height: 100vh;
      transition: background 0.5s ease;
    }
    body.desk-scene { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    body.court-scene { background: linear-gradient(135deg, #8B4513 0%, #2c1810 100%); }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .card {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 12px 24px rgba(15, 23, 42, 0.15);
    }
    h1 { font-size: 2rem; margin-bottom: 1rem; color: #0f172a; }
    p { margin-bottom: 1.5rem; color: #475569; }
    .timer-section {
      background: #f1f5f9;
      padding: 1.5rem;
      border-radius: 1rem;
      margin-bottom: 1.5rem;
    }
    .timer-display {
      font-size: 2rem;
      font-weight: bold;
      font-family: 'Courier New', monospace;
      color: #0f172a;
      margin-bottom: 1rem;
    }
    .timer-display.urgent {
      color: #ef4444;
      animation: pulse 1s infinite;
    }
    button {
      border: none;
      border-radius: 0.75rem;
      padding: 0.65rem 1.1rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      margin-right: 0.75rem;
      margin-bottom: 0.5rem;
      transition: transform 0.2s ease;
    }
    button.primary {
      background: #3b82f6;
      color: white;
      box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
    }
    button.primary:hover { transform: translateY(-1px); }
    button.secondary {
      background: #e2e8f0;
      color: #0f172a;
    }
    .fix-tracker {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    .fix-badge {
      padding: 0.75rem;
      border-radius: 0.5rem;
      font-weight: 600;
      text-align: center;
      border: 2px solid;
    }
    .fix-badge.completed {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border-color: #10b981;
      color: white;
    }
    .fix-badge.warning {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      border-color: #ef4444;
      color: white;
    }
    .fix-badge.pending {
      background: #f1f5f9;
      border-color: #cbd5e1;
      color: #0f172a;
    }
    textarea {
      width: 100%;
      min-height: 200px;
      padding: 1rem;
      border-radius: 0.75rem;
      border: 1px solid #cbd5e1;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
    .victory-banner {
      padding: 2rem;
      border-radius: 1rem;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      text-align: center;
      margin-bottom: 1.5rem;
      animation: victoryBounce 0.5s ease;
    }
    .court-banner {
      padding: 2rem;
      border-radius: 1rem;
      background: rgba(139, 69, 19, 0.95);
      color: white;
      border: 3px solid #8B4513;
      margin-bottom: 1.5rem;
      animation: gavelSlam 0.5s ease;
    }
    .violation-item {
      background: rgba(0, 0, 0, 0.3);
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .message-popup {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      max-width: 400px;
      padding: 1rem;
      border-radius: 0.75rem;
      background: white;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      animation: slideInRight 0.3s ease;
      z-index: 1000;
      display: none;
    }
    .message-popup.show { display: block; }
    .message-popup.urgent { border: 3px solid #ef4444; }
    .message-popup.normal { border: 3px solid #f59e0b; }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes victoryBounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes gavelSlam {
      0% { transform: translateY(-20px); opacity: 0; }
      50% { transform: translateY(5px); }
      100% { transform: translateY(0); opacity: 1; }
    }
  </style>
</head>
<body class="desk-scene">
  <div class="container">
    <div class="card">
      <h1>⚖️ Court Room Debugging Challenge</h1>
      <p>Fix critical bugs while managing interruptions. Ignore accessibility or security issues too long, and face legal consequences!</p>
      
      <div class="timer-section">
        <h2 style="margin-bottom: 1rem;">⏱️ Timer</h2>
        <div class="timer-display" id="timer">10:00</div>
        <button class="primary" onclick="startGame()">▶ Start Game</button>
        <button class="secondary" onclick="pauseGame()" style="display: none;" id="pauseBtn">⏸ Pause</button>
        <button class="primary" onclick="resumeGame()" style="display: none;" id="resumeBtn">▶ Resume</button>
        <button class="secondary" onclick="resetGame()" style="display: none;" id="resetBtn">🔄 Reset</button>
        <button class="primary" onclick="resetGame()" style="display: none;" id="playAgainBtn">🔄 Play Again</button>
      </div>

      <div id="fixTracker" style="display: none;">
        <h2 style="margin-bottom: 1rem;">✅ Fix Progress</h2>
        <div class="fix-tracker">
          <div class="fix-badge pending" id="fix-alt">○ Alt Text</div>
          <div class="fix-badge pending" id="fix-validation">○ Input Validation</div>
          <div class="fix-badge pending" id="fix-login">○ User Login</div>
          <div class="fix-badge pending" id="fix-db">○ Database Security</div>
        </div>
      </div>

      <div id="editorSection" style="display: none;">
        <h2 style="margin-bottom: 0.5rem;">💻 Code Editor</h2>
        <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 0.5rem;">Fix the issues below. Hints appear in messages!</p>
        <textarea id="codeEditor">&lt;img src="example.jpg"&gt;
&lt;input type="text"&gt;
// Add your fixes below
</textarea>
      </div>

      <div id="victoryBanner" style="display: none;" class="victory-banner">
        <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">🎉 Victory!</h2>
        <p style="font-size: 1.1rem;">You completed all critical fixes without violations. Well done!</p>
      </div>

      <div id="courtBanner" style="display: none;" class="court-banner">
        <h2 style="font-size: 2rem; margin-bottom: 1rem; text-align: center;">⚖️ Court Room</h2>
        <div id="violations"></div>
      </div>
    </div>
  </div>

  <div id="messagePopup" class="message-popup"></div>

  <script>
    let gameStatus = 'idle';
    let timeRemaining = 600;
    let code = '';
    let completedFixes = new Set();
    let warnings = new Map();
    let violations = [];
    let startTime = 0;
    let timerInterval = null;
    let messageTimeout = null;

    const BOSS_MESSAGES = ["Are you done with sprint 1?", "Client needs update"];
    const FAMILY_MESSAGES = ["Pick up the kids?", "Dinner plans tonight?"];
    const AGILE_MESSAGES = ["Fix Title colour to Red", "Update button text"];
    const CRITICAL_CHALLENGES = {
      'alt': { msg: 'Fix alt in img1', urgent: 'URGENT: Fix alt in img1' },
      'validation': { msg: 'Fix input validation', urgent: 'URGENT: Fix input validation' },
      'login': { msg: 'Fix User login', urgent: 'CAREFUL: Fix User login' },
      'db': { msg: 'Fix Secure Database', urgent: 'URGENT: Fix Secure Database' }
    };

    function formatTime(secs) {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return m + ':' + (s < 10 ? '0' : '') + s;
    }

    function validateCode() {
      const c = document.getElementById('codeEditor').value;
      const fixes = new Set();
      if (c.includes('alt="') && c.includes('img')) fixes.add('alt');
      if (c.includes('validation') || c.includes('sanitize')) fixes.add('validation');
      if (c.includes('encryption') || c.includes('secure')) fixes.add('db');
      if (!c.includes('remove login') && c.includes('login')) fixes.add('login');
      else if (c.includes('remove login')) {
        endGame('lost', 'Bankruptcy: You broke user login!');
        return;
      }
      completedFixes = fixes;
      updateFixBadges();
      checkWin();
    }

    function updateFixBadges() {
      ['alt', 'validation', 'login', 'db'].forEach(fix => {
        const el = document.getElementById('fix-' + fix);
        el.className = 'fix-badge ' + (completedFixes.has(fix) ? 'completed' : warnings.has(fix) ? 'warning' : 'pending');
        el.textContent = (completedFixes.has(fix) ? '✓ ' : warnings.has(fix) ? '⚠ ' : '○ ') + 
          (fix === 'alt' ? 'Alt Text' : fix === 'validation' ? 'Input Validation' : fix === 'login' ? 'User Login' : 'Database Security');
      });
    }

    function checkWarnings() {
      const now = Date.now();
      ['alt', 'validation', 'db'].forEach(fix => {
        if (!completedFixes.has(fix)) {
          if (!warnings.has(fix) && now - startTime >= 120000) {
            warnings.set(fix, now);
          } else if (warnings.has(fix) && now - warnings.get(fix) >= 120000) {
            endGame('lost', fix === 'alt' ? 'Disability Act Violation!' : 'Laws of Tort Violation!');
          }
        }
      });
    }

    function checkWin() {
      if ([ 'alt', 'validation', 'login', 'db'].every(f => completedFixes.has(f))) {
        endGame('won');
      }
    }

    function showMessage(content, isUrgent) {
      const popup = document.getElementById('messagePopup');
      popup.innerHTML = '<div style="font-weight: 700; margin-bottom: 0.5rem; color: #0f172a;">' +
        (isUrgent ? '⚠️ URGENT' : 'Message') + '</div><div style="color: #0f172a;">' + content + '</div>';
      popup.className = 'message-popup show ' + (isUrgent ? 'urgent' : 'normal');
      setTimeout(() => popup.className = 'message-popup', 5000);
    }

    function generateMessage() {
      const sources = ['boss', 'family', 'agile', 'critical'];
      const source = sources[Math.floor(Math.random() * sources.length)];
      let msg = '';
      if (source === 'boss') msg = BOSS_MESSAGES[Math.floor(Math.random() * BOSS_MESSAGES.length)];
      else if (source === 'family') msg = FAMILY_MESSAGES[Math.floor(Math.random() * FAMILY_MESSAGES.length)];
      else if (source === 'agile') msg = AGILE_MESSAGES[Math.floor(Math.random() * AGILE_MESSAGES.length)];
      else {
        const incomplete = ['alt', 'validation', 'login', 'db'].filter(f => !completedFixes.has(f));
        if (incomplete.length > 0) {
          const fix = incomplete[Math.floor(Math.random() * incomplete.length)];
          msg = warnings.has(fix) ? CRITICAL_CHALLENGES[fix].urgent : CRITICAL_CHALLENGES[fix].msg;
        }
      }
      if (msg) showMessage(msg, source === 'critical' && warnings.size > 0);
      scheduleNextMessage();
    }

    function scheduleNextMessage() {
      if (gameStatus === 'playing') {
        messageTimeout = setTimeout(generateMessage, Math.random() * 10000 + 20000);
      }
    }

    function startGame() {
      gameStatus = 'playing';
      startTime = Date.now();
      timeRemaining = 600;
      code = '';
      completedFixes = new Set();
      warnings = new Map();
      violations = [];  
      document.body.className = 'desk-scene';
      document.getElementById('fixTracker').style.display = 'block';
      document.getElementById('editorSection').style.display = 'block';
      document.getElementById('victoryBanner'). style.display = 'none';
      document.getElementById('courtBanner').style.display = 'none';
      document.querySelector('.primary').style.display = 'none';
      document.getElementById('pauseBtn').style.display = 'inline-block';
      updateFixBadges();
      
      timerInterval = setInterval(() => {
        if (gameStatus === 'playing') {
          timeRemaining--;
          document.getElementById('timer').textContent = formatTime(timeRemaining);
          if (timeRemaining < 60) document.getElementById('timer').className = 'timer-display urgent';
          if (timeRemaining <= 0) endGame('lost', "Time's up!");
          checkWarnings();
        }
      }, 1000);
      scheduleNextMessage();
      document.getElementById('codeEditor').addEventListener('input', validateCode);
    }

    function pauseGame() {
      gameStatus = 'paused';
      document.getElementById('pauseBtn').style.display = 'none';
      document.getElementById('resumeBtn').style.display = 'inline-block';
      document.getElementById('resetBtn').style.display = 'inline-block';
    }

    function resumeGame() {
      gameStatus = 'playing';
      document.getElementById('resumeBtn').style.display = 'none';
      document.getElementById('resetBtn').style.display = 'none';
      document.getElementById('pauseBtn').style.display = 'inline-block';
    }

    function resetGame() {
      gameStatus = 'idle';
      timeRemaining = 600;
      if (timerInterval) clearInterval(timerInterval);
      if (messageTimeout) clearTimeout(messageTimeout);
      document.getElementById('timer').textContent = '10:00';
      document.getElementById('timer').className = 'timer-display';
      document.getElementById('fixTracker').style.display = 'none';
      document.getElementById('editorSection').style.display = 'none';
      document.getElementById('victoryBanner').style.display = 'none';
      document.getElementById('courtBanner').style.display = 'none';
      document.querySelector('.primary').style.display = 'inline-block';
      document.getElementById('pauseBtn').style.display = 'none';
      document.getElementById('resumeBtn').style.display = 'none';
      document.getElementById('resetBtn').style.display = 'none';
      document.getElementById('playAgainBtn').style.display = 'none';
      document.body.className = 'desk-scene';
    }

    function endGame(status, message) {
      gameStatus = status;
      if (timerInterval) clearInterval(timerInterval);
      if (messageTimeout) clearTimeout(messageTimeout);
      document.getElementById('pauseBtn').style.display = 'none';
      document.getElementById('playAgainBtn').style.display = 'inline-block';
      
      if (status === 'won') {
        document.getElementById('victoryBanner').style.display = 'block';
      } else {
        document.body.className = 'court-scene';
        document.getElementById('courtBanner').style.display = 'block';
        document.getElementById('violations').innerHTML = 
          '<div class="violation-item"><h3 style="margin-bottom: 0.5rem; color: #fbbf24;">⚖️ ' + message + '</h3></div>';
      }
    }
  </script>
</body>
</html>`;
    return html;
  };

  const exportHTML = async () => {
    const html = generateHTML();
    try {
      await navigator.clipboard.writeText(html);
      alert("HTML copied to clipboard! Save it as a .html file to use it.");
    } catch (err) {
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "court-room-game.html";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    if (gameStatus === "playing") {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setGameStatus("lost");
            setViolations((v) => [
              ...v,
              {
                type: "laws-of-tort",
                fixType: "alt-text",
                timestamp: Date.now(),
                message:
                  "Time's up! You failed to complete the critical fixes in time.",
              },
            ]);
            setCurrentScene("court");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus === "playing") {
      const criticalFixes: FixType[] = [
        "alt-text",
        "input-validation",
        "database-security",
        "user-login",
      ];
      const allFixed = criticalFixes.every((fix) => completedFixes.has(fix));

      if (allFixed && violations.length === 0) {
        setGameStatus("won");
        if (messageIntervalRef.current)
          clearTimeout(messageIntervalRef.current);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }
  }, [completedFixes, gameStatus, violations.length]);

  useEffect(() => {
    if (gameStatus === "playing") {
      validateCode();
    }
  }, [code, gameStatus, validateCode]);

  useEffect(() => {
    return () => {
      if (messageIntervalRef.current) clearTimeout(messageIntervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const visibleMessage = visibleMessageId
    ? messages.find((m) => m.id === visibleMessageId)
    : null;

  return (
    <div
      className={`court-room-container ${
        currentScene === "desk" ? "desk-scene" : "court-scene"
      }`}
    >
      <div className="card" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 className="page-heading">⚖️ Court Room Debugging Challenge</h1>

        <p style={{ marginBottom: "1.5rem", lineHeight: "1.6" }}>
          You're a developer under pressure. Fix critical bugs while managing
          interruptions from your boss, family, and team. Ignore accessibility
          or security issues too long, and you'll face legal consequences!
        </p>

        {/* Timer Controls */}
        <div
          style={{
            background: "var(--color-surface-muted)",
            padding: "1.5rem",
            borderRadius: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <h2 className="section-heading" style={{ marginTop: 0 }}>
            ⏱️ Timer Control
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "1rem",
            }}
          >
            <div
              className={`timer-display ${
                timeRemaining < 60 && gameStatus === "playing" ? "urgent" : ""
              }`}
            >
              {formatTime(timeRemaining)}
            </div>

            {gameStatus === "idle" && (
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <input
                  type="number"
                  value={customTime}
                  onChange={(e) =>
                    setCustomTime(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  min="1"
                  max="60"
                  style={{ width: "80px" }}
                />
                <span>minutes</span>
                <button className="secondary" onClick={setTime}>
                  Set Time
                </button>
              </div>
            )}
          </div>

          <div className="button-row">
            {gameStatus === "idle" && (
              <button className="primary" onClick={startGame}>
                ▶ Start Game
              </button>
            )}
            {gameStatus === "playing" && (
              <button className="secondary" onClick={pauseGame}>
                ⏸ Pause
              </button>
            )}
            {gameStatus === "paused" && (
              <>
                <button className="primary" onClick={resumeGame}>
                  ▶ Resume
                </button>
                <button className="secondary" onClick={resetGame}>
                  🔄 Reset
                </button>
              </>
            )}
            {(gameStatus === "won" || gameStatus === "lost") && (
              <button className="primary" onClick={resetGame}>
                🔄 Play Again
              </button>
            )}
          </div>
        </div>

        {/* Fix Progress Tracker */}
        {gameStatus !== "idle" && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h2 className="section-heading">✅ Fix Progress</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {(
                [
                  "alt-text",
                  "input-validation",
                  "user-login",
                  "database-security",
                ] as FixType[]
              ).map((fix) => (
                <div
                  key={fix}
                  className={`fix-badge ${
                    completedFixes.has(fix)
                      ? "completed"
                      : warnings.has(fix)
                      ? "warning"
                      : "pending"
                  }`}
                >
                  {completedFixes.has(fix)
                    ? "✓ "
                    : warnings.has(fix)
                    ? "⚠ "
                    : "○ "}
                  {fix
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code Editor */}
        {gameStatus !== "idle" && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h2 className="section-heading">💻 Code Editor</h2>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-text-muted)",
                marginBottom: "0.5rem",
              }}
            >
              Fix the issues in the code below. Hints appear in the messages!
            </p>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={gameStatus !== "playing"}
              style={{
                minHeight: "200px",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "0.9rem",
                width: "100%",
                padding: "1rem",
                borderRadius: "0.75rem",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text)",
              }}
            />
          </div>
        )}

        {/* Game Status */}
        {gameStatus === "won" && (
          <div className="victory-banner">
            <h2 style={{ fontSize: "2rem", margin: "0 0 0.5rem 0" }}>
              🎉 Victory!
            </h2>
            <p style={{ margin: 0, fontSize: "1.1rem" }}>
              You completed all critical fixes without violations. Well done!
            </p>
          </div>
        )}

        {gameStatus === "lost" && violations.length > 0 && (
          <div className="court-banner">
            <h2
              style={{
                fontSize: "2rem",
                margin: "0 0 1rem 0",
                textAlign: "center",
              }}
            >
              ⚖️ Court Room
            </h2>
            {violations.map((v, i) => (
              <div key={i} className="violation-item">
                <h3 style={{ margin: "0 0 0.5rem 0", color: "#fbbf24" }}>
                  {v.type === "disability-act"
                    ? "⚠️ Disability Act Violation"
                    : v.type === "bankruptcy"
                    ? "💸 Bankruptcy"
                    : "⚡ Laws of Tort Violation"}
                </h3>
                <p style={{ margin: 0 }}>{v.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Message History */}
        {messages.length > 0 && (
          <div>
            <h2 className="section-heading">📨 Message Log</h2>
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              {messages
                .slice(-10)
                .reverse()
                .map((msg) => {
                  const borderColor =
                    msg.source === "boss"
                      ? "#3b82f6"
                      : msg.source === "family"
                      ? "#8b5cf6"
                      : msg.source === "agile"
                      ? "#06b6d4"
                      : msg.isUrgent
                      ? "#ef4444"
                      : "#f59e0b";

                  return (
                    <div
                      key={msg.id}
                      className={`message-item ${
                        msg.source === "critical"
                          ? msg.isUrgent
                            ? "critical-urgent"
                            : "critical-normal"
                          : "non-critical"
                      }`}
                      style={{ borderLeft: `4px solid ${borderColor}` }}
                    >
                      <div
                        style={{
                          fontWeight: "600",
                          marginBottom: "0.25rem",
                          textTransform: "capitalize",
                        }}
                      >
                        {msg.source} {msg.isUrgent && "⚠️"}
                      </div>
                      <div>{msg.content}</div>
                      {msg.fixType && (
                        <div
                          style={{
                            fontSize: "0.8rem",
                            marginTop: "0.25rem",
                            fontStyle: "italic",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          Hint: {CRITICAL_CHALLENGES[msg.fixType].hint}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Export HTML Section */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 className="section-heading">📦 Export Standalone Game</h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-muted)",
              marginBottom: "1rem",
            }}
          >
            Download this game as a standalone HTML file that can be deployed to
            any LMS or website. No external dependencies required!
          </p>
          <div className="button-row">
            <button className="primary" onClick={exportHTML}>
              📥 Download HTML Game
            </button>
          </div>
        </div>

        {/* Message History */}
        {messages.length > 0 && (
          <div>
            <h2 className="section-heading">📨 Message Log</h2>
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              {messages
                .slice(-10)
                .reverse()
                .map((msg) => {
                  const borderColor =
                    msg.source === "boss"
                      ? "#3b82f6"
                      : msg.source === "family"
                      ? "#8b5cf6"
                      : msg.source === "agile"
                      ? "#06b6d4"
                      : msg.isUrgent
                      ? "#ef4444"
                      : "#f59e0b";

                  return (
                    <div
                      key={msg.id}
                      className={`message-item ${
                        msg.source === "critical"
                          ? msg.isUrgent
                            ? "critical-urgent"
                            : "critical-normal"
                          : "non-critical"
                      }`}
                      style={{ borderLeft: `4px solid ${borderColor}` }}
                    >
                      <div
                        style={{
                          fontWeight: "600",
                          marginBottom: "0.25rem",
                          textTransform: "capitalize",
                        }}
                      >
                        {msg.source} {msg.isUrgent && "⚠️"}
                      </div>
                      <div>{msg.content}</div>
                      {msg.fixType && (
                        <div
                          style={{
                            fontSize: "0.8rem",
                            marginTop: "0.25rem",
                            fontStyle: "italic",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          Hint: {CRITICAL_CHALLENGES[msg.fixType].hint}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Floating Message Popup */}
        {visibleMessage && (
          <div
            className={`message-popup ${
              visibleMessage.isUrgent ? "urgent" : "normal"
            }`}
          >
            <div
              style={{
                fontWeight: "700",
                marginBottom: "0.5rem",
                textTransform: "capitalize",
                color: "#0f172a",
              }}
            >
              {visibleMessage.source}
              {visibleMessage.isUrgent && " ⚠️"}
            </div>
            <div style={{ color: "#0f172a" }}>{visibleMessage.content}</div>
          </div>
        )}
      </div>
    </div>
  );
}
