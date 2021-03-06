
export default app => {
	app.disable("x-powered-by");
	app.use(function(req, res, next) {
		res.removeHeader("X-Powered-By");
		next();
	});
	if (process.env.NODE_ENV === "production") {
		app.set("trust proxy", 1);
	}
};
