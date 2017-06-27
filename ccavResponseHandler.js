var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postRes = function(request, response) {
    var ccavEncResponse = '',
        ccavResponse = '',
        workingKey = '706B2965E26583996FFFA6124B32C930', //Put in the 32-Bit key shared by CCAvenues.
        ccavPOST = '';

    request.on('data', function(data) {
        ccavEncResponse += data;
        ccavPOST = qs.parse(ccavEncResponse);
        var encryption = ccavPOST.encResp;
        ccavResponse = ccav.decrypt(encryption, workingKey);
    });

    request.on('end', function() {
        var pData = '';
        pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'
        pData = pData + ccavResponse.replace(/=/gi, '</td><td>')
        pData = pData.replace(/&/gi, '</td></tr><tr><td>')
        pData = pData + '</td></tr></table>'

        var splitdata = ccavResponse.split('&');
        var strdata = '';
        for (var i = 0; i < 4; i++) {
            strdata = strdata === '' ? splitdata[i] : strdata + ',' + splitdata[i];
        }
        var encryprRes = ccav.encrypt(strdata, workingKey);
        response.redirect('/ccavResponseHand/' + encryprRes);
    });

};