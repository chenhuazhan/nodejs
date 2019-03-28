module.exports = {
    timeFormat(timeStamp){
        let date = timeStamp? new Date(timeStamp): new Date()
        let y = date.getFullYear()
        let m = (date.getMonth() + 1).toString().padStart(2, '0')
        let d = (date.getDate()).toString().padStart(2, '0')
        let HH = (date.getHours()).toString().padStart(2, '0')
        let MM = (date.getMinutes()).toString().padStart(2, '0')
        let SS = (date.getSeconds()).toString().padStart(2, '0')
        let time =  `${y}-${m}-${d} ${HH}:${MM}:${SS}`
        return time
    }
}