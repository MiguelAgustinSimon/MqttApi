const mqtt = require('mqtt');

// Datos de conexión MQTT
const host = 'mqtt://168.226.218.194';
const port = 8741;
const subscription = 'grupo2/topic_sub';
const username = 'alumnos';
const password = 'AccesoUAI';
// Definir objeto temperatura con arrays correspondientes
const temperatura = {
    valores: [],
  };

const humedad = {
    valores: [],
};

const defineClient = () => {
  // Crear cliente MQTT
  const client = mqtt.connect(host, {
    port: port,
    username: username,
    password: password,
  });
  return client;
};

// Función para suscribirse a un tema
const subscribeToTopic = (client) => {
  client.subscribe(subscription, (err) => {
    if (err) {
      console.error('Error al suscribirse:', err);
    } else {
      console.log('Suscripción exitosa');
    }
  });
};

const getMqtt = () => {
  const client = defineClient();

  // Evento de conexión establecida
  client.on('connect', () => {
    console.log('Conexión MQTT establecida');

    subscribeToTopic(client);
  });

  client.on('message', (topic, message) => {
    // message is Buffer
    handleIncomingMessage(topic, message.toString());
  });

  client.on('error', (error) => {
    console.error('Error en la conexión MQTT:', error);
  });
};

const handleIncomingMessage = (topic, message) => {
  console.log('Manejando mensaje:', topic, message);
   const parsedMessage = JSON.parse(message);

   if (parsedMessage.tipo === 'temperatura') {
    temperatura.valores.push(parsedMessage.valor);
   }
   if (parsedMessage.tipo === 'humedad') {
    humedad.valores.push(parsedMessage.valor);
   }
};


const getTemperatureEvents = (req,res) => {
    if(temperatura.valores.length>0){
        res.status(200).json(temperatura);
    }else{
      res.status(200).json([]);
    }
}

const getHumidityEvents = (req,res) => {
    if(humedad.valores.length>0){
        res.status(200).json(humedad);
    }
    else{
      res.status(200).json([]);
    }
}

getMqtt();

// Exporta los controladores
module.exports = {
  getTemperatureEvents,
  getHumidityEvents
};
