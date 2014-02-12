//JQUERY LISTENERS
$(document).ready(function($){
    //Global jQuery variables settings
    $input = $('#imgurl');
    $form = $('form');
    $imgurl = $('#imgurl');
    $submit = $('#submit');
    $img_layout = $('#img_layout');
    $clearall = $('#clearall');
    if (localStorage.length!=0){
        for (var keyname in localStorage){
            newImgShow(keyname);
        }
    }
    $("img.lazy").lazyload({
        effect: "fadeIn",
    });
    $input.focus();
    $('#refresh').click(function(){
        location.reload();
    });
    $('span').on('click',$submit,addBookmark);
    $clearall.click(function(){
        var result = confirm("Confirm delete all bookmarks?");
        if (result===true){
            clearAll();
        }
    });
});

function addBookmark(){
    val = $input.val();
    if (validateInput(val)&&isUnique(val)){
        key = createKey();
        localStorage.setItem(key,val);
        newImgShow(key);
    }else if(!isUnique(val)){
        alert("The bookmark already exists");
    }
}
function newImgShow(key){
    var str = '<img data-original="'+localStorage[key]+'"src="img/loading.jpg" class="lazy" id="img'+key+'" width="202px">';
    $img_layout.prepend('<li id="'+key+'">'+str+'<div id="removethis" title="Double-click to remove"></div>\
                                                <div id="copylink" title="Show url"></div>\
                                                <div id="showlink" style="display:none">\
                                                    <span>URL</span>\
                                                    <textarea row="0" width="180">'+localStorage[key]+'</textarea>\
                                                    <span>HTML</span>\
                                                    <textarea row="0" width="180">'+'<img src="'+localStorage[key]+'"></textarea>\
                                                </div>\
                                                </li>');
    $("#removethis").dblclick(function() {
      removeBookmark(key);
    });
    $("#copylink").click(function() {
        $('#'+key+'>#showlink').toggle();
    });
    $("textarea").mouseover(function(){
        $(this).select();
    });
}
function removeBookmark(key){
    $('li#'+key).slideUp(200);
    localStorage.removeItem(key);
}
function clearAll(){
    localStorage.clear();
    $img_layout.empty();
    locator.reload();
}
/*HELPER FUNCTIONS*/
function createKey(){
    date = new Date();
    year = date.getFullYear();
    month = pad2(date.getMonth());
    day = pad2(date.getDate());
    time = ''+pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
    key = ''+year + month + day + time;
    return key;
}
function pad2(number){
    return (number<10 ? '0':'')+number;
}
function validateInput(url){
    if (isExist(url)){
        return true;
    }else{
        return false;
    }
}
function isExist(url){
    var http = new XMLHttpRequest();
    http.open('HEAD',url,false);
    http.send();
    return http.status != 404;
}
function isUnique(url){
    for (var index in localStorage){
        if (url==localStorage.getItem(index)){
            return false
        }
    }
    return true;
}