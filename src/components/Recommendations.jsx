import Icon from './Icon.jsx'

export default function Recommendations({ recommendations, level }) {
  return (
    <section className="recommendations panel" aria-labelledby="recommendations-title">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">PRÓXIMA AÇÃO</span>
          <h2 id="recommendations-title">Recomendações</h2>
        </div>
        <span className={`risk-chip level-${level}`}>HEURÍSTICA</span>
      </div>

      <div className="recommendation-list">
        {recommendations.map((recommendation, index) => (
          <div className="recommendation-row" key={recommendation}>
            <span className="recommendation-index">0{index + 1}</span>
            <p>{recommendation}</p>
            <Icon name="arrow" size={16} />
          </div>
        ))}
      </div>
    </section>
  )
}
