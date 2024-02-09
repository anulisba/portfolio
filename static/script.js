const header = document.querySelector("header");
window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 120);
});

const circles = document.querySelectorAll('.circle'); // Fix typo here (querySelectorAll)

circles.forEach(elem => {
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots * marked / 100);
    var points = "";
    var rotate = 360 / dots;

    for (let i = 0; i < dots; i++) {
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`; // Fix template literal
    }

    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll('.points');
    for(let i=0; i<percent; i++){
    	pointsMarked[i].classList.add('marked')
    }
});





