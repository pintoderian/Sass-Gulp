window.jQuery = require('jquery');
bootstrap = require('bootstrap');
Mustache = require('mustache');

jQuery(document).ready(function($){
    var xd = $.getJSON('data.json',function(){
    }).done(function(data){
        var template = $('#template').html();
        var mostrarTemplate = Mustache.render(template, data);
        $('#galeria-londres').html(mostrarTemplate);
    });
});