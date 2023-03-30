// Create a client instance
client = new Paho.MQTT.Client("broker.hivemq.com", Number(8000), "");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  resposta.innerHTML += ">>Conexão bem sucedida !<br>";
  client.subscribe("duarte/led");
}

function verificaImg(id, img)
{
    png = document.getElementById(id)
    pathArray = png.src.split("/")
    if (pathArray[9] == img){
        return true;
    }
    else{
        return false;
    }
}

function tradeImage(img, name)
{
    switch (name){
        case "verde1": 
            sendMessage("verde1");
            ledPng = document.getElementById(img);
            ledPng.src="assets/verde1.png";
            break;
        case "verde0": 
            sendMessage("verde0");
            ledPng = document.getElementById(img);
            ledPng.src="assets/verde0.png";
            break;
        case "azul1": 
            sendMessage("azul1");
            ledPng = document.getElementById(img);
            ledPng.src="assets/azul1.png";
            break;
        case "azul0": 
            sendMessage("azul0");
            ledPng = document.getElementById(img);
            ledPng.src="assets/azul0.png";
            break;
        case "laranja1":
            sendMessage("laranja1");
            ledPng = document.getElementById(img);
            ledPng.src="assets/laranja1.png";
            break;
        case "laranja0":
            sendMessage("laranja0");
            ledPng = document.getElementById(img);
            ledPng.src="assets/laranja0.png";
            break;
        case "vermelho1":
            sendMessage("vermelho1");
            ledPng = document.getElementById(img);
            ledPng.src="assets/vermelho1.png";
            break;
        case "vermelho0":
            sendMessage("vermelho0");
            ledPng = document.getElementById(img);
            ledPng.src="assets/vermelho0.png";
            break;
    }
}
function sendMessage(msg)
{
    message = new Paho.MQTT.Message(msg);
    message.destinationName = "duarte/led";
    client.send(message);
    
}

function autoScroll()
{
    const element = document.getElementById("resposta");
    element.scrollTop = element.scrollHeight;
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    resposta.innerHTML += ">>Conexão perdida! erro:"+responseObject.errorMessage;
   autoScroll();
  }
}

// called when a message arrivesa
function onMessageArrived(message) {
    resposta.innerHTML += ">>Topico: " + message.destinationName+ " enviando " + message.payloadString+ " ....<br>";
    resposta.innerHTML += ">>Mensagem enviada!<br>";
    autoScroll();
}