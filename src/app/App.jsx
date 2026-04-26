import { useCallback, useEffect, useState } from "react";
import CrispPortfolio from "../modes/crisp/CrispPortfolio.jsx";
import CvModePage from "../modes/cv/CvModePage.jsx";
import ModeHome from "../modes/home/ModeHome.jsx";
import StoryEssayReader from "../modes/story/StoryEssayReader.jsx";
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

  const main =
    !mode ? (
      <ModeHome onSelectMode={selectMode} />
    ) : mode === "story" ? (
      <StoryExperience onBack={goHome} />
    ) : mode === "crisp" ? (
      <CrispPortfolio onBack={goHome} />
    ) : mode === "cv" ? (
      <CvModePage onBack={goHome} />
    ) : (
      <ModeHome onSelectMode={selectMode} />
    );

  return (
    <div className="app-shell" data-app-mode={mode ?? "home"}>
      <div className="app-shell-main">{main}</div>
      <StoryEssayReader />
    </div>
  );
}

export default App;
