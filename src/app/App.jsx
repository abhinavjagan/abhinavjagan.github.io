import { useCallback, useEffect, useState } from "react";
import CrispPortfolio from "../modes/crisp/CrispPortfolio.jsx";
import CvModePage from "../modes/cv/CvModePage.jsx";
import ModeHome from "../modes/home/ModeHome.jsx";
import StoryExperience from "../modes/story/StoryExperience.jsx";

const STORAGE_KEY = "portfolio-view-mode";

function readStoredMode() {
  try {
    const v = sessionStorage.getItem(STORAGE_KEY);
    if (v === "story" || v === "crisp" || v === "cv") {
      return v;
    }
  } catch {
    // ignore
  }
  return null;
}

function App() {
  const [mode, setMode] = useState(() => readStoredMode());

  useEffect(() => {
    try {
      if (mode) {
        sessionStorage.setItem(STORAGE_KEY, mode);
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [mode]);

  const selectMode = useCallback((next) => {
    setMode(next);
  }, []);

  const goHome = useCallback(() => {
    setMode(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    window.scrollTo(0, 0);
  }, []);

  if (!mode) {
    return <ModeHome onSelectMode={selectMode} />;
  }

  if (mode === "story") {
    return <StoryExperience onBack={goHome} />;
  }

  if (mode === "crisp") {
    return <CrispPortfolio onBack={goHome} />;
  }

  if (mode === "cv") {
    return <CvModePage onBack={goHome} />;
  }

  return <ModeHome onSelectMode={selectMode} />;
}

export default App;
