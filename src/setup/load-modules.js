import bodyParser from "body-parser";

const { NODE_ENV } = process.env;

export default app => {
	app.disable("x-powered-by");
	app.use(function(req, res, next) {
		res.removeHeader("X-Powered-By");
		next();
	});
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	if (NODE_ENV === "production") {
		app.set("trust proxy", 1);
	}
};
