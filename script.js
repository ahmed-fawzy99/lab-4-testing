
const { WebElement } = require("selenium-webdriver");
const {Builder, By, Key, util} = require("selenium-webdriver");
var assert = require('assert');

async function test(){
    var htmlLocation = "file://"+ __dirname + "/index.html";
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(htmlLocation);
    var first_no =  driver.findElement(By.id("first_no"));
    var radio_choice = driver.findElement(By.id("addition"));
    var second_no =  driver.findElement(By.id("second_no"));
    var btn_click =  driver.findElement(By.id("compute_btn"));

    // Test Case 1
    first_no.sendKeys("10");
    radio_choice.click();   // Addition Operation
    second_no.sendKeys("13");
    btn_click.click();
    let promise = await driver.findElement(By.id("result")).getText();
    assert.equal("23", promise);
    first_no.clear();
    second_no.clear();
    
    // Test Case 2
    first_no.sendKeys("15");
    radio_choice = driver.findElement(By.id("division")); // Division Operation
    radio_choice.click();
    second_no.sendKeys("2.5");
    driver.findElement(By.id("compute_btn")).sendKeys(Key.RETURN); // Click - because .click() somehow stopped working
    promise = await driver.findElement(By.id("result")).getText();
    assert.equal("6", promise);
    first_no.clear();
    second_no.clear();

    // Test Case 3
    first_no.sendKeys("178");
    radio_choice = driver.findElement(By.id("multiply")); // Multiplication Operation
    radio_choice.click();
    second_no.sendKeys("155");
    driver.findElement(By.id("compute_btn")).sendKeys(Key.RETURN); // Click - because .click() somehow stopped working
    promise = await driver.findElement(By.id("result")).getText();
    assert.equal("27590", promise);
    first_no.clear();
    second_no.clear();
    
    //TC4: <16.4, -, 14.6, 1.8> 
    // Test Case 3
    first_no.sendKeys("16.4");
    radio_choice = driver.findElement(By.id("subtraction")); // Multiplication Operation
    radio_choice.click();
    second_no.sendKeys("14.6");
    driver.findElement(By.id("compute_btn")).sendKeys(Key.RETURN); // Click - because .click() somehow stopped working
    promise = await driver.findElement(By.id("result")).getText();
    assert.equal("50", promise);

     
}


test();

function compute(){
    String.prototype.isNumber = function(){return /^\d+\.\d+$|^\d+$/.test(this);} // To test if non-integer was inputted

    var first_no = document.getElementById('first_no').value;
    var second_no = document.getElementById('second_no').value;

    var result = 0;
    var first_no_checker = true;
    var second_no_checker = true;
    var zero_division = false;

    // Check if text boxes have non-integer values
    if (!first_no.isNumber() || !second_no.isNumber()){
        if(second_no == '0'){
            zero_division = true; // failed the test
            return;
        }
        first_no_checker = false; // failed the test
        second_no_checker = false; // failed the test
    } else {

        var n1  = parseFloat(first_no);
        var n2 = parseFloat(second_no);
    
        var operant_choice = document.querySelector('input[name="operation"]:checked').value; 
        switch(operant_choice){
            case "+":
                result = (n1) + (n2);
                break;
            case "-":
                result = (n1) - (n2);
                break;
            case "*":
                result = (n1) * (n2);
                break;
            case "/":
                result = (n1) / (n2);
                break;
            default:
                alert("UNEXPECTED ERROR");
        }
        document.getElementById("result").style.display = "block";
        document.getElementById("result").innerHTML = result;
        
    }

    

};