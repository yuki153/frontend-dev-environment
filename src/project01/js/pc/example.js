const smoothScrollTriggers = document.getElementsByClassName('js-anc-smooth-scroll');
const addSmoothScroll = (i) => {
    smoothScrollTriggers[i].addEventListener('click', (e) => {
        e.preventDefault();
        const jumpId = e.target.href.match(/#.*/)[0].replace('#', '');
        const jumpElem = document.getElementById(jumpId);
        const rect = jumpElem.getBoundingClientRect();
        console.log('rect', rect);
        window.scrollTo({
            top: rect.top,
            behavior: 'smooth',
        });
    });
};

for (let i = 0; i < smoothScrollTriggers.length; i++) {
    addSmoothScroll(i);
}
