function getFormattedDate(dateObject) {
    let weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let minutes = dateObject.getMinutes();
    let hours = dateObject.getHours();
    let day = dateObject.getDate();
    let month = dateObject.getMonth() + 1;
    let year = dateObject.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;


    return `${day}.${month}.${year} ${hours}:${minutes} ${weeks[dateObject.getDay()]}`;
    
}
