(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/court-room/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CourtRoomPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const BOSS_MESSAGES = [
    "Are you done with sprint 1?",
    "Client needs an update on progress",
    "Can you join the standup in 5 minutes?",
    "How's the deadline looking?"
];
const FAMILY_MESSAGES = [
    "Can you pick up the kids after work?",
    "Dinner plans tonight?",
    "Don't forget we have that appointment tomorrow",
    "Can you grab groceries on the way home?"
];
const AGILE_MESSAGES = [
    "Fix Title colour to Red",
    "Update button text to 'Submit'",
    "Change margin to 20px",
    "Add hover effect to links"
];
const CRITICAL_CHALLENGES = {
    "alt-text": {
        initial: "Fix alt in img1",
        urgent: "URGENT: Fix alt in img1",
        hint: 'Add alt="description" to <img> tag'
    },
    "input-validation": {
        initial: "Fix input validation",
        urgent: "URGENT: Fix input validation",
        hint: "Add validation or sanitize keywords"
    },
    "user-login": {
        initial: "Fix User login",
        urgent: "CAREFUL: Fix User login (don't break it!)",
        hint: "Keep login functionality intact"
    },
    "database-security": {
        initial: "Fix Secure Database",
        urgent: "URGENT: Fix Secure Database",
        hint: "Add encryption or secure keywords"
    }
};
function CourtRoomPage() {
    _s();
    const [gameStatus, setGameStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [timeRemaining, setTimeRemaining] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(600);
    const [customTime, setCustomTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [code, setCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('<img src="example.jpg">\n<input type="text">\n// Add your fixes below\n');
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [completedFixes, setCompletedFixes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [warnings, setWarnings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [violations, setViolations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentScene, setCurrentScene] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desk");
    const [visibleMessageId, setVisibleMessageId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const messageIntervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const startTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const validateCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CourtRoomPage.useCallback[validateCode]": ()=>{
            const fixes = new Set();
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
                setViolations({
                    "CourtRoomPage.useCallback[validateCode]": (prev)=>[
                            ...prev,
                            {
                                type: "bankruptcy",
                                fixType: "user-login",
                                timestamp: Date.now(),
                                message: "You broke user login! Nobody can access the app. Game Over - Bankruptcy!"
                            }
                        ]
                }["CourtRoomPage.useCallback[validateCode]"]);
                setGameStatus("lost");
                setCurrentScene("court");
            }
            setCompletedFixes(fixes);
        }
    }["CourtRoomPage.useCallback[validateCode]"], [
        code
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CourtRoomPage.useEffect": ()=>{
            if (gameStatus !== "playing") return;
            const now = Date.now();
            const newWarnings = new Map(warnings);
            const criticalFixes = [
                "alt-text",
                "input-validation",
                "database-security"
            ];
            criticalFixes.forEach({
                "CourtRoomPage.useEffect": (fix)=>{
                    if (!completedFixes.has(fix)) {
                        const warningTime = newWarnings.get(fix);
                        if (!warningTime) {
                            if (now - startTimeRef.current >= 120000) {
                                newWarnings.set(fix, now);
                            }
                        } else if (now - warningTime >= 120000) {
                            let violationType = "laws-of-tort";
                            let message = "";
                            if (fix === "alt-text") {
                                violationType = "disability-act";
                                message = "Failed to fix accessibility issues. You are in violation of the Disability Act!";
                            } else {
                                message = "Security vulnerability exploited after known issue. You are liable under Laws of Tort!";
                            }
                            setViolations({
                                "CourtRoomPage.useEffect": (prev)=>[
                                        ...prev,
                                        {
                                            type: violationType,
                                            fixType: fix,
                                            timestamp: now,
                                            message
                                        }
                                    ]
                            }["CourtRoomPage.useEffect"]);
                            setGameStatus("lost");
                            setCurrentScene("court");
                        }
                    }
                }
            }["CourtRoomPage.useEffect"]);
            setWarnings(newWarnings);
        }
    }["CourtRoomPage.useEffect"], [
        completedFixes,
        gameStatus,
        warnings
    ]);
    const generateMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CourtRoomPage.useCallback[generateMessage]": ()=>{
            const sources = [
                "boss",
                "family",
                "agile",
                "critical"
            ];
            const source = sources[Math.floor(Math.random() * sources.length)];
            let content = "";
            let fixType;
            let isUrgent = false;
            if (source === "boss") {
                content = BOSS_MESSAGES[Math.floor(Math.random() * BOSS_MESSAGES.length)];
            } else if (source === "family") {
                content = FAMILY_MESSAGES[Math.floor(Math.random() * FAMILY_MESSAGES.length)];
            } else if (source === "agile") {
                content = AGILE_MESSAGES[Math.floor(Math.random() * AGILE_MESSAGES.length)];
            } else {
                const criticalFixes = [
                    "alt-text",
                    "input-validation",
                    "database-security",
                    "user-login"
                ];
                const incompleteFixes = criticalFixes.filter({
                    "CourtRoomPage.useCallback[generateMessage].incompleteFixes": (f)=>!completedFixes.has(f)
                }["CourtRoomPage.useCallback[generateMessage].incompleteFixes"]);
                if (incompleteFixes.length > 0) {
                    fixType = incompleteFixes[Math.floor(Math.random() * incompleteFixes.length)];
                    const challenge = CRITICAL_CHALLENGES[fixType];
                    isUrgent = warnings.has(fixType);
                    content = isUrgent ? challenge.urgent : challenge.initial;
                } else {
                    return;
                }
            }
            const newMessage = {
                id: "msg-".concat(Date.now(), "-").concat(Math.random()),
                source,
                content,
                timestamp: Date.now(),
                isUrgent,
                fixType
            };
            setMessages({
                "CourtRoomPage.useCallback[generateMessage]": (prev)=>[
                        ...prev,
                        newMessage
                    ]
            }["CourtRoomPage.useCallback[generateMessage]"]);
            setVisibleMessageId(newMessage.id);
            setTimeout({
                "CourtRoomPage.useCallback[generateMessage]": ()=>{
                    setVisibleMessageId(null);
                }
            }["CourtRoomPage.useCallback[generateMessage]"], 5000);
        }
    }["CourtRoomPage.useCallback[generateMessage]"], [
        completedFixes,
        warnings
    ]);
    const startGame = ()=>{
        setGameStatus("playing");
        startTimeRef.current = Date.now();
        setMessages([]);
        setCompletedFixes(new Set());
        setWarnings(new Map());
        setViolations([]);
        setCurrentScene("desk");
        const scheduleNextMessage = ()=>{
            const delay = Math.floor(Math.random() * 10000) + 20000;
            messageIntervalRef.current = setTimeout(()=>{
                generateMessage();
                scheduleNextMessage();
            }, delay);
        };
        scheduleNextMessage();
    };
    const pauseGame = ()=>setGameStatus("paused");
    const resumeGame = ()=>setGameStatus("playing");
    const resetGame = ()=>{
        setGameStatus("idle");
        setTimeRemaining(customTime * 60);
        setCode('<img src="example.jpg">\n<input type="text">\n// Add your fixes below\n');
        setMessages([]);
        setCompletedFixes(new Set());
        setWarnings(new Map());
        setViolations([]);
        setCurrentScene("desk");
        setVisibleMessageId(null);
        if (messageIntervalRef.current) clearTimeout(messageIntervalRef.current);
        if (timerRef.current) clearInterval(timerRef.current);
    };
    const setTime = ()=>setTimeRemaining(customTime * 60);
    const generateHTML = ()=>{
        const html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Court Room Debugging Challenge</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body {\n      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n      line-height: 1.6;\n      min-height: 100vh;\n      transition: background 0.5s ease;\n    }\n    body.desk-scene { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\n    body.court-scene { background: linear-gradient(135deg, #8B4513 0%, #2c1810 100%); }\n    .container {\n      max-width: 1200px;\n      margin: 0 auto;\n      padding: 2rem;\n    }\n    .card {\n      background: white;\n      border-radius: 1rem;\n      padding: 2rem;\n      box-shadow: 0 12px 24px rgba(15, 23, 42, 0.15);\n    }\n    h1 { font-size: 2rem; margin-bottom: 1rem; color: #0f172a; }\n    p { margin-bottom: 1.5rem; color: #475569; }\n    .timer-section {\n      background: #f1f5f9;\n      padding: 1.5rem;\n      border-radius: 1rem;\n      margin-bottom: 1.5rem;\n    }\n    .timer-display {\n      font-size: 2rem;\n      font-weight: bold;\n      font-family: 'Courier New', monospace;\n      color: #0f172a;\n      margin-bottom: 1rem;\n    }\n    .timer-display.urgent {\n      color: #ef4444;\n      animation: pulse 1s infinite;\n    }\n    button {\n      border: none;\n      border-radius: 0.75rem;\n      padding: 0.65rem 1.1rem;\n      font-size: 1rem;\n      font-weight: 600;\n      cursor: pointer;\n      margin-right: 0.75rem;\n      margin-bottom: 0.5rem;\n      transition: transform 0.2s ease;\n    }\n    button.primary {\n      background: #3b82f6;\n      color: white;\n      box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);\n    }\n    button.primary:hover { transform: translateY(-1px); }\n    button.secondary {\n      background: #e2e8f0;\n      color: #0f172a;\n    }\n    .fix-tracker {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n      gap: 0.75rem;\n      margin-bottom: 1.5rem;\n    }\n    .fix-badge {\n      padding: 0.75rem;\n      border-radius: 0.5rem;\n      font-weight: 600;\n      text-align: center;\n      border: 2px solid;\n    }\n    .fix-badge.completed {\n      background: linear-gradient(135deg, #10b981 0%, #059669 100%);\n      border-color: #10b981;\n      color: white;\n    }\n    .fix-badge.warning {\n      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);\n      border-color: #ef4444;\n      color: white;\n    }\n    .fix-badge.pending {\n      background: #f1f5f9;\n      border-color: #cbd5e1;\n      color: #0f172a;\n    }\n    textarea {\n      width: 100%;\n      min-height: 200px;\n      padding: 1rem;\n      border-radius: 0.75rem;\n      border: 1px solid #cbd5e1;\n      font-family: 'Courier New', monospace;\n      font-size: 0.9rem;\n      margin-bottom: 1.5rem;\n    }\n    .victory-banner {\n      padding: 2rem;\n      border-radius: 1rem;\n      background: linear-gradient(135deg, #10b981 0%, #059669 100%);\n      color: white;\n      text-align: center;\n      margin-bottom: 1.5rem;\n      animation: victoryBounce 0.5s ease;\n    }\n    .court-banner {\n      padding: 2rem;\n      border-radius: 1rem;\n      background: rgba(139, 69, 19, 0.95);\n      color: white;\n      border: 3px solid #8B4513;\n      margin-bottom: 1.5rem;\n      animation: gavelSlam 0.5s ease;\n    }\n    .violation-item {\n      background: rgba(0, 0, 0, 0.3);\n      padding: 1rem;\n      border-radius: 0.5rem;\n      margin-bottom: 0.5rem;\n    }\n    .message-popup {\n      position: fixed;\n      bottom: 2rem;\n      right: 2rem;\n      max-width: 400px;\n      padding: 1rem;\n      border-radius: 0.75rem;\n      background: white;\n      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);\n      animation: slideInRight 0.3s ease;\n      z-index: 1000;\n      display: none;\n    }\n    .message-popup.show { display: block; }\n    .message-popup.urgent { border: 3px solid #ef4444; }\n    .message-popup.normal { border: 3px solid #f59e0b; }\n    @keyframes pulse {\n      0%, 100% { opacity: 1; }\n      50% { opacity: 0.5; }\n    }\n    @keyframes slideInRight {\n      from { transform: translateX(100%); opacity: 0; }\n      to { transform: translateX(0); opacity: 1; }\n    }\n    @keyframes victoryBounce {\n      0%, 100% { transform: scale(1); }\n      50% { transform: scale(1.05); }\n    }\n    @keyframes gavelSlam {\n      0% { transform: translateY(-20px); opacity: 0; }\n      50% { transform: translateY(5px); }\n      100% { transform: translateY(0); opacity: 1; }\n    }\n  </style>\n</head>\n<body class=\"desk-scene\">\n  <div class=\"container\">\n    <div class=\"card\">\n      <h1>⚖️ Court Room Debugging Challenge</h1>\n      <p>Fix critical bugs while managing interruptions. Ignore accessibility or security issues too long, and face legal consequences!</p>\n      \n      <div class=\"timer-section\">\n        <h2 style=\"margin-bottom: 1rem;\">⏱️ Timer</h2>\n        <div class=\"timer-display\" id=\"timer\">10:00</div>\n        <button class=\"primary\" onclick=\"startGame()\">▶ Start Game</button>\n        <button class=\"secondary\" onclick=\"pauseGame()\" style=\"display: none;\" id=\"pauseBtn\">⏸ Pause</button>\n        <button class=\"primary\" onclick=\"resumeGame()\" style=\"display: none;\" id=\"resumeBtn\">▶ Resume</button>\n        <button class=\"secondary\" onclick=\"resetGame()\" style=\"display: none;\" id=\"resetBtn\">🔄 Reset</button>\n        <button class=\"primary\" onclick=\"resetGame()\" style=\"display: none;\" id=\"playAgainBtn\">🔄 Play Again</button>\n      </div>\n\n      <div id=\"fixTracker\" style=\"display: none;\">\n        <h2 style=\"margin-bottom: 1rem;\">✅ Fix Progress</h2>\n        <div class=\"fix-tracker\">\n          <div class=\"fix-badge pending\" id=\"fix-alt\">○ Alt Text</div>\n          <div class=\"fix-badge pending\" id=\"fix-validation\">○ Input Validation</div>\n          <div class=\"fix-badge pending\" id=\"fix-login\">○ User Login</div>\n          <div class=\"fix-badge pending\" id=\"fix-db\">○ Database Security</div>\n        </div>\n      </div>\n\n      <div id=\"editorSection\" style=\"display: none;\">\n        <h2 style=\"margin-bottom: 0.5rem;\">💻 Code Editor</h2>\n        <p style=\"font-size: 0.9rem; color: #64748b; margin-bottom: 0.5rem;\">Fix the issues below. Hints appear in messages!</p>\n        <textarea id=\"codeEditor\">&lt;img src=\"example.jpg\"&gt;\n&lt;input type=\"text\"&gt;\n// Add your fixes below\n</textarea>\n      </div>\n\n      <div id=\"victoryBanner\" style=\"display: none;\" class=\"victory-banner\">\n        <h2 style=\"font-size: 2rem; margin-bottom: 0.5rem;\">🎉 Victory!</h2>\n        <p style=\"font-size: 1.1rem;\">You completed all critical fixes without violations. Well done!</p>\n      </div>\n\n      <div id=\"courtBanner\" style=\"display: none;\" class=\"court-banner\">\n        <h2 style=\"font-size: 2rem; margin-bottom: 1rem; text-align: center;\">⚖️ Court Room</h2>\n        <div id=\"violations\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"messagePopup\" class=\"message-popup\"></div>\n\n  <script>\n    let gameStatus = 'idle';\n    let timeRemaining = 600;\n    let code = '';\n    let completedFixes = new Set();\n    let warnings = new Map();\n    let violations = [];\n    let startTime = 0;\n    let timerInterval = null;\n    let messageTimeout = null;\n\n    const BOSS_MESSAGES = [\"Are you done with sprint 1?\", \"Client needs update\"];\n    const FAMILY_MESSAGES = [\"Pick up the kids?\", \"Dinner plans tonight?\"];\n    const AGILE_MESSAGES = [\"Fix Title colour to Red\", \"Update button text\"];\n    const CRITICAL_CHALLENGES = {\n      'alt': { msg: 'Fix alt in img1', urgent: 'URGENT: Fix alt in img1' },\n      'validation': { msg: 'Fix input validation', urgent: 'URGENT: Fix input validation' },\n      'login': { msg: 'Fix User login', urgent: 'CAREFUL: Fix User login' },\n      'db': { msg: 'Fix Secure Database', urgent: 'URGENT: Fix Secure Database' }\n    };\n\n    function formatTime(secs) {\n      const m = Math.floor(secs / 60);\n      const s = secs % 60;\n      return m + ':' + (s < 10 ? '0' : '') + s;\n    }\n\n    function validateCode() {\n      const c = document.getElementById('codeEditor').value;\n      const fixes = new Set();\n      if (c.includes('alt=\"') && c.includes('img')) fixes.add('alt');\n      if (c.includes('validation') || c.includes('sanitize')) fixes.add('validation');\n      if (c.includes('encryption') || c.includes('secure')) fixes.add('db');\n      if (!c.includes('remove login') && c.includes('login')) fixes.add('login');\n      else if (c.includes('remove login')) {\n        endGame('lost', 'Bankruptcy: You broke user login!');\n        return;\n      }\n      completedFixes = fixes;\n      updateFixBadges();\n      checkWin();\n    }\n\n    function updateFixBadges() {\n      ['alt', 'validation', 'login', 'db'].forEach(fix => {\n        const el = document.getElementById('fix-' + fix);\n        el.className = 'fix-badge ' + (completedFixes.has(fix) ? 'completed' : warnings.has(fix) ? 'warning' : 'pending');\n        el.textContent = (completedFixes.has(fix) ? '✓ ' : warnings.has(fix) ? '⚠ ' : '○ ') + \n          (fix === 'alt' ? 'Alt Text' : fix === 'validation' ? 'Input Validation' : fix === 'login' ? 'User Login' : 'Database Security');\n      });\n    }\n\n    function checkWarnings() {\n      const now = Date.now();\n      ['alt', 'validation', 'db'].forEach(fix => {\n        if (!completedFixes.has(fix)) {\n          if (!warnings.has(fix) && now - startTime >= 120000) {\n            warnings.set(fix, now);\n          } else if (warnings.has(fix) && now - warnings.get(fix) >= 120000) {\n            endGame('lost', fix === 'alt' ? 'Disability Act Violation!' : 'Laws of Tort Violation!');\n          }\n        }\n      });\n    }\n\n    function checkWin() {\n      if ([ 'alt', 'validation', 'login', 'db'].every(f => completedFixes.has(f))) {\n        endGame('won');\n      }\n    }\n\n    function showMessage(content, isUrgent) {\n      const popup = document.getElementById('messagePopup');\n      popup.innerHTML = '<div style=\"font-weight: 700; margin-bottom: 0.5rem; color: #0f172a;\">' +\n        (isUrgent ? '⚠️ URGENT' : 'Message') + '</div><div style=\"color: #0f172a;\">' + content + '</div>';\n      popup.className = 'message-popup show ' + (isUrgent ? 'urgent' : 'normal');\n      setTimeout(() => popup.className = 'message-popup', 5000);\n    }\n\n    function generateMessage() {\n      const sources = ['boss', 'family', 'agile', 'critical'];\n      const source = sources[Math.floor(Math.random() * sources.length)];\n      let msg = '';\n      if (source === 'boss') msg = BOSS_MESSAGES[Math.floor(Math.random() * BOSS_MESSAGES.length)];\n      else if (source === 'family') msg = FAMILY_MESSAGES[Math.floor(Math.random() * FAMILY_MESSAGES.length)];\n      else if (source === 'agile') msg = AGILE_MESSAGES[Math.floor(Math.random() * AGILE_MESSAGES.length)];\n      else {\n        const incomplete = ['alt', 'validation', 'login', 'db'].filter(f => !completedFixes.has(f));\n        if (incomplete.length > 0) {\n          const fix = incomplete[Math.floor(Math.random() * incomplete.length)];\n          msg = warnings.has(fix) ? CRITICAL_CHALLENGES[fix].urgent : CRITICAL_CHALLENGES[fix].msg;\n        }\n      }\n      if (msg) showMessage(msg, source === 'critical' && warnings.size > 0);\n      scheduleNextMessage();\n    }\n\n    function scheduleNextMessage() {\n      if (gameStatus === 'playing') {\n        messageTimeout = setTimeout(generateMessage, Math.random() * 10000 + 20000);\n      }\n    }\n\n    function startGame() {\n      gameStatus = 'playing';\n      startTime = Date.now();\n      timeRemaining = 600;\n      code = '';\n      completedFixes = new Set();\n      warnings = new Map();\n      violations = [];  \n      document.body.className = 'desk-scene';\n      document.getElementById('fixTracker').style.display = 'block';\n      document.getElementById('editorSection').style.display = 'block';\n      document.getElementById('victoryBanner'). style.display = 'none';\n      document.getElementById('courtBanner').style.display = 'none';\n      document.querySelector('.primary').style.display = 'none';\n      document.getElementById('pauseBtn').style.display = 'inline-block';\n      updateFixBadges();\n      \n      timerInterval = setInterval(() => {\n        if (gameStatus === 'playing') {\n          timeRemaining--;\n          document.getElementById('timer').textContent = formatTime(timeRemaining);\n          if (timeRemaining < 60) document.getElementById('timer').className = 'timer-display urgent';\n          if (timeRemaining <= 0) endGame('lost', \"Time's up!\");\n          checkWarnings();\n        }\n      }, 1000);\n      scheduleNextMessage();\n      document.getElementById('codeEditor').addEventListener('input', validateCode);\n    }\n\n    function pauseGame() {\n      gameStatus = 'paused';\n      document.getElementById('pauseBtn').style.display = 'none';\n      document.getElementById('resumeBtn').style.display = 'inline-block';\n      document.getElementById('resetBtn').style.display = 'inline-block';\n    }\n\n    function resumeGame() {\n      gameStatus = 'playing';\n      document.getElementById('resumeBtn').style.display = 'none';\n      document.getElementById('resetBtn').style.display = 'none';\n      document.getElementById('pauseBtn').style.display = 'inline-block';\n    }\n\n    function resetGame() {\n      gameStatus = 'idle';\n      timeRemaining = 600;\n      if (timerInterval) clearInterval(timerInterval);\n      if (messageTimeout) clearTimeout(messageTimeout);\n      document.getElementById('timer').textContent = '10:00';\n      document.getElementById('timer').className = 'timer-display';\n      document.getElementById('fixTracker').style.display = 'none';\n      document.getElementById('editorSection').style.display = 'none';\n      document.getElementById('victoryBanner').style.display = 'none';\n      document.getElementById('courtBanner').style.display = 'none';\n      document.querySelector('.primary').style.display = 'inline-block';\n      document.getElementById('pauseBtn').style.display = 'none';\n      document.getElementById('resumeBtn').style.display = 'none';\n      document.getElementById('resetBtn').style.display = 'none';\n      document.getElementById('playAgainBtn').style.display = 'none';\n      document.body.className = 'desk-scene';\n    }\n\n    function endGame(status, message) {\n      gameStatus = status;\n      if (timerInterval) clearInterval(timerInterval);\n      if (messageTimeout) clearTimeout(messageTimeout);\n      document.getElementById('pauseBtn').style.display = 'none';\n      document.getElementById('playAgainBtn').style.display = 'inline-block';\n      \n      if (status === 'won') {\n        document.getElementById('victoryBanner').style.display = 'block';\n      } else {\n        document.body.className = 'court-scene';\n        document.getElementById('courtBanner').style.display = 'block';\n        document.getElementById('violations').innerHTML = \n          '<div class=\"violation-item\"><h3 style=\"margin-bottom: 0.5rem; color: #fbbf24;\">⚖️ ' + message + '</h3></div>';\n      }\n    }\n  </script>\n</body>\n</html>";
        return html;
    };
    const exportHTML = async ()=>{
        const html = generateHTML();
        try {
            await navigator.clipboard.writeText(html);
            alert("HTML copied to clipboard! Save it as a .html file to use it.");
        } catch (err) {
            const blob = new Blob([
                html
            ], {
                type: "text/html"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "court-room-game.html";
            a.click();
            URL.revokeObjectURL(url);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CourtRoomPage.useEffect": ()=>{
            if (gameStatus === "playing") {
                timerRef.current = setInterval({
                    "CourtRoomPage.useEffect": ()=>{
                        setTimeRemaining({
                            "CourtRoomPage.useEffect": (prev)=>{
                                if (prev <= 1) {
                                    setGameStatus("lost");
                                    setViolations({
                                        "CourtRoomPage.useEffect": (v)=>[
                                                ...v,
                                                {
                                                    type: "laws-of-tort",
                                                    fixType: "alt-text",
                                                    timestamp: Date.now(),
                                                    message: "Time's up! You failed to complete the critical fixes in time."
                                                }
                                            ]
                                    }["CourtRoomPage.useEffect"]);
                                    setCurrentScene("court");
                                    return 0;
                                }
                                return prev - 1;
                            }
                        }["CourtRoomPage.useEffect"]);
                    }
                }["CourtRoomPage.useEffect"], 1000);
            } else if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            return ({
                "CourtRoomPage.useEffect": ()=>{
                    if (timerRef.current) clearInterval(timerRef.current);
                }
            })["CourtRoomPage.useEffect"];
        }
    }["CourtRoomPage.useEffect"], [
        gameStatus
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CourtRoomPage.useEffect": ()=>{
            if (gameStatus === "playing") {
                const criticalFixes = [
                    "alt-text",
                    "input-validation",
                    "database-security",
                    "user-login"
                ];
                const allFixed = criticalFixes.every({
                    "CourtRoomPage.useEffect.allFixed": (fix)=>completedFixes.has(fix)
                }["CourtRoomPage.useEffect.allFixed"]);
                if (allFixed && violations.length === 0) {
                    setGameStatus("won");
                    if (messageIntervalRef.current) clearTimeout(messageIntervalRef.current);
                    if (timerRef.current) clearInterval(timerRef.current);
                }
            }
        }
    }["CourtRoomPage.useEffect"], [
        completedFixes,
        gameStatus,
        violations.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CourtRoomPage.useEffect": ()=>{
            if (gameStatus === "playing") {
                validateCode();
            }
        }
    }["CourtRoomPage.useEffect"], [
        code,
        gameStatus,
        validateCode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CourtRoomPage.useEffect": ()=>{
            return ({
                "CourtRoomPage.useEffect": ()=>{
                    if (messageIntervalRef.current) clearTimeout(messageIntervalRef.current);
                    if (timerRef.current) clearInterval(timerRef.current);
                }
            })["CourtRoomPage.useEffect"];
        }
    }["CourtRoomPage.useEffect"], []);
    const formatTime = (seconds)=>{
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return "".concat(mins, ":").concat(secs.toString().padStart(2, "0"));
    };
    const visibleMessage = visibleMessageId ? messages.find((m)=>m.id === visibleMessageId) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "court-room-container ".concat(currentScene === "desk" ? "desk-scene" : "court-scene"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card",
            style: {
                maxWidth: "1200px",
                margin: "0 auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "page-heading",
                    children: "⚖️ Court Room Debugging Challenge"
                }, void 0, false, {
                    fileName: "[project]/src/app/court-room/page.tsx",
                    lineNumber: 776,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        marginBottom: "1.5rem",
                        lineHeight: "1.6"
                    },
                    children: "You're a developer under pressure. Fix critical bugs while managing interruptions from your boss, family, and team. Ignore accessibility or security issues too long, and you'll face legal consequences!"
                }, void 0, false, {
                    fileName: "[project]/src/app/court-room/page.tsx",
                    lineNumber: 778,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: "var(--color-surface-muted)",
                        padding: "1.5rem",
                        borderRadius: "1rem",
                        marginBottom: "1.5rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "section-heading",
                            style: {
                                marginTop: 0
                            },
                            children: "⏱️ Timer Control"
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 793,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                flexWrap: "wrap",
                                marginBottom: "1rem"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "timer-display ".concat(timeRemaining < 60 && gameStatus === "playing" ? "urgent" : ""),
                                    children: formatTime(timeRemaining)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/court-room/page.tsx",
                                    lineNumber: 806,
                                    columnNumber: 13
                                }, this),
                                gameStatus === "idle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: "0.5rem",
                                        alignItems: "center"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: customTime,
                                            onChange: (e)=>setCustomTime(Math.max(1, parseInt(e.target.value) || 1)),
                                            min: "1",
                                            max: "60",
                                            style: {
                                                width: "80px"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/court-room/page.tsx",
                                            lineNumber: 818,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "minutes"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/court-room/page.tsx",
                                            lineNumber: 828,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "secondary",
                                            onClick: setTime,
                                            children: "Set Time"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/court-room/page.tsx",
                                            lineNumber: 829,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/court-room/page.tsx",
                                    lineNumber: 815,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 797,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "button-row",
                            children: [
                                gameStatus === "idle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "primary",
                                    onClick: startGame,
                                    children: "▶ Start Game"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/court-room/page.tsx",
                                    lineNumber: 838,
                                    columnNumber: 15
                                }, this),
                                gameStatus === "playing" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "secondary",
                                    onClick: pauseGame,
                                    children: "⏸ Pause"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/court-room/page.tsx",
                                    lineNumber: 843,
                                    columnNumber: 15
                                }, this),
                                gameStatus === "paused" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "primary",
                                            onClick: resumeGame,
                                            children: "▶ Resume"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/court-room/page.tsx",
                                            lineNumber: 849,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "secondary",
                                            onClick: resetGame,
                                            children: "🔄 Reset"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/court-room/page.tsx",
                                            lineNumber: 852,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true),
                                (gameStatus === "won" || gameStatus === "lost") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "primary",
                                    onClick: resetGame,
                                    children: "🔄 Play Again"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/court-room/page.tsx",
                                    lineNumber: 858,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 836,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/court-room/page.tsx",
                    lineNumber: 785,
                    columnNumber: 9
                }, this),
                gameStatus !== "idle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: "1.5rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "section-heading",
                            children: "✅ Fix Progress"
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 868,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                gap: "0.75rem"
                            },
                            children: [
                                "alt-text",
                                "input-validation",
                                "user-login",
                                "database-security"
                            ].map((fix)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "fix-badge ".concat(completedFixes.has(fix) ? "completed" : warnings.has(fix) ? "warning" : "pending"),
                                    children: [
                                        completedFixes.has(fix) ? "✓ " : warnings.has(fix) ? "⚠ " : "○ ",
                                        fix.split("-").map((w)=>w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
                                    ]
                                }, fix, true, {
                                    fileName: "[project]/src/app/court-room/page.tsx",
                                    lineNumber: 884,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 869,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/court-room/page.tsx",
                    lineNumber: 867,
                    columnNumber: 11
                }, this),
                gameStatus !== "idle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: "1.5rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "section-heading",
                            children: "💻 Code Editor"
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 912,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: "0.9rem",
                                color: "var(--color-text-muted)",
                                marginBottom: "0.5rem"
                            },
                            children: "Fix the issues in the code below. Hints appear in the messages!"
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 913,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: code,
                            onChange: (e)=>setCode(e.target.value),
                            disabled: gameStatus !== "playing",
                            style: {
                                minHeight: "200px",
                                fontFamily: "var(--font-geist-mono, monospace)",
                                fontSize: "0.9rem",
                                width: "100%",
                                padding: "1rem",
                                borderRadius: "0.75rem",
                                border: "1px solid var(--color-border)",
                                background: "var(--color-surface)",
                                color: "var(--color-text)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 922,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/court-room/page.tsx",
                    lineNumber: 911,
                    columnNumber: 11
                }, this),
                gameStatus === "won" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "victory-banner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontSize: "2rem",
                                margin: "0 0 0.5rem 0"
                            },
                            children: "🎉 Victory!"
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 944,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                margin: 0,
                                fontSize: "1.1rem"
                            },
                            children: "You completed all critical fixes without violations. Well done!"
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 947,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/court-room/page.tsx",
                    lineNumber: 943,
                    columnNumber: 11
                }, this),
                gameStatus === "lost" && violations.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "court-banner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontSize: "2rem",
                                margin: "0 0 1rem 0",
                                textAlign: "center"
                            },
                            children: "⚖️ Court Room"
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 955,
                            columnNumber: 13
                        }, this),
                        violations.map((v, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "violation-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            margin: "0 0 0.5rem 0",
                                            color: "#fbbf24"
                                        },
                                        children: v.type === "disability-act" ? "⚠️ Disability Act Violation" : v.type === "bankruptcy" ? "💸 Bankruptcy" : "⚡ Laws of Tort Violation"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/court-room/page.tsx",
                                        lineNumber: 966,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            margin: 0
                                        },
                                        children: v.message
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/court-room/page.tsx",
                                        lineNumber: 973,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/app/court-room/page.tsx",
                                lineNumber: 965,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/court-room/page.tsx",
                    lineNumber: 954,
                    columnNumber: 11
                }, this),
                messages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "section-heading",
                            children: "📨 Message Log"
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 982,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                maxHeight: "300px",
                                overflowY: "auto"
                            },
                            children: messages.slice(-10).reverse().map((msg)=>{
                                const borderColor = msg.source === "boss" ? "#3b82f6" : msg.source === "family" ? "#8b5cf6" : msg.source === "agile" ? "#06b6d4" : msg.isUrgent ? "#ef4444" : "#f59e0b";
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "message-item ".concat(msg.source === "critical" ? msg.isUrgent ? "critical-urgent" : "critical-normal" : "non-critical"),
                                    style: {
                                        borderLeft: "4px solid ".concat(borderColor)
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontWeight: "600",
                                                marginBottom: "0.25rem",
                                                textTransform: "capitalize"
                                            },
                                            children: [
                                                msg.source,
                                                " ",
                                                msg.isUrgent && "⚠️"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/court-room/page.tsx",
                                            lineNumber: 1011,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: msg.content
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/court-room/page.tsx",
                                            lineNumber: 1020,
                                            columnNumber: 23
                                        }, this),
                                        msg.fixType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "0.8rem",
                                                marginTop: "0.25rem",
                                                fontStyle: "italic",
                                                color: "var(--color-text-muted)"
                                            },
                                            children: [
                                                "Hint: ",
                                                CRITICAL_CHALLENGES[msg.fixType].hint
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/court-room/page.tsx",
                                            lineNumber: 1022,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, msg.id, true, {
                                    fileName: "[project]/src/app/court-room/page.tsx",
                                    lineNumber: 1000,
                                    columnNumber: 21
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 983,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/court-room/page.tsx",
                    lineNumber: 981,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: "1.5rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "section-heading",
                            children: "📦 Export Standalone Game"
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 1042,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: "0.9rem",
                                color: "var(--color-text-muted)",
                                marginBottom: "1rem"
                            },
                            children: "Download this game as a standalone HTML file that can be deployed to any LMS or website. No external dependencies required!"
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 1043,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "button-row",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "primary",
                                onClick: exportHTML,
                                children: "📥 Download HTML Game"
                            }, void 0, false, {
                                fileName: "[project]/src/app/court-room/page.tsx",
                                lineNumber: 1054,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 1053,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/court-room/page.tsx",
                    lineNumber: 1041,
                    columnNumber: 9
                }, this),
                messages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "section-heading",
                            children: "📨 Message Log"
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 1063,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                maxHeight: "300px",
                                overflowY: "auto"
                            },
                            children: messages.slice(-10).reverse().map((msg)=>{
                                const borderColor = msg.source === "boss" ? "#3b82f6" : msg.source === "family" ? "#8b5cf6" : msg.source === "agile" ? "#06b6d4" : msg.isUrgent ? "#ef4444" : "#f59e0b";
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "message-item ".concat(msg.source === "critical" ? msg.isUrgent ? "critical-urgent" : "critical-normal" : "non-critical"),
                                    style: {
                                        borderLeft: "4px solid ".concat(borderColor)
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontWeight: "600",
                                                marginBottom: "0.25rem",
                                                textTransform: "capitalize"
                                            },
                                            children: [
                                                msg.source,
                                                " ",
                                                msg.isUrgent && "⚠️"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/court-room/page.tsx",
                                            lineNumber: 1092,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: msg.content
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/court-room/page.tsx",
                                            lineNumber: 1101,
                                            columnNumber: 23
                                        }, this),
                                        msg.fixType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "0.8rem",
                                                marginTop: "0.25rem",
                                                fontStyle: "italic",
                                                color: "var(--color-text-muted)"
                                            },
                                            children: [
                                                "Hint: ",
                                                CRITICAL_CHALLENGES[msg.fixType].hint
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/court-room/page.tsx",
                                            lineNumber: 1103,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, msg.id, true, {
                                    fileName: "[project]/src/app/court-room/page.tsx",
                                    lineNumber: 1081,
                                    columnNumber: 21
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 1064,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/court-room/page.tsx",
                    lineNumber: 1062,
                    columnNumber: 11
                }, this),
                visibleMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "message-popup ".concat(visibleMessage.isUrgent ? "urgent" : "normal"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontWeight: "700",
                                marginBottom: "0.5rem",
                                textTransform: "capitalize",
                                color: "#0f172a"
                            },
                            children: [
                                visibleMessage.source,
                                visibleMessage.isUrgent && " ⚠️"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 1128,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                color: "#0f172a"
                            },
                            children: visibleMessage.content
                        }, void 0, false, {
                            fileName: "[project]/src/app/court-room/page.tsx",
                            lineNumber: 1139,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/court-room/page.tsx",
                    lineNumber: 1123,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/court-room/page.tsx",
            lineNumber: 775,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/court-room/page.tsx",
        lineNumber: 770,
        columnNumber: 5
    }, this);
}
_s(CourtRoomPage, "0Y8F1nTl2mIu9WHZhu6qLyjV48E=");
_c = CourtRoomPage;
var _c;
__turbopack_context__.k.register(_c, "CourtRoomPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_court-room_page_tsx_914c6253._.js.map