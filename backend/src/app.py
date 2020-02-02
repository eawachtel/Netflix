from modules.netflixdata.NetflixData import NetflixData
from flask import Flask, jsonify, abort, request
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route("/version")
def getversion():
    return jsonify("1.0.0.0")


@app.route("/getpageinitdata", methods=['GET', 'OPTIONS'])
def getpageinitdata():
    try:
        netflixdata = NetflixData()
        result = netflixdata.getpageinitdata()
        return jsonify(new_releases=result[0], netflixtypes=result[1])
    except:
        import traceback
        traceback.print_exc()
        abort(500)


@app.route("/getnetflixdata", methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def getNetflixData():
    try:
        post = request.json
        netflixdata = NetflixData()
        results = netflixdata.getnetflixdata(post)

        return jsonify(data=results[0], column_names=results[1])
    except:
        import traceback
        traceback.print_exc()
        abort(500)


if __name__ == '__main__':
    app.run(debug=True)
