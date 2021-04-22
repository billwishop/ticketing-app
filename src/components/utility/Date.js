export const yearFirst = date => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export const yearLast = date => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('/');
}

export const getTime = timeInput => {
    const t = new Date(timeInput)
    console.log(t)
    let minutes = t.getUTCMinutes()
    let hours = t.getUTCHours()

    let period = ''

    if (minutes === 0)
        minutes = '00';
    if (hours < 11) {
        period = 'am'
    } else {
        hours = hours - 12
        period = 'pm'
    }
        

    console.log(hours, ':',minutes)
    const time = hours + ':' + minutes + ' ' + period
    return time
}