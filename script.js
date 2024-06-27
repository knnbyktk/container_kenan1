// MQTT Broker bilgileri
var MQTT_BROKER = "mqtt://broker.example.com";  // MQTT Broker adresi
var MQTT_PORT = 1883;  // MQTT Broker portu
var MQTT_CLIENT_ID = "web_client";  // MQTT Client ID
var MQTT_TOPIC_HIGH = "arduino/high";  // D0 pinini HIGH olarak tetiklemek için topic
var MQTT_TOPIC_LOW = "arduino/low";    // D0 pinini LOW olarak tetiklemek için topic

$(document).ready(function() {
    // Timepicker değerlerini MQTT'ye gönder
    $('#timepicker1').on('changeTime', function() {
        var time1 = $(this).val();  // Timepicker 1 değeri
        sendMessage(MQTT_TOPIC_HIGH, time1);
    });

    $('#timepicker2').on('changeTime', function() {
        var time2 = $(this).val();  // Timepicker 2 değeri
        sendMessage(MQTT_TOPIC_LOW, time2);
    });
});

// MQTT'ye mesaj gönderme fonksiyonu
function sendMessage(topic, message) {
    var client = new Paho.MQTT.Client(MQTT_BROKER, MQTT_PORT, MQTT_CLIENT_ID);
    client.connect({
        onSuccess: function() {
            console.log("Bağlantı başarılı");
            var mqttMessage = new Paho.MQTT.Message(message);
            mqttMessage.destinationName = topic;
            client.send(mqttMessage);
            client.disconnect();
        },
        onFailure: function() {
            console.log("Bağlantı başarısız");
        }
    });
}
