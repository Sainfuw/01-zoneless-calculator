import { CalculatorService } from '@/calculator/services/calculator.service'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core'

@Component({
  selector: 'calculator-screen',
  imports: [],
  templateUrl: './calculator-screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex items-end w-full h-40 text-right bg-gradient-to-b from-gray-800 to-gray-700',
  },
})
export class CalculatorScreenComponent {
  #calculatorService = inject(CalculatorService)

  resultText = computed(() => this.#calculatorService.resultText())
  subResultText = computed(() => this.#calculatorService.subResultText())
  lastOperator = computed(() => this.#calculatorService.lastOperator())
}
