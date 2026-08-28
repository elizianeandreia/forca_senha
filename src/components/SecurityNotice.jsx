import Icon from './Icon.jsx'

export default function SecurityNotice() {
  return (
    <div className="security-notice">
      <span className="notice-icon"><Icon name="shield" size={20} /></span>
      <div>
        <strong>Processamento 100% local</strong>
        <p>Sua senha é processada somente neste navegador. Nada é enviado ou armazenado.</p>
      </div>
      <span className="notice-status"><i /> PRIVATE</span>
    </div>
  )
}
