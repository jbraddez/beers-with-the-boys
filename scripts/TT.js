const mainCont = document.getElementById('bracketContainer');
let currentRoundEl;

function startTournament() {
    const input = document.getElementById('nameInput').value;
    const names = input.split('\n').map(name => name.trim()).filter(Boolean).map(name =>  name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()));

    document.getElementById('startButton').style.display = 'none';
    const round1 = document.createElement('div');
    round1.classList.add('round');

    if(names.length % 2 != 0){
        const index = Math.floor(Math.random() * names.length);
        const chosen = names[index];
        names.splice(index,1);

        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('finished');

        const name = document.createElement('p');
        name.textContent = chosen;
        name.classList.add('winner');
        

        card.appendChild(name);
        round1.appendChild(card);
    }
    while(names.length > 0){
        const index1 = Math.floor(Math.random() * names.length);
        const chosen1 = names[index1];
        names.splice(index1,1);

        const index2 = Math.floor(Math.random() * names.length);
        const chosen2 = names[index2];
        names.splice(index2,1);
        const card = document.createElement('div');
        card.classList.add('card');
        
        const name1 = document.createElement('div');
        name1.classList.add('name');
        name1.classList.add('name1');
        name1.textContent = chosen1;
        const name2 = document.createElement('div');
        name2.classList.add('name');
        name2.classList.add('name2');
        name2.textContent = chosen2;

        name1.addEventListener('click', (e)=>{Winner(e)});
        name2.addEventListener('click', (e)=>{Winner(e)});

        const vs = document.createElement('p');
        vs.textContent = 'VS';

        card.appendChild(name1);
        card.appendChild(vs);
        card.appendChild(name2);

        round1.appendChild(card);
    }
    currentRoundEl = round1;
    mainCont.appendChild(round1);
}

function Winner(e){
    const clickedEl = e.target;
    const name = clickedEl.textContent;
    const card = clickedEl.parentElement;
    card.innerHTML = '';
    card.classList.add('finished');

    const winEl = document.createElement('p');
    winEl.classList.add('winner');
    winEl.textContent = name;
    card.appendChild(winEl);

    if(currentRoundEl.querySelectorAll('.finished').length == currentRoundEl.querySelectorAll('.card').length){
        NewRound();
    }
}

function NewRound(){
    const names = Array.from(currentRoundEl.querySelectorAll('.winner')).map(el => el.textContent.trim());

    if(names.length < 2){
        if(names.length == 1){
        document.getElementById('wincont').style.display = 'block';
        document.getElementById('overallWinner').textContent = names[0];
        document.querySelector('main').style.filter = 'blur(5px)';
        mainCont.style.filter = 'blur(5px)';
        return;
        }
        else{
            console.log("Something's gone wrong, whoops!")
        }
    }

    const round = document.createElement('div');
    round.classList.add('round');
    if(names.length % 2 != 0){
        const index = Math.floor(Math.random() * names.length);
        const chosen = names[index];
        names.splice(index,1);

        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('finished');

        const name = document.createElement('p');
        name.textContent = chosen;
        name.classList.add('winner');
        

        card.appendChild(name);
        round.appendChild(card);
    }
    while(names.length > 0){
        const index1 = Math.floor(Math.random() * names.length);
        const chosen1 = names[index1];
        names.splice(index1,1);

        const index2 = Math.floor(Math.random() * names.length);
        const chosen2 = names[index2];
        names.splice(index2,1);
        const card = document.createElement('div');
        card.classList.add('card');
        
        const name1 = document.createElement('div');
        name1.classList.add('name');
        name1.classList.add('name1');
        name1.textContent = chosen1;
        const name2 = document.createElement('div');
        name2.classList.add('name');
        name2.classList.add('name2');
        name2.textContent = chosen2;

        name1.addEventListener('click', (e)=>{Winner(e)});
        name2.addEventListener('click', (e)=>{Winner(e)});

        const vs = document.createElement('p');
        vs.textContent = 'VS';

        card.appendChild(name1);
        card.appendChild(vs);
        card.appendChild(name2);

        round.appendChild(card);
    }
    currentRoundEl = round;
    mainCont.appendChild(round);
}