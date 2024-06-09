document.addEventListener('DOMContentLoaded', function () {
    const oneItems = document.querySelectorAll('.one-item');
    const masks = document.querySelectorAll('.mask');
    const menuContents = document.querySelectorAll('.menu-content');
	
    function toggleMenu(menu, show = true) {
        const mask = menu.querySelector('.mask');
        const content = menu.querySelector('.menu-content');
        if (show) {
            menu.style.height = '100%';
            mask.style.display = 'block';
            content.style.display = 'block';
        } else {
            menu.style.height = '0';
            mask.style.display = 'none';
            content.style.display = 'none';
        }
    }

    function handleMouseEnterLeave(menu, show) {
        return function (event) {
            const isMouseInContent = menu.querySelector('.menu-content').contains(event.relatedTarget);
            if (isMouseInContent) return;
            toggleMenu(menu, show);
        };
    }

    oneItems.forEach(oneItem => {
        const menu = oneItem.nextElementSibling;
        oneItem.addEventListener('mouseover', () => toggleMenu(menu, true));
        oneItem.addEventListener('mouseout', handleMouseEnterLeave(menu, false));
    });

    masks.forEach(mask => {
        mask.addEventListener('mouseover', () => toggleMenu(mask.parentElement, false));
    });

    menuContents.forEach(menuContent => {
        menuContent.addEventListener('mouseover', () => toggleMenu(menuContent.parentElement, true));
        menuContent.addEventListener('mouseout', () => toggleMenu(menuContent.parentElement, false));
    });

    window.addEventListener('scroll', () => {
        const menus = document.querySelectorAll('.menu');
        menus.forEach(menu => toggleMenu(menu, false));
    });
});