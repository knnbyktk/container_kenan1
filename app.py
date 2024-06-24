from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return jsonify(message="GET request received!")

@app.route('/', methods=['POST'])
def home_post():
    data = request.get_json()
    return jsonify(message="POST request received!", data=data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
