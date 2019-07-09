import { Component, OnInit,  Input} from '@angular/core';


@Component({
    selector: 'app-caculator',
    templateUrl: './caculator.component.html',
    styleUrls: ['./caculator.component.css']
})
export class CaculatorComponent implements OnInit {
    arrNumber = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, '+/-', 0, '.' ] ;
    arrOperators = [ '+', '-', 'x', '÷' ];
    arrEquation = ['%', '√', 'x2', 'CE', 'C', '⌫'];
    arrResult = ['='];
    arrclassi = [ '1/x' ];
    arrShowValue: string;
    status: string[];
    flag = false;
    flagResult = false;
    number1: any;
    number2: any;
    operator: string;
    iconResult: string;
    equation: string;
    classification: string;
    numberValue: string;
    result: number | string;
    arrHistoryValue: string[] = [];
    arrHistoryResult: any[] = [];
    strMessageError: string;
    numIndex: number;
    @Input() arrResultChange;
    @Input() returnIndex;
    constructor() {
        this.number1 = '';
        this.number2 = '';
        this.arrShowValue = '';
    }
    screen = document.querySelector('#caculator-show');
    ngOnInit() {}
    getValue($v) {
        if (this.flagResult) {
            this.emptyData();
            this.arrShowValue = '';
            this.flagResult = false;
        }
        if (this.flag === false) {
            this.number1 += $v;
        } else if (this.flag === true) {
            this.number2 += $v;
        }
        this.numberValue = $v;
        switch (this.numberValue) {
            case '+/-':
                if (this.flag === false) {
                    this.number1 = parseFloat(this.number1);
                    this.number1 = this.number1 * -1;
                } else if (this.flag === true) {
                    if (this.flagResult === false && this.operator) {
                        this.number2 = parseFloat(this.number2);
                        this.number2 = this.number2 * -1;
                    }
                }
                break;
        }
    }
    getOperator($v) {
        this.flag = true;
        this.operator = $v;
    }
    getClassic($v) {
        this.flag = true;
        this.classification = $v;
        switch (this.classification) {
            case '1/x':
                this.flag = false;
                this.result = 1 / (parseFloat(this.number1));
                if (this.operator === '+') {
                    this.result = this.result + 1 / (parseFloat(this.number2));
                } else if (this.operator === '-') {
                    this.result = this.result - 1 / (parseFloat(this.number2));
                } else if (this.operator === 'x') {
                    this.result = this.result * 1 / (parseFloat(this.number2));
                } else if (this.operator === '÷') {
                    this.result = this.result / 1 / (parseFloat(this.number2));
                }
                break;
        }
    }
    getEquation($v) {
        this.equation = $v;
        switch (this.equation) {
            case 'CE':
                this.number1 = '';
                this.number2 = '';
                this.operator = '';
                this.iconResult = '';
                this.result = 0;
                this.flag = false;
                break;
            case 'C':
                this.number1 = '';
                this.number2 = '';
                this.operator = '';
                this.iconResult = '';
                this.result = 0;
                this.flag = false;
                break;
            case '⌫':
                console.log(this.flag);
                if (this.flag === false) {
                    this.number1 = this.deleteOneNumber(this.number1);
                    console.log(this.number1);
                } else {
                    this.number2 = this.deleteOneNumber(this.number2);
                    console.log(this.number2);
                }
                break;
            case 'x2':
                this.flag = false;
                this.flagResult = true;
                this.result = parseFloat(this.number1) ** 2;
                if (this.operator === '+') {
                    this.result = this.result + parseFloat(this.number2) ** 2;
                } else if (this.operator === '-') {
                    this.result = this.result + parseFloat(this.number2) ** 2;
                } else if (this.operator === 'x') {
                    this.result = this.result + parseFloat(this.number2) ** 2;
                } else if (this.operator === '÷') {
                    this.result = this.result + parseFloat(this.number2) ** 2;
                }
                break;
            case '√':
                this.flag = false;
                this.flagResult = true;
                this.result = Math.sqrt(parseFloat(this.number1));
                console.log(parseFloat(this.number1));
                break;
        }
    }
    getResult($v) {
        this.flag = false;
        this.flagResult = true;
        this.iconResult = $v;
        this.result = this.checkTypeOperator();
        this.arrHistoryValue.push(`${this.number1} ${this.operator} ${this.number2} ${this.iconResult}`);
        this.arrHistoryResult.push(this.result);
        this.arrShowValue = '';
    }

    //  Check kieu operator va tinh toan
    checkTypeOperator() {
        switch (this.operator || this.numberValue) {
            case '+':
                return parseFloat(this.number1) + parseFloat(this.number2);
            case '-':
                return parseFloat(this.number1) - parseFloat(this.number2);
            case 'x':
                return parseFloat(this.number1) * parseFloat(this.number2);
            case '÷':
                if ( this.number2 === 0 ) {
                    this.strMessageError = 'Không thể chia cho 0';
                    return 'Infinity';
                } else {
                    return parseFloat(this.number1) / parseFloat(this.number2);
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
        // this.historyValue.splice(0, 1);
    }
    changeIndex(event) {
        this.emptyData();
        this.arrShowValue = this.arrHistoryValue[event];
        this.result = this.arrHistoryResult[event];
    }
}
