import moment from 'moment'
moment.locale('pt-br')

const convertTimeStampToDate = (timestamp) =>{
    return moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss")
}
const timeNow = () =>{
    return moment().format("YYYY-MM-DD HH:mm:ss")
}
export { convertTimeStampToDate, timeNow}