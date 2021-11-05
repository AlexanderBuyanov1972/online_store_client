class TutorialController {

    create = (req, res) => {
        // Validate request
        if (!req.body.title) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        // Create a Tutorial
        const tutorial = {
            title: req.body.title,
            description: req.body.description,
            published: req.body.published ? req.body.published : false
        };

        // Save Tutorial in the database
        Tutorial.create(tutorial)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Tutorial."
                });
            });
    };

    update = (req, res) => {
        const id = req.params.id;

        Tutorial.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Tutorial was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Tutorial with id=" + id
                });
            });
    };

    findOne = (req, res) => {
        const id = req.params.id;

        Tutorial.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find Tutorial with id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id=" + id
                });
            });
    };


    findAll = (req, res) => {
        const title = req.query.title;
        var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

        Tutorial.findAll({ where: condition })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });
    };

    findAllPublished = (req, res) => {
        Tutorial.findAll({ where: { published: true } })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });
    };
}

deleteOne = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};

export default new TutorialController()

// GET	    api/tutorials	            get all Tutorials
// GET	    api/tutorials/:id	        get Tutorial by id
// POST	    api/tutorials	            add new Tutorial
// PUT	    api/tutorials/:id	        update Tutorial by id
// DELETE	api/tutorials/:id	        remove Tutorial by id
// DELETE	api/tutorials	            remove all Tutorials
// GET	    api/tutorials/published	    find all published Tutorials
// GET	    api/tutorials?title=[kw]	find all Tutorials which title contains 'kw'

