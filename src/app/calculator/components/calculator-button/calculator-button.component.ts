import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core'

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrls: ['./calculator-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    // 'data-size': 'XL',
  },
})
export class CalculatorButtonComponent {
  isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  })

  isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  })

  @HostBinding('class.is-double-size') get commandStyle() {
    return this.isDoubleSize()
  }
}
