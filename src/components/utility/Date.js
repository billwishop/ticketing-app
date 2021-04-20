export const yearLast = date => {

    const months=[
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
    ]

    const d = new Date(date)
    let month = (months[d.getMonth()])  
    let day = d.getDate() + ','
    let year = d.getFullYear()

    // if (month.length < 2) 
    //     month = '0' + month;
    // if (day.length < 2) 
    //     day = '0' + day;

    return [month, day, year].join(' ');
}