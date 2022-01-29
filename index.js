const express = require("express");
const cors = require("cors");
const app = express();
const emailService = require("./email.service");

// const fileUpload = require("express-fileupload");

var corsOptions = {
	origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.json({ message: "Welcome to Interview Deck apis..." });
});

app.post("/send-email", async (req, res) => {
	try {
		console.log("Mail request");
		let response = await emailService.sendotpEmail(
			"1234",
			"nisarggogate212@gmail.com",
			"Nisarg"
		);
		if (response === "Success") {
			console.log("Email Send Successful");
			return res.status(200).send("Succcess");
		}
		return res.status(403).send("Something went wrong");
	} catch (err) {
		console.log(err);
		res.status(500).send({ error: { message: err } });
	}
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port on ${PORT}.`);
});
