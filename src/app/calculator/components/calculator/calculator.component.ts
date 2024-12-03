import { ChangeDetectionStrategy, Component, viewChildren } from '@angular/core'
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component'
import { CalculatorScreenComponent } from '../calculator-screen/calculator-screen.component'

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent, CalculatorScreenComponent],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  calculatorButtons = viewChildren(CalculatorButtonComponent)

  handleClick(key: string) {
    console.log({ key })
  }

  // @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Enter: '=',
      NumpadEnter: '=',
      Backspace: 'C',
      Escape: 'C',
      '*': '⨉',
      '/': '÷',
    }

    const keyValue = keyEquivalents[event.key] ?? event.key
    this.handleClick(keyValue)

    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(keyValue)
    })
  }
}
