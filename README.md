# Mail-Sender

Best resourse availabe on Internet: https://medium.com/@vijulshah/how-to-send-custom-e-mails-with-node-js-f51e4157542a

## How to use this on your server

```bash
sudo apt-get install docker.io
docker run -p -i 8080:8080 nisarg0/email-service
```

## Features - Why do we nee this

For testing nodemailer with gmail-client is good enough. But in production we need a more reliable mailing agent.

-   SSL - Secure true
-   More relaiable
-   Easy to change SMTP agent
-   Availabe with 4 handle abr template

## Development

To test out Mailing service

```bash
  npm run dev
```

## Tech Stack

**Client:** Handlebars, HTML, CSS

**Server:** Node, Express, node-mailer (Mail relay - Mailjet)

## Authors

-   [@nisarg0](https://www.github.com/nisarg0)
