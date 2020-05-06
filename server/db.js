const typeorm = require('typeorm');

class Location {
    constructor(id, name, status) {
        this.id = id;
        this.name = name;
        this.status = status;
    }    
}

const EntitySchema = require("typeorm").EntitySchema; 

const LocationSchema = new EntitySchema({
    name: "Location",
    target: Location,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        status: {
            type: "text"
        }
    }
});

async function getConnection() {
    return await typeorm.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3307,
        username: "root",
        password: "password",
        database: "collectandgo",
        synchronize: true,
        logging: false,
        entities: [
            LocationSchema
        ]
    })
}

async function getAllLocations() {
    const connection = await getConnection();
    const locationRepo = connection.getRepository(Location);
    const locations = await locationRepo.find();
    connection.close();
    return locations;
}


async function insertLocation(name) {
    const connection = await getConnection();
    
    // create
    const location = new Location();
    creator.name = name;
    creator.status = "";

    // save
    const locationRepo = connection.getRepository(Location);
    const res = await locationRepo.save(location);
    console.log('saved', res);

    // return new list
    const allLocations = await locationRepo.find();
    connection.close();
    return allLocations;

}

module.exports = {
    getAllLocations,
    insertLocation
}
