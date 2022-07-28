const calculator = {

    displayNumber: '0',
    Operator: null,
    firstNumber: null,
    isWaitForSecondNumber: false,
};

// function untuk mengupdate angka
function updateDisplay() {

    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

//function untuk menghapus data pada kalkulator
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.Operator = null;
    calculator.firstNumber = null;
    calculator.isWaitForSecondNumber = false;
}

// function untuk memasukkan angka ke dalam nilai displayNumber kalkulator
function inputDigit(digit) {

    if (calculator.displayNumber === '0') {

        calculator.displayNumber = digit;

    } else {

        calculator.displayNumber += digit;
    }
}

//function inverNumber untuk melakukan perkalian calculator, displayNumber dengan nilai -1.
//kecuali jika displayNumber masih bernilai ‘0’, perkalian tidak akan dilakukan.
function inversNumber() {

    if (calculator.displayNumber === '0') {

        return;
    }

    calculator.displayNumber = calculator.displayNumber * -1;
}

//  function handleOperator untuk menetapkan sebuah operator, "+" atau "-" di kalkulator.
function handleOperator(operator) {

    if (!calculator.isWaitForSecondNumber) {
        calculator.Operator = operator;
        calculator.isWaitForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';

    } else {

        alert('operator Sudah di Tetapkan');
    }
}


//function performCalculation untuk melakukan kalkulasi terhadap nilai - nilai yang terdapat pada objek calculator, 
// sehingga pastikan kalkulator sudah memiliki nilai operator dan firstNumber ketika fungsi ini dijalankan.

function performCalculation() {
    if (calculator.firstNumber == null || calculator.Operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }

    let result = 0;
    if (calculator.Operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }

    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.Operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}




const buttons = document.querySelectorAll('.button');

// function untuk menginisialisasikan nilai seluruh elemen button yang ada dan berikan event click pada tiap elemennya
for (const button of buttons) {

    button.addEventListener('click', function (event) {

        // mendapatkan objek lemen yg di clik
        const target = event.target;


        // tombol clear untuk mereset calculator
        if (target.classList.contains('clear')) {
            //.classList untuk melihat nilai class apa saja dalam bentuk array yang ada di element target. 
            //.contains yang merupakan method dari array yang berguna untuk memastikan nilai yang berada di dalam array tersebut.
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inversNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {

            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
}

