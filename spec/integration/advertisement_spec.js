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

    describe("GET /advertisements/:id", () => {
       it("should render a view with the selected advertisement", (done) => {
          request.get(`${base}${this.advert.id}`, (err, res, body) => {
              expect(err).toBeNull();
              expect(body).toContain("Game Ad");
              done();
          });
       });
    });

    describe("POST /advertisements/:id/destroy", () => {
        it("should delete the advertisement with the associated ID", (done) => {
            Advertisement.all().then((advertisements) => {
                const advertisementsCountBeforeDelete = advertisements.length;
                expect(advertisementsCountBeforeDelete).toBe(1);

                request.post(`${base}${this.advert.id}/destroy`, (err, res, body) => {
                    Advertisement.all().then((advertisements) => {
                        expect(err).toBeNull();
                        expect(advertisements.length).toBe(advertisementsCountBeforeDelete - 1);
                        done();
                    });
                });
            });
        });
    });

    describe("GET /advertisements/:id/edit" , () => {
        it("should render a view with an edit advertisement", (done) => {
            request.get(`${base}${this.advert.id}/edit`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Edit Advertisement");
                expect(body).toContain("Game Ad");
                done();
            });
        });
    });

    describe("POST /advertisements/:id/update", () => {
        it("should update the advertisement with the given values", (done) => {
            const options = {
                url: `${base}${this.advert.id}/update`,
                form: {
                    title: "Game Ad",
                    description: "Yeah, there is a lot."
                }
            };
            request.post(options,
                (err, res, body) => {
                    expect(err).toBeNull();
                    Advertisement.findOne({
                        where: { id: this.advert.id }
                    }).then((advertisement) => {
                        expect(advertisement.title).toBe("Game Ad");
                        done();
                    });
                });
        });
    });
});

//2:27:38 triforce live 100

