const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

router.post("/", upload.single("image"), (req, res) => {

    if (!req.file) {

        return res.status(400).json({
            message: "No image uploaded"
        });

    }

    res.status(200).json({

        message: "Image uploaded successfully",

        image: req.file.filename,

        imageUrl: `http://localhost:5000/uploads/${req.file.filename}`

    });

});

module.exports = router;