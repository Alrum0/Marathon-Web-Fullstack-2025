function openFilm(evt, filmName) {
    let tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for ( let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(filmName).style.display = 'flex';
    evt.currentTarget.className += " active";
}
