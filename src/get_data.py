import pandas as pd
import json
from tqdm import tqdm
import sys
from datetime import datetime
import os.path
import ipdb
sys.path.append('../src/')

from web3 import Web3, HTTPProvider, TestRPCProvider, KeepAliveRPCProvider
from solc import compile_source
from web3.contract import ConciseContract
import etherscan.accounts as accounts


from utils import json_reader, parallel_dict_update, write_pickle, read_pickle

api_key = '3JS9BXYFNNGNX17WKANJMU63R6BQKJW5WE'
config = json_reader('config.json')
LR_ABI = config['LR_ABI']
LEDGER_ABI = config['LEDGER_ABI']
LEDGER_ADDRESS = config['LEDGER_ADDRESS']
node = config['node']
DECIMALS = 1e18


def timestamp_converter(timeStamp):
    timeStamp = int(timeStamp)
    return datetime.fromtimestamp(timeStamp).strftime('%Y-%m-%d %H:%M:%S')


def get_contract_time(contract_adress, api_key):
    api = accounts.Account(address=contract_adress, api_key=api_key)
    time = api.get_transaction_page(page=1, offset=1, internal=True)[
        0]['timeStamp']
    return timestamp_converter(time)


def get_contract_instance(node, abi, contract_address):
    w3 = Web3(HTTPProvider(node))
    return w3.eth.contract(abi, contract_address, ContractFactoryClass=ConciseContract)


def get_contract_addresses():
    contract_instance = get_contract_instance(
        node, LEDGER_ABI, LEDGER_ADDRESS)
    contract_count = contract_instance.totalLrCount()
    return [contract_instance.getLr(i) for i in tqdm(range(0, contract_count), desc="Getting contract adresses...")]


def get_loan_data(contract_address):
    contract_instance = get_contract_instance(node, LR_ABI, contract_address)

    def getNeededSumByLender(contract_instance):
        try:
            return float(contract_instance.getNeededSumByLender())
        except:
            return None

    def getNeededSumByBorrower(contract_instance):
        try:
            return float(contract_instance.getNeededSumByBorrower())
        except:
            return None
    try:
        return {contract_address: {'currency': contract_instance.currency(),
                                   'wanted_wei': float(contract_instance.wanted_wei()),
                                   'premium_wei': float(contract_instance.premium_wei()),
                                   'TokenName': contract_instance.getTokenName(),
                                   'TokenInfoLink': contract_instance.getTokenInfoLink(),
                                   'TokenSmartcontractAddress': contract_instance.getTokenSmartcontractAddress(),
                                   'Borrower': contract_instance.getBorrower(),
                                   'installments_count': contract_instance.installments_count(),
                                   'installments_period_days': contract_instance.installments_period_days(),
                                   'installment_paid': contract_instance.installment_paid(),
                                   'NextInstallmentDaysLeft': contract_instance.getNextInstallmentDaysLeft(),
                                   'isCanDefault': contract_instance.isCanDefault(),
                                   'CurrentState': contract_instance.getCurrentState(),
                                   'Lender': contract_instance.getLender(),
                                   'token_amount': float(contract_instance.token_amount()),
                                   'isEns': contract_instance.isEns(),
                                   'isRep': contract_instance.isRep(),
                                   'EnsDomainHash': str(contract_instance.getEnsDomainHash()),
                                   'NeededSumByBorrower': getNeededSumByBorrower(contract_instance),
                                   'NeededSumByLender': getNeededSumByLender(contract_instance)
                                   }}
    except:
        return {contract_address: {'contract_address': None,
                                   'wanted_wei': None,
                                   'premium_wei': None,
                                   'TokenName': None,
                                   'TokenInfoLink': None,
                                   'TokenSmartcontractAddress': None,
                                   'Borrower': None,
                                   'installments_count': None,
                                   'installments_period_days': None,
                                   'installment_paid': None,
                                   'NextInstallmentDaysLeft': None,
                                   'isCanDefault': None,
                                   'CurrentState': None,
                                   'Lender': None,
                                   'token_amount': None,
                                   'isEns': None,
                                   'isRep': None,
                                   'EnsDomainHash': None,
                                   'NeededSumByBorrower': None,
                                   'NeededSumByLender': None}}


def get_all_loans(contract_addresses):
    return parallel_dict_update(get_loan_data, contract_addresses)


def get_timeStamps(df_loans):
    tqdm.pandas(desc="Getting timestamps ...")
    return df_loans['SmartContractAdress'].progress_apply(lambda x: get_contract_time(x, api_key))


def preprocess(loans):
    df = pd.DataFrame.from_dict(loans, orient="index").reset_index()
    df = df.rename(columns={'index': 'SmartContractAdress'})
    df['timeStamp'] = get_timeStamps(df)
    df[['NeededSumByBorrower', 'wanted_wei',
        'premium_wei', 'token_amount']] /= DECIMALS
    df['timeStamp'] = pd.to_datetime(df['timeStamp'])
    return df


def main(data_path):
    # if os.path.isfile(data_path):
    #     df_loans = read_pickle("{}preprocessed_loans.pickle".format(data_path))
    # else:
    contract_addresses = get_contract_addresses()
    loans = get_all_loans(contract_addresses)
    write_pickle(loans, "{}loans.pickle".format(data_path))
    #
#    loans = read_pickle("{}loans.pickle".format(data_path))
    df_loans = preprocess(loans)
    write_pickle(df_loans, "{}preprocessed_loans.pickle".format(data_path))


if __name__ == '__main__':
    path = '/home/ubuntu/projet/test/solidity/dapp_dashboard/data/'
    main(path)
