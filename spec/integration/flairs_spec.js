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
                    title: "Nvidia Sucks",
                    body: "So much amd",
                    topicId: this.topic.id;
            }).then((post) => {
                    this.post = post;
                    console.log(this.post.id);

                    Flair.create({
                        title: "Negative",
                        body: "red",
                        postId: this.post.id
                    })
                }).catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });


});