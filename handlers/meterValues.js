const Promise = require('promise');
const async = require('async');
const DB = require('../db/index.js');
var Storage = new DB(process.env.storage);
var Subject = require('rxjs/index').Subject;

var subject = new Subject()
var observerable = subject.asObservable()

module.exports = {
    handle: function(data) {
        subject.next(data)

        return new Promise(function(resolve, reject) {
            var parsed = JSON.parse(JSON.stringify(data), function(k, v) {
                if (k === "$value") {
                    this.value = v;
                } else {
                    return v;
                }
            });

            // TODO: should filter by measurenad type [Issue #3]
            // TODO: find how to calculate station measurment [Issue #12]
            // TODO: Get Unit [Issue #13
            // Store in Collection MeterValues
            resolve({
                MeterValuesResponse: {}
            });
        });
    },
    observerable : observerable
}
