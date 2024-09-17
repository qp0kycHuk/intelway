const fileHandler = (event: Event): void => {
  const input = event.target as HTMLInputElement
  const file = (input.files as FileList)[0] as File

  if (!file) return

  const wrapper = input.closest('[data-file-wrapper]') as HTMLDivElement
  const label = wrapper.querySelector('*[data-file-label]') as HTMLLabelElement
  const text = label.querySelector('*[data-file-text]') as HTMLDivElement
  const button = wrapper.querySelector('*[data-file-button]') as HTMLButtonElement
  const error = wrapper.querySelector('*[data-file-error]') as HTMLDivElement

  const typeHandler = (warning: string): void => {
    input.value = ''
    error.classList.remove('hidden')
    error.innerText = warning
  }

  if (
    !['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)
  ) {
    typeHandler('Только pdf или word')
  } else if (file.size > 2 * Math.pow(1024, 2)) {
    typeHandler('Размер не более 2 мб')
  } else {
    label.classList.add('pointer-events-none', 'opacity-40')
    error.classList.add('hidden')
    text.innerText = file.name
    button.classList.remove('hidden')
  }
}

const fileRemove = (event: Event): void => {
  const button = event.target as HTMLButtonElement
  const wrapper = button.closest('[data-file-wrapper]') as HTMLDivElement
  const label = wrapper.querySelector('*[data-file-label]') as HTMLLabelElement
  const input = label.querySelector('*[data-file-input]') as HTMLInputElement
  const text = label.querySelector('*[data-file-text]') as HTMLDivElement

  label.classList.remove('pointer-events-none', 'opacity-40')
  input.value = ''
  text.innerText = 'Прикрепить резюме'
  button.classList.add('hidden')
}

const init = (): void => {
  document.addEventListener('change', ((event: Event): void => {
    if ((event.target as HTMLInputElement).closest('[data-file-input]')) fileHandler(event)
  }) as EventListener)

  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLButtonElement).closest('[data-file-button]')) fileRemove(event)
  }) as EventListener)
}

export default { init }
