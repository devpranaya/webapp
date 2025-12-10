(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
let tabCounter = 0;
const defaultTabs = [
    {
        id: createTabId(),
        title: "Overview",
        content: "Content here"
    },
    {
        id: createTabId(),
        title: "Resources",
        content: "Links here"
    }
];
function createTabId() {
    tabCounter += 1;
    return "tab-config-".concat(Date.now(), "-").concat(tabCounter);
}
function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function buildExportHtml(tabs, title, defaultId) {
    if (!tabs.length) {
        return "<!-- Add a tab to generate the  HTML output. -->";
    }
    const fallbackTitle = title.trim() ? title.trim() : "Interactive Tabs";
    const sanitizedTitle = escapeHtml(fallbackTitle);
    const preferredDefaultId = defaultId && tabs.some((tab)=>tab.id === defaultId) ? defaultId : tabs[0].id;
    const buttonMarkup = tabs.map((tab, index)=>{
        const targetId = "tab-panel-".concat(index + 1);
        const safeLabel = escapeHtml(tab.title.trim() || "Tab ".concat(index + 1));
        const isActive = tab.id === preferredDefaultId;
        const buttonStyle = "border:0; border-radius:12px; padding:12px 16px; background-color:".concat(isActive ? "#1d4ed8" : "#e2e8f0", "; color:").concat(isActive ? "#f8fafc" : "#1f2937", "; font-weight:600; cursor:pointer; transition:background-color 0.2s ease, color 0.2s ease; min-width:120px;");
        return '      <button type="button" role="tab" id="tab-'.concat(index + 1, '" data-target="').concat(targetId, '" data-tab-button="true" aria-controls="').concat(targetId, '" aria-selected="').concat(isActive ? "true" : "false", '" tabindex="').concat(isActive ? "0" : "-1", '" style="').concat(buttonStyle, '">').concat(safeLabel, "</button>");
    }).join("\n");
    const panelMarkup = tabs.map((tab, index)=>{
        const targetId = "tab-panel-".concat(index + 1);
        const isActive = tab.id === preferredDefaultId;
        const safeContent = escapeHtml(tab.content.trim() || "Content coming soon.").replace(/\r?\n/g, "<br />");
        const panelStyle = "display:".concat(isActive ? "block" : "none", "; border-radius:16px; border:1px solid #cbd5f5; background-color:#ffffff; padding:20px; color:#0f172a; line-height:1.6; box-shadow:0 8px 18px rgba(15, 23, 42, 0.08); margin-bottom:16px;");
        return '    <section id="'.concat(targetId, '" role="tabpanel" aria-labelledby="tab-').concat(index + 1, '" data-tab-panel="true" style="').concat(panelStyle, '">').concat(safeContent, "</section>");
    }).join("\n");
    return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8" />\n<title>'.concat(sanitizedTitle, '</title>\n<meta name="viewport" content="width=device-width, initial-scale=1" />\n</head>\n<body style="margin:0; font-family: Arial, sans-serif; background-color:#f1f5f9; color:#0f172a;">\n  <main style="max-width:960px; margin:0 auto; padding:32px 16px;">\n    <h1 style="font-size:28px; margin:0 0 24px 0;">').concat(sanitizedTitle, '</h1>\n    <div role="tablist" aria-label="').concat(sanitizedTitle, ' tabs" style="display:flex; flex-wrap:wrap; gap:12px; margin-bottom:16px;">\n').concat(buttonMarkup, "\n    </div>\n").concat(panelMarkup, "\n  </main>\n  <script>\n    (function () {\n      var ACTIVE_BG = \"#1d4ed8\";\n      var ACTIVE_COLOR = \"#f8fafc\";\n      var INACTIVE_BG = \"#e2e8f0\";\n      var INACTIVE_COLOR = \"#1f2937\";\n\n      function showTab(targetId) {\n        var buttons = document.querySelectorAll('[data-tab-button=\"true\"]');\n        var panels = document.querySelectorAll('[data-tab-panel=\"true\"]');\n\n        buttons.forEach(function (button) {\n          var isActive = button.getAttribute('data-target') === targetId;\n          button.style.backgroundColor = isActive ? ACTIVE_BG : INACTIVE_BG;\n          button.style.color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;\n          button.setAttribute('aria-selected', isActive ? 'true' : 'false');\n          button.setAttribute('tabindex', isActive ? '0' : '-1');\n        });\n\n        panels.forEach(function (panel) {\n          var isActive = panel.id === targetId;\n          panel.style.display = isActive ? 'block' : 'none';\n        });\n      }\n\n      var tabButtons = document.querySelectorAll('[data-tab-button=\"true\"]');\n      tabButtons.forEach(function (button) {\n        button.addEventListener('click', function () {\n          var targetId = button.getAttribute('data-target');\n          if (targetId) {\n            showTab(targetId);\n          }\n        });\n\n        button.addEventListener('keydown', function (event) {\n          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {\n            return;\n          }\n\n          var buttons = Array.from(tabButtons);\n          var currentIndex = buttons.indexOf(button);\n          if (currentIndex === -1) {\n            return;\n          }\n\n          var nextIndex = event.key === 'ArrowRight'\n            ? (currentIndex + 1) % buttons.length\n            : (currentIndex - 1 + buttons.length) % buttons.length;\n\n          var nextButton = buttons[nextIndex];\n          nextButton.focus();\n          var targetId = nextButton.getAttribute('data-target');\n          if (targetId) {\n            showTab(targetId);\n          }\n        });\n      });\n\n      var initialButton = document.querySelector('[data-tab-button=\"true\"][aria-selected=\"true\"]');\n      if (initialButton) {\n        var initialTarget = initialButton.getAttribute('data-target');\n        if (initialTarget) {\n          showTab(initialTarget);\n        }\n      }\n    })();\n  </script>\n</body>\n</html>");
}
function HomePage() {
    var _defaultTabs_;
    _s();
    const [pageTitle, setPageTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Weekly Teaching Tabs");
    const [tabs, setTabs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultTabs);
    var _defaultTabs__id;
    const [defaultTabId, setDefaultTabId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((_defaultTabs__id = (_defaultTabs_ = defaultTabs[0]) === null || _defaultTabs_ === void 0 ? void 0 : _defaultTabs_.id) !== null && _defaultTabs__id !== void 0 ? _defaultTabs__id : null);
    const [copyStatus, setCopyStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            if (!tabs.find({
                "HomePage.useEffect": (tab)=>tab.id === defaultTabId
            }["HomePage.useEffect"])) {
                var _tabs_;
                var _tabs__id;
                setDefaultTabId((_tabs__id = (_tabs_ = tabs[0]) === null || _tabs_ === void 0 ? void 0 : _tabs_.id) !== null && _tabs__id !== void 0 ? _tabs__id : null);
            }
        }
    }["HomePage.useEffect"], [
        tabs,
        defaultTabId
    ]);
    const generatedHtml = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomePage.useMemo[generatedHtml]": ()=>buildExportHtml(tabs, pageTitle, defaultTabId)
    }["HomePage.useMemo[generatedHtml]"], [
        tabs,
        pageTitle,
        defaultTabId
    ]);
    const handleAddTab = ()=>{
        setTabs((current)=>[
                ...current,
                {
                    id: createTabId(),
                    title: "New Tab",
                    content: "Describe what participants should do for this stage of the activity."
                }
            ]);
    };
    const handleTabChange = (id, key, value)=>{
        setTabs((current)=>current.map((tab)=>tab.id === id ? {
                    ...tab,
                    [key]: value
                } : tab));
    };
    const handleRemoveTab = (id)=>{
        setTabs((current)=>current.filter((tab)=>tab.id !== id));
    };
    const handleCopy = async ()=>{
        try {
            await navigator.clipboard.writeText(generatedHtml);
            setCopyStatus("copied");
            window.setTimeout(()=>setCopyStatus("idle"), 2500);
        } catch (error) {
            setCopyStatus("error");
            window.setTimeout(()=>setCopyStatus("idle"), 2500);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "page-heading",
                children: "LMS Tab"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Configure the tabs below."
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-labelledby": "tab-configurator",
                className: "form-grid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "tab-configurator",
                        className: "section-heading",
                        children: "Tab configuration"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "page-title",
                                children: "Page title"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "page-title",
                                name: "page-title",
                                type: "text",
                                value: pageTitle,
                                onChange: (event)=>setPageTitle(event.target.value),
                                placeholder: "Weekly Teaching Tabs"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tab-list-preview",
                        "aria-live": "polite",
                        children: tabs.map((tab, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "tab-item",
                                "aria-labelledby": "tab-label-".concat(tab.id),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "tab-item-header",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                id: "tab-label-".concat(tab.id),
                                                children: [
                                                    "Tab ",
                                                    index + 1
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 245,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "tab-item-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                name: "default-tab",
                                                                value: tab.id,
                                                                checked: defaultTabId === tab.id,
                                                                onChange: ()=>setDefaultTabId(tab.id)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 248,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    marginLeft: "0.35rem"
                                                                },
                                                                children: "Use as default tab"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 255,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 247,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "secondary",
                                                        onClick: ()=>handleRemoveTab(tab.id),
                                                        disabled: tabs.length === 1,
                                                        "aria-disabled": tabs.length === 1,
                                                        children: "Remove tab"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 257,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 246,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 244,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "field-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "tab-title-".concat(tab.id),
                                                children: "Tab title"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 269,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "tab-title-".concat(tab.id),
                                                type: "text",
                                                value: tab.title,
                                                onChange: (event)=>handleTabChange(tab.id, "title", event.target.value),
                                                placeholder: "Tab ".concat(index + 1)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 270,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 268,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "field-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "tab-content-".concat(tab.id),
                                                children: "Tab content"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 279,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                id: "tab-content-".concat(tab.id),
                                                value: tab.content,
                                                onChange: (event)=>handleTabChange(tab.id, "content", event.target.value),
                                                placeholder: "Explain what happens in this part of the activity."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 280,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 278,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, tab.id, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "button-row",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "secondary",
                            onClick: handleAddTab,
                            children: "Add tab"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 292,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 291,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-labelledby": "generated-html",
                className: "generated-output",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "generated-html",
                        className: "section-heading",
                        children: "Generated HTML code"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "The export is self-contained, with inline styles and JavaScript that preserves keyboard navigation."
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        readOnly: true,
                        value: generatedHtml,
                        "aria-label": "HTML output"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 306,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "button-row",
                        style: {
                            marginTop: "0.75rem"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "primary",
                                onClick: handleCopy,
                                children: "Copy to clipboard"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 308,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                role: "status",
                                "aria-live": "polite",
                                children: [
                                    copyStatus === "copied" && "Copied to clipboard.",
                                    copyStatus === "error" && "Copy failed."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 311,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 307,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 298,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 219,
        columnNumber: 5
    }, this);
}
_s(HomePage, "aT3dCgYX2q4fYfrAsb+GSK++oOw=");
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_page_tsx_b4090435._.js.map