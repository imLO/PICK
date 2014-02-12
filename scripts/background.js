/*CHROME LISTENERS*/
chrome.runtime.onInstalled.addListener(function(){
    if (window.localStorage!==undefined){
        chrome.contextMenus.create({"title":"Bookmark this image","contexts":["image"],"id":"bookmark"});
    }else{
        alert("Please upgrade broswer to use this extension.");
    }
});

chrome.contextMenus.onClicked.addListener(function(info,tab){
    contextClick(info,tab);
})
/*HELPER FUNCTIONS*/
function contextClick(info,tab){
    if(info.menuItemId=="bookmark"){
        addBookmark(info.srcUrl,tab);
    }
}
/*ACTIONS*/
function addBookmark(url,tab){
    if (!isUnique(url)){
        return null;
    }
    var key = createKey();
    localStorage.setItem(key,url);
    chrome.tabs.query({},function(tabs){
        for (var i=0; i<tabs.length; i++){
            chrome.tabs.sendMessage(tabs[i].id,{action:"addBookmark",newImage: url},function(response){});
        }
    });
}