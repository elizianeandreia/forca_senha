import Icon from './Icon.jsx'

export default function PasswordInput({ password, onChange, onClear, visible, onToggleVisibility }) {
  const hasPassword = password.length > 0

  return (
    <div className="password-field-wrap">
      <label className="sr-only" htmlFor="password-input">
        Senha para análise
      </label>
      <div className={`password-field ${hasPassword ? 'has-value' : ''}`}>
        <span className="field-icon" aria-hidden="true">
          <Icon name="lock" size={20} />
        </span>

        <input
          id="password-input"
          type={visible ? 'text' : 'password'}
          value={password}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Digite uma senha para analisar"
          autoComplete="new-password"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
          aria-describedby="password-helper"
        />

        <div className="field-actions">
          {hasPassword && (
            <button className="icon-button" type="button" onClick={onClear} aria-label="Limpar senha">
              <Icon name="x" size={18} />
            </button>
          )}
          <button
            className="icon-button"
            type="button"
            onClick={onToggleVisibility}
            aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          >
            <Icon name={visible ? 'eyeOff' : 'eye'} size={19} />
          </button>
        </div>
      </div>
      <div className="input-meta" id="password-helper">
        <span>ANÁLISE EM TEMPO REAL</span>
        <span>{password.length} caracteres</span>
      </div>
    </div>
  )
}
