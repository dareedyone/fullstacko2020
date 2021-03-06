const {
	ApolloServer,
	gql,
	UserInputError,
	AuthenticationError,
	PubSub,
} = require("apollo-server");
const Book = require("./models/book");
const Author = require("./models/author");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const JWT_SECRET = "I_AM_A_SECRET_KEY";
const pubsub = new PubSub();
const MONGODB_URI =
	"mongodb+srv://fullstack:test1234@cluster0.vdjnh.mongodb.net/library?retryWrites=true&w=majority";
console.log("connecting to", MONGODB_URI);

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("connected to MongoDB"))
	.catch((error) => console.log("error connection to MongoDB", error.message));
let authors = [
	{
		name: "Robert Martin",
		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
		born: 1952,
	},
	{
		name: "Martin Fowler",
		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
		born: 1963,
	},
	{
		name: "Fyodor Dostoevsky",
		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
		born: 1821,
	},
	{
		name: "Joshua Kerievsky", // birthyear not known
		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
	},
	{
		name: "Sandi Metz", // birthyear not known
		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
	},
];

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */

let books = [
	{
		title: "Clean Code",
		published: 2008,
		author: "Robert Martin",
		id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring"],
	},
	{
		title: "Agile software development",
		published: 2002,
		author: "Robert Martin",
		id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
		genres: ["agile", "patterns", "design"],
	},
	{
		title: "Refactoring, edition 2",
		published: 2018,
		author: "Martin Fowler",
		id: "afa5de00-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring"],
	},
	{
		title: "Refactoring to patterns",
		published: 2008,
		author: "Joshua Kerievsky",
		id: "afa5de01-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring", "patterns"],
	},
	{
		title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
		published: 2012,
		author: "Sandi Metz",
		id: "afa5de02-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring", "design"],
	},
	{
		title: "Crime and punishment",
		published: 1866,
		author: "Fyodor Dostoevsky",
		id: "afa5de03-344d-11e9-a414-719c6709cf3e",
		genres: ["classic", "crime"],
	},
	{
		title: "The Demon ",
		published: 1872,
		author: "Fyodor Dostoevsky",
		id: "afa5de04-344d-11e9-a414-719c6709cf3e",
		genres: ["classic", "revolution"],
	},
];

const typeDefs = gql`
	type Subscription {
		bookAdded: Book!
	}
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type UserToken {
		value: String!
		user: User!
	}

	type Book {
		title: String!
		author: Author!
		published: Int!
		genres: [String!]!
		id: ID!
	}
	type Author {
		id: ID!
		name: String!
		born: Int
		bookCount: Int!
	}
	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
	}
	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): UserToken
	}
`;

const resolvers = {
	// Author: {
	// 	bookCount: async (root) => (await Book.find({ author: root._id })).length,
	// },
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		allBooks: (root, args) => {
			return args.genre
				? Book.find({ genres: { $in: [args.genre] } }).populate("author")
				: Book.find({}).populate("author");
		},
		allAuthors: () => Author.find({}),
		me: (root, args, context) => context.currentUser,
	},
	Mutation: {
		addBook: async (root, args, { currentUser }) => {
			if (!currentUser) throw new AuthenticationError("not authenticated");
			let author = await Author.findOne({ name: args.author });
			if (!author) {
				author = await new Author({ name: args.author }).save();
			} else {
				author.bookCount = author.bookCount + 1;
				author = await author.save();
			}
			const book = await new Book({ ...args, author: author._id })
				.save()
				.catch((error) => {
					throw new UserInputError(error.message, { invalidArgs: args });
				});
			await book.populate("author").execPopulate();
			pubsub.publish("BOOK_ADDED", { bookAdded: book });
			return book;
		},

		editAuthor: (root, args, { currentUser }) => {
			if (!currentUser) throw new AuthenticationError("not authenticated");
			return Author.findOneAndUpdate(
				{ name: args.name },
				{ born: args.setBornTo },
				{ new: true }
			);
		},
		createUser: (root, args) => {
			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre,
			});
			return user.save().catch((error) => {
				throw new UserInputError(error.message, { invalidArgs: args });
			});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });
			if (!user || args.password !== "secred")
				throw new UserInputError("wrong credentials");
			const userForToken = {
				username: user.username,
				id: user._id,
			};
			return { value: jwt.sign(userForToken, JWT_SECRET), user };
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req?.headers?.authorization;
		if (auth && auth.toLocaleLowerCase().startsWith("bearer ")) {
			const decodedToken = await jwt.verify(auth.substring(7), JWT_SECRET);
			const currentUser = await User.findById(decodedToken.id);
			return { currentUser };
		}
	},
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
