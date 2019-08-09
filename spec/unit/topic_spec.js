const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {
    beforeEach((done) => {
        this.topic;
        this.post;

        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "Crypto",
                description: "All things crypto"
            }).then((topic) => {
                this.topic = topic;

                Post.create({
                    title: "I lost my wallet",
                    body: "Today I lost 5 btc",
                    topicId: this.topic.id
                }).then((post) => {
                    this.post = post;
                    done();
                });
            }).catch((err) => {
               console.log(err);
               done();
            });
        });
    });
    describe("#create()", () => {
        it("should create a topic object with a title, body,", (done) => {
            Post.create({
                title: "I found someones wallet",
                body: "I'm rich, it had 5 btc in it!",
                topicId: this.topic.id
            }).then((post) => {
                expect(post.title).toBe("I found someones wallet");
                expect(this.topic.title).toBe("Crypto");
                done();
            }).catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("#getPosts()", () => {
        it("should return the associated posts", (done) => {
            Post.create({
                title: "Crypto Sucks",
                body: "I lost all my money",
                topicId: this.topic.id
            }).then((post) => {

                expect(post.topicId).toBe(this.topic.id);
                expect(post.body).toBe("I lost all my money");

                this.topic.getPosts().then((posts) => {
                    expect(posts[0].title).toBe("I lost my wallet");
                    expect(posts[1].title).toBe("Crypto Sucks");
                    done();
                });
            }).catch((err) => {
                console.log(err);
                done();
            })
        });
    });
});