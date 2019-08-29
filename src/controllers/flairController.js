const flairQueries = require("../db/queries.flairs");

module.exports = {
    new(req, res, next){
        res.render("flairs/new", {postId: req.params.postId});
    },
    create(req, res, next){
        let newFlair = {
            title: req.body.title,
            color: req.body.body,
            postId: req.params.postId
        };
        flairQueries.addFlair(newFlair, (err, flair) => {
            if(err){
                res.redirect(500, "/flairs/new");
            }else{
                res.redirect(303, `/posts/${newFlair.postId}/flairs/${flair.id}/`);
            }
        });
    },
    show(req, res, next){
        postQueries.getPost(req.params.id, (err, post) => {
            if(err || post == null){
                res.redirect(404, "/");
            }else{
                res.render("posts/show", {post});
            }
        });
    },
    destroy(req, res, next){
        postQueries.deletePost(req.params.id, (err, deletedRecordsCount) => {
            if(err){
                res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.id}`);
            }else{
                res.redirect(303, `/topics/${req.params.topicId}`);
            }
        });
    },
    edit(req, res, next){
        postQueries.getPost(req.params.id, (err, post) => {
            if(err || post == null){
                res.redirect(404, "/");
            }else{
                res.render("posts/edit", {post});
            }
        });
    },
    update(req, res, next){
        postQueries.updatePost(req.params.id, req.body, (err, post) => {
            if(err || post == null){
                res.redirect(404, `/topics/${req.params.topicId}/posts/${req.params.id}/edit`);
            } else {
                res.redirect(`/topics/${req.params.topicId}/posts/${req.params.id}`);
            }
        });
    }
}