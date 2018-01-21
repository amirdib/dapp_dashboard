var Web3 = require('web3');
var MongoClient = require('mongodb').MongoClient,
    Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    assert = require('assert');

var config = require('./config.json');
var url = "mongodb://localhost:27017/mydb";

let database = "production",
    collection_name = "loans";

LR_ABI = config['LR_ABI'];
LEDGER_ABI = config['LEDGER_ABI'];
LEDGER_ADDRESS = config['LEDGER_ADDRESS'];
node = config['node'];
DECIMALS = 1e18;


//var db = new Db(database, new Server('localhost', 27017));
web3 = new Web3(new Web3.providers.HttpProvider(node));
ci = new web3.eth.Contract(LEDGER_ABI, LEDGER_ADDRESS);

methods = ['currency','wanted_wei','premium_wei','getTokenName','getTokenInfoLink','getTokenSmartcontractAddress','getBorrower','installments_count','installments_period_days','installment_paid','getNextInstallmentDaysLeft','isCanDefault','getCurrentState','getLender','token_amount','isEns','isRep','getEnsDomainHash','getNeededSumByBorrower','getNeededSumByLender'];

MongoClient.connect('mongodb://localhost:27017/production', 
		    {
			// retry to connect for 60 times
			reconnectTries: 60,
			// wait 1 second before retrying
			reconnectInterval: 1000
		    },
		    function(err, db) {
			var collection = db.collection(collection_name);

			function write_db(result, method, add){
			    entry = {};
			    entry[method] = result;
			    id_entry = {_id:add} ;
			    collection.replaceOne(id_entry, {$set:entry}, {upsert:true});
			    
			}
			
			function get_method(method, add){
			    ci2 = new web3.eth.Contract(LR_ABI, add);
			    ci2.methods[method]().call().then(result => write_db(result,method,add)).catch(err => {
				console.error(err);
				return err; 
			    });    
			}

			function get_data(add){
			    id_entry = {_id:add} ;
			    // Checks if the document with id = add exist
			    collection.findOne(id_entry,
					       function(err, user) {
						   if (user) {
						       console.log("Address " + add + " does exist in db")
						   }
						   else {
						       console.log("Address " + add + " does not exist in db. Creating...")
						       get_method('getBorrower',add);

						       //Setting timeout to avoid simultaneous creation of the document
						       setTimeout(function(){
							   for(var i in methods){   
							       get_method(methods[i],add);
							   }}, 500);
						   }})
			};

			function get_address(i){ci.methods['getLr'](i).call().then(get_data);};

			ci.methods['getLrCount']().call().then(function(count){
			    console.log(count);
			    for (i = 0; i < count; i++) {
				get_address(i);
			    } 
			});
		    });
