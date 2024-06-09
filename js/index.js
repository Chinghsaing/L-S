
const rightBtn = document.querySelector('.right-btn');
const leftBtn = document.querySelector('.left-btn');
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.silder img')
const home = document.getElementById('home');
const delayTime = 1000;
let currentSection = 0;
let lastClickTime = 0;
let lastScrollTime = 0;
let scrollEnabled = true;

function switchImg(direction) {
    images.forEach(function (img) {
        img.style.left = parseFloat(img.style.left) - direction * 100 + '%';

            if (img.style.left === '-200%') {
                img.style.zIndex = '0'
                img.style.left = '100%';
                setTimeout(function () {
                    img.style.zIndex = '99'
                }, 1000)
            } else if (img.style.left === '200%') {
                img.style.zIndex = '0'
                img.style.left = '-100%';
                setTimeout(function () {
                    img.style.zIndex = '99'
                }, 1000)
            }   
    });
}


function btnEvent(direction) {
    const currentTime = Date.now();
    if (currentTime - lastClickTime >= 1500) {
        switchImg(direction);
        lastClickTime = currentTime;
        const imagesArray = Array.from(images);
        const currentImage = imagesArray.find(img => img.style.left === '0%');
        document.querySelector('#home').style.backgroundImage = `url(${currentImage.src})`;
    }
}
rightBtn.addEventListener('click', function () {
    btnEvent(1)
});
leftBtn.addEventListener('click', function () {
    btnEvent(-1)
});

function scrollToSection(index, duration) {
    const start = home.scrollTop;
    const end = index * window.innerHeight;
    const distance = end - start;
    const startTime = performance.now();

    function scrollAnimation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easeInOut(progress);
        home.scrollTop = start + distance * easedProgress;

        if (elapsedTime < duration) {
            requestAnimationFrame(scrollAnimation);
        }
    }

    requestAnimationFrame(scrollAnimation);
}

function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function handleScroll(event) {
    event.preventDefault();
    const currentTime = Date.now();
    const delta = event.deltaY;
    if (currentTime - lastScrollTime < delayTime) {
        // 如果距离上次滚动不足5秒，则不执行滚动操作
        return;
    }
    if (delta > 0 && currentSection < 5) {
        scrollToSection(currentSection + 1, 1000); // 设置持续时间为1秒
        currentSection++;
        lastScrollTime = currentTime; // 更新上次滚动时间
        disableScroll(); // 禁用滚动
        setTimeout(enableScroll, delayTime); // 在延迟后启用滚动
    } else if (delta < 0 && currentSection > 0) {
        scrollToSection(currentSection - 1, 1000);
        currentSection--;
        lastScrollTime = currentTime; // 更新上次滚动时间
        disableScroll(); // 禁用滚动
        setTimeout(enableScroll, delayTime); // 在延迟后启用滚动
    }
}

function disableScroll() {
    scrollEnabled = false;
}

function enableScroll() {
    scrollEnabled = true;
}
function isCarouselInViewport(carousel) {
    const rect = carousel.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    return (
        rect.top >= 0 &&
        rect.bottom <= windowHeight
    );
}
// 监听窗口的滚动事件
window.addEventListener('wheel', function () {
    if (isCarouselInViewport(carousel)) {
        // 如果carousel在可视范围内，启动定时器
        if (!timer) {
            timer = setInterval(function () {
                btnEvent(1);
            }, 3000);
        }
    } else {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }
});

window.addEventListener('wheel', handleScroll, { passive: false });

document.addEventListener('DOMContentLoaded', function () {
    timer = setInterval(function () {
        btnEvent(1);
    }, 3000);
});