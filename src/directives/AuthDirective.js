import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";
import { ensureSignedIn } from "../middlewares/auth";

class AuthDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;
		field.resolve = function(...args) {
			const [, , context] = args;
			console.log(context.req.session);
			ensureSignedIn(context.req);
			return resolve.apply(this, args);
		};
	}
}

export default AuthDirective;
