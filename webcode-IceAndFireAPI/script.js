let informationDiv = document.querySelector('.informationDiv');
let bookDetailsDiv = document.querySelector('.bookDetailsDiv');
let bookListlink = document.querySelector('.bookListlink');

function getImageLink(bookName){
    let imageLink;
    switch(bookName){
        case "A Game of Thrones":
            imageLink = './GameOfThrones.jpg';
            break;
        case "A Clash of Kings":
            imageLink = './ClashOfKings.jpg';
            break;
        case "A Storm of Swords":
            imageLink = './StromOfSwords.jpg';
            break;
        case "The Hedge Knight":
            imageLink = './HedgeKnight.jpg';
            break;
        case "A Feast for Crows":
            imageLink = './FeastOfCrows.jpg';
            break;
        case "The Sworn Sword":
            imageLink = './SwornSords.jpg';
            break;
        case "The Mystery Knight":
            imageLink = './MysteryKnight.jpg';
            break;
        case "A Dance with Dragons":
            imageLink = './DanceOfDragons.jpg';
            break;
        case "The Princess and the Queen":
            imageLink = './PrincessAndTheQueen.jpg';
            break;
        case "The Rogue Prince":
            imageLink = './RougesNovella.jpg';              
    }
    return imageLink;
}

function loadCardDetails(dataObject, imageLink){
    let card = `
        <div class="card border-light" style="max-width: 540px;">
             <div class="row g-0">
                  <div class="col-md-4">
                       <img src=${imageLink} class="card-img-top" alt=${dataObject.name} height="250px"; width="150px">
                  </div>
                  <div class="col-md-8">
                       <div class="card-body">
                            <h5 class="card-title">${dataObject.name}</h5>
                            <p class="card-text">${dataObject.authors[0]}</p>
                            <p class="card-text">${dataObject.isbn}</p>
                            <p class="card-text">${dataObject.numberOfPages}</p>
                            <p class="card-text">${dataObject.publisher}</p>
                            <p class="card-text">${dataObject.released}</p>
                            <p class="card-text"></p>
                       </div>
                  <div>
             </div>
        </div>`;
    bookDetailsDiv.innerHTML = card;
}

function loadBookDetails(bookObjectList, bookName){
    for(let dataObject of bookObjectList){
        if(dataObject.name === bookName){
            let imageLink = getImageLink(bookName);
            loadCardDetails(dataObject, imageLink);
        }
    }
}

async function loadData(){

    try{
        let response = await fetch(`https://anapioficeandfire.com/api/books/`);
        let bookObjectList = await response.json();
        let list = document.createElement('ul');
        for(let bookObject of bookObjectList){
            let listItems = document.createElement('li');
            let labelLink = document.createElement('label');
            labelLink.classList.add('informationLabel');
            labelLink.innerHTML = `${bookObject.name}`
            labelLink.style.cursor = 'pointer';
            listItems.append(labelLink);
            list.append(listItems);
        }
        informationDiv.innerHTML = '';
        informationDiv.append(list);
        let labels = document.querySelectorAll('.informationLabel');
        labels.forEach(label => label.addEventListener('click', e =>{
            let bookName = e.currentTarget.innerHTML;
            loadBookDetails(bookObjectList, bookName);
        }));
    }catch(error){
        console.log('error loading the book name!!!!!')
    }
}

bookListlink.addEventListener('click', function(){
    loadData();
});

