import Icon from './Icon.jsx'

const metricConfig = [
  {
    key: 'lengthLabel',
    label: 'Comprimento',
    icon: 'activity',
  },
  {
    key: 'varietyLabel',
    label: 'Variedade',
    icon: 'layers',
  },
  {
    key: 'repetitionLabel',
    label: 'Repetições',
    icon: 'fingerprint',
  },
  {
    key: 'sequenceLabel',
    label: 'Sequências',
    icon: 'terminal',
  },
]

function toneForValue(key, value) {
  if (value === 'SEM DADOS') {
    return 'neutral'
  }

  if (key === 'repetitionLabel') {
    return value === 'BAIXAS'
      ? 'positive'
      : 'negative'
  }

  if (key === 'sequenceLabel') {
    return value === 'NÃO DETECTADA'
      ? 'positive'
      : 'negative'
  }

  if (
    value === 'EXCELENTE' ||
    value === 'BOM' ||
    value === '4/4 CLASSES'
  ) {
    return 'positive'
  }

  if (value === 'CRÍTICO') {
    return 'negative'
  }

  return 'warning'
}

export default function TechnicalAnalysis({
  metrics,
}) {
  return (
    <section
      className="technical-panel panel"
      aria-labelledby="technical-title"
    >
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">
            SINAIS TÉCNICOS
          </span>

          <h2 id="technical-title">
            Análise estrutural
          </h2>
        </div>
      </div>

      <div className="metric-grid">
        {metricConfig.map(
          ({
            key,
            label,
            icon,
          }) => {
            const value = metrics[key]

            const tone =
              toneForValue(key, value)

            return (
              <div
                className="metric-card"
                key={key}
              >
                <span className="metric-icon">
                  <Icon
                    name={icon}
                    size={17}
                  />
                </span>

                <div className="metric-copy">
                  <span>
                    {label}
                  </span>

                  <strong
                    className={`metric-value ${tone}`}
                  >
                    {value}
                  </strong>
                </div>
              </div>
            )
          },
        )}
      </div>
    </section>
  )
}