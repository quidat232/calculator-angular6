import { Component, OnInit, Input } from '@angular/core';
@Component({
    selector: 'app-caculator',
    templateUrl: './caculator.component.html',
    styleUrls: ['./caculator.component.css']
})
export class CaculatorComponent implements OnInit {
    arrNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, '+/-', 0, '.'];
    arrOperators = [ '1/x', '+', '-', 'x', '÷'];
    arrEquation = ['%', '√', 'x2', 'CE', 'C', '⌫'];
    arrResult = ['='];
    arrclassi = ['1/x'];
    arrShowValue: string;
    arrSumResultOperator: any[];
    arrShowVal: any[];
    strShowNumberValue: any;
    flag = false;
    flagResult = false;
    number1: any;
    number2: any;
    operator: string;
    iconResult: string;
    equation: string;
    classification: string;
    numberValue: string;
    result: any;
    arrHistoryValue: string[] = [];
    arrHistoryResult: any[] = [];
    strMessageError: string;
    numIndex: number;
    numTotal = 0;
    numTru = 0;
    num1ChiaX = 0;
    numMu2 = 0;
    numCanBac2 = 0;
    strSumOperator: any;
    @Input() arrResultChange;
    @Input() returnIndex;
    constructor() {
        this.number1 = '';
        this.number2 = '';
        this.strShowNumberValue = '';
        this.arrSumResultOperator = [];
        console.log(this.arrSumResultOperator);
        // console.log(this.arrSumResultOperator2);
    }
    ngOnInit() { }
    getValue($v) {
        if (this.flagResult) {
            this.emptyData();
            this.flagResult = false;
        }
        // if (this.flag === false) {
        //     this.arrShowNumberValue += $v;
        //     console.log(this.arrShowNumberValue);
        //     this.arrSumResultOperator.push($v);
        //     console.log('số lần 1 :' + this.arrSumResultOperator);
        // } else {
        //     this.arrShowNumberValue += $v;
        //     this.arrSumResultOperator.push($v);
        //     console.log('số lần 2 :' + this.arrSumResultOperator);
        //     this.flag = false;
        // }
        this.flag = false;
        this.flagResult = false;
        // if (this.flag === false) {
        //     this.strShowNumberValue += $v;
        // } else if (this.flag === true) {
        //     this.strShowNumberValue += $v;
        // }
        this.strShowNumberValue += $v;
        this.numberValue = $v;
        console.log('bấm number status :' + this.flag);
        switch (this.numberValue) {
            case '+/-':
                if (this.flag === false) {
                    this.strShowNumberValue = parseFloat(this.strShowNumberValue);
                    this.strShowNumberValue = this.strShowNumberValue * -1;
                    console.log(this.strShowNumberValue);
                }
                break;
        }
    }
    getOperator($v) {
        this.flag = true;
        this.operator = $v;
        if (this.operator === '+' || this.operator === '-' || this.operator === '÷' || this.operator === 'x') {
            this.arrSumResultOperator.push(this.strShowNumberValue);
            this.arrSumResultOperator.push(` ${this.operator} `);
        } else if (this.operator === '1/x')  {
            this.arrSumResultOperator.push(` ( 1 / ${this.strShowNumberValue} ) `);
            if ($v === '+') {
                this.result = this.numTotal + this.num1ChiaX;
            } else if ($v === '-') {
                this.result = this.numTotal + this.num1ChiaX;
            } else if ($v === 'x') {
                this.result = this.numTotal * this.num1ChiaX;
            } else if ($v === '÷') {
                this.result = this.numTotal * this.num1ChiaX;
            }
        }
        // this.arrSumResultOperator.push(this.numMu2);
        switch (this.operator) {
            case '+':
                this.numTotal = this.numTotal + this.num1ChiaX + this.numCanBac2 + this.numMu2 + parseFloat(this.strShowNumberValue);
                this.result = this.numTotal;
                this.num1ChiaX = 0;
                this.numMu2 = 0;
                this.numCanBac2 = 0;
                this.strShowNumberValue = '';
                break;
            case '-':
                if (this.numTotal === 0) {
                    this.numTotal = parseFloat(this.strShowNumberValue) - this.numTotal;
                } else {
                    this.numTotal = this.numTotal - this.num1ChiaX - this.numCanBac2 - this.numMu2 - parseFloat(this.strShowNumberValue);
                    this.result = this.numTotal;
                    this.num1ChiaX = 0;
                    this.numMu2 = 0;
                    this.numCanBac2 = 0;
                    this.strShowNumberValue = '';
                }
                break;
            case 'x':
                if (this.numTotal === 0 ) {
                    this.numTotal = this.result;
                // } else if (this.num1ChiaX === 0 || this.numMu2 === 0 || this.numCanBac2 === 0) {
                //     this.numTotal = this.numTotal * parseFloat(this.strShowNumberValue);
                // } else if (this.num1ChiaX !== 0) {
                //     console.log('1chia X' + this.num1ChiaX);
                // //     this.numTotal =  this.num1ChiaX * this.numTotal;
                // //     console.log(this.numTotal);
                // } else if (this.numMu2 > 0) {
                //     this.numTotal = this.numTotal * this.numMu2 * parseFloat(this.strShowNumberValue);
                // } else if (this.numCanBac2 > 0) {
                //     console.log(this.numCanBac2);
                //     this.numTotal = this.numTotal * this.numCanBac2 * parseFloat(this.strShowNumberValue);
                //     console.log(this.numTotal);
                } else {
                    this.numTotal = this.numTotal * parseFloat(this.strShowNumberValue);
                    this.result = this.numTotal;
                }
                console.log( 'kết quả :' + this.numTotal);
                this.result = this.numTotal;
                this.strShowNumberValue = '';
                break;
            case '÷':
                if (parseFloat(this.strShowNumberValue) === 0 ) {
                        this.strMessageError = 'Không thể chia cho 0';
                } else if (this.numTotal === 0) {
                   this.numTotal = parseFloat(this.strShowNumberValue);
                } else if (this.numMu2 === parseFloat(this.strShowNumberValue)) {
                    this.numTotal = this.numTotal / this.numMu2 / parseFloat(this.strShowNumberValue);
                } else {
                    this.numTotal = this.numTotal / parseFloat(this.strShowNumberValue);
                    this.result = this.numTotal;
                }
                this.strShowNumberValue = '';
                break;
            case '1/x':
                this.num1ChiaX = 1 / parseFloat(this.strShowNumberValue);
                this.arrSumResultOperator.push(this.num1ChiaX);
                break;
        }
        if (this.result < Number.EPSILON ) {
            this.strMessageError = 'Operator cannot result because số quá lớn';
        }
        console.log('bấm operator status :' + this.flag);
        console.log(this.arrSumResultOperator);
    }
    getEquation($v) {
        this.equation = $v;
        // this.arrSumResultOperator.push(this.strShowNumberValue);
        switch (this.equation) {
            case 'CE':
                this.number1 = '';
                this.number2 = '';
                this.operator = '';
                this.iconResult = '';
                this.result = 0;
                this.numTotal = 0;
                this.numMu2 = 0;
                this.numCanBac2 = 0;
                this.arrSumResultOperator = [];
                // this.arrSumResultOperator2 = [];
                this.flag = false;
                break;
            case 'C':
                this.number1 = '';
                this.number2 = '';
                this.operator = '';
                this.iconResult = '';
                this.result = 0;
                this.numTotal = 0;
                this.numMu2 = 0;
                this.numCanBac2 = 0;
                this.arrSumResultOperator = [];
                // this.arrSumResultOperator2 = [];
                this.flag = false;
                break;
            case '⌫':
                this.result = 0;
                break;
            case 'x2':
                this.arrSumResultOperator.push(`( ${this.strShowNumberValue} ^2 ) `);
                this.flag = true;
                // this.flagResult = true;
                this.numMu2 = parseFloat(this.strShowNumberValue) ** 2;
                this.result = this.numMu2;
                if (this.operator === 'x' && this.numTotal > 0) {
                    console.log(this.numMu2);
                    this.numTotal = this.numMu2 * this.numTotal * parseFloat(this.strShowNumberValue);
                } else if (this.operator === '÷' && this.numTotal > 0) {
                    console.log(this.numMu2);
                    this.numTotal = this.numTotal / this.numMu2 / parseFloat(this.strShowNumberValue);
                }
                break;
            case '√':
                this.arrSumResultOperator.push(` sqrt( ${this.strShowNumberValue} ) `);
                this.flag = true;
                this.numCanBac2 = Math.sqrt(parseFloat(this.strShowNumberValue));
                this.arrSumResultOperator.push();
                this.result = this.numCanBac2;
                if (this.operator === 'x' && this.numTotal > 0) {
                    this.numTotal = this.numTotal * this.numCanBac2 * parseFloat(this.strShowNumberValue);
                }
                break;
        }
    }
    getResult($v) {
        this.flag = false;
        this.flagResult = true;
        this.arrSumResultOperator.push($v);
        this.iconResult = $v;
        this.result = this.result;
        this.arrHistoryValue.push(`${this.arrSumResultOperator.toString().replace(/\,/g, '') }`);
        console.log(this.arrHistoryValue);
        this.arrHistoryResult.push(this.result);
        this.arrShowValue = '';
        this.emptyData();
    }

    //  Check kieu operator va tinh toan
    checkTypeOperator() {
        this.arrSumResultOperator.splice(0, 1);
        for (let i = 0; i < this.arrSumResultOperator.length; i++) {
            let sum: any;
            switch (this.arrSumResultOperator[i]) {
                case '+':
                    this.arrSumResultOperator[i] = ('' + this.arrSumResultOperator).replace(/ /g, '').replace(/\+/g, '');
                    sum = this.arrSumResultOperator[i];
                    console.log(sum);
                    break;
                case '-':
                    console.log(' thực hiện phép trừ :' + this.arrSumResultOperator);
                    break;
                case 'x':
                    console.log(' thực hiện phép nhân :' + this.arrSumResultOperator);
                    break;
                case '÷':
                    console.log(' thực hiện phép chia :' + this.arrSumResultOperator);
                    break;
            }
        }
    }
    deleteOneNumber($str) {
        // viet code xoa 1 ky tu cuoi cung cua chuoi
        let equationNumber = $str;
        equationNumber = equationNumber.substring(0, equationNumber.length - 1);
        return equationNumber;
    }
    emptyData() {
        this.number1 = '';
        this.number2 = '';
        this.operator = '';
        this.iconResult = '';
        this.classification = '';
        this.strShowNumberValue = '';
        this.arrSumResultOperator = [];
        this.result = 0;
        this.numCanBac2 = 0;
        this.numTotal = 0;
        // this.arrSumResultOperator2 = [];
        // this.historyValue.splice(0, 1);
    }
    changeIndex(event) {
        this.emptyData();
        this.arrShowValue = this.arrHistoryValue[event];
        this.result = this.arrHistoryResult[event];
    }
}
