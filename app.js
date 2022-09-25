function reverseStr(str)
{
    var listOfChar=str.split('');
    var reverseListOfChar=listOfChar.reverse();
    var reversedStr=reverseListOfChar.join('');
    return reversedStr;
}
function isPalindrome(str)
{
    var reverse=reverseStr(str);
    return str==reverse;
}
function convertDateToStr(date)
{
    var dateStr={day:'', month:'',year:''};
    if(date.day <10)
    {
        dateStr.day='0' + date.day;
    }
    else{
        dateStr.day=date.day.toString();
    }
    if(date.month <10)
    {
        dateStr.month='0' + date.month;
    }
    else
    {
        dateStr.month=date.month.toString();
    }
    dateStr.year=date.year.toString();
    return dateStr;

}

function getAllDateFormats(date)
{
    var dateStr =convertDateToStr(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;

    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;

    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
 
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day; 
    return [ddmmyyyy,mmddyyyy, yyyymmdd, ddmmyy,mmddyy,yymmdd]
}
function checkPalindromeForAllDateFormats(date)
{
    var flag=false; 
    var listOfPalindromes=getAllDateFormats(date);
    for(var i=0;i<listOfPalindromes.length;i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag=true;
            break
        }
    }
return flag;
}
function isLeapYear(year){
    if(year % 400===0){
        return true;
    }
    if(year % 100===0){
        return false;
    } 
    if(year % 4===0){
        return true;
    }
    return false;
}
function getNextDate(date){
    var day= date.day + 1; //increased the day
    var month=date.month;
    var year =date.year;
    var daysInMonth=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //0-11
    if(month===2){  //check for february
       if(isLeapYear(year)){
           if(day>29){
               day=1;
               month++;
           }
       }
       else {
           if(day>28){
               day= 1;
               month++;
            }

       }
    }
    else{ 
       //check if day exceeds max number of days in month 
        if(day> daysInMonth[month-1])
        {
           day=1;
           month++; 
        }
    }
    if(month>12){
       month=1;
       year++;
    }
    return{
       day:day,
       month:month,
       year:year
    }; 
}
function getNextPalindromeDate(date)
{
    var ctr=0;
    var nextDate=getNextDate(date); 
    while(1){
        ctr++;
        var isPalindrome=checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate=getNextDate(nextDate);
    }
    return[ ctr ,nextDate]; 
}




var bdayInput=document.querySelector('#bday-input');
var checkBtn=document.querySelector('#show-btn');
var resultref=document.querySelector('#result');
function clickHandler()
{
    var bdayStr=bdayInput.value;
    if(bdayStr!==''){
    var listOfDate=bdayStr.split('-')
    var date={
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
    };

    var isPalindrome=checkPalindromeForAllDateFormats(date);
    if(isPalindrome){
        resultref.innerText='Yayy!! your Birthday is a palindrome 🥳'
    }
    else{
        var[ ctr ,nextDate]= getNextPalindromeDate(date);
        resultref.innerText=`The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed the date by ${ctr} days😔`
    }
    //console.log(isPalindrome);

  }  
}
checkBtn.addEventListener("click", clickHandler);
//console.log(getNextPalindromeDate(date)); 
//console.log(getNextDate(date));