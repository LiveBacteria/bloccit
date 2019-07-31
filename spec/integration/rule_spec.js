const request = require("request");
const server = require("../../src/server");
const base = "https://localhost:3000/rule";
const sequelize = require("../../src/db/models/index").sequelize;
const Rule = require("../../src/db/models").Rule;

describe("routes : rule", () => {
   beforeEach((done) => {
      this.rule;
      sequelize.sync({force: true}).then((res) => {
        Rule.create({
            title: "JS Frameworks",
            description: "This is the rule."
        }).then((rule) => {
            this.rule = rule;
            done();
        }).catch((err) => {
            console.log(err);
            done();
        });
      });
   });

   describe("GET /rule", () => {
      it("should return a status code 200 and all rules", (done) => {
          request.get(base, (err, res, body) => {
              expect(res.statusCode).toBe(200);
              expect(err).toBeNull();
              expect(body).toContain("Rule");
              expect(body).toContain("This is the rule");
              done();
          });
      });
   });
});