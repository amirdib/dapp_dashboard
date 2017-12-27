import json


def print_dict(data_dict):
    for key, value in data_dict.items():
        print('{}: {}'.format(key, value))


def json_reader(path):
    with open(path, 'r') as json_file:
        return json.load(json_file)
