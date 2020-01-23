
export default app => {
	app.disable("x-powered-by");
	app.use(function(req, res, next) {
		res.removeHeader("X-Powered-By");
		next();
	});
	app.set("trust proxy", 1);
};
