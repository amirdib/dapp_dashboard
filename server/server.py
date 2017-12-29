import json
import sys
sys.path.append('../')
from src.utils import read_pickle
from bottle import Bottle

import pdb


from utils.process import get_historical_lending
from utils.cors import enable_cors

app = Bottle()
app.install(enable_cors)
df_loans = read_pickle('../data/preprocessed_loans.pickle')


@app.get('/stats/<type>')
def get_statistic():

    statistic = 100
    return statistic


@app.get('/loans')
def get_loans():

    historical_lending = get_historical_lending(df_loans).dropna()
    data = historical_lending.reset_index().rename(
        columns={'timeStamp': 'x', 'wanted_wei': 'y'}).to_json(orient='records')

    return data


@app.get('/table')
def get_table():
    return [{a: '2', b: '4'}, {a: '2', b: '6'}]


@app.get('/collaterals')
def get_collat_statistics():
    return [{a: '2', b: '4'}, {a: '2', b: '6'}]


app.run(host='localhost', port=8085)
