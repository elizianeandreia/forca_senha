import { useState } from "react";
import logo from "./assets/logo2026.png";
<assets></assets>
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const rules = [
    {
      label: "Pelo menos 8 caracteres",
      passed: password.length >= 8,
    },
    {
      label: "Contém letra maiúscula",
      passed: /[A-Z]/.test(password),
    },
    {
      label: "Contém letra minúscula",
      passed: /[a-z]/.test(password),
    },
    {
      label: "Contém número",
      passed: /\d/.test(password),
    },
    {
      label: "Contém caractere especial",
      passed: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const score = rules.filter((rule) => rule.passed).length;

  function getStrengthLabel() {
    if (password.length === 0) return "Digite uma senha";
    if (score <= 2) return "Senha fraca";
    if (score <= 4) return "Senha média";
    return "Senha forte";
  }

  function getStrengthClass() {
    if (password.length === 0) return "empty";
    if (score <= 2) return "weak";
    if (score <= 4) return "medium";
    return "strong";
  }

  const strengthClass = getStrengthClass();

  return (
    <main className="page">
      <section className="card">
        <div className="header">
          <span className="badge">Security Check</span>
          <h1>Verificador de força de senha</h1>
          <p>
            Digite uma senha e veja em tempo real se ela atende aos critérios
            de segurança.
          </p>
        </div>

        <div className="inputGroup">
          <label htmlFor="password">Senha</label>

          <div className="passwordBox">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha..."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        <div className="strengthArea">
          <div className="strengthTop">
            <span>Força da senha</span>
            <strong className={strengthClass}>{getStrengthLabel()}</strong>
          </div>

          <div className="bar">
            <div
              className={`barFill ${strengthClass}`}
              style={{ width: `${(score / rules.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <ul className="rules">
          {rules.map((rule) => (
            <li key={rule.label} className={rule.passed ? "passed" : ""}>
              <span>{rule.passed ? "✓" : "×"}</span>
              {rule.label}
            </li>
          ))}
        </ul>

        <div className="tip">
          <strong>Dica:</strong> uma senha forte mistura letras, números,
          símbolos e não deve ser uma palavra fácil de adivinhar.
        </div>
      </section>
    </main>
  );
}

export default App;