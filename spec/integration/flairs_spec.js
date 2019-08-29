const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        this.flair;
        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "GPUs",
                description: "Post your GPUs here"
            }).then((topic) => {
                this.topic = topic;

                Post.create({
                    title: "AMD cpus rock",
                    body: "Yeah the title is right.",
                    topicId: this.topic.id
                }).then((post) => {
                    this.post = post;

                    Flair.create({
                        title: "Hate",
                        color: "red",
                        postId: this.post.id
                    }).then((flair) => {
                       this.flair = flair;
                       done();
                    }).catch((err) => {
                        console.log(err);
                        done();
                    })
                });
            });
        });
    });


});