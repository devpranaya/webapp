"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { COPYRIGHT_OWNER, PERSONAL_INFO } from "@/lib/personal-info";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/escape-room", label: "Escape Room" },
  { href: "/coding-races", label: "Coding Races" },
  { href: "/court-room", label: "Court Room" },
];

type ThemeOption = "light" | "dark";

const THEME_COOKIE = "siteTheme";
const NAV_COOKIE = "activeNav";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    if (!cookie) continue;
    const [cookieName, ...rest] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(rest.join("="));
    }
  }
  return null;
}

function setCookie(name: string, value: string, maxAgeDays: number) {
  if (typeof document === "undefined") return;
  const maxAgeSeconds = Math.max(1, Math.round(maxAgeDays * 24 * 60 * 60));
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

function applyTheme(theme: ThemeOption) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeOption>("light");
  const navRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date()),
    []
  );
  const hasCheckedNavRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedTheme = getCookie(THEME_COOKIE);
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      applyTheme(storedTheme);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme: ThemeOption = prefersDark ? "dark" : "light";
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (!pathname || typeof document === "undefined") return;
    if (!hasCheckedNavRef.current) {
      hasCheckedNavRef.current = true;
      const storedNav = getCookie(NAV_COOKIE);
      if (pathname === "/" && storedNav && storedNav !== pathname) {
        router.replace(storedNav as string);
        return;
      }
    }
    setCookie(NAV_COOKIE, pathname, 30);
    setMenuOpen(false);
  }, [pathname, router]);

  useEffect(() => {
    applyTheme(theme);
    setCookie(THEME_COOKIE, theme, 180);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const currentThemeLabel =
    theme === "light" ? "Switch to dark theme" : "Switch to light theme";

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!target) return;
      const nav = navRef.current;
      const button = menuButtonRef.current;
      if (nav && nav.contains(target)) return;
      if (button && button.contains(target)) return;
      setMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="site-header">
        <div className="header-left">
          <span className="student-number" aria-label="Student number">
            {PERSONAL_INFO.studentNumber}
          </span>
          <Link className="site-title" href="/">
            Interactive Activity Builder
          </Link>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            aria-label={currentThemeLabel}
          >
            {theme === "dark" ? "☀" : "🌙"}
          </button>
          <button
            type="button"
            className="menu-toggle"
            ref={menuButtonRef}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
          >
            <span className="sr-only">Toggle navigation menu</span>
            <span aria-hidden="true">☰</span>
          </button>
        </div>
        <nav
          id="primary-navigation"
          className={`site-nav${menuOpen ? " open" : ""}`}
          aria-label="Main navigation"
          ref={navRef}
          aria-hidden={menuOpen ? undefined : true}
        >
          <ul>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={isActive ? "nav-link active" : "nav-link"}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main id="main" className="site-main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <p>
          <span>&copy; {new Date().getFullYear()} {COPYRIGHT_OWNER}.</span>
          <span> Designed for the LTU HTML export workflow.</span>
        </p>
        <p>
          <strong>{PERSONAL_INFO.name}</strong> · {PERSONAL_INFO.studentNumber} · {formattedDate}
        </p>
      </footer>
    </div>
  );
}
