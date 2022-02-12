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
		var email = "nisarggogate212@gmail.com";
		var name = "Nisarg";
		var start_time = "2022-02-20T20:00:00.000Z";
		var end_time = "2022-02-20T21:00:00.000Z";
		var link = "https://meet.google.com/qoc-zdmb-123";
		var image_url =
			"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png";
		var company = "Google";

		console.log("Mail request");
		let response = await emailService.sendotpEmail("1234", email, name);
		if (response === "Success") {
			console.log("Email Send Successful");
			return res.status(200).send("Succcess");
		}
		response = await emailService.sendPasswordResetEmail(
			"1234",
			email,
			name
		);
		if (response === "Success") {
			console.log("Email Send Successful");
			return res.status(200).send("Succcess");
		}

		response = await emailService.sendUserInterviewConfirmation(
			email,
			name
		);
		if (response === "Success") {
			console.log("Email Send Successful");
			return res.status(200).send("Succcess");
		}

		response = await emailService.sendSessionlink(
			email,
			name,
			"How to get into Google",
			start_time,
			end_time,
			link,
			image_url
		);
		if (response === "Success") {
			console.log("Email Send Successful");
			return res.status(200).send("Succcess");
		}

		response = await emailService.sendUserInterviewSchedule(
			email,
			name,
			start_time,
			end_time,
			company,
			link
		);
		if (response === "Success") {
			console.log("Email Send Successful");
			return res.status(200).send("Succcess");
		}

		response = await emailService.sendMentorInterviewSchedule(
			email,
			name,
			start_time,
			end_time,
			company,
			link
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
