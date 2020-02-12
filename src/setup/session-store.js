import cookieParser from "cookie-parser";
import mongoDBStore from "connect-mongodb-session";
import session from "express-session";

const { NODE_ENV, DB, SESSION_NAME, SESSION_DB_COLLECTION, SESSION_SECRET, SESSION_LIFE } = process.env;

export default app => {
	app.use(cookieParser(SESSION_NAME));
	const MongoSessionStore = mongoDBStore(session);
	const store = new MongoSessionStore({
		uri: `${DB}`,
		collection: SESSION_DB_COLLECTION,
		clearInterval: 60
	});
	store.on("error", function(error) {
		console.info(error);
	});
	app.use(
		session({
			store,
			name: SESSION_NAME,
			secret: SESSION_SECRET,
			resave: true,
			httpOnly: false,
			rolling: true,
			saveUninitialized: false,
			cookie: {
				maxAge: parseInt(SESSION_LIFE),
				sameSite: true,
				secure: false
			}
		})
	);
};
