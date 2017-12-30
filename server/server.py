import json
import sys
sys.path.append('../')
from src.utils import read_pickle
from bottle import Bottle

import pdb


from utils.process import get_historical_lending, get_collateral_count, get_amount_by_lender, get_amount_by_borrower
from utils.cors import enable_cors

app = Bottle()
app.install(enable_cors)
df_loans = read_pickle('../data/preprocessed_loans.pickle')


@app.get('/stats/<type>')
def get_statistic():
    total_lended = df_loans.dropna(subset=['Lender'])[
        'NeededSumByBorrower'].sum()

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
    lenders = get_amount_by_lender(df_loans).to_json(orient='records')
    borrowers = get_amount_by_borrower(df_loans).to_json(orient='records')
    return lenders


@app.get('/collaterals')
def get_collat_statistics():
    collateral_count = get_collateral_count(df_loans)
    return collateral_count.to_json(orient='records')


app.run(host='localhost', port=8085)
