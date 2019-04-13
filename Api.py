import flask
from flask import Flask,request,Response,jsonify
import json
import datetime
import requests
from flask_restplus import Api,Resource,fields
import data_cleaning,calculate_weight
from flask_restplus import fields
from flask_restplus import cors
from predict_heart_disease import get_accuracy_score

app = Flask(__name__)
api = Api(app,default = 'Assignment3',
          title = 'COMP9321 ASS3',
          description = 'This is the assignment3 of COMP9321 for heart disease.')

test_model_input = {
    "age": fields.Integer(required=True),
    "sex": fields.Integer(required=True),
    "pain_type": fields.Integer(required=True),
    "resting_blood_pressure": fields.Integer(required=True),
    "serum_cholestorable": fields.Integer(required=True),
    "fasting_blood_pressure": fields.Integer(required=True),
    "resting_elec_results": fields.Integer(required=True),
    "max_heart_rate": fields.Integer(required=True),
    "exercise_induced_angina": fields.Integer(required=True),
    "oldpeak": fields.Float(required=True),
    "slope": fields.Integer(required=True),
    "no_of_major_vessels": fields.Integer(required=True),
    "thalassemia": fields.Integer(required=True)
}

test_model = api.model('test', test_model_input)

@api.route('/test')
class data_test(Resource):
    @api.doc(description="Test Api")
    @api.expect(test_model)
    def post(self):
        data = []
        data.append(int(request.form.get('age')))
        data.append(int(request.form.get('sex')))
        data.append(int(request.form.get('pain_type')))
        data.append(int(request.form.get('resting_blood_pressure')))
        data.append(int(request.form.get('serum_cholestorable')))
        data.append(int(request.form.get('fasting_blood_pressure')))
        data.append(int(request.form.get('resting_elec_results')))
        data.append(int(request.form.get('max_heart_rate')))
        data.append(int(request.form.get('exercise_induced_angina')))
        data.append(float(request.form.get('oldpeak')))
        data.append(int(request.form.get('slope')))
        data.append(int(request.form.get('no_of_major_vessels')))
        data.append(int(request.form.get('thalassemia')))
        prob = get_accuracy_score(data)
        if prob == 1:
            return {'text': 'success'}, 200
        else:
            return {'text': 'failure'}, 200

@api.route('/data_uniform')
class data_uniform(Resource):
    @api.response(200, '200 Successfully.')
    @api.response(404, '404 Error')
    @api.doc(descrption='Uniform data')
    def get(self):
        result = data_cleaning.data_uniform('clean_data.csv').to_json(orient='values')
        return result,200


@api.route('/weight')
class weight(Resource):
    @api.response(200, '200 Successfully.')
    @api.response(404, '404 Error')
    @api.doc(descrption='Calculate the weight.')
    def get(self):
        result = calculate_weight.weight()
        return result,200, {'Access-Control-Allow-Origin': '*', 'Access-Control-Request-Method': '*'}

if __name__ == '__main__':
    app.run()
