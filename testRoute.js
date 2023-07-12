let express = require("express");
let router = express.Router();

/*Define your route handlers
router.get("/bigBang", (req, res) => {
  res.send("click clack BOOOOOOM!");
});
*/

router.get('/bigBang', function (req, res, next) {
   res.send("Ladies and gentlemen!We got him!")
    res.end();
})
module.exports = router;

