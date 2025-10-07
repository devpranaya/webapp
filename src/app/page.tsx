"use client";

import { useEffect, useMemo, useState } from "react";

type TabConfig = {
  id: string;
  title: string;
  content: string;
};

let tabCounter = 0;

const defaultTabs: TabConfig[] = [
  {
    id: createTabId(),
    title: "Overview",
    content:
      "Content here",
  },
  {
    id: createTabId(),
    title: "Resources",
    content:
      "Links here",
  },
];

function createTabId() {
  tabCounter += 1;
  return `tab-config-${Date.now()}-${tabCounter}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildExportHtml(tabs: TabConfig[], title: string, defaultId: string | null) {
  if (!tabs.length) {
    return "<!-- Add a tab to generate the  HTML output. -->";
  }

  const fallbackTitle = title.trim() ? title.trim() : "Interactive Tabs";
  const sanitizedTitle = escapeHtml(fallbackTitle);
  const preferredDefaultId =
    defaultId && tabs.some((tab) => tab.id === defaultId)
      ? defaultId
      : tabs[0].id;

  const buttonMarkup = tabs
    .map((tab, index) => {
      const targetId = `tab-panel-${index + 1}`;
      const safeLabel = escapeHtml(tab.title.trim() || `Tab ${index + 1}`);
      const isActive = tab.id === preferredDefaultId;
      const buttonStyle = `border:0; border-radius:12px; padding:12px 16px; background-color:${
        isActive ? "#1d4ed8" : "#e2e8f0"
      }; color:${isActive ? "#f8fafc" : "#1f2937"}; font-weight:600; cursor:pointer; transition:background-color 0.2s ease, color 0.2s ease; min-width:120px;`;
      return `      <button type="button" role="tab" id="tab-${
        index + 1
      }" data-target="${targetId}" data-tab-button="true" aria-controls="${targetId}" aria-selected="${
        isActive ? "true" : "false"
      }" tabindex="${isActive ? "0" : "-1"}" style="${buttonStyle}">${safeLabel}</button>`;
    })
    .join("\n");

  const panelMarkup = tabs
    .map((tab, index) => {
      const targetId = `tab-panel-${index + 1}`;
      const isActive = tab.id === preferredDefaultId;
      const safeContent = escapeHtml(tab.content.trim() || "Content coming soon.")
        .replace(/\r?\n/g, "<br />");
      const panelStyle = `display:${isActive ? "block" : "none"}; border-radius:16px; border:1px solid #cbd5f5; background-color:#ffffff; padding:20px; color:#0f172a; line-height:1.6; box-shadow:0 8px 18px rgba(15, 23, 42, 0.08); margin-bottom:16px;`;
      return `    <section id="${targetId}" role="tabpanel" aria-labelledby="tab-${
        index + 1
      }" data-tab-panel="true" style="${panelStyle}">${safeContent}</section>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${sanitizedTitle}</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0; font-family: Arial, sans-serif; background-color:#f1f5f9; color:#0f172a;">
  <main style="max-width:960px; margin:0 auto; padding:32px 16px;">
    <h1 style="font-size:28px; margin:0 0 24px 0;">${sanitizedTitle}</h1>
    <div role="tablist" aria-label="${sanitizedTitle} tabs" style="display:flex; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
${buttonMarkup}
    </div>
${panelMarkup}
  </main>
  <script>
    (function () {
      var ACTIVE_BG = "#1d4ed8";
      var ACTIVE_COLOR = "#f8fafc";
      var INACTIVE_BG = "#e2e8f0";
      var INACTIVE_COLOR = "#1f2937";

      function showTab(targetId) {
        var buttons = document.querySelectorAll('[data-tab-button="true"]');
        var panels = document.querySelectorAll('[data-tab-panel="true"]');

        buttons.forEach(function (button) {
          var isActive = button.getAttribute('data-target') === targetId;
          button.style.backgroundColor = isActive ? ACTIVE_BG : INACTIVE_BG;
          button.style.color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;
          button.setAttribute('aria-selected', isActive ? 'true' : 'false');
          button.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        panels.forEach(function (panel) {
          var isActive = panel.id === targetId;
          panel.style.display = isActive ? 'block' : 'none';
        });
      }

      var tabButtons = document.querySelectorAll('[data-tab-button="true"]');
      tabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
          var targetId = button.getAttribute('data-target');
          if (targetId) {
            showTab(targetId);
          }
        });

        button.addEventListener('keydown', function (event) {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
            return;
          }

          var buttons = Array.from(tabButtons);
          var currentIndex = buttons.indexOf(button);
          if (currentIndex === -1) {
            return;
          }

          var nextIndex = event.key === 'ArrowRight'
            ? (currentIndex + 1) % buttons.length
            : (currentIndex - 1 + buttons.length) % buttons.length;

          var nextButton = buttons[nextIndex];
          nextButton.focus();
          var targetId = nextButton.getAttribute('data-target');
          if (targetId) {
            showTab(targetId);
          }
        });
      });

      var initialButton = document.querySelector('[data-tab-button="true"][aria-selected="true"]');
      if (initialButton) {
        var initialTarget = initialButton.getAttribute('data-target');
        if (initialTarget) {
          showTab(initialTarget);
        }
      }
    })();
  </script>
</body>
</html>`;
}

export default function HomePage() {
  const [pageTitle, setPageTitle] = useState("Weekly Teaching Tabs");
  const [tabs, setTabs] = useState<TabConfig[]>(defaultTabs);
  const [defaultTabId, setDefaultTabId] = useState<string | null>(defaultTabs[0]?.id ?? null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (!tabs.find((tab) => tab.id === defaultTabId)) {
      setDefaultTabId(tabs[0]?.id ?? null);
    }
  }, [tabs, defaultTabId]);

  const generatedHtml = useMemo(
    () => buildExportHtml(tabs, pageTitle, defaultTabId),
    [tabs, pageTitle, defaultTabId]
  );

  const handleAddTab = () => {
    setTabs((current) => [
      ...current,
      {
        id: createTabId(),
        title: "New Tab",
        content: "Describe what participants should do for this stage of the activity.",
      },
    ]);
  };

  const handleTabChange = (id: string, key: keyof TabConfig, value: string) => {
    setTabs((current) =>
      current.map((tab) => (tab.id === id ? { ...tab, [key]: value } : tab))
    );
  };

  const handleRemoveTab = (id: string) => {
    setTabs((current) => current.filter((tab) => tab.id !== id));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedHtml);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 2500);
    } catch (error) {
      setCopyStatus("error");
      window.setTimeout(() => setCopyStatus("idle"), 2500);
    }
  };

  return (
    <div className="card">
      <h1 className="page-heading">LMS Tab</h1>
      <p>
        Configure the tabs below and
        copy the HTML code to paste into your course.
      </p>

      <section aria-labelledby="tab-configurator" className="form-grid">
        <h2 id="tab-configurator" className="section-heading">
          Tab configuration
        </h2>
        <div className="field-group">
          <label htmlFor="page-title">Page title</label>
          <input
            id="page-title"
            name="page-title"
            type="text"
            value={pageTitle}
            onChange={(event) => setPageTitle(event.target.value)}
            placeholder="Weekly Teaching Tabs"
          />
        </div>

        <div className="tab-list-preview" aria-live="polite">
          {tabs.map((tab, index) => (
            <article key={tab.id} className="tab-item" aria-labelledby={`tab-label-${tab.id}`}>
              <div className="tab-item-header">
                <h3 id={`tab-label-${tab.id}`}>Tab {index + 1}</h3>
                <div className="tab-item-actions">
                  <label>
                    <input
                      type="radio"
                      name="default-tab"
                      value={tab.id}
                      checked={defaultTabId === tab.id}
                      onChange={() => setDefaultTabId(tab.id)}
                    />
                    <span style={{ marginLeft: "0.35rem" }}>Use as default tab</span>
                  </label>
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => handleRemoveTab(tab.id)}
                    disabled={tabs.length === 1}
                    aria-disabled={tabs.length === 1}
                  >
                    Remove tab
                  </button>
                </div>
              </div>
              <div className="field-group">
                <label htmlFor={`tab-title-${tab.id}`}>Tab title</label>
                <input
                  id={`tab-title-${tab.id}`}
                  type="text"
                  value={tab.title}
                  onChange={(event) => handleTabChange(tab.id, "title", event.target.value)}
                  placeholder={`Tab ${index + 1}`}
                />
              </div>
              <div className="field-group">
                <label htmlFor={`tab-content-${tab.id}`}>Tab content</label>
                <textarea
                  id={`tab-content-${tab.id}`}
                  value={tab.content}
                  onChange={(event) => handleTabChange(tab.id, "content", event.target.value)}
                  placeholder="Explain what happens in this part of the activity."
                />
              </div>
            </article>
          ))}
        </div>

        <div className="button-row">
          <button type="button" className="secondary" onClick={handleAddTab}>
            Add tab
          </button>
        </div>
      </section>

      <section aria-labelledby="generated-html" className="generated-output">
        <h2 id="generated-html" className="section-heading">
          Generated HTML code
        </h2>
        <p>
          The export is self-contained, with inline styles and JavaScript that preserve
          keyboard navigation and can be pasted directly..
        </p>
        <textarea readOnly value={generatedHtml} aria-label="HTML output" />
        <div className="button-row" style={{ marginTop: "0.75rem" }}>
          <button type="button" className="primary" onClick={handleCopy}>
            Copy to clipboard
          </button>
          <span role="status" aria-live="polite">
            {copyStatus === "copied" && "Copied to clipboard."}
            {copyStatus === "error" && "Copy failed."}
          </span>
        </div>
      </section>
    </div>
  );
}
