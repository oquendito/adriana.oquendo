function loadContent(url){
    $('#main-loader').show();
    
    if(url != ''){
        var $currentstate=history.state != null ? history.state : [];
        $currentstate.push({ url : url});
        window.history.pushState($currentstate,"", url);
    }else{
        url = 'main.html';
    }
    url  = 'pages/' + url; 
    console.log(url);
    $.ajax({
        url: url,
        type: 'GET',
        cors: true ,
        contentType:'application/json',
        secure: true,
        headers: {
    'Access-Control-Allow-Origin': '*',
        },
        success: function (data){
            $('#content').html(result);
        }
    }).always(function(){
        $('#main-loader').hide();
    });
}
function prepareRequest(){
    $('a,.a').each(function(){
        if($(this).data('ajax') == null || $(this).data('ajax')){
            $(this).attr('data-href',$(this).attr('href'));
            $(this).removeAttr('href');
            $(this).click(function(){
                loadContent($(this).attr('data-href').replace('https://felifelinos.netlify.app/index.html',''));
            });
        }
    });
}
function ready(first = false){
    try{

        $.ajaxSetup({
            headers: {
                'X-REQUESTED-WITH' : 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            }
        });
        prepareRequest();
        if(first){
            loadContent(window.location.href.replace('https://felifelinos.netlify.app/index.html',''));
        }
    }catch($e){
        console.log($e);
    }
}
$(document).ready(ready);
