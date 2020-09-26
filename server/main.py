import uuid
import json
import os

from flask import Flask, request, send_file
from flask_cors import CORS

from modules.negative import Negative
from modules.gamma_correction import GammaCorrection

app = Flask(__name__)
CORS(app)

app.config['JSON_AS_ASCII'] = False


@app.route('/save_image', methods=['GET', 'POST'])
def save_image():
    if request.method == 'POST':
        filename = f'{str(uuid.uuid1())}.png'
        file = request.files['fileToUpload']
        file.save(filename)
    else:
        filename = 'test/lanoire.jpeg'

    data = {
        'filename': filename
    }

    response = app.response_class(
        response=json.dumps(data),
        status=200,
        content_type='application/json; charset=utf8'
    )
    return response


@app.route('/negative', methods=['GET', 'POST'])
def negative():
    data = request.get_json()
    path = data['filename']
    negative_module = Negative(path)
    result = negative_module.get_negative_image()
    result.save(path)
    return send_file(path, 'image/png')


@app.route('/gamma_correction', methods=['GET', 'POST'])
def gamma_correction():
    data = request.get_json()
    path = data['filename']
    gamma = float(data['gamma'])
    c = float(data['c'])
    gamma_correction_module = GammaCorrection(path, gamma, c)
    result = gamma_correction_module.get_corrected_image()
    result.save(path)
    return send_file(path, 'image/png')


@app.route('/remove_image/<path>', methods=['DELETE'])
def remove_image(path):
    os.remove(path)
    response = app.response_class(
        status=200
    )
    return response


if __name__ == '__main__':
    app.run()
