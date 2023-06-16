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
