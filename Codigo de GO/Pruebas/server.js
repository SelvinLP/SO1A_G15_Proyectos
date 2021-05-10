const EXPRESS = require('express');
const BODYPARSER = require('body-parser');
const CORS = require('cors');

//Configuración del servidor
var corsOptions = {origin: true, optionsSuccessStatus:200};
var app = EXPRESS();
const PORT = 5000;
app.set('port', PORT);

//Middelwares
app.use(BODYPARSER.json());             //Valida que el intercambio se de tipo json
app.use(CORS(corsOptions));

//Rutas
app.post('/', async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({"mensaje": "Recibido"})
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

let datos = [
    {
        "id": 1,
        "name": "Urban Beldum",
        "location": "Escuintla",
        "age": 4,
        "infectedtype": "non-imported",
        "state": "symptomatic",
        "tipo": "RabbitMq"
    },
    {
        "id": 2,
        "name": "Idalia Cumberpatch",
        "location": "Quetzaltenango",
        "age": 36,
        "infectedtype": "communitary",
        "state": "symptomatic",
        "tipo": "RabbitMq"
    },
    {
        "id": 3,
        "name": "Pat Barnsdale",
        "location": "Alta Verapaz",
        "age": 49,
        "infectedtype": "communitary",
        "state": "asymptomatic",
        "tipo": "RabbitMq"
    },
    {
        "id": 4,
        "name": "Carter Grotty",
        "location": "Escuintla",
        "age": 27,
        "infectedtype": "communitary",
        "state": "asymptomatic",
        "tipo": "Pubsub"
    },
    {
        "id": 5,
        "name": "Adda Wherry",
        "location": "Izabal",
        "age": 4,
        "infectedtype": "non-imported",
        "state": "asymptomatic",
        "tipo": "Pubsub"
    },
    {
        "id": 6,
        "name": "Latisha Gheorghe",
        "location": "Santa Rosa",
        "age": 31,
        "infectedtype": "non-imported",
        "state": "symptomatic",
        "tipo": "Pubsub"
    },
]

app.get('/data', async(req, res)=>{
    try {
        console.log("[X] Enviando datos...");
        res.status(200).json(datos);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

let region = [
    {
        "id": 1,
        "name": "Oriente",
        "infectednumber": 65,
    },
    {
        "id": 2,
        "name": "Petén",
        "infectednumber": 50,
    },
    {
        "id": 3,
        "name": "Centro",
        "infectednumber": 80,
    }
]

app.get('/regions', async(req, res)=>{
    try {
        console.log("[X] Enviando datos...");
        res.status(200).json(region);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

let departaments = [
    {
        "label": "Guatemala",
        "y": 175,
    },
    {
        "label": "Alta Verapaz",
        "y": 125,
    },
    {
        "label": "Escuintla",
        "y": 94,
    },
    {
        "label": "Jalapa",
        "y": 65,
    },
    {
        "label": "Sololá",
        "y": 64,
    },
]

app.get('/topDepartaments', async(req, res)=>{
    try {
        console.log("[X] Enviando datos...");
        res.status(200).json(departaments);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

let statesPatients = [
    {
        "y": 234, 
        "label": "symptomatic"
    },
    {
        "y": 125,
        "label": "asymptomatic"
    },
];

app.get('/statepatients', async(req, res)=>{
    try {
        console.log("[X] Estados del paciente...");
        res.status(200).json(statesPatients);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

let infectedtype = [
    {
        "y": 25, 
        "label": "non-imported"
    },
    {
        "y": 46,
        "label": "imported"
    },
    {
        "y": 29,
        "label": "communitary"
    },
];

app.get('/infectedtype', async(req, res)=>{
    try {
        console.log("[X] Tipo de infeccion...");
        res.status(200).json(infectedtype);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

let rangeAge = [
    {
        "y": 25, 
        "label": "11 - 20"
    },
    {
        "y": 46,
        "label": "31 - 40"
    },
    {
        "y": 29,
        "label": "41 - 50"
    },
]

app.get('/agerange', async(req, res)=>{
    try {
        console.log("[X] Rangos de edad...");
        res.status(200).json(rangeAge);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

let processes = [
    {
        "id": 1,
        "name": "system",
        "fatherid": "-",
        "status": "running"
    },
    {
        "id": 2,
        "name": "gui",
        "fatherid": "-",
        "status": "running"
    },
    {
        "id": 3,
        "name": "man",
        "fatherid": "1",
        "status": "running"
    },
    {
        "id": 4,
        "name": "fake",
        "fatherid": "1",
        "status": "running"
    },
]
let contador = 0;
app.get('/processes', async(req, res)=>{
    try {
        console.log("[X] Procesos...");
        res.status(200).json([processes[contador]]);
        contador++
        if(contador === 4){
            contador = 0;
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

let percentaje = [
    [
        {
            "name": "libre",
            "y": 45,
        },
        {
            "name": "usado",
            "y": 55,
        },
    ],
    [
        {
            "name": "libre",
            "y": 35,
        },
        {
            "name": "usado",
            "y": 65,
        },
    ],
    [
        {
            "name": "libre",
            "y": 75,
        },
        {
            "name": "usado",
            "y": 25,
        },
    ],
]

let contador2 = 0;
app.get('/rampercentaje', async(req, res)=>{
    try {
        console.log("[X] Ram Porcentaje...");
        res.status(200).json(percentaje[contador2]);
        contador2++
        if(contador2 === 3){
            contador2 = 0;
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

let polygon = [
    { "y": 45, },
    { "y": 35, },
    { "y": 48, },
    { "y": 95, },
    { "y": 59, },
    { "y": 43, },
    { "y": 76, },
    { "y": 62, },
    { "y": 20, },
    { "y": 90, },
    { "y": 35, },
    { "y": 27, },
    { "y": 45, },
    { "y": 12, },
]

let contador3 = 0;
app.get('/rampolygon', async(req, res)=>{
    try {
        console.log("[X] Ram Polygon...");
        res.status(200).json(polygon[contador3]);
        contador3++
        if(contador3 === polygon.length){
            contador3 = 0;
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});


//Ejecución del servidor
app.listen(app.get('port'),() => {
    console.log('Listening on port ' + PORT);
});