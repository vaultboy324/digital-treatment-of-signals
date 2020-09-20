from flask import Flask, request, send_file
from flask_cors import CORS

from modules.negative import Negative

app = Flask(__name__)
CORS(app)

app.config['JSON_AS_ASCII'] = False


@app.route('/negative', methods=['GET', 'POST'])
def negative():
    if request.method == 'POST':
        filename = 'temp.png'
        file = request.files['fileToUpload']
        file.save('temp.png')
    else:
        filename = 'test/lanoire.jpeg'

    negative_module = Negative(filename)
    result = negative_module.get_negative_image()
    result.save('negative.png')

    return send_file('negative.png', 'image/png')


if __name__ == '__main__':
    app.run()
