import json

from web3 import Web3, HTTPProvider, TestRPCProvider, KeepAliveRPCProvider
from solc import compile_source
from web3.contract import ConciseContract

from .utils import json_reader

config = json_reader('config.json')
LR_ABI = config['LR_ABI']
node = config['node']


def loan_data(contract_adress):
    w3 = Web3(HTTPProvider(node))
    contract_instance = w3.eth.contract(
        LR_ABI, contract_address, ContractFactoryClass=ConciseContract)
    return {'currency': contract_instance.currency(),
            'wanted_wei': contract_instance.wanted_wei(),
            'premium_wei': contract_instance.premium_wei(),
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
            'token_amount': contract_instance.token_amount(),
            'isEns': contract_instance.isEns(),
            'isRep': contract_instance.isRep(),
            'EnsDomainHash': str(contract_instance.getEnsDomainHash()),
            'NeededSumByBorrower': contract_instance.getNeededSumByBorrower(),
            'NeededSumByLender': contract_instance.getNeededSumByLender()}


def all_loans_data(contract_adresses):
    return {contract_adress for contract_adress in contract_adresses}
