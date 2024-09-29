const express = require("express");
const { createUser, getUser } = require("../controllers/userController");
const { generateFinancialAdvice } = require("../controllers/financialhelp");
const { getTopicDescription } = require("../controllers/getTopicDescription");
const { getQuiz, getAdviceOnQuiz } = require("../controllers/getQuiz");
const { generateBusinessModel } = require("../controllers/proposal");
const { sendEmail, rejectProposal, acceptProposal } = require('../controllers/senEmail');
const { editProposal } = require('../controllers/editProposal');


const router = express.Router();

// User routes
router.post("/user", createUser);
router.get("/user/:id", getUser);

// Financial advice routes
router.post("/generate-advice", generateFinancialAdvice);
router.post("/generate-topic-description", getTopicDescription);
router.post("/generate-quiz", getQuiz);
router.post("/get-advice-on-quiz", getAdviceOnQuiz);
router.post('/generate-proposal', generateBusinessModel);

// Email routes
router.post('/send-email', sendEmail);
router.get('/reject-proposal', rejectProposal);
router.get('/accept-proposal', acceptProposal);



// Accept proposal and schedule a meeting
/**router.get('/accept-proposal', async (req, res) => {
    const email = req.query.email;
    const senderEmail = req.query.sender;

    // Validate email and senderEmail parameters
    if (!email || !senderEmail) {
        return res.status(400).send("Email and sender query parameters are required.");
    }

    // Prepare event details for Google Calendar
    const eventDetails = {
        summary: "Proposal Acceptance Meeting",
        location: "Virtual", // Update this with the actual location if necessary
        description: "Meeting to discuss the proposal.",
        startTime: new Date().toISOString(), // Replace with actual start time if available
        endTime: new Date(Date.now() + 3600000).toISOString(), // Replace with actual end time (1 hour later)
        attendeeEmail: email,
        attendeeName: senderEmail, // You can replace this with a relevant attendee name
    };

    try {
        // Create calendar event in Google Calendar
        const createdEvent = await createEvent(eventDetails);

        // Create ICS content for email invitation
        const icsContent = createIcsEvent(eventDetails);

        // Send email invitation with the ICS content
        await sendEmail(eventDetails.attendeeEmail, 'Meeting Invitation', 'You have been invited to a meeting.', icsContent);

        res.status(200).json({ message: 'Proposal accepted and meeting scheduled!', event: createdEvent });
    } catch (error) {
        console.error('Error processing proposal acceptance:', error);
        res.status(500).json({ error: 'Failed to accept proposal', details: error.message });
    }
});**/

// Edit proposal route
router.post('/edit-proposal', editProposal);

module.exports = router;
