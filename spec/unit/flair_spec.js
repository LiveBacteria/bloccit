const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

    describe("#create()", () => {
        it("should create a flair object with a title, body and assigned post", (done) => {
           Flair.create({
               title: "Positive",
               body: "green",
               postId: this.post.id
           })
        });
    });
});