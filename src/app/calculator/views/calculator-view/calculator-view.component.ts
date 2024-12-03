import { ChangeDetectionStrategy, Component } from '@angular/core'

import { CalculatorComponent } from '@/calculator/components/calculator/calculator.component'

@Component({
  selector: 'calculator-view',
  imports: [CalculatorComponent],
  templateUrl: './calculator-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden max-w-sm',
  },
})
export default class CalculatorViewComponent {}
