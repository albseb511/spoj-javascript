function runProgram(input){
    // write code here
}

(function(){
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    remainder = "";
    process.stdin.on("data", function (input) {
        remainder += input;
    });

    process.stdin.on("end", function () {
    runProgram(remainder);
    });

})()
    