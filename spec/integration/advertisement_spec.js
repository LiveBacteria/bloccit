const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisements", () => {
    beforeEach((done) => {
        this.advert;
        sequelize.sync({force: true}).then((res) => {

            Advertisement.create({
                title: "Game Ad",
                description: "First Ad :)"
            })
                .then((advert) => {
                    this.advert = advert;
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });
    describe("GET /advertisements/new", () => {

        it("should render a new advertisement form", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Advertisement");
                done();
            });
        });

    });
    describe("GET /advertisements", () => {
        it("should return the advertisement", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Advertisements");
                expect(body).toContain("Game Ad");
                done();
            });
        });
    });

    describe("POST /advertisements/create", () => {
        const options = {
            url: `${base}create`,
            form: {
                title: "Ad Temp",
                description: "This is a temp ad."
            }
        };

        it("should create a new advertisement and redirect", (done) => {
            request.post(options,
                (err, res, body) => {
                    Advertisement.findOne({where: {title: "Ad Temp"}}).then((advertisement) => {
                            expect(res.statusCode).toBe(303);
                            expect(advertisement.title).toBe("Ad Temp");
                            expect(advertisement.description).toBe("This is a temp ad.");
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
    });
});

//2:27:38 triforce live 100

