const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        this.flair;
        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "Gpus",
                description: "A compilation of reports and benchmarks of Gpus from AMD, Intel and, Nvidia."
            }).then((topic) => {
                    this.topic = topic;
                    Post.create({
                        title: "My first visit to Nvidia HQ",
                        body: "I saw some gpus.",
                        topicId: this.topic.id
                    }).then((post) => {
                            this.post = post;
                            Flair.create({
                                title: "Love",
                                color: "pink",
                                postId: this.post.id
                            }).then((flair) => {
                                this.flair = flair;
                                done();
                            });
                        });
                }).catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });

    describe("#create()", () => {

        it("should create a flair object with a title, color, and assigned post", (done) => {
            Flair.create({
                title: "Hate",
                color: "red",
                postId: this.post.id
            }).then((flair) => {
                    expect(flair.title).toBe("Hate");
                    expect(flair.color).toBe("red");
                    done();
                }).catch((err) => {
                    console.log(err);
                    done();
                });
        });

        it("should not create a flair object with a title, color, and assigned post", (done) => {
            Flair.create({
                title: "Peace"
            }).then((flair) => {
                done();
            }).catch(err => {
                expect(err.message).toContain("Flair.color cannot be null");
                expect(err.message).toContain("Flair.postId cannot be null");
                done();
            })
        });
    });

    describe("#setPost()", () => {

        it("should associate a flair and a post together", (done) => {
            Topic.create({
                title: "Time",
                description: "Talks of time and relevants."
            }).then((newTopic) => {
                Post.create({
                    title: "Time is constant?",
                    body: "Is time always constant?",
                    topicId: newTopic.id
                }).then((newPost) => {
                    Flair.create({
                        title: "Restful",
                        color: "purple",
                        postId: newPost.id
                    }).then((newFlair) => {
                       expect(this.flair.postId).toBe(this.post.id);

                       newFlair.setPost(newPost).then((flair) => {
                           expect(flair.postId).toBe(newPost.id);
                           done();
                       });
                    });
                });
            });
        });
    });

    describe("#getPost()", () => {
        it("should get a flairs post", (done) => {
            Topic.create({
                title: "Space",
                description: "Talks of gravity and relevants."
            }).then((newTopic) => {
                Post.create({
                    title: "Gravity is constant?",
                    body: "Is gravity always constant?",
                    topicId: newTopic.id
                }).then((newPost) => {
                    Flair.create({
                        title: "Peace",
                        color: "lightblue",
                        postId: newPost.id
                    }).then((newFlair) => {
                        expect(this.flair.postId).toBe(this.post.id);

                        newFlair.getPost().then((post_0) => {
                            expect(post_0.topicId).toBe(newTopic.id);

                            this.flair.getPost().then((post_1) => {
                                expect(post_1.topicId).toBe(this.topic.id);
                                done();
                            });
                        });
                    });
                });
            })
        });
    });
});