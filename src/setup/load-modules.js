import bodyParser from "body-parser";

export default app => {
	app.disable("x-powered-by");
	app.use(function(req, res, next) {
		res.removeHeader("X-Powered-By");
		next();
	});
	app.set("trust proxy", 1);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
};
