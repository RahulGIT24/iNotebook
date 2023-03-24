const express = require('express'); // Importing express
const router = express.Router(); // Importing router from express
const fetchuser = require('../middleware/fetchuser'); // Importing fetchuser middleware
const Note = require('../models/Note'); // Importing Note model
const { body, validationResult } = require('express-validator'); // Importing express validator

//* ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }); // Fetching notes by user id
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error"); // In case of error
    }
})

//* ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required

router.post('/addnote', fetchuser, [
    // Validating note's title and descrpition
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            // Fetching title description and tag from body
            const { title, description, tag } = req.body;
            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // Creating a new note
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            // Saving the input note
            const savedNote = await note.save()
            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error"); // In case of errors
        }
    })


//* ROUTE 3: Updating an existing note using: PUT "/api/notes/updatenote".

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote 
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // find note and update it
        let note = await Note.findById(req.params.id)

        // if id is incorrect
        if (!note) { return res.status(404).send('Not found') }

        // if user's id and id of user in note is different
        if (note.user.toString() != req.user.id) { return res.status(401).send('Not Allowed') }

        // Setting new note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        // Returning updated note
        res.json({ note })
    } catch (error) {
        console.log(error.message)
        res.status(400).send('Internal server error occured')
    }
})

//* ROUTE 4: Deleting an existing note using: DELETE "/api/notes/deletenote".

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // find note and delete it
        let note = await Note.findById(req.params.id)

        // if id is incorrect
        if (!note) { return res.status(404).send('Not found') }

        // if user's id and id of user in note is different
        if (note.user.toString() != req.user.id) { return res.status(401).send('Not Allowed') }

        // Deleting a note
        note = await Note.findByIdAndDelete(req.params.id)

        // Returning deleted note
        res.json({ "Success": "Note has been deleted", note: note })

    } catch (error) {
        console.log(error.message)
        res.status(400).send('Internal server error occured')
    }
})

module.exports = router // Exporting router