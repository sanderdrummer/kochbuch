import { HeightWrapper } from '@kochbuch/components'
import { useNavigate } from '@solidjs/router'
import { createSignal } from 'solid-js'
import { addItemsToList, parseStringToListItems } from './ListResource'

export const AddListItems = () => {
  const [items, setItems] = createSignal('')
  const navigate = useNavigate()
  return (
    <HeightWrapper>
      <h1 class="">Auf die Einkaufsliste:</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const parsed = parseStringToListItems(items())
          addItemsToList(parsed)
          navigate('/list')
        }}
      >
        <textarea
          class="font-extralight w-full min-h-300 rounded block, p-4 placeholder-stone-500 border-stone-800 text-stone-400 bg-stone-800 focus:outline-none focus:border-stone-400 focus:ring-stone-400 focus:ring-1"
          style={{ resize: 'none', height: 'calc(100vh - 150px)' }}
          placeholder="Menge Artikel"
          value={items()}
          oninput={(e) => setItems(e.currentTarget.value)}
        />

        <button type="submit">auf die Liste!</button>
      </form>
    </HeightWrapper>
  )
}
