const { Router } = require("express");
const router = Router();


const {getCharacter, getAllEpisode,getCharacterById,createCharacter} = require("../controladores/controlador");



// Configurar los routers
router.get("/character", getCharacter);

router.get("/episode", getAllEpisode);

router.get("/character/:id", getCharacterById);

router.post("/character", createCharacter);


module.exports = router;
