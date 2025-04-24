const beers = [
    {
      name: "Peroni",
      image: "peroni.png"
    },
    {
      name: "Moretti",
      image: "moretti.png"
    },
    {
      name: "Budweiser",
      image: "budweiser.webp"
    },
    {
      name: "Corona",
      image: "corona.png"
    },
    {
      name: "Guinness",
      image: "guiness.png"
    },
    {
      name: "Stella Artois",
      image: "stella.png"
    },
    {
      name: "Cruzcampo",
      image: "cruz.png"
    },
    {
      name: "Carlsberg",
      image: "carlsberg.png"
    },
    {
      name: "Heineken",
      image: "heineken.png"
    },
    {
      name: "Amstel",
      image: "amstel.png"
    },
    {
      name: "San Miguel",
      image: "sanmiguel.webp"
    },
    {
      name: "Brewdog",
      image: "brewdog.png"
    }
  ];
  
const container = document.getElementById("beer-list-container");
const main = document.querySelector('main');
const chooseBtn = document.querySelector('.choose');

const selected = []

function StartProcess(){
  main.style.transform = 'translateY(-100%)';
  main.style.opacity = '0';

  setTimeout(() => {
    ShowBeers()
  }, 350);
}

function ShowBeers(){
  main.style.display = 'none';

  beers.forEach(beer => {
    const beerCard = document.createElement("div");
    beerCard.classList.add("beer-card");
    beerCard.addEventListener('click', ()=>{BeerSelected(beerCard)});
  
    const img = document.createElement("img");
    img.src = "/images/" + beer.image;
    img.alt = beer.name;
  
    const name = document.createElement("h3");
    name.textContent = beer.name;
  
    beerCard.appendChild(img);
    beerCard.appendChild(name);
    container.appendChild(beerCard);
  });

  chooseBtn.style.display = "block";
}

function BeerSelected(beerCard) {
  beerCard.classList.toggle('selected');

  const name = beerCard.lastChild.textContent.trim();
  const src = beerCard.firstChild.src;

  const index = selected.findIndex(item => item[0] === name && item[1] === src);

  if (beerCard.classList.contains('selected')) {
    if (index === -1) selected.push([name, src]);
  } else {
    if (index > -1) selected.splice(index, 1);
  }
}

const spinner = document.getElementById('spincont');
function Choose(){
  if (selected.length == 0){
    return
  }
  container.style.display = 'none';
  chooseBtn.style.display = 'none';

  spinner.innerHTML = '';

  selected.forEach(beer => {
    const beerCard = document.createElement("div");
    beerCard.classList.add("beer-card");
    beerCard.classList.add("beer-card-spin");

    const img = document.createElement("img");
    img.src = beer[1];
    img.alt = beer[0];

    const name = document.createElement("h3");
    name.textContent = beer[0];

    beerCard.appendChild(img);
    beerCard.appendChild(name);
    spinner.appendChild(beerCard);
  });

  let currentIndex = 0;

  const showNextCard = () => {
    const cards = document.querySelectorAll('.beer-card-spin');
    cards.forEach(card => card.classList.remove('show'));

    cards[currentIndex].classList.add('show');
    currentIndex = (currentIndex + 1) % selected.length;
  };

  const cycleInterval = setInterval(showNextCard, 100);
  setTimeout(() => {
    clearInterval(cycleInterval); 

    const randomIndex = Math.floor(Math.random() * selected.length);
    const chosenBeer = selected[randomIndex];

    const chosenBeerCard = document.createElement("div");
    chosenBeerCard.classList.add("beer-card");
    const chosenImg = document.createElement("img");
    chosenImg.src = chosenBeer[1];
    chosenImg.alt = chosenBeer[0];

    const chosenName = document.createElement("h3");
    chosenName.textContent = chosenBeer[0];

    chosenBeerCard.appendChild(chosenImg);
    chosenBeerCard.appendChild(chosenName);
    spinner.innerHTML = ''; 
    spinner.appendChild(chosenBeerCard); 

    document.getElementById('howmany').style.display = 'block';
    
  }, 2000); 
}

function howMany(){
  const numbers = [4,6,10,12,18]
  const amount = Math.floor(Math.random() * numbers.length);
  document.getElementById('amount').innerHTML = `Get <span id="number">${numbers[amount]}</span> or the nearest amount`;
}