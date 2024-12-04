import { Injectable, signal } from '@angular/core'

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const operators = ['+', '-', '÷', '⨉']
const specialOperators = ['=', 'C', '%', '.', '+/-', 'Backspace', 'Escape']
const allOperators = [...numbers, ...operators, ...specialOperators]

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  resultText = signal('0')
  subResultText = signal('0')
  lastOperator = signal('+')

  constructNumber(value: string) {
    if (!allOperators.includes(value)) return

    if (value === '=') {
      this.calculateResult()
      return
    }

    if (value === 'C') {
      this.resultText.set('0')
      this.subResultText.set('0')
      this.lastOperator.set('+')
      return
    }

    // Backspace
    // revisar cuando tengamos numeros negativos
    if (value === 'Backspace') {
      if (this.resultText() === '0') return
      if (this.resultText().startsWith('-') && this.resultText().length === 2) {
        this.resultText.set('0')
        return
      }

      if (this.resultText().length === 1) {
        this.resultText.set('0')
        return
      }

      this.resultText.update((value) => value.slice(0, -1))
      return
    }

    // Aplica operadores
    if (operators.includes(value)) {
      this.calculateResult()

      this.lastOperator.set(value)
      this.subResultText.set(this.resultText())
      this.resultText.set('0')
      return
    }

    // Limitar numero de caracteres
    if (this.resultText().length >= 10) {
      console.log('Max length reached')
      return
    }

    // Validar punto decimal
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set(`0.`)
        return
      }

      this.resultText.update((value) => `${value}.`)
      return
    }

    // Manejo del cero
    if (value === '0' && this.resultText() === '0') return
    if (value === '0' && this.resultText() === '-0') return

    if (value !== '0' && this.resultText() === '0') {
      this.resultText.set(value)
      return
    }

    if (value !== '0' && this.resultText() === '-0') {
      this.resultText.set(`-${value}`)
      return
    }

    // Cambio de signo
    if (value === '+/-') {
      this.resultText().startsWith('-')
        ? this.resultText.update((text) => text.slice(1))
        : this.resultText.update((text) => `-${text}`)
      return
    }

    this.resultText.update((text) => `${text}${value}`)
  }

  calculateResult() {
    const number1 = parseFloat(this.resultText())
    const number2 = parseFloat(this.subResultText())

    let result = 0

    if (this.lastOperator() === '+') result = number1 + number2
    if (this.lastOperator() === '-') result = number1 - number2
    if (this.lastOperator() === '÷') result = number1 / number2
    if (this.lastOperator() === '⨉') result = number1 * number2
    if (this.lastOperator() === '%') result = number1 % number2

    this.resultText.set(result.toString())
    this.subResultText.set('0')
  }
}
