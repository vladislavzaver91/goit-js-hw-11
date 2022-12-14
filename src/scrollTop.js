import refs from './refs';

export default window.onscroll = () => {
    if (window.scrollY > 500) {
        refs.scrollBtn.classList.remove('is-hidden');
    }
    else if (window.scrollY < 500) {
        refs.scrollBtn.classList.add('is-hidden');
    }
}

refs.scrollBtn.onclick = () => {
    window.scrollTo(0, 0);
}