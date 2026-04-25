import { useEffect } from "react";
import DynamicTextFlow from "./DynamicTextFlow.jsx";
import ScrollStoryScene from "./ScrollStoryScene.jsx";

export default function StoryExperience({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="story-page" aria-label="Scroll-driven animated intro">
      {typeof onBack === "function" ? (
        <div className="mode-exit-bar">
          <button type="button" className="mode-exit-btn" onClick={onBack}>
            ← Mode
          </button>
        </div>
      ) : null}

      <div className="story-fixed-layer">
        <div className="binary-canvas">
          <DynamicTextFlow />
        </div>
        <ScrollStoryScene />
      </div>

      <div className="story-scroll-track" aria-hidden="true">
        <section className="story-panel" />
        <section className="story-panel" />
        <section className="story-panel" />
        <section className="story-panel" />
        <section className="story-panel" />
        <section className="story-panel" />
        <section className="story-panel" />
      </div>
    </main>
  );
}
