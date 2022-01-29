require("dotenv").config();

module.exports = {
	mailjetApiKey: process.env.MAILJET_API_KEY,
	mailjetSecretKey: process.env.MAILJET_SECRET_KEY,
	SMTP: process.env.MAILJET_SMTP_SERVER,
};
