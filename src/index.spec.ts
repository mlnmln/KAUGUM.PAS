const kaugum = require("./index");

describe("KAUGUM.pas", () => {
  it("logs title", () => {
    const consoleSpy = jest.spyOn(console, "log");
    expect(consoleSpy).toHaveBeenCalledWith("Kaugummiautomat");
  });
});
