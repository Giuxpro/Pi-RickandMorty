const {Sequelize} = require("sequelize");
const axios = require("axios");
const { Character, Episode} = require("../db");

const getCharacterApi = async () =>{
    let pageArr = [];
    for(let i = 1; i <= 42; i++){
    const apiUrl = await axios.get(`https://rickandmortyapi.com/api/character?page=${i}`)
    
    apiUrl.data.results.map((e) =>{

        pageArr.push({
            id: e.id,
            name: e.name,
            species: e.species,
            origin: e.origin.name,
            image:e.image,
            episode: e.episode.map(e => e.slice(40,e.length))
            
        })
    })}
    return pageArr
}


const getCharacterDb = async ()=>{
    const charDb = await Character.findAll({
        include:{
            model:Episode,
            attributes: ["name"],
            through:{
                attributes:[],
            }
        }
    })
    return charDb
}

const allCharaterInfo = async () =>{
    const apiInfo = await  getCharacterApi();
    const infoDb = await  getCharacterDb();
    const totalInfo = apiInfo.concat(infoDb);
    return totalInfo
}


const getAllEpisode = async (req,res)=> {
    
    for(let i = 0; i <= 3; i++){
    const allInfoepisode = await axios.get(`https://rickandmortyapi.com/api/episode?page=${i}`)
    const episodeInfo = await allInfoepisode.data.results.map(e => e.name)
       
    episodeInfo.map( e => {
        
        Episode.findOrCreate({
            where:{ name: e}
        })
        
    })
}
  
    const allEpisode = await Episode.findAll();

    res.status(200).json(allEpisode)
}

const getCharacter = async (req, res) =>{
    const {name} = req.query;
    const apiCharactersInfo = await allCharaterInfo();

    if(name){
       let apiNameChar = apiCharactersInfo.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
       apiNameChar.length
       ? res.status(200).json(apiNameChar)
       :res.json({err: "Character not found"})
       
    }
    else{
       
        res.status(200).json(apiCharactersInfo);
    }
}

const getCharacterById = async (req, res) => {
    const id = req.params.id;
    const info = await allCharaterInfo();
    // console.log("metrae esto", info)

    if (id) {
        let characterId = await info.filter(e => e.id.toString() === id.toString());
        if (characterId.length > 0) res.status(200).send(characterId)
        else res.status(404).send("No character with that ID.")
    }
};

const createCharacter = async (req,res)=>{
    const {name,species, origin, image, created, episode} = req.body;
try{
    const characterCreated = await Character.create({
        name,
        species,
        origin,
        image,
        created,
    
        
    })

    const allEpisode = await Episode.findAll({

        where:{name:episode }
    })

    characterCreated.addEpisode(allEpisode)

    res.status(200).json(characterCreated)
}catch(error){
    console.log("error en post" + error)
}
}


module.exports={
    getCharacterApi,
    getCharacterDb,
    allCharaterInfo,
    getAllEpisode,
    getCharacter,
    getCharacterById,
    createCharacter
}
