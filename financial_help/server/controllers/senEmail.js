const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Function to send the initial proposal email
exports.sendEmail = async (req, res) => {
    const { to, subject, userData, proposalContent } = req.body;

    // Validate input
    if (!to || !subject || !proposalContent) {
        return res.status(400).json({ message: "To, subject, and proposal content are required." });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: 'riddhidevtry@gmail.com', // Your email
            pass: 'fwzp jncr nnvl orrp', // Your email password
        },
    });

    const mailOptions = {
        from: 'riddhidevtry@gmail.com',
        to: to,
        subject: subject,
        html: `
        <p>Dear [Recipient's Name],</p>

        <p>We are pleased to present this business proposal for your consideration.</p>

        <ol>
            <li>Problem Statement: ${userData.businessProblem}</li>
            <li>Solution: ${userData.businessSolution}</li>
            <li>Target Market: ${userData.targetMarket}</li>
            <li>Revenue Model: ${userData.revenueModel}</li>
            <li>Financial Goal: ${userData.financialGoal}</li>
        </ol>

        <p>Proposal Content:</p>
        <p>${proposalContent}</p>

        <p>We believe this proposal outlines a viable opportunity and we look forward to discussing it further.</p>

        <p>Thank you for your time and consideration.</p>

        <p>Best regards,<br>${userData.userName}</p>

        <p>
          <a href="http://localhost:8000/api/accept-proposal?email=${to}&sender=riddhidevtry@gmail.com" ...>Yes</a>
<a href="http://localhost:8000/api/reject-proposal?email=${to}&sender=riddhidevtry@gmail.com" ...>No</a>
        </p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email", error });
    }
};

// Route to handle scheduling a meeting
exports.rejectProposal = async (req, res) => {
    const email = req.query.email;
    const senderEmail = req.query.sender; 

    // Validate input
    if (!email || !senderEmail) {
        return res.status(400).send("Email query parameters are required.");
    }
   
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'riddhijlalla@gmail.com',
            pass: 'guba klht thjy sohh',
        },
    });

    const mailOptions = {
        from: 'riddhijlalla@gmail.com',
        to: senderEmail, 
        subject: 'Proposal Rejected',
        html: `
            <p>Dear ${senderEmail},</p>
            <p>Your proposal to <strong>${email}</strong> has been rejected. Sorry, please try again sometime or work more on it.</p>
            <p>Thank you for your understanding.</p>
            <p>Best regards,<br>${email}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send("Rejection email sent successfully!");
    } catch (error) {
        console.error("Error sending rejection email:", error);
        res.status(500).send("Error sending rejection email.");
    }
};

// Function to handle proposal acceptance (can implement your logic here)
exports.acceptProposal = async (req, res) => {
    const email = req.query.email;
    const senderEmail = req.query.sender;

    // Validate input
    if (!email || !senderEmail) {
        return res.status(400).send("Email query parameters are required.");
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'riddhijlalla@gmail.com',
            pass: 'guba klht thjy sohh',
        },
    });

    const mailOptions = {
        from: 'riddhijlalla@gmail.com',
        to: senderEmail, 
        subject: 'Proposal Rejected',
        html: `
        <p>Dear ${senderEmail},</p>
        <p>Your proposal to <strong>${email}</strong> has been accepted. We look forward to working with you!</p>
        <p>Thank you for your submission.</p>
        <p>Best regards,<br>${email}</p>
    `,
};

try {
    await transporter.sendMail(mailOptions);
    res.send("Acceptance email sent successfully!");
} catch (error) {
    console.error("Error sending acceptance email:", error);
    res.status(500).send("Error sending acceptance email.");
}
};