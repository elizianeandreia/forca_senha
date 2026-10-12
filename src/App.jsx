import { useMemo, useState } from 'react'
import PasswordInput from './components/PasswordInput.jsx'
import SecurityScore from './components/SecurityScore.jsx'
import SecurityCriteria from './components/SecurityCriteria.jsx'
import TechnicalAnalysis from './components/TechnicalAnalysis.jsx'
import SecurityNotice from './components/SecurityNotice.jsx'
import Recommendations from './components/Recommendations.jsx'
import Icon from './components/Icon.jsx'
import MatrixRain from './components/MatrixRain.jsx'
import { analyzePassword } from './utils/analyzePassword.js'

export default function App() {
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const analysis = useMemo(() => analyzePassword(password), [password])

  function clearAnalysis() {
    setPassword('')
    setVisible(false)
  }

  return (
    <div className={`app level-${analysis.level}`}>
      <MatrixRain level={analysis.level} />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a
          className="product-brand"
          href="#top"
          aria-label="Password Intelligence, início"
        >
          <span className="product-mark">
            <Icon name="shield" size={23} />
          </span>

          <span className="product-name">
            <strong>
              PASSWORD <em>INTELLIGENCE</em>
            </strong>
            <small>SECURITY ANALYSIS CONSOLE</small>
          </span>
        </a>

        <div className="topbar-meta">
          <span className="developer-signature">
            BY LTHS TECNOLOGIA
          </span>

          <span className="environment-badge">
            <i />
            LOCAL ENGINE
          </span>

          <span className="version-badge">
            v1.0
          </span>
        </div>
      </header>

      <main id="top" className="workspace">
        <section className="hero">
          <div className="hero-status">
                        PASSWORD SECURITY LAB
          </div>

          <h1>
            Avalie a resistência da sua senha{' '}
            <span>antes de colocá-la em uso.</span>
          </h1>

          <p>
            Avaliação instantânea por critérios de comprimento,
            diversidade e previsibilidade, executada integralmente
            no seu dispositivo.
          </p>
        </section>

        <section
          className="analysis-shell"
          aria-label="Console de análise de senha"
        >
          <div className="console-header">
            <div className="console-title">
              <span
                className="terminal-dots"
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
              </span>

              <span>
                security://password-analysis
              </span>
            </div>

            <span className="session-id">
              SESSION // EPHEMERAL
            </span>
          </div>

          <div className="console-body">
            <div className="input-zone">
              <div className="input-heading">
                <div>
                  <span className="eyebrow">
                    INPUT
                  </span>

                  <h2>
                    Senha em análise
                  </h2>
                </div>

                <span className="input-secure">
                  <Icon name="lock" size={14} />
                  NÃO PERSISTENTE
                </span>
              </div>

              <PasswordInput
                password={password}
                onChange={setPassword}
                onClear={clearAnalysis}
                visible={visible}
                onToggleVisibility={() =>
                  setVisible((current) => !current)
                }
              />
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-primary">
                <SecurityScore analysis={analysis} />

                <TechnicalAnalysis
                  metrics={analysis.metrics}
                />

                <Recommendations
                  recommendations={analysis.recommendations}
                  level={analysis.level}
                />
              </div>

              <aside className="dashboard-sidebar">
                <SecurityCriteria
                  criteria={analysis.criteria}
                />

                <section className="intel-card panel">
                  <div className="intel-card-icon">
                    <Icon name="info" size={19} />
                  </div>

                  <span className="eyebrow">
                    COMO INTERPRETAR
                  </span>

                  <h2>
                    Score heurístico, não garantia criptográfica.
                  </h2>

                  <p>
                    O indicador estima resistência aparente com
                    base em sinais locais. Senhas exclusivas,
                    longas e armazenadas em um gerenciador
                    continuam sendo a melhor prática.
                  </p>
                </section>
              </aside>
            </div>

            <SecurityNotice />
          </div>
        </section>

        <section
          className="system-strip"
          aria-label="Informações do mecanismo"
        >
          <div>
            <span>ENGINE</span>
            <strong>LOCAL HEURISTIC</strong>
          </div>

          <div>
            <span>TRANSMISSION</span>
            <strong>NONE</strong>
          </div>

          <div>
            <span>STORAGE</span>
            <strong>NONE</strong>
          </div>

          <div>
            <span>RESPONSE</span>
            <strong>REAL TIME</strong>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <span>
            DESENVOLVIDO POR
          </span>

          <strong>
            LTHS Tecnologia
          </strong>
        </div>

        <p>
          Security Engineering Lab • Projeto demonstrativo
          de análise local de senhas
        </p>

        <span className="footer-code">
          © 2026 LTHS TECNOLOGIA
        </span>
      </footer>
    </div>
  )
}