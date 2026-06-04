interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface exerciseInput {
  hours: number[]
  target: number
}

const parseExerciseArguments = (args: string[]): exerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments')
  const target = parseInt(args[2])

  const hours = args.slice(3).map((h) => {
    if (isNaN(Number(h)))
      throw new Error('Some provided values were not numbers')
    return parseFloat(h)
  })

  return {
    hours: hours,
    target: target,
  }
}

export const calculateExercises = (hours: number[], target: number): Result => {
  const hourSum = hours.reduce((acc, cur) => acc + cur, 0)
  const daysTrained = hours.reduce((acc, cur) => (cur !== 0 ? acc + 1 : acc), 0)
  const dailyAverage = hourSum / hours.length
  const score = dailyAverage >= target ? 3 : dailyAverage > target / 2 ? 2 : 1
  const scoreDesc =
    score === 3
      ? 'great job!'
      : score === 2
        ? 'not too bad but could be better'
        : 'you need to do better'

  return {
    periodLength: hours.length,
    trainingDays: daysTrained,
    success: dailyAverage >= target ? true : false,
    rating: score,
    ratingDescription: scoreDesc,
    target: target,
    average: dailyAverage,
  }
}

try {
  const { hours, target } = parseExerciseArguments(process.argv)
  console.log(calculateExercises(hours, target))
} catch (error: unknown) {
  let errorMessage = 'Error'
  if (error instanceof Error) {
    errorMessage += ': ' + error.message
  }
  console.log(errorMessage)
}
