import { HeightWrapper, LoadingButton, PlusIcon } from '@kochbuch/components'
import { useNavigate } from '@solidjs/router'
import { createSignal } from 'solid-js'
import { addItemsToList, parseStringToListItems } from './ListResource'

export const AddListItems = () => {
  const [items, setItems] = createSignal('')
  const navigate = useNavigate()
  return (
    <HeightWrapper class="mx-auto container">
      <h1 class="mx-2 my-4 text-3xl font-bold">Auf die Einkaufsliste:</h1>
      <textarea
        class="mb-10 font-extralight w-full min-h-300 rounded block, p-4 placeholder-stone-500 border-stone-800 text-stone-400 bg-stone-800 focus:outline-none focus:border-stone-400 focus:ring-stone-400 focus:ring-1"
        style={{ resize: 'none', height: 'calc(100vh - 150px)' }}
        placeholder="Menge Artikel"
        value={items()}
        onInput={(e) => setItems(e.currentTarget.value)}
      />

      <LoadingButton
        icon={<PlusIcon />}
        message="Zur Einkaufsliste hinzugefügt"
        label="auf die Liste!"
        onClick={async () => {
          const parsed = parseStringToListItems(items())
          await addItemsToList(parsed)
          navigate('/list')
        }}
      />
    </HeightWrapper>
  )
}
