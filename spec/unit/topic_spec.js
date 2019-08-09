/*const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;

describe("Topic", () => {
    beforeEach((done) => {
        this.topic;
        this.post;

        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "This is a test topic title",
                description: "This is a test topic description"
            }).then((topic) => {
                this.topic = topic;
            }).catch((err) => {
               console.log(err);
               done();
            });
        });
    });
    describe("#create()", (done) => {

    });
});
*/