const express = require('express');
const uploads = require('../middleware/upload');
const router = express.Router();
const Questions = require('../models/Questions');

//Questions Listeleme
router.get('/question', async (req, res) => {
    try {
        const questions = await Questions.find();
        res.json(questions)
    } catch (error) {
        res.json({
            result: null,
            result_message: {
                type: "error",
                title: "Information",
                message: "No data."
            }
        })
    }
})

//Questions Ekleme
const cpUpload = uploads.fields([{ name: 'questionIcon', maxCount: 1 }, { name: 'answerA', maxCount: 1 }, { name: 'answerB', maxCount: 1 }, { name: 'answerC', maxCount: 1 }, { name: 'answerD', maxCount: 1 }])
router.post('/addQuestion', cpUpload, (req, res) => {
    const questions = new Questions({
        question: req.body.question,
        questionType: req.body.questionType,
        categoryName: req.body.categoryName,
        questionIcon: req.files['questionIcon'] && process.env.URL + req.files['questionIcon'][0].path || req.body.questionIcon || '',
        answerA: req.files['answerA'] && process.env.URL + req.files['answerA'][0].path || req.body.answerA || '',
        answerB: req.files['answerB'] && process.env.URL + req.files['answerB'][0].path || req.body.answerB || '',
        answerC: req.files['answerC'] && process.env.URL + req.files['answerC'][0].path || req.body.answerC || '',
        answerD: req.files['answerD'] && process.env.URL + req.files['answerD'][0].path || req.body.answerD || '',
        correctAnswer: req.body.correctAnswer,
    })

    try {
        questions.save()
            .then(user => {
                res.json({
                    result_message: {
                        type: "success",
                        title: "Info",
                        message: "The questions has been successfully added."
                    }
                })
            })
            .catch(error => {
                res.json({
                    result_message: {
                        type: "error",
                        title: "Info",
                        message: "The questions could not be added"
                    }
                })
            })

    } catch (error) {
        res.json({ message: error })
    }

})

//Questions Güncelleme
router.patch('/question/:id', cpUpload, async (req, res) => {
    try {
        await Questions.updateOne(
            {
                _id: req.params.id
            },
            {
                $set: {
                    question: req.body.question,
                    questionType: req.body.questionType,
                    categoryName: req.body.categoryName,
                    questionIcon: req.files['questionIcon'] && process.env.URL + req.files['questionIcon'][0].path || req.body.questionIcon || '',
                    answerA: req.files['answerA'] && process.env.URL + req.files['answerA'][0].path || req.body.answerA || '',
                    answerB: req.files['answerB'] && process.env.URL + req.files['answerB'][0].path || req.body.answerB || '',
                    answerC: req.files['answerC'] && process.env.URL + req.files['answerC'][0].path || req.body.answerC || '',
                    answerD: req.files['answerD'] && process.env.URL + req.files['answerD'][0].path || req.body.answerD || '',
                    correctAnswer: req.body.correctAnswer,
                }
            }
        )
            .then(userInfo => {
                if (userInfo) {
                    res.json({
                        result: {
                            message: "Questions information has been successfully updated.."
                        },
                        result_message: {
                            type: "success",
                            title: "info",
                            message: "Successful"
                        }
                    })

                } else {
                    res.json({
                        result: {
                            message: "Question information could not be updated!!"
                        },
                        result_message: {
                            type: "error",
                            title: "info",
                            message: "Error"
                        }
                    })
                }
            })


    } catch (err) {
        res.json({
            result: {
                message: "Question information could not be updated!!"
            },
            result_message: {
                type: "error",
                title: "info",
                message: "Error"
            }
        })
    }
})

//Questions Silme
router.delete('/question/:id', async (req, res) => {
    try {
        await Questions.remove({ _id: req.params.id });
        res.json({
            result: {
                message: "Question deleted successfully.."
            },
            result_message: {
                type: "success",
                title: "info",
                message: "Successfully"
            }
        })
    } catch (error) {
        res.json({
            result: {
                message: "Question could not be deleted.."
            },
            result_message: {
                type: "error",
                title: "info",
                message: "Error"
            }
        })
    }
})

//Questions Getirme
router.get('/question/:id', async (req, res) => {
    try {
        const questions = await Questions.findById({ _id: req.params.id });
        res.json({
            result: questions,
            result_message: {
                type: "success",
                title: "info",
                message: "Successfully"
            }
        })
    } catch (error) {
        res.json({
            result: {
                message: "Questions information not found!!"
            },
            result_message: {
                type: "error",
                title: "info",
                message: "Error"
            }
        })

    }
})


module.exports = router;