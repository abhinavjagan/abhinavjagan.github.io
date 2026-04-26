import { STORY_ESSAY_PARAGRAPHS } from "./storyEssay.js";

export default function StoryEssayReader() {
  return (
    <aside
      className="story-essay story-essay--dock"
      aria-label="Full personal essay"
    >
      <details className="story-essay-details">
        <summary
          className="story-essay-summary"
          title="Read the full personal essay"
        >
          Essay
        </summary>
        <div className="story-essay-scroll">
          <article className="story-essay-body">
            {STORY_ESSAY_PARAGRAPHS.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </article>
        </div>
      </details>
    </aside>
  );
}
