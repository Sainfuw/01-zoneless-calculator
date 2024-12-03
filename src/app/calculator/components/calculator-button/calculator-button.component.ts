import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core'

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrls: ['./calculator-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    // 'data-size': 'XL',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
  },
})
export class CalculatorButtonComponent {
  onClick = output<string>()
  contentValue = viewChild<ElementRef<HTMLButtonElement>>('button')
  isPressed = signal(false)

  isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  })

  isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  })

  handleClick() {
    const value = this.contentValue()?.nativeElement
    if (!value) return

    this.onClick.emit(value.innerText.trim())
  }

  keyboardPressedStyle(key: string) {
    const value = this.contentValue()?.nativeElement
    if (!value || value.innerHTML.trim() !== key) return

    this.isPressed.set(true)
    setTimeout(() => this.isPressed.set(false), 100)
  }
}
