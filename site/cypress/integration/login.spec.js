describe("Login", () => {

    beforeEach(() => {
        cy.visit("/login");
    });

    it("should be", () => {

    });

    it('should login in', () => {
        cy.server();
        cy.get("input[placeholder='email...'")
            .focus()
            .type("admin");
        cy.get("input[placeholder='password...'")
            .focus()
            .type("admin");

        cy.route({
            method: 'POST',      
            url: '/loginIn',    
            response: {
                success: true
        }}).as("preload");

        cy.get("button").contains("Enter").click();
        cy.wait("@preload");

        cy.location('pathname').should("equal", "/");
    });

    it('should fail login in', () => {
        cy.server();
        cy.get("input[placeholder='email...'")
            .focus()
            .type("admin");
        cy.get("input[placeholder='password...'")
            .focus()
            .type("admin");

        cy.route({
            method: 'POST',      
            url: '/loginIn',    
            response: {
                success: false,
                error: {
                    type: "UNKNOWN_DATA"
                }
        }}).as("preload");

        cy.get("button").contains("Enter").click();
        cy.wait("@preload");
        cy.get("div").contains("Bad user data");
    });

    it('should relocation to register page', () => {
        cy.get(".login-register-link").click();
        cy.location("pathname").should('equal', '/register');
    });
});
