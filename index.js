const otpHintField = document.querySelector('.otp__number');
const alertTextField = document.querySelector("#alert__text")
const container = document.querySelector(".input__container");
const remainingTimeMsg = document.querySelector(".expire__time");
const tryAgainButton = document.querySelector(".try__button");

let randomOTP;
let intervalID;
let timeOutID;




function expireTimeSetter(){

    let expireTime = 15000;
    let intervalTime = 1000;

    let timeInSecond = expireTime/intervalTime;

    intervalID = setInterval(()=>{
        remainingTimeMsg.textContent=`OTP will Expire in: ${timeInSecond} seconds`;
        timeInSecond -= 1;
    },intervalTime)

    timeOutID = setTimeout(()=>{
        remainingTimeMsg.textContent=`OTP Expired! try Again`;
        clearInterval(intervalID);
        [...container.children].forEach(child=>{
            if(child.tagName==="INPUT"){
                child.value = ""
            }
        })
        randomOTPGenerator();
    },expireTime)
}

function focusNextInput(){
    container.addEventListener("input",(e)=>{
        let target = e.target;
        let inputValue = target.value;
        
        // validate input value is none other then Numbers!
        if(isNaN(inputValue)){
            target.value = ""
        }

        // focus on next nextElementSibling
        let nextInput = target.nextElementSibling;
        if(nextInput){
            nextInput.focus();
        }

        validateOTP();

    })
}


function randomOTPGenerator(){

    randomOTP = Math.floor(1000 + Math.random() * 9000);

    otpHintField.textContent=`Your OTP is: ${randomOTP}`;

    expireTimeSetter()
}

function validateOTP(){
    let inputAllValue = "";

    // Html elements array like object;
    let children =container.children;

    // manipulate array like object by creating a copy of it;
    [...children].forEach(child =>{
        // this line is too new for me, here I learn how to intrigue a value depend on other function cause this child is an Input and focusNextInput event is based on Input of it's container,
        inputAllValue += child.value;
    })
    // console.log(inputAllValue);

    // base-10 radix 10 for Decimal value
    let validate = randomOTP === parseInt(inputAllValue, 10);
    
    if(validate){
        alertTextField.textContent=`Correct OTP`;
        alertTextField.classList.remove('invalid');
        alertTextField.classList.add('correct');
        clearInterval(intervalID);
        clearTimeout(timeOutID);
        remainingTimeMsg.textContent="You Entered Correct OTP";
        tryAgain();
    }
    else{
        alertTextField.textContent=`Invalid OTP`;
        alertTextField.classList.remove('correct');
        alertTextField.classList.add('invalid');
    }
}





function init(){
    focusNextInput();
    randomOTPGenerator();
}
init();

function tryAgain(){
    tryAgainButton.classList.remove("hidden");
    tryAgainButton.addEventListener("click",()=>{
     // hide the Button
        tryAgainButton.classList.add("hidden");
     // otp hint empty
     otpHintField.textContent="";
     // alert class removed
     alertTextField.classList.remove("correct","invalid");
     // alert Text Empty
     alertTextField.textContent="";
     // Input fields Empty
     [...container.children].forEach(child=>{
         if(child.tagName === "INPUT"){
             child.value="";
         }
     })
     clearInterval(intervalID);
        clearTimeout(timeOutID);
     // called Init Function once again
     init();
    })
 }