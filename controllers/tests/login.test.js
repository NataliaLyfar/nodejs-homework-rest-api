describe("Login controller test", () => {
  it("login with email and password", async () => {
    jest.mock("../auth/login.js", async () => {
      const controller = jest.requireActual("../auth/login.js");
      jest.spyOn(controller, "login");

      const req = { body: { email: "nata@gmail.com", password: "1111" } };
      const res = {};

      const result = await controller(req, res);

      expect(result.statusCode).toBe(200);
      expect(result.token).toBeTruthy();
      expect(result.email).toBeTruthy();
      expect(result.subscription).toBeTruthy();
      expect(result).toEqual({
        email: "nata@gmail.com",
        subscription: "starter",
      });
      expect(result.email).toMatch(/\w/);
      expect(result.subscription).toMatch(/\w/);
    });
  });
});
