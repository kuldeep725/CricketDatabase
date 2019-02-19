const express = require('express')
const router = express.Router()
const userHome = require("./user/home")
const t20   = require("./user/t20")
const rootAdmin = require("./admin/root")
var bodyParser = require('body-parser')
// var multer  = require('multer')

// router.use(express.json())
router.use(bodyParser.json())  
router.use(bodyParser.urlencoded({ extended: true })); 
// router.use(multer())

const courses = [
    {id: 1, name: "wiley"},
    {id: 2, name: "resnick"},
    {id: 3, name: "jdlee"}
]

/*Entry*/
router.get("/", (req, res) => {
    res.render("entry")
})

/* User Page Entry*/
router.get("/userLogin", (req, res) => {
    console.log("Opening User Home Page")
    userHome.init(req, res);
    return;
})

/* Admin Page Entry */
router.post("/admin", (req, res) => {
    rootAdmin.init(req, res)
    return
})

/*Admin Page Entry -> Table Info */
router.post("/admin/:table_name", (req, res) => {
    console.log("Getting Data: "+ req.params.table_name)
    rootAdmin.getTableInfo(req, res)
})

/* Admin Page Entry -> Table Info -> Table Insertion Form*/
router.post("/admin/insertForm/:table_name", (req, res) => {
    const table_name = req.params.table_name
    console.log("Getting Form " + req.params.table_name)
    if(table_name === "Authority") rootAdmin.getAuthorityForm(req, res)
    else if(table_name === "Umpires") rootAdmin.getUmpiresForm(req, res)
    else if(table_name === "Countries") rootAdmin.getCountriesForm(req, res)
    else if(table_name === "SeriesTypes") rootAdmin.getSeriesTypesForm(req, res)
    else if(table_name === "Players") rootAdmin.getPlayersForm(req, res)
    else{
        res.send("Error")
    }
})

/* Admin Page Entry -> TableInfo -> TableInsertionForm->Insertion*/
router.post("/admin/insert/:table_name", (req, res) => {
    console.log("Inserting Data " + req.params.table_name)
    const table_name = req.params.table_name
    console.log(req.body)
    if(table_name === "Authority") rootAdmin.insertIntoAuthority(req, res)
    else if(table_name === "Umpires") rootAdmin.insertIntoUmpires(req, res)
    else if(table_name === "Countries") rootAdmin.insertIntoCoutries(req, res)
    else if(table_name === "SeriesTypes") rootAdmin.insertIntoSeriesTypes(req, res)
    else if(table_name === "Players") rootAdmin.insertIntoPlayers(req, res)
    else res.send(table_name + "does not exits")
})

router.post("/admin/players/suggestion", (req, res) =>{
    console.log("PRINTING BODY: ")
    console.log(req.body)
    rootAdmin.getPlayersSuggestion(req, res)
})

/* User Page -> T20 */
router.get("/user/t20", (req, res) => {
    console.log("Opening User T20 Page")
    t20.init(req, res)
    return;
})

/*User Page -> T20 -> Series */
router.post("/user/t20/series/:id", (req, res)=>{
    console.log("Request for Series: "+req.params.id);
    return t20.getSeries(req, res)
})


module.exports = router;