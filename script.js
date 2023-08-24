// var mySwiper = new Swiper('.swiper-container', {
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     keyboard: {
//         enabled: true,
//     },
//     autoplay: {
//         delay: 5000,
//     },
// });



var mySwiper = new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    keyboard: {
        enabled: true,
    },
    autoplay: {
        delay: 5000,
    },
    on: {
        init: function () {
            changeArrowColor(); // Set initial arrow color
        },
        slideChange: function () {
            changeArrowColor(); // Change arrow color on slide change
        }
    }
});

function changeArrowColor() {
    var nextArrow = document.querySelector('.swiper-button-next');
    var prevArrow = document.querySelector('.swiper-button-prev');
    
    var originalColor = getComputedStyle(nextArrow).color;

    nextArrow.addEventListener('click', function () {
        nextArrow.style.color = '#003366'; // Darker blue color
        setTimeout(function () {
            fadeToOriginalColor(nextArrow, originalColor);
        }, 2000); // Change back to original color after 2 seconds
    });

    prevArrow.addEventListener('click', function () {
        prevArrow.style.color = '#003366'; // Darker blue color
        setTimeout(function () {
            fadeToOriginalColor(prevArrow, originalColor);
        }, 2000); // Change back to original color after 2 seconds
    });
}

function fadeToOriginalColor(arrow, originalColor) {
    var currentColor = getComputedStyle(arrow).color;
    var steps = 50; // Number of steps for the transition
    var stepDuration = 20; // Duration of each step in milliseconds

    var colorTransition = setInterval(function () {
        var newColor = blendColors(currentColor, originalColor, 1 / steps);
        arrow.style.color = newColor;
        currentColor = newColor;

        steps--;

        if (steps <= 0) {
            clearInterval(colorTransition);
        }
    }, stepDuration);
}

function blendColors(color1, color2, factor) {
    var r1 = parseInt(color1.substr(1, 2), 16);
    var g1 = parseInt(color1.substr(3, 2), 16);
    var b1 = parseInt(color1.substr(5, 2), 16);
    var r2 = parseInt(color2.substr(1, 2), 16);
    var g2 = parseInt(color2.substr(3, 2), 16);
    var b2 = parseInt(color2.substr(5, 2), 16);

    var r = Math.floor(r1 + factor * (r2 - r1));
    var g = Math.floor(g1 + factor * (g2 - g1));
    var b = Math.floor(b1 + factor * (b2 - b1));

    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}