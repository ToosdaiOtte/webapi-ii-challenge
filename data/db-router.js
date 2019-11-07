const express = require('express');

const router = express.Router();
const Data = require('./db.js');

router.get('/', (req, res) => {
    Data.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            error:  "The posts information could not be retrieved.",
            err
        });
    });
});

router.get('/:id', (req, res) => {
    Data.findById(req.params.id)
    .then(post => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(400).json({  message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "The post information could not be retrieved.",
            err
        })
    })
})

router.get('/:id/comments', (req, res) => {
    Data.findPostComments(req.params.id)
    .then(comments => {
        if(comments){
            res.status(200).json(comments)
        } else {
            res.status(400).json({ 
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "The comments information could not be retrieved.",
            err
        })
    })
});

router.post('/', (req, res) => {
    const postInfo = req.body;

    if('title' && 'contents' in postInfo === false){
        res.status(404).json({
            errorMessage: "Please provide title and contents for the post.",
        })
    };

    Data.insert(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        res.status(500).json({
            message: "There was an error while saving the post to the database",
            err
        })
    })
});

router.post('/:id/comments', (req, res) => {

    const comment = {...req.body, post_id: req.params.id };
    // const id = req.params.id;
    console.log(comment, id);
    // console.log(Data)
    
    if(!comment.post_id) {
        return res.status(404).json({
            errorMessage: 'The post with the specified ID does not exist'
        })
    } else if(!comment.text) {
        return res.status(400).json({
            errorMessage: 'Please provide text for the comment'
        })
    }

    Data.insertComment(comment)
        .then(comment => {
            res.status(201).json(comment)
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "There was an error while saving the comment to the database.",
                err
            })
        })
})

router.delete('/:id', (req, res) => {
    let postObject = 

             Data.findById(req.params.id)
                .then(post => {
                    res.status(200).json(post)
                })
                .catch(err => {
                    res.status(500).json({
                        error: "The post information could not be retrieved.",
                        err
                    })
                });
    // const post = {title: req.title, content: req.content, id: req.params.id};
    Data.remove(req.params.id)
        .then(id => {
            // console.log(post)
            if(id){

                res.status(200).json(postObject)
            } else {
                res.status(404).json({
                    errorMessage: 'The post with the specified ID does not exist.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: 'The post could not be removed',
                err
            })
        })
})

module.exports = router;