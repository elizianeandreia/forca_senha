const LEVEL_COPY = {
  idle: 'Aguardando entrada',
  critical: 'Risco elevado',
  weak: 'Baixa resistência',
  fair: 'Proteção intermediária',
  strong: 'Boa resistência',
  excellent: 'Alta resistência',
}

export default function SecurityScore({ analysis }) {
  const {
    score,
    level,
    shortLabel,
    summary,
  } = analysis

  const isIdle = level === 'idle'

  const circumference = 289.03

  const offset =
    circumference -
    (score / 100) * circumference

  const scoreLabel = isIdle
    ? 'Aguardando entrada para calcular a pontuação'
    : `Pontuação de segurança: ${score} de 100`

  return (
    <section
      className={`score-panel level-${level}`}
      aria-labelledby="score-title"
    >
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">
            SECURITY SCORE
          </span>

          <h2 id="score-title">
            Índice de resistência
          </h2>
        </div>

        <span
          className={`live-pill ${
            isIdle ? 'is-idle' : ''
          }`}
        >
          <i />

          {isIdle
            ? 'AWAITING INPUT'
            : 'LIVE'}
        </span>
      </div>

      <div className="score-content">
        <div
          className={`score-gauge ${
            isIdle ? 'is-idle' : ''
          }`}
          aria-label={scoreLabel}
        >
          <svg
            viewBox="0 0 112 112"
            role="img"
            aria-hidden="true"
          >
            <circle
              className="gauge-track"
              cx="56"
              cy="56"
              r="46"
            />

            <circle
              className="gauge-value"
              cx="56"
              cy="56"
              r="46"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>

          <div className="gauge-copy">
            <strong>
              {isIdle ? '--' : score}
            </strong>

            <span>
              {isIdle ? 'READY' : '/100'}
            </span>
          </div>
        </div>

        <div className="score-description">
          <span className="score-kicker">
            {LEVEL_COPY[level]}
          </span>

          <h3>
            {shortLabel}
          </h3>

          <p>
            {summary}
          </p>
        </div>
      </div>

      <div
        className="score-meter"
        aria-hidden="true"
      >
        <div
          className="score-meter-fill"
          style={{
            width: `${isIdle ? 0 : score}%`,
          }}
        />
      </div>

      <div
        className="score-scale"
        aria-hidden="true"
      >
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </section>
  )
}