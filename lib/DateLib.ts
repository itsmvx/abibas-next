import moment from "moment/moment";

type DateFormatType = [
    'YYYY-MM-DD',
    'MMMM Do YYYY',
    'dddd, MMMM Do YYYY, h:mm:ss a',
];
const dateFormat = (date: string, format?:DateFormatType[number] | string) => {
    try {
        return moment(date).format(format || 'MMMM Do YYYY');
    } catch (error) {
        return 'Input invalid';
    }
}

export {
    dateFormat
}