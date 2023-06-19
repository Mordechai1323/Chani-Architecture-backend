const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.forgetPassword = (to, name, oneTimeCode) => {
  const msg = {
    to,
    from: 'thinkfunmail@gmail.com',
    subject: 'Reset Your  Password - Your One-Time Code Inside',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Chani Architect Office - Forgot Password</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
    
            .logo {
              width: 12vw;
              font-family: 'Montserrat', sans-serif;
              margin: 0;
              .1 {
                font-size: 4.1vw;
                margin: 0;
              }
              h4 {
                font-size: 2vw;
                margin: 0;
              }
            }
    
            .message {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .code {
                text-align: center;
                font-size: 24px;
                margin-bottom: 30px;
            }
    
            .footer {
                font-size: 14px;
                text-align: center;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
         
            <div class='logo'>
              <h4 class="1">Chani</h4>
              <h4>Architecture</h4>
          </div>
         
            <div class="message">
                <p>Dear Valued Customer,</p>
                <p>We noticed that you recently requested assistance with resetting your password for your Chani Architect account. We're here to help! Please use the one-time code below to reset your password:</p>
            </div>
            <div class="code">
                <p>Your one-time code:</p>
                <p><strong>${oneTimeCode}</strong></p> 
            </div>
            <p>If you did not initiate this request, please ignore this email. Rest assured, your account is still secure.</p>
            <p>If you have any further questions or need additional support, please don't hesitate to reach out to our customer service team at <a href="mailto:thinkfunmail@gmail.com">thinkfunmail@gmail.com</a>.</p>
            <div class="footer">
                <p>Thank you for choosing Chani Architect Office.</p>
                <p>Best regards,<br>Chani Architect Team</p>
            </div>
        </div>
    </body>
    </html>
    
    `,
  };

  sgMail.send(msg);
};

exports.informationUpdated = (to) => {
  const msg = {
    to,
    from: 'thinkfunmail@gmail.com',
    subject: 'Yor information has been update',
    html: `
    <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f3f3f3;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
    }

    h1 {
      color: #333333;
      font-size: 24px;
      margin-top: 0;
      margin-bottom: 20px;
    }

    p {
      color: #555555;
      margin: 0 0 20px 0;
      line-height: 1.5;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4caf50;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
    }

    .button:hover {
      background-color: #45a049;
    }

    .signature {
      margin-top: 40px;
      color: #777777;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Project Information Updated</h1>
    <p>Dear Client, </p>
    <p>We would like to inform you that the information regarding your architectural project has been updated.</p>
    <p>You are welcome to access your personal zone to review the changes and stay updated with the progress of your project.</p>
    
    <p>
      <a href="https://chani-architecture.netlify.app/account" class="button">Access Personal Zone</a>
    </p>
    
    <p>If you have any questions or need further assistance, please feel free to contact our support team.</p>
    
    <p class="signature">Best regards,<br>Your Architectural Firm</p>
  </div>
</body>
</html>

    `,
  };

  sgMail.send(msg);
};

exports.createAccount = (to) => {
  const msg = {
    to,
    from: 'thinkfunmail@gmail.com',
    subject: 'Create an account to receive updates',
    html: `
              <!DOCTYPE html>
          <html>
            <head>
              <title>Chani Architect - Project Update</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #3e3e3e;
                  padding: 20px;
                  color: #ffffff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
            width: 100%;
            min-height: 320px;
                }

                .container {
                  background-color: #eaeaeb;
                  border-radius: 10px;
                  padding: 20px;
                  max-width: 600px;
                  margin: 0 auto;
                  color: #3e3e3e;
                  text-align: center;
                  min-height: 240px;
                  width: 90%;
                }

                p {
                  line-height: 1.5;
                }

                .button {
                  display: inline-block;
                  background-color: #3e3e3e;
                  color: #eaeaeb;
                  text-decoration: none;
                  padding: 10px 20px;
                  border-radius: 5px;
                  margin-top: 20px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Welcome to Chani Architect</h1>
                <p>Dear Client,</p>
                <p>
                  We are excited to provide you with an update on your project. In order to view the project details, including its status and comments from the architect, we kindly invite
                  you to create an account on our website.
                </p>
                <p>To create your account, simply click on the button below:</p>
                <a href="https://chani-architecture.netlify.app/logIn" class="button">Create Account</a>
                <p>We look forward to sharing the progress of your project with you.</p>
                <p>Best regards,</p>
                <p>The Chani Architect Team</p>
              </div>
            </body>
          </html>

    
    `,
  };

  sgMail.send(msg);
};

exports.newProject = (to, projectName) => {
  const msg = {
    to,
    from: 'thinkfunmail@gmail.com',
    subject: 'Chani Architect - New Project',
    html: `
    <!DOCTYPE html>
<html>
<head>
    <title>Chani Architect - New Project Notification</title>
    <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #3e3e3e;
      padding: 20px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
width: 100%;
min-height: 320px;
    }

    .container {
      background-color: #eaeaeb;
      border-radius: 10px;
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      color: #3e3e3e;
      text-align: center;
      min-height: 240px;
      width: 90%;
    }

    p {
      line-height: 1.5;
    }

    .button {
      display: inline-block;
      background-color: #3e3e3e;
      color: #eaeaeb;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Chani Architect</h1>
        <p>Dear Customer,</p>
        <p>Hello, Project ${projectName} is now available in our system. Please log in to view the project's status and access more details about it.</p>
        <p>To log in and access your personal area, click on the button below:</p>
        <a href="https://chani-architecture.netlify.app/logIn" class="button">Log In</a>
        <p>Thank you for your ongoing support. We're here to assist you with any inquiries or additional information you may need.</p>
        <p>Best regards,</p>
        <p>The Chani Architect Team</p>
    </div>
</body>
</html>

    `,
  };

  sgMail.send(msg);
};

exports.remainderProjects = (to, projectName) => {
  const msg = {
    to,
    from: 'thinkfunmail@gmail.com',
    subject: 'Chani Architect - Project Deadline Reminder',
    html: `
    <!DOCTYPE html>
<html>
<head>
    <title>Chani Architect - Project Deadline Reminder</title>
   <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #3e3e3e;
      padding: 20px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
width: 100%;
min-height: 320px;
    }

    .container {
      background-color: #eaeaeb;
      border-radius: 10px;
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      color: #3e3e3e;
      text-align: center;
      min-height: 240px;
      width: 90%;
    }

    p {
      line-height: 1.5;
    }

    .button {
      display: inline-block;
      background-color: #3e3e3e;
      color: #eaeaeb;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
    <div class="container">
        <h1>Hello Architect,</h1>
        <p>We wanted to remind you that the deadline for ${projectName} is approaching. The project needs to be completed within the next 3 days.</p>
        <p>Please ensure that all necessary tasks are completed, and the project is finalized within the given timeframe.</p>
        <p>If you have any questions or require additional resources, please reach out to our team immediately.</p>
        <p>Thank you for your attention to this matter.</p>
        <p>Best regards,</p>
        <p>The Chani Architect Team</p>
    </div>
</body>
</html>

    `,
  };

  sgMail.send(msg);
};

exports.newCustomerInquiry = (customer) => {
  const msg = {
    to: 'chanimoshe01@gmail.com',
    from: 'thinkfunmail@gmail.com',
    subject: 'Chani Architect - New Customer Inquiry',
    html: `
    <!DOCTYPE html>
          <html>
          <head>
              <title>Chani Architect - New Customer Inquiry</title>
              <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #3e3e3e;
                    padding: 20px;
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
              width: 100%;
              min-height: 320px;
                  }
                  .container {
                    background-color: #eaeaeb;
                    border-radius: 10px;
                    padding: 20px;
                    max-width: 600px;
                    margin: 0 auto;
                    color: #3e3e3e;
                    text-align: center;
                    min-height: 240px;
                    width: 90%;
                  }
                  .container ul{
                    list-style: none;
                }

                  p {
                    line-height: 1.5;
                  }

                 
                </style>
          </head>
          <body>
              <div class="container">
                  <h1>Hello Architect,</h1>
                  <p>We are pleased to inform you that Customer ${
                    customer.name
                  } has shown interest in the services of Chani Architecture. They have provided the following contact details:</p>
                  <ul>
                      <li>Phone Number: ${customer.phone}</li>
                      <li>Email: ${customer.email}</li>
                      <li>Message: ${customer?.message ? customer?.message : '-'}</li>
                  </ul>
                  <p>Please acknowledge this inquiry and reach out to the customer to discuss their requirements and provide further information about our services.</p>
                  <p>If you require any assistance or have any questions, please don't hesitate to contact our team.</p>
                  <p>Thank you for your attention to this matter.</p>
                  <p>Best regards,</p>
                  <p>The Chani Architect Team</p>
              </div>
          </body>
          </html>

    `,
  };

  sgMail.send(msg);
};
