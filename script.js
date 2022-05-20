function compute(){

    String.prototype.isNumber = function(){return /^\d+\.\d+$|^\d+$/.test(this);} // To test if non-integer was inputted

    var first_no = document.getElementById('first_no').value;
    var second_no = document.getElementById('second_no').value;

    var result = 0;
    var first_no_checker = true;
    var second_no_checker = true;

    // Check if text boxes have non-integer values
    if (!first_no.isNumber() || !second_no.isNumber()){
        alert("INCORRECT INPUT TYPE");
        if(second_no == '0'){
            second_no_checker = false; // failed the test
            alert("CAN'T DIVIDE BY ZERO!");
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