$(document).ready(function(){
    $('#search').keyup(function(){
        var searchValue = ($('#search').val()).trim();
        if(searchValue != ''){
            $.getJSON('list.json', function(result){
                var list = result;
                var options = {
                    shouldSort: true,
                    threshold: 0.6,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    keys: [
                      "title",
                      "author.firstName",
                      "author.lastName"
                    ]
                };
                var fuse = new Fuse(list, options);
                var searchResult = fuse.search(searchValue);
                console.log(searchResult);
                console.log(searchResult.length);
                if(searchResult.length > 0){
                    console.log('dude');
                    $('#results').empty();
                    for(let i = 0; i < searchResult.length; i++){
                        $('#results').append('<div class="res"><h1>' +searchResult[i].title + '</h1><p>' + searchResult[i].author.firstName + ' ' + searchResult[i].author.lastName + '</p><button>Order</button></div>');
                    }
                }
            })
        }
    })
})
