const {
  pathHandler,
  createAcclegorServer,
} = require("./index");

describe("test case for URLHandler.", () => {
  const pathName = pathHandler("/desktop/recharge/Mobile?amount=20");
  test("return Pathname.", () => {
    const result = pathName.pathname;
    expect(result).toBe("/desktop/recharge/Mobile");
  });
  test("return search params.", () => {
    const result = pathName.searchParams;
    expect(result).toEqual({ amount: "20" });
  });
});

describe("Check API pathnames.", () => {
  test("Check data for 2 params.", async (done) => {
    const app = createAcclegorServer();
    /**
     *
     * tested on localhost (http://localhost:4200/abc/cdf)
     */
    function callback(req, res) {
      const result = req.params;
      try {
        expect(result).toEqual({ path1: "abc", path2: "cdf" });
        done();
      } catch (error) {
        done(error);
      }
    }
    app.get("/:path1/:path2", callback);

    app.listen(4200);
  });
});
