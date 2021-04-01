import moment from 'moment'

const convertTimeStampToDate = (timestamp) =>{
    return moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss")
}

export {convertTimeStampToDate}