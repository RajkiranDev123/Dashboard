// today
const timeElapsed = Date.now();
const tdobj = new Date(timeElapsed);
const tdstr = tdobj.toISOString().split("T")[0] + "--" + tdobj.toISOString().split("T")[0];
export let todayDate = tdstr


//yesterday
let date = new Date();
date.setDate(date.getDate() - 1)
var yes = date.toISOString().split("T")[0] + "--" + date.toISOString().split("T")[0];
export let yesterdayDate = yes

// first day of the current month
var d = new Date();
var fd = new Date(d.getFullYear(), d.getMonth(), 2).toISOString().split("T")[0] + "--" + tdobj.toISOString().split("T")[0];
export let monthDate = fd