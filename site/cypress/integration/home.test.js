/// <reference types="Cypress"/>

describe("Home Page", () => {
    it('should be', () => {
        cy.visit("/");
    });

    it('should change relocation to docs when click "Get Started"', () => {
        cy.visit("/");
        cy.get(".home-page-main-action-container").click();
        cy.location("pathname").should("equal", "/documentation");
    });

    it('should change relocation to docs when click "Get Started"', () => {
        cy.visit("/");
        cy.get("a[href='/login']").click();
        cy.location("pathname").should("equal", "/login");
    });

    it('should be logined', () => {
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
        cy.visit("/");

    });
});