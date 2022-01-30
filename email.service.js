var nodemailer = require("nodemailer");
const config = require("./config");
const hbs = require("nodemailer-express-handlebars");

function ISODateString(d) {
	var isoDate = d.toISOString();
	isoDate = isoDate.replaceAll(":", "");
	isoDate = isoDate.replaceAll("-", "");
	var retval = isoDate.split(".")[0];
	return retval + "Z";
}

function getDate(d) {
	var date_temp = new Date(d);
	var date = date_temp.toLocaleString("en-US");
	var datearray = date.split("/");
	var newdate = datearray[1] + "/" + datearray[0] + "/" + datearray[2];
	return newdate.replace(",", "    ");
}

var transporter = nodemailer.createTransport({
	host: config.SMTP,
	port: 465,
	secure: true,
	auth: {
		user: config.mailjetApiKey,
		pass: config.mailjetSecretKey,
	},
});

exports.sendotpEmail = async (otp, email, name) => {
	transporter.use(
		"compile",
		hbs({
			viewEngine: {
				partialsDir: "/views/",
				defaultLayout: "",
			},
			viewPath: "./views/",
			extName: ".handlebars",
		})
	);

	var mailOptions = {
		from: config.emailId,
		to: email,
		subject: "OTP - Interview Deck ",
		template: "otpmail",
		attachments: [
			{
				filename: "Interview_deck.png",
				path: __dirname + "/Interview_deck.png",
				cid: "logo",
			},
		],
		context: {
			name: name,
			otp: otp,
			img: "cid:logo",
		},
	};

	res = await transporter.sendMail(mailOptions);
	if (res) return "Success";
	else return "Error";
};

exports.sendMenteeInterviewSchedule = async (
	email,
	name,
	start_time,
	end_time,
	company,
	link
) => {
	transporter.use(
		"compile",
		hbs({
			viewEngine: {
				partialsDir: "/views/",
				defaultLayout: "",
			},
			viewPath: "./views/",
			extName: ".handlebars",
		})
	);

	var mailOptions = {
		from: config.emailId,
		to: email,
		subject: "Interview Schedule - Interview Deck ",
		template: "mentee_interviewschedule",
		attachments: [
			{
				filename: "Interview_deck.png",
				path: __dirname + "/Interview_deck.png",
				cid: "logo",
			},
		],
		context: {
			name: name,
			img: "cid:logo",
		},
	};

	res = await transporter.sendMail(mailOptions);
	console.log(res);
	if (res) return "Success";
	else return "Error";
};

exports.sendMentorlink = async (email, name, start_time, end_time) => {
	transporter.use(
		"compile",
		hbs({
			viewEngine: {
				partialsDir: "/views/",
				defaultLayout: "",
			},
			viewPath: "./views/",
			extName: ".handlebars",
		})
	);

	var mailOptions = {
		from: config.emailId,
		to: email,
		subject: "Mentor Interview Schedule - Interview Deck ",
		template: "mentor_interviewschedule",
		attachments: [
			{
				filename: "Interview_deck.png",
				path: __dirname + "/Interview_deck.png",
				cid: "logo",
			},
		],
		context: {
			name: name,
			img: "cid:logo",
			c_start_time: ISODateString(start_time),
			c_end_time: ISODateString(end_time),
			start_time: getDate(start_time),
			end_time: getDate(end_time),
			link: "google.com",
			sub: "Interview Deck - Mock Interview",
			text: `Reminder set by Interview Deck. Meeting link:${link}`,
		},
	};

	res = await transporter.sendMail(mailOptions);
	if (res) return "Success";
	else return "Error";
};

exports.sendSessionlink = async (
	email,
	name,
	session_name,
	start_time,
	end_time,
	link
) => {
	transporter.use(
		"compile",
		hbs({
			viewEngine: {
				partialsDir: "/views/",
				defaultLayout: "",
			},
			viewPath: "./views/",
			extName: ".handlebars",
		})
	);

	var mailOptions = {
		from: config.emailId,
		to: email,
		subject: "Meeting details - Interview Deck ",
		template: "sendmeetinglink",
		attachments: [
			{
				filename: "Interview_deck.png",
				path: __dirname + "/Interview_deck.png",
				cid: "logo",
			},
		],
		context: {
			name: name,
			start_time: start_time,
			end_time: end_time,
			session_name: session_name,
			link: link,
			img: "cid:logo",
		},
	};

	res = await transporter.sendMail(mailOptions);
	if (res) return "Success";
	else return "Error";
};

exports.sendMenteelink = async (
	email,
	name,
	start_time,
	end_time,
	company,
	link
) => {
	transporter.use(
		"compile",
		hbs({
			viewEngine: {
				partialsDir: "/views/",
				defaultLayout: "",
			},
			viewPath: "./views/",
			extName: ".handlebars",
		})
	);

	var mailOptions = {
		from: config.emailId,
		to: email,
		subject: "Meeting details - Interview Deck ",
		template: "mentee_meetinglink",
		attachments: [
			{
				filename: "Interview_deck.png",
				path: __dirname + "/Interview_deck.png",
				cid: "logo",
			},
		],
		context: {
			name: name,
			c_start_time: ISODateString(start_time),
			c_end_time: ISODateString(end_time),
			start_time: getDate(start_time),
			end_time: getDate(end_time),
			link: "google.com",
			sub: "Interview Deck - Mock Interview",
			text: `Reminder set by Interview Deck. Meeting link:${link}`,
			company: company,
			img: "cid:logo",
		},
	};

	res = await transporter.sendMail(mailOptions);
	if (res) return "Success";
	else return "Error";
};
