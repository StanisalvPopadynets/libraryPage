var searchBar = document.getElementById('search');
var nextBtn = document.getElementById('next');
var previousBtn = document.getElementById('previous');
var resultDiv = document.getElementById('results');
var buttonBox = document.getElementById('buttonBox');
buttonBox.style.display = 'none';

var modal = document.getElementById('my-modal');
var closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', e => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
    if(e.target.classList.contains('order-btn')) {
        if(JSON.parse(e.target.parentNode.getAttribute('data-available'))){
            openModal();
        }
        else alert('The book is already ordered.')
    }
});



// Open
function openModal() {
  modal.style.display = 'block';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close if click outside
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}


searchBar.addEventListener('keyup', () => {
    var searchBarValue = searchBar.value.trim();
    if(searchBarValue != '') {
        var request = new XMLHttpRequest();
        request.open('GET', 'list.json', true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {

                var list = JSON.parse(request.responseText);
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
                var searchResult = fuse.search(searchBarValue);
                buttonBox.style.display = 'block';
                if(searchResult.length > 10){
                    var pageCounter = 0;
                    // Wipes out all the childs of resultDiv
                    while(resultDiv.firstChild) {
                        resultDiv.removeChild(resultDiv.firstChild);
                    }
                    for(let i = 0 + pageCounter; i < pageCounter + 10; i++){
                        resultDiv.innerHTML += `<div class="res" data-available=${searchResult[i].available}><h1> ${searchResult[i].title} </h1><p> ${searchResult[i].author.firstName} ${searchResult[i].author.lastName} </p><button class="order-btn">Order</button></div>`;
                    }
                    nextBtn.addEventListener('click', () => {
                        if(pageCounter * 10 + 10 < searchResult.length) pageCounter++;
                        else return;
                        while(resultDiv.firstChild) {
                            resultDiv.removeChild(resultDiv.firstChild);
                        }
                        for(let i = pageCounter * 10; i < pageCounter * 10 + 10; i++){
                            if(i === searchResult.length) break;
                            resultDiv.innerHTML += `<div class="res" data-available=${searchResult[i].available}><h1> ${searchResult[i].title} </h1><p> ${searchResult[i].author.firstName} ${searchResult[i].author.lastName} </p><button class="order-btn">Order</button></div>`;
                        }
                    })
                    previousBtn.addEventListener('click', () => {
                        if(pageCounter > 0)pageCounter--;
                        else return;
                        while(resultDiv.firstChild) {
                            resultDiv.removeChild(resultDiv.firstChild);
                        }
                        for(let i = pageCounter * 10; i < pageCounter * 10 + 10; i++){
                            resultDiv.innerHTML += `<div class="res" data-available=${searchResult[i].available}><h1> ${searchResult[i].title} </h1><p> ${searchResult[i].author.firstName} ${searchResult[i].author.lastName} </p><button class="order-btn">Order</button></div>`;
                        }
                    })
                } 
                else {
                    while(resultDiv.firstChild) {
                        resultDiv.removeChild(resultDiv.firstChild);
                    }
                    for(let i = 0; i < searchResult.length; i++){
                        resultDiv.innerHTML += `<div class="res" data-available=${searchResult[i].available}><h1> ${searchResult[i].title} </h1><p> ${searchResult[i].author.firstName} ${searchResult[i].author.lastName} </p><button class="order-btn">Order</button></div>`;
                    }
                } 
            } else {
                alert(`${request.status}: ${request.statusText}`);
            }
        };

        request.onerror = function() {
            
        };

        request.send();
    } else {
        // Clear everything when searchbar is empty
        buttonBox.style.display = 'none';
        while(resultDiv.firstChild) {
            resultDiv.removeChild(resultDiv.firstChild);
        }
    }
})



// var searchBar = document.getElementById('search');

// searchBar.addEventListener('keyup', () => {
//     var searchBarValue = searchBar.value.trim();
//     if(searchBarValue != '') {
//         var request = new XMLHttpRequest();
//         request.open('GET', 'list.json', true);

//         request.onload = function() {
//             if (request.status >= 200 && request.status < 400) {

//                 var list = JSON.parse(request.responseText);
//                 var options = {
//                     shouldSort: true,
//                     threshold: 0.6,
//                     location: 0,
//                     distance: 100,
//                     maxPatternLength: 32,
//                     minMatchCharLength: 1,
//                     keys: [
//                       "title",
//                       "author.firstName",
//                       "author.lastName"
//                     ]
//                 };
//                 var fuse = new Fuse(list, options);
//                 var searchResult = fuse.search(searchBarValue);
//                 if(searchResult.length > 0){
//                     var resultDiv = document.getElementById('results');
//                     // Wipes out all the childs of resultDiv
//                     while(resultDiv.firstChild) {
//                         resultDiv.removeChild(resultDiv.firstChild);
//                     }
//                     for(let i = 0; i < searchResult.length; i++){
//                         resultDiv.innerHTML += '<div class="res"><h1>' +searchResult[i].title + '</h1><p>' + searchResult[i].author.firstName + ' ' + searchResult[i].author.lastName + '</p><button class="order-btn">Order</button></div>';
//                     }
//                 }
//             } else {
//                 alert(`${request.status}: ${request.statusText}`);
//             }
//         };

//         request.onerror = function() {
            
//         };

//         request.send();
//     }
// })

