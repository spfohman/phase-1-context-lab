/* Your Code Here */
function createEmployeeRecord(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title:employee[2],
        payPerHour: employee[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
}
function createEmployeeRecords(array){
    return array.map(array=>createEmployeeRecord(array))
}
function createTimeInEvent(timeIn){
    let [date, hour] = timeIn.split(' ')
    this.timeInEvents.push({
    
        type:"TimeIn",
        hour: parseInt(hour),
        date,
    })
    return this;
}
function createTimeOutEvent(timeOut){
    let [date, hour] = timeOut.split(' ');
    this.timeOutEvents.push({
        type:"TimeOut",
        hour:parseInt(hour),
        date,
    })
    return this;
}
function hoursWorkedOnDate(date){
    let inStamp = this.timeInEvents.find(function(e){
        return e.date ===date;
    })
    let outStamp = this.timeOutEvents.find(function(e){
        return e.date===date;
    })
    return (outStamp.hour-inStamp.hour)/100;
}
function wagesEarnedOnDate(date){
    let wages = hoursWorkedOnDate.call(this, date)* this.payPerHour
    return wages;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
function findEmployeeByFirstName(array, firstName){
    return array.find(function(e){
        return e.firstName ===firstName
    })

}
function calculatePayroll(array){
    return array.reduce(function(memo, e){
        return memo + allWagesFor.call(e)
    }, 0)
}
