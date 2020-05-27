/// <reference types="Cypress"/>

describe("Pictures Page", () => {
    it('should be', () => {
        cy.visit("/pictures");
    });
    it('should have no museums', () => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '/getData',
            response: {
                email: "rostik@gmail.com",
                success: true,
                username: "Rostik"
            }
        });
        cy.route({
            method: 'POST',
            url: '/getMuseums',
            response: {
                success: true,
                museums: [],
            }
        });
        cy.visit("/pictures");
    });
    it('should have no pictures', () => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '/getData',
            response: {
                email: "rostik@gmail.com",
                success: true,
                username: "Rostik"
            }
        });
        cy.route({
            method: 'POST',
            url: '/getMuseums',
            response: {
                success: true,
                museums: [{ id: 46, name: "Мій новий музей23", location: "Тернопіль", iconName: "", updateId: 4 }],
            }
        });
        cy.visit("/pictures");

    });

    it('should have pictures by select museum', () => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '/getData',
            response: {
                email: "rostik@gmail.com",
                success: true,
                username: "Rostik"
            }
        });
        cy.route({
            method: 'POST',
            url: '/getMuseums',
            response: {
                success: true,
                museums: [
                    {
                        id: 46,
                        name: "Мій новий музей23",
                        location: "Тернопіль",
                        iconName: "",
                        updateId: 4
                    }
                ],
            }
        });
        cy.route({
            method: "POST",
            url: "/getPicturesData",
            response: {
                success: true,
                pictures: [
                    {
                        id: 105,
                        name: "Мона Ліза",
                        description: "Зал 1",
                        qrcode: "MY_MONA_LIZE_QR_CODE",
                        includeRelease: 1,
                        favorite: 1,
                        iconName: "61de89fff2154ef562fbe406da7b3cf5"
                    }, {
                        id: 106,
                        name: "Таємна вечеря",
                        description: 123,
                        qrcode: 123,
                        includeRelease: 0,
                        favorite: 0, iconName: null
                    }
                ],
                pagesData: {
                    pagesCount: 0,
                    pageNumber: 1
                },
                museumId: 46
            }
        })
        cy.visit("/pictures");
        cy.get(".pictures-page").find('.MuiSelect-select').eq(1).click();
        cy.get(".MuiPopover-root").find(".MuiPopover-paper").find("ul").find("li").click();
    });
});