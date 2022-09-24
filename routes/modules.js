const express = require('express');
const router = express.Router();
const Modules = require('../models/Modules');
const upload = require('../middleware/upload')

//Modules Listeleme
router.get('/modules', async (req, res) => {
    try {
        const modules = await Modules.find();
        res.json(modules)
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

//Modules Ekleme
router.post('/addModules', upload.single('icon'), (req, res) => {
    const modules = new Modules({
        title: req.body.title,
        icon: req.body.icon,
    })

    try {
        if (req.file) {
            modules.icon = req.file.path
        }

        modules.save()
            .then(user => {
                res.json({
                    result_message: {
                        type: "success",
                        title: "Info",
                        message: "The modules has been successfully added."
                    }
                })
            })
            .catch(error => {
                res.json({
                    result_message: {
                        type: "error",
                        title: "Info",
                        message: "The modules could not be added"
                    }
                })
            })

    } catch (error) {
        res.json({ message: error })
    }

})

//Modules Güncelleme
router.patch('/modules/:id', upload.single('icon'), async (req, res) => {
    try {

        if (req.file) {
            req.body.icon = req.file.path
        }

        await Modules.updateOne(
            {
                _id: req.params.id
            },
            {
                $set: {
                    title: req.body.title,
                    icon: req.body.icon,
                }
            }
        )
            .then(userInfo => {
                if (userInfo) {
                    res.json({
                        result: {
                            message: "Modules information has been successfully updated.."
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
                            message: "Module information could not be updated!!"
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
                message: "Module information could not be updated!!"
            },
            result_message: {
                type: "error",
                title: "info",
                message: "Error"
            }
        })
    }
})

//Modules Silme
router.delete('/modules/:id', async (req, res) => {
    try {
        await Modules.remove({ _id: req.params.id });
        res.json({
            result: {
                message: "Module deleted successfully.."
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
                message: "Module could not be deleted.."
            },
            result_message: {
                type: "error",
                title: "info",
                message: "Error"
            }
        })
    }
})

//Modules Getirme
router.get('/modules/:id', async (req, res) => {
    try {
        const modules = await Modules.findById({ _id: req.params.id });
        res.json({
            result: modules,
            result_message: {
                type: "success",
                title: "info",
                message: "Successfully"
            }
        })
    } catch (error) {
        res.json({
            result: {
                message: "Modules information not found!!"
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