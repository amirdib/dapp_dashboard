import sys
import json
import pickle
from multiprocessing import Pool
from time import sleep
from datetime import datetime
from tqdm import tqdm
import etherscan.accounts as accounts

sys.path.append(
    '/home/ubuntu/projet/test/solidity/dapp_dashboard/dashboard/bin')


def print_dict(data_dict):
    for key, value in data_dict.items():
        print('{}: {}'.format(key, value))


def json_reader(path):
    with open(path, 'r') as json_file:
        return json.load(json_file)


def write_pickle(data, path):
    with open(path, 'wb') as f:
        pickle.dump(data, f)


def read_pickle(path):
    with open(path, 'rb') as f:
        return pickle.load(f)


def parallel_dict_update(func, iterable):
    pool = Pool()
    data = {}

    for elem in iterable:
        pool.apply_async(func, args=(elem,), callback=data.update)

    with tqdm(total=len(iterable), desc="Loading loans informations...") as pbar:
        while len(data) != len(iterable):
            pbar.update(len(data) - pbar.n)
            sleep(1)
    pbar.close()

    pool.close()
    pool.join()
    return data


def timestamp_converter(timeStamp):
    timeStamp = int(timeStamp)
    return datetime.fromtimestamp(timeStamp).strftime('%Y-%m-%d %H:%M:%S')


def get_contract_time(contract_adress, api_key):
    api = accounts.Account(address=contract_adress, api_key=api_key)
    time = api.get_transaction_page(page=1, offset=1, internal=True)[
        0]['timeStamp']
    return timestamp_converter(time)
