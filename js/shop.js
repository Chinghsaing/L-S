const oneItems = document.querySelectorAll('.one-item');
const input = document.querySelector('.search');
const search = document.querySelector('.search-detail');
document.addEventListener('DOMContentLoaded', function () {
    oneItems.forEach(oneItem => {
        oneItem.addEventListener('mouseover', function () {
            const menu = this.nextElementSibling;
            console.log(menu.children[0]);
            if (menu) {
                menu.children[0].style.opacity = '1';
                menu.style.height = '100%'; // 展开时设置实际高度以触发过渡效果
            }
        });

        oneItem.addEventListener('mouseout', function (event) {
            const menu = this.nextElementSibling;
            if (menu) {
                // 确保鼠标移到了menu-content上时不会立即关闭
                const isMouseInMenuContent = menu.querySelector('.menu-content').contains(event.relatedTarget);
                if (!isMouseInMenuContent) {
                    menu.children[0].style.opacity = '0';
                    menu.style.height = '0'; // 隐藏时恢复高度为0
                }
            }
        });
    });

    window.addEventListener('scroll', function () {
        document.querySelector('.menu').style.height = '0';
    })
    window.addEventListener('mouseover', function (event) {
        if (event.target == document.querySelector('.mask')) {
            document.querySelector('.menu').style.height = '0';
        }
    }) 
    
    input.children[0].addEventListener('focus', function () {
        search.style.opacity = '1';
    })
    input.children[0].addEventListener('blur', function () {
        search.style.opacity = '0';
    })
})
