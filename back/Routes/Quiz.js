const express = require('express');
const router = express.Router();
const Quiz = require('../Models/quiz');

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/', asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes.map((quiz) => ({
    id: quiz._id,
    question: quiz.question,
    options: quiz.options,
    correctAnswers: quiz.correctAnswers,
    difficulty: quiz.difficulty,
  })));
}));

router.post('/',async (req, res) => {
  const { question, options, difficulty, correctAnswers } = req.body;
  const quiz = new Quiz({ question, options, difficulty, correctAnswers });
  await quiz.save();
  res.status(201).json({ message: 'Quiz added successfully' });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { question, options, difficulty, correctAnswers } = req.body;
  try{
    await Quiz.findByIdAndUpdate(id, { question, options, difficulty, correctAnswers });
    res.json({ message: 'Quiz updated successfully' });
  }catch(err){
    res.status(404).json({ message: 'Quiz not found' });
  }

});


router.delete('/:id',async (req, res) => {
  const { id } = req.params;
  try{
    await Quiz.findByIdAndDelete(id);
    res.json({ message: 'Quiz deleted successfully' });
  }catch(err){
    res.status(404).json({ message: 'Quiz not found' });
  }

});

module.exports = router;