import DynamicTextFlow from "./DynamicTextFlow";
import ScrollStoryScene from "./ScrollStoryScene";

function App() {
  return (
    <main className="story-page" aria-label="Scroll-driven animated intro">
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

export default App;
