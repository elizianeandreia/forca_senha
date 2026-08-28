const COMMON_PATTERNS = [
  '123456',
  '123456789',
  'password',
  'senha',
  'qwerty',
  'admin',
  'letmein',
  'abc123',
  'welcome',
]

const SEQUENCES = [
  'abcdefghijklmnopqrstuvwxyz',
  'zyxwvutsrqponmlkjihgfedcba',
  '0123456789',
  '9876543210',
  'qwertyuiop',
  'poiuytrewq',
]

function containsSequence(password) {
  const value = password.toLowerCase()

  return SEQUENCES.some((sequence) => {
    for (
      let index = 0;
      index <= sequence.length - 3;
      index += 1
    ) {
      const sample =
        sequence.slice(
          index,
          index + 3,
        )

      if (value.includes(sample)) {
        return true
      }
    }

    return false
  })
}

function getLengthScore(length) {
  if (length >= 20) {
    return 40
  }

  if (length >= 16) {
    return 35
  }

  if (length >= 12) {
    return 28
  }

  if (length >= 10) {
    return 22
  }

  if (length >= 8) {
    return 16
  }

  if (length >= 6) {
    return 8
  }

  return Math.max(
    0,
    length,
  )
}

function getLevel(
  score,
  password,
) {
  if (!password) {
    return {
      level: 'idle',
      label: 'Aguardando análise',
      shortLabel: 'AGUARDANDO INPUT',
      summary:
        'Digite uma senha para iniciar a avaliação local.',
    }
  }

  if (score < 25) {
    return {
      level: 'critical',
      label: 'Segurança crítica',
      shortLabel: 'CRÍTICA',
      summary:
        'A senha apresenta padrões fáceis de prever e precisa ser reforçada.',
    }
  }

  if (score < 45) {
    return {
      level: 'weak',
      label: 'Segurança fraca',
      shortLabel: 'FRACA',
      summary:
        'Há alguma diversidade, mas a resistência ainda é insuficiente.',
    }
  }

  if (score < 65) {
    return {
      level: 'fair',
      label: 'Segurança razoável',
      shortLabel: 'RAZOÁVEL',
      summary:
        'A senha já combina bons elementos, mas ainda pode ganhar resistência.',
    }
  }

  if (score < 85) {
    return {
      level: 'strong',
      label: 'Segurança forte',
      shortLabel: 'FORTE',
      summary:
        'Boa combinação de comprimento e variedade, com poucos sinais de previsibilidade.',
    }
  }

  return {
    level: 'excellent',
    label: 'Segurança excelente',
    shortLabel: 'EXCELENTE',
    summary:
      'A senha apresenta alto comprimento, diversidade e baixa previsibilidade aparente.',
  }
}

function buildRecommendations({
  password,
  criteria,
  flags,
  varietyCount,
}) {
  if (!password) {
    return [
      'Use uma senha exclusiva para cada serviço.',
      'Prefira frases senha longas e difíceis de adivinhar.',
      'Ative autenticação multifator sempre que possível.',
    ]
  }

  const recommendations = []

  if (!criteria.length) {
    recommendations.push(
      'Aumente o comprimento para pelo menos 12 caracteres.',
    )
  }

  if (varietyCount < 3) {
    recommendations.push(
      'Combine letras maiúsculas, minúsculas, números e símbolos.',
    )
  }

  if (flags.hasRepeats) {
    recommendations.push(
      'Reduza sequências de caracteres repetidos.',
    )
  }

  if (flags.hasSequence) {
    recommendations.push(
      'Evite sequências previsíveis como abc, 123 ou padrões de teclado.',
    )
  }

  if (flags.isCommon) {
    recommendations.push(
      'Evite palavras e combinações muito comuns em senhas vazadas.',
    )
  }

  if (recommendations.length === 0) {
    recommendations.push(
      'Mantenha esta senha exclusiva e não a reutilize em outros serviços.',
    )

    recommendations.push(
      'Considere armazená-la em um gerenciador de senhas confiável.',
    )
  }

  return recommendations.slice(
    0,
    3,
  )
}

export function analyzePassword(
  password = '',
) {
  const value =
    String(password)

  const length =
    value.length

  const hasLowercase =
    /[a-z]/.test(value)

  const hasUppercase =
    /[A-Z]/.test(value)

  const hasNumber =
    /\d/.test(value)

  const hasSymbol =
    /[^A-Za-z0-9\s]/.test(value)

  const hasRepeats =
    /(.)\1{2,}/.test(value)

  const hasSequence =
    containsSequence(value)

  const normalized =
    value.toLowerCase()

  const isCommon =
    COMMON_PATTERNS.some(
      (pattern) =>
        normalized.includes(pattern),
    )

  const varietyCount = [
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasSymbol,
  ].filter(Boolean).length

  const uniqueCount =
    new Set(value).size

  const uniqueRatio =
    length === 0
      ? 0
      : uniqueCount / length

  const criteria = {
    length:
      length >= 12,

    uppercase:
      hasUppercase,

    lowercase:
      hasLowercase,

    number:
      hasNumber,

    symbol:
      hasSymbol,
  }

  let score =
    getLengthScore(length)

  score +=
    varietyCount * 10

  score +=
    Math.round(
      uniqueRatio * 15,
    )

  if (
    length >= 20 &&
    varietyCount >= 3
  ) {
    score += 5
  }

  if (hasRepeats) {
    score -= 15
  }

  if (hasSequence) {
    score -= 15
  }

  if (isCommon) {
    score -= 35
  }

  if (
    length > 0 &&
    varietyCount === 1
  ) {
    score -= 10
  }

  score =
    Math.max(
      0,
      Math.min(
        100,
        Math.round(score),
      ),
    )

  const levelData =
    getLevel(
      score,
      value,
    )

  return {
    score,

    ...levelData,

    criteria,

    flags: {
      hasRepeats,
      hasSequence,
      isCommon,
    },

    metrics: {
      length,
      varietyCount,
      uniqueRatio,

      lengthLabel:
        length >= 16
          ? 'EXCELENTE'
          : length >= 12
            ? 'BOM'
            : length >= 8
              ? 'CURTO'
              : length
                ? 'CRÍTICO'
                : 'SEM DADOS',

      varietyLabel:
        value
          ? `${varietyCount}/4 CLASSES`
          : 'SEM DADOS',

      repetitionLabel:
        value
          ? hasRepeats
            ? 'DETECTADAS'
            : 'BAIXAS'
          : 'SEM DADOS',

      sequenceLabel:
        value
          ? hasSequence
            ? 'DETECTADA'
            : 'NÃO DETECTADA'
          : 'SEM DADOS',
    },

    recommendations:
      buildRecommendations({
        password: value,
        criteria,
        flags: {
          hasRepeats,
          hasSequence,
          isCommon,
        },
        varietyCount,
      }),
  }
}