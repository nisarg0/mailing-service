var nodemailer = require("nodemailer");
const config = require("./config");
const hbs = require("nodemailer-express-handlebars");

let start_time_option = {
	year: "numeric",
	month: "short",
	day: "2-digit",
	hour: "numeric",
	minute: "numeric",
};
let end_time_option = {
	hour: "numeric",
	minute: "numeric",
};

function ISODateString(isoDate) {
	if (typeof String.prototype.replaceAll === "undefined") {
		String.prototype.replaceAll = function (match, replace) {
			return this.replace(new RegExp(match, "g"), () => replace);
		};
	}

	// var isoDate = d.toISOString();

	var isoDate1 = isoDate.replaceAll(":", "");
	var isoDate2 = isoDate1.replaceAll("-", "");
	var retval = isoDate2.split(".")[0];
	return retval + "Z";
}

function getDate(d) {
	var date_temp = new Date(d);
	var date = date_temp.toLocaleString("en-US", { timeZone: "UTC" });
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
				partialsDir: "../views/",
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
	if (res.accepted.length !== 0) return "Success";
	else return "Error";
};

exports.sendPasswordResetEmail = async (otp, email, name) => {
	transporter.use(
		"compile",
		hbs({
			viewEngine: {
				partialsDir: "../views/",
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
		template: "passwordReset",
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
	if (res.accepted.length !== 0) return "Success";
	else return "Error";
};

exports.sendUserInterviewConfirmation = async (email, name) => {
	transporter.use(
		"compile",
		hbs({
			viewEngine: {
				partialsDir: "../views/",
				defaultLayout: "",
			},
			viewPath: "./views/",
			extName: ".handlebars",
		})
	);

	var mailOptions = {
		from: config.emailId,
		to: email,
		subject: "Interview Request Accepted - Interview Deck ",
		template: "userInterviewConfirmation",
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
	if (res.accepted.length !== 0) return "Success";
	else return "Error";
};

exports.sendSessionlink = async (
	email,
	name,
	session_name,
	start_time,
	end_time,
	link,
	image_url
) => {
	try {
		transporter.use(
			"compile",
			hbs({
				viewEngine: {
					partialsDir: "../views/",
					defaultLayout: "",
				},
				viewPath: "./views/",
				extName: ".handlebars",
			})
		);

		let d = new Date(start_time);
		let start_time1 = new Intl.DateTimeFormat(
			"en",
			start_time_option
		).format(d);
		d = new Date(end_time);
		let end_time1 = new Intl.DateTimeFormat("en", end_time_option).format(
			d
		);

		var mailOptions = {
			from: config.emailId,
			to: email,
			subject: "Event details - Interview Deck ",
			template: "sendEventDetails",
			attachments: [
				{
					filename: "Interview_deck.png",
					path: __dirname + "/Interview_deck.png",
					cid: "logo",
				},
			],
			context: {
				name: name,
				start_time: start_time1,
				end_time: end_time1,
				session_name: session_name,
				link: link,
				img: "cid:logo",
				image_url: image_url,
			},
		};

		res = await transporter.sendMail(mailOptions);
		if (res.accepted.length === 0) return "Error";
		return "Success";
	} catch (err) {
		console.log(err);
		return "Error";
	}
};

exports.sendUserInterviewSchedule = async (
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
				partialsDir: "../views/",
				defaultLayout: "",
			},
			viewPath: "./views/",
			extName: ".handlebars",
		})
	);
	let d = new Date(start_time);
	let start_time1 = new Intl.DateTimeFormat("en", start_time_option).format(
		d
	);
	d = new Date(end_time);
	let end_time1 = new Intl.DateTimeFormat("en", end_time_option).format(d);
	var mailOptions = {
		from: config.emailId,
		to: email,
		subject: "Interview Scheduled - Interview Deck ",
		template: "userInterviewScheduled",
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
			start_time: start_time1,
			end_time: end_time1,
			link: link,
			sub: "Interview Scheduled - Interview Deck",
			text: `Reminder set by Interview Deck. Interview link:${link}`,
			company: company,
			img: "cid:logo",
		},
	};

	res = await transporter.sendMail(mailOptions);
	if (res) return "Success";
	else return "Error";
};

exports.sendMentorInterviewSchedule = async (
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
				partialsDir: "../views/",
				defaultLayout: "",
			},
			viewPath: "./views/",
			extName: ".handlebars",
		})
	);
	let d = new Date(start_time);
	let start_time1 = new Intl.DateTimeFormat("en", start_time_option).format(
		d
	);
	d = new Date(end_time);
	let end_time1 = new Intl.DateTimeFormat("en", end_time_option).format(d);

	var mailOptions = {
		from: config.emailId,
		to: email,
		subject: "Interview Scheduled - Interview Deck ",
		template: "mentorInterviewScheduled",
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
			start_time: start_time1,
			end_time: end_time1,
			company: company,
			link: link,
			sub: "Interview Scheduled - Interview Deck",
			text: `Reminder set by Interview Deck. Interview link:${link}`,
		},
	};

	res = await transporter.sendMail(mailOptions);
	if (res) return "Success";
	else return "Error";
};
