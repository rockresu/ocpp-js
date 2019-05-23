const handlers = require('../handlers');
const Utils = require('./utils');

var CentralSystemService = {
    CentralSystemService: {
        CentralSystemServiceSoap12: {
            Authorize: function(args, callback, headers, req) {
                args.chargeBoxIdentity = headers.chargeBoxIdentity;
                args.endpoint = Utils.getEndpoint(headers.From.Address, req.connection.remoteAddress);
                handlers.Authorize.handle(args).then(function(data) {
                    callback(null, data);
                });
            },
            BootNotification: function(args, callback, headers, req) {
                args.chargeBoxIdentity = headers.chargeBoxIdentity;
                args.endpoint = Utils.getEndpoint(headers.From.Address, req.connection.remoteAddress);

                console.log('[SOAPWrapper] BootNotification endpoint: ' + args.endpoint);
                handlers.BootNotification.handle(args).then(function(data) {
                    console.log('[SOAPWrapper] BootNotification result: ' + JSON.stringify(data));
                    callback(null, data);
                });
            },
            StartTransaction: function(args, callback, headers, req) {
                console.log('Headers: ' + JSON.stringify(headers));
                args.chargeBoxIdentity = headers.chargeBoxIdentity;
                args.endpoint = Utils.getEndpoint(headers.From.Address, req.connection.remoteAddress);

                handlers.StartTransaction.handle(args).then(function(data) {
                    callback(null, data);
                });
            },
            StopTransaction: function(args, callback, headers, req) {
              // TODO: store the correct port [Issue #29]
                args.chargeBoxIdentity = headers.chargeBoxIdentity;
                args.endpoint =  Utils.getRemoteAddress(req.connection.remoteAddress);

                handlers.StopTransaction.handle(args).then(function(data) {
                    callback(null, data);
                });
            },
            Heartbeat: function(args, callback, headers, req) {
                args = {chargeBoxIdentity : undefined, endpoint : undefined}
                args.chargeBoxIdentity = headers.chargeBoxIdentity;
                args.endpoint = Utils.getEndpoint(headers.From.Address, req.connection.remoteAddress);
                handlers.Heartbeat.handle(args).then(function(data) {
                    callback(null, data);
                });
            },
            MeterValues: function(args, callback, headers, req) {
                args.chargeBoxIdentity = headers.chargeBoxIdentity;
                args.endpoint = Utils.getEndpoint(headers.From.Address, req.connection.remoteAddress);

                handlers.MeterValues.handle(args).then(function(data) {
                    callback(null, data);
                });
            },
            StatusNotification: function(args, callback, headers, req) {
              console.log(`Recieved StatusNotification ${JSON.stringify(args)}`);
                args.chargeBoxIdentity = headers.chargeBoxIdentity;
                args.endpoint = Utils.getEndpoint(headers.From.Address, req.connection.remoteAddress);

                handlers.StatusNotification.handle(args).then(function(data) {
                  data = data || {}
                  console.log('[SOAPWrapper] StatusNotification result: ' + JSON.stringify(data));
                  callback(null, data);
                });
            },
            FirmwareStatusNotification: function(args, callback, headers, req) {
                args.chargeBoxIdentity = headers.chargeBoxIdentity;
                args.endpoint = Utils.getEndpoint(headers.From.Address, req.connection.remoteAddress);

                handlers.FirmwareStatusNotification.handle(args).then(function(data) {
                    callback(null, data);
                });
            },
            DiagnosticsStatusNotification: function(args, callback, headers, req) {
                args.chargeBoxIdentity = headers.chargeBoxIdentity;
                args.endpoint = Utils.getEndpoint(headers.From.Address, req.connection.remoteAddress);

                handlers.DiagnosticsStatusNotification.handle(args).then(function(data) {
                    callback(null, data);
                });
            },
            DataTransfer: function(args, callback, headers, req) {
                args.chargeBoxIdentity = headers.chargeBoxIdentity;
                args.endpoint = Utils.getEndpoint(headers.From.Address, req.connection.remoteAddress);

                handlers.DataTransfer.handle(args).then(function(data) {
                    callback(null, data);
                });
            }
        }
    }
};

module.exports = CentralSystemService;
