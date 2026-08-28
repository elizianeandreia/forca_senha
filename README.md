# Password Intelligence

**Password Intelligence** é uma ferramenta demonstrativa de análise local de resistência de senhas, desenvolvida em React pela **LTHS Tecnologia**.

O projeto transforma um verificador de senhas convencional em uma interface de segurança com aparência de produto real, exibindo um score de 0 a 100, critérios atendidos, sinais estruturais e recomendações em tempo real.

## Privacidade

A senha informada é processada exclusivamente no navegador. O projeto não possui backend e não envia, registra ou armazena a senha digitada.

> O score é uma heurística educativa. Ele não representa garantia criptográfica e não substitui boas práticas como uso de senhas únicas, gerenciadores de senhas e autenticação multifator.

## Recursos

- análise instantânea durante a digitação;
- score visual de 0 a 100;
- cinco níveis de classificação: crítica, fraca, razoável, forte e excelente;
- avaliação de comprimento, maiúsculas, minúsculas, números e símbolos;
- detecção de repetições simples;
- detecção de sequências previsíveis;
- sinalização de padrões comuns de senha;
- recomendações específicas conforme a análise;
- opção de mostrar, ocultar e limpar a senha;
- processamento 100% local;
- layout responsivo para desktop e dispositivos móveis;
- suporte a `prefers-reduced-motion`;
- publicação via GitHub Pages.

## Tecnologias

- React 19
- Vite 8
- JavaScript
- CSS responsivo
- Node.js Test Runner
- ESLint
- GitHub Pages

## Estrutura principal

```text
src/
├── components/
│   ├── Icon.jsx
│   ├── PasswordInput.jsx
│   ├── Recommendations.jsx
│   ├── SecurityCriteria.jsx
│   ├── SecurityNotice.jsx
│   ├── SecurityScore.jsx
│   └── TechnicalAnalysis.jsx
├── utils/
│   └── analyzePassword.js
├── App.jsx
├── main.jsx
└── styles.css
```

## Executar localmente

```bash
npm install
npm run dev
```

## Testes

```bash
npm test
```

Os testes cobrem o estado vazio, senhas comuns/sequenciais, repetição excessiva e uma senha longa e diversificada.

## Qualidade do código

```bash
npm run lint
```

## Build de produção

```bash
npm run build
```

## Deploy no GitHub Pages

O projeto mantém o caminho-base:

```text
/forca_senha/
```

Para publicar:

```bash
npm run deploy
```

## Critérios do score

O mecanismo considera uma combinação de:

- comprimento;
- variedade de classes de caracteres;
- quantidade de caracteres únicos;
- repetições;
- sequências simples;
- padrões comuns de senha.

A função de análise está isolada em `src/utils/analyzePassword.js`, sem dependência de React, facilitando testes e futuras evoluções.

---

**LTHS Tecnologia — Todos os direitos reservados.**
