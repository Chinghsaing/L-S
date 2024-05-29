
const rightBtn = document.querySelector('.right-btn');
const leftBtn = document.querySelector('.left-btn');
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

rightBtn.addEventListener('click', function () {
    const currentTime = Date.now();
    if (currentTime - lastClickTime >= 1500) {
        switchImg(1);
        lastClickTime = currentTime;
        const imagesArray = Array.from(images);
        const currentImage = imagesArray.find(img => img.style.left === '0%');
        document.querySelector('#home').style.backgroundImage = `url(${currentImage.src})`;
    }
});
leftBtn.addEventListener('click', function () {
    const currentTime = Date.now();
    if (currentTime - lastClickTime >= 1500) {
        switchImg(-1);
        lastClickTime = currentTime;
        const imagesArray = Array.from(images);
        const currentImage = imagesArray.find(img => img.style.left === '0%');
        document.querySelector('#home').style.backgroundImage = `url(${currentImage.src})`;
    }
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
    console.log(delta, currentSection);
    if (currentTime - lastScrollTime < delayTime) {
        // 如果距离上次滚动不足5秒，则不执行滚动操作
        return;
    }
    if (delta > 0 && currentSection < 3) {
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

window.addEventListener('wheel', handleScroll, { passive: false });