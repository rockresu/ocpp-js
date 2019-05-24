const Promise = require('promise');
const moment = require('moment');
const Utils = require('../utils/utils.js');
const DB = require('../db/index.js');
var Storage = new DB(process.env.storage);
var Subject = require('rxjs/index').Subject;

var subject = new Subject()
var observerable = subject.asObservable()

module.exports = {
    observerable : observerable,
    handle: function(data) {
        return new Promise(function(resolve, reject) {
            Storage.findById('transaction', data.transactionId, function(err, transactions) {
                if (transactions) {
                    var transaction = transactions[0];

                    // TODO: Get Last Transaction ! [Issue #26]

                    var response = {}

                    if (transaction) {
                        if (transaction.status === 'Accepted') {
                            response = {
                              StopTransactionResponse: {
                                  idTagInfo: {
                                      status: 'Expired',
                                      expiryDate: new Date().toISOString(),
                                      parentIdTag: 'PARENT'
                                  }
                              }
                            }
                        } else {
                            // Already stopped
                            // TODO: Update Status [Issue #20] [Issue #8]
                            response = {
                              StopTransactionResponse: {
                                  idTagInfo: {
                                      status: 'Expired',
                                      expiryDate: new Date().toISOString(),
                                      parentIdTag: 'PARENT'
                                  }
                              }
                            }
                        }
                    } else {
                        // TODO: Update Status
                        response = {
                          StopTransactionResponse: {
                              idTagInfo: {
                                  status: 'Expired',
                                  expiryDate: new Date().toISOString(),
                                  parentIdTag: 'PARENT'
                              }
                          }
                        }
                    }
                    // store transaction details
                    Storage.saveWithId('transactions', data.transactionId, data, function() {
                        resolve(response);
                    });

                } else {
                    // Transaction doesn't exist
                    resolve(  {
                      StopTransactionResponse: {
                          idTagInfo: {
                              status: 'Expired',
                              expiryDate: new Date().toISOString(),
                              parentIdTag: 'PARENT'
                          }
                      }
                    });
                }
            });
        });
    }
}
