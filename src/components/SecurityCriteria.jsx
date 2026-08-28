import Icon from './Icon.jsx'

const criteriaMap = [
  ['length', '12+ caracteres', 'Comprimento mínimo recomendado'],
  ['uppercase', 'Letra maiúscula', 'Aumenta a variedade de caracteres'],
  ['lowercase', 'Letra minúscula', 'Amplia o espaço de combinações'],
  ['number', 'Número', 'Adiciona outra classe de caracteres'],
  ['symbol', 'Caractere especial', 'Eleva a diversidade estrutural'],
]

export default function SecurityCriteria({ criteria }) {
  const completed = criteriaMap.filter(([key]) => criteria[key]).length

  return (
    <section className="criteria-panel panel" aria-labelledby="criteria-title">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">CRITÉRIOS</span>
          <h2 id="criteria-title">Cobertura básica</h2>
        </div>
        <strong className="completion-counter">{completed}/5</strong>
      </div>

      <div className="criteria-list">
        {criteriaMap.map(([key, label, detail]) => {
          const passed = criteria[key]
          return (
            <div className={`criterion ${passed ? 'passed' : ''}`} key={key}>
              <span className="criterion-status">
                {passed ? <Icon name="check" size={15} /> : <span />}
              </span>
              <div>
                <strong>{label}</strong>
                <small>{detail}</small>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
