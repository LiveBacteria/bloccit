const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {
    beforeEach((done) => {
        this.topic;
        this.flair;
        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "GPUs",
                description: "Post your GPUs here"
            }).then((topic) => {
                this.topic = topic;

                Flair.create({
                    title: "Negative",
                    body: "red",
                    topicId: this.topic.id
                });
            });
        });
    });


});