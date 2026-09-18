const layers = [
  { index: '01', name: 'AI applications', detail: 'agents · search · developer tools' },
  { index: '02', name: 'Context + evaluation', detail: 'retrieval · graphs · traces · regressions' },
  { index: '03', name: 'Runtime + control', detail: 'APIs · orchestration · failure handling' },
  { index: '04', name: 'Distributed foundation', detail: 'Linux · telemetry · network systems' },
];

export default function SystemMap() {
  return (
    <figure className="system-map" aria-label="AI application and infrastructure layers">
      <div className="system-map-head">
        <span>runtime.map</span>
        <span>application → infrastructure</span>
      </div>
      <div className="system-map-layers">
        {layers.map((layer) => (
          <div key={layer.index} className="system-map-layer">
            <span>{layer.index}</span>
            <div>
              <strong>{layer.name}</strong>
              <small>{layer.detail}</small>
            </div>
          </div>
        ))}
      </div>
      <figcaption>
        <span>ship</span>
        <span>measure</span>
        <span>debug</span>
        <span>improve</span>
      </figcaption>
    </figure>
  );
}
