from flask import Flask
from flask import request
from flask import json

from modules.negative import Negative

app = Flask(__name__)


@app.route('/')
def hello_world():
    data = {
        'msg': 'Hello world'
    }
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        content_type='application/json; charset=utf8'
    )
    return response


if __name__ == '__main__':
    negative = Negative('test/lanoire.jpeg')
    image = negative.get_image()
    image.show()
    negative_image = negative.get_negative_image()
    negative_image.show()
