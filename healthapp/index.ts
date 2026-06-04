import express from 'express'
import type { Request } from 'express'
import { calculateBmi } from './bmiCalculator.ts'
import { calculateExercises } from './exerciseCalculator.ts'

interface HeightWeight {
  height: number
  weight: number
}

interface ExercisesTarget {
  daily_exercises: number[]
  target: number
}

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get(
  '/bmi',
  (req: Request<unknown, unknown, unknown, HeightWeight>, res) => {
    try {
      const { height, weight } = req.query
      const bmi = calculateBmi(height, weight)
      res.send({ weight: Number(weight), height: Number(height), bmi: bmi })
    } catch {
      res.status(400).send({ error: 'malformatted parameters' })
    }
  },
)

app.post(
  '/exercises',
  (req: Request<unknown, unknown, ExercisesTarget, unknown>, res) => {
    try {
      const { daily_exercises, target } = req.body

      if (!daily_exercises || !target) {
        res.status(400).send({ error: 'parameters missing' })
      }

      if (isNaN(Number(target))) {
        res.status(400).send({ error: 'malformatted parameters' })
      }

      daily_exercises.map((h) => {
        if (isNaN(Number(h)) || target === null) {
          res.status(400).send({ error: 'malformatted parameters' })
        }
        return h
      })

      const exerciseRating = calculateExercises(daily_exercises, target)
      res.send(exerciseRating)
    } catch {
      res.status(400).send({ error: 'malformatted parameters' })
    }
  },
)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
