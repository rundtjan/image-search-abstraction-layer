var css = require('./myCss.js');
var loopThrough = function(array) {
    var result = "<p>[</p>";
    for (var i = 0; i < array.length; i++) {
        result += '<p>{</p>\
        <p>"url":<a href="' + array[i].link + '" target="_blank">"' + array[i].link + '"</a>,</p>\
        <p>"snippet":"' + array[i].snippet + '",</p>\
        <p>"thumbnail":"' + array[i].image.thumbnailLink + '",</p>\
        <p>"context":<a href="' + array[i].image.contextLink + '" target="_blank">"' + array[i].image.contextLink + "'</a>,</p>";;
        if (i == array.length - 1) {result += "}"} else {result += "},"} 
    }
    result += "<p>]</p>"
    return result}

var loopThrough2 = function(array) {
    var result = "<p>[</p>";
    for (var i = 0; i < array.length; i++) {
        result += '<p>{"term":"' + array[i].term + '", "when":' + array[i].when + '"}';
        if (i == array.length - 1) {result += "}</p>"} else {result += "},</p>"} 
    }
    result += "<p>]</p>"
    return result}

module.exports = function (page, data) {
    if (page == "result"){
    var html = "<html><head><title>Searchresult</title>" + css() + "</head>\
    <body>" + loopThrough(data) + "</body></html>"
    return html;}
    
    else if (page == "history"){
    var html = "<html><head><title>Searchhistory</title>" + css() + "</head>\
    <body>" + loopThrough2(data) + "</body></html>"
    return html;}
    
    else if (page == "info"){
    var html = "<html><head><title>Imagesearch Info</title>" + css() + "</head>\
    <body><h1>Imagesearch Info</h1>\
    <p>Using this imagesearch is really easy. Just add a slash and the searchterm in the url and you'll be provided with the result</p>\
    <h3>Example:</h3>\
    <p>https://api-developments-ruja.c9users.io/imagesearch/Barnaby</p>\
    <h3>If you wish to paginate:</h3>\
    <p>Add '?offset={page}' to the url, for example - https://api-developments-ruja.c9users.io/imagesearch/Barnaby?offset=3</p>\
    </body></html>"
    return html;}
}