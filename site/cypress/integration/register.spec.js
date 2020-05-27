/// <reference types="Cypress"/>

describe("Register Page", () => {
    it("should be", () => {
        cy.visit("/register");
    });

    it("should types in all fields", () => {
        cy.get(".MuiFormControl-root.MuiTextField-root").eq(0).type("MyTestUsername")
            .then(() => cy.get(".MuiFormControl-root.MuiTextField-root").eq(1).type("mytestemail@test.com"))
            .then(() => cy.get(".MuiFormControl-root.MuiTextField-root").eq(2).type("MyTestPassword"))
            .then(() => cy.get(".MuiFormControl-root.MuiTextField-root").eq(3).type("MyTestPassword"));
    });

    it("should register success", () => {
        cy.server();
        cy.route({
            method: 'POST',      
            url: '/registerIn',    
            response: {
                success: true
        }}).as("register");

        cy.get(".register-submit-btn").click();

        cy.wait("@register");
    });

    it("should register fail", () => {
        cy.server();
        cy.reload();
        cy.route({
            method: 'POST',      
            url: '/registerIn',    
            response: {
                success: false,
                error: {
                    type: "EMAIL_INVALID"
                }
        }}).as("register");

        cy.get(".MuiFormControl-root.MuiTextField-root").eq(0).type("MyTestUsername")
            .then(() => cy.get(".MuiFormControl-root.MuiTextField-root").eq(1).type("mytestnoemail"))
            .then(() => cy.get(".MuiFormControl-root.MuiTextField-root").eq(2).type("MyTestPassword"))
            .then(() => cy.get(".MuiFormControl-root.MuiTextField-root").eq(3).type("MyTestPassword"));
    
        cy.get(".register-submit-btn").click();

        cy.wait("@register");
    });
});