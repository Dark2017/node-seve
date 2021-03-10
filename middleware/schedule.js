const schedule = require('node-schedule')
const moment = require('moment')

// 定时任务
const scheduleCronstyle = () => {
    schedule.scheduleJob('10 * * * * *', () => {
        console.log('scheduleCronstyle:' + moment().format("YYYY-MM-DD"));
    }); 
}

module.exports = {
    scheduleCronstyle
} 