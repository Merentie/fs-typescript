interface bmiInput {
  height: number
  weight: number
}

const parseBmiArguments = (args: string[]): bmiInput => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')
  const height = args[2]
  const weight = args[3]
  if (isNaN(Number(height)) || isNaN(Number(weight)))
    throw new Error('Provided values were not numbers')
  return {
    height: parseInt(height),
    weight: parseInt(weight),
  }
}

export const calculateBmi = (height_cm: number, weight_kg: number): string => {
  const height_m = height_cm / 100
  const height_m_squared = Math.pow(height_m, 2)
  const bmi = weight_kg / height_m_squared
  if (bmi < 16) {
    return 'Underweight (Severe thinness)'
  } else if (bmi >= 16 && bmi < 17) {
    return 'Underweight (Moderate thinness)'
  } else if (bmi >= 17 && bmi < 18.5) {
    return 'Underweight (Mild thinness)'
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal range'
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight'
  } else if (bmi >= 30 && bmi < 35) {
    return 'Obese (Class I)'
  } else if (bmi >= 35 && bmi < 40) {
    return 'Obese (Class II)'
  } else if (bmi >= 40) {
    return 'Obese (Class III)'
  } else {
    throw new Error('Something went wrong')
  }
}

try {
  const { height, weight } = parseBmiArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Error'
  if (error instanceof Error) {
    errorMessage += ': ' + error.message
  }
  console.log(errorMessage)
}
