const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const models = "../../src/db/models";
const sequelize = require(`${models}/index`).sequelize;
const Topic = require(models).Topic;
const Post = require(models).Post;

describe("routes : posts", () => {
    beforeEach((done) => {
        this.topic;
        this.post;

        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "Summer Games",
                description: "Post your Summer Games stories"
            }).then((topic) => {
                this.topic = topic;
                Post.create({
                    title: "Sandball Fighting",
                    body: "So much sand!",
                    topicId: this.topic.id
                }).then((post) => {
                    this.post = post;
                    done();
                }).catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    describe("GET /topics/:topicId/posts/new", () => {
        it("should render a new post form", (done) => {
            request.get(`${base}/${this.topic.id}/posts/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Post");
                done();
            });
        });
    });

    describe("POST /topics/:topicId/posts/create", () => {
        it("should create a new post and redirect", (done) => {
            const options = {
                url: `${base}/${this.topic.id}/posts/create`,
                form: {
                    title: "Watching sand melt",
                    body: "Without a doubt my favorite things to do besides watching paint dry!"
                }
            };
            request.post(options, (err, res, body) => {
                Post.findOne({where: {title: "Watching sand melt"}}).then((post) => {
                    expect(post).not.toBeNull();
                    expect(post.title).toBe("Watching sand melt");
                    expect(post.body).toBe("Without a doubt my favorite things to do besides watching paint dry!");
                    expect(post.topicId).not.toBeNull();
                    done();
                }).catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    describe("GET /topics/:topicId/posts/:id", () => {
        it("should render a view with the selected post", (done) => {
            request.get(`${base}/${this.topic.id}/posts/${this.post.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Sandball Fighting");
                done();
            });
        });
    });

    describe("POST /topics/:topicId/posts/:id/destroy", () => {
        it("should delete the post with the associated ID", (done) => {
            expect(this.post.id).toBe(1);
            request.post(`${base}/${this.topic.id}/posts/${this.post.id}/destroy`, (err, res, body) => {
                Post.findById(1).then((post) => {
                    expect(err).toBeNull();
                    expect(post).toBeNull();
                    done();
                });
            });
        });
    });

    describe("POST /topics/:topicId/posts/:id/update", () => {

        it("should return a status code 302", (done) => {
            request.post({
                url: `${base}/${this.topic.id}/posts/${this.post.id}/update`,
                form: {
                    title: "Sandball Building Competition",
                    body: "I love watching them melt slowly."
                }
            }, (err, res, body) => {
                expect(res.statusCode).toBe(302);
                done();
            });
        });

        it("should update the post with the given values", (done) => {
            const options = {
                url: `${base}/${this.topic.id}/posts/${this.post.id}/update`,
                form: {
                    title: "Sandball Building Competition"
                }
            };
            request.post(options,
                (err, res, body) => {

                    expect(err).toBeNull();

                    Post.findOne({
                        where: {id: this.post.id}
                    })
                        .then((post) => {
                            expect(post.title).toBe("Sandball Building Competition");
                            done();
                        });
                });
        });

    });
});