import {
  H1,
  HeightWrapper,
  LoadingButton,
  PlusIcon,
} from '@kochbuch/components'
import { A } from '@solidjs/router'
import { For } from 'solid-js'
import {
  clearDone,
  ListItem,
  ListResource,
  markItemAsDone,
  markItemAsTodo,
} from './ListResource'

export const ListView = () => {
  const [list, { refetch }] = ListResource()
  return (
    <HeightWrapper class="mx-auto container">
      <div class="grid grid-flow-col items-start mx-2">
        <H1>Einkaufsliste</H1>
        <A
          class="p-4 pt-4 text-lg grid grid-flow-col gap-2 text-stone-300 justify-end items-center"
          href="add"
        >
          <PlusIcon class="fill-stone-300 h-7 w-7" />
          Mehr einkaufen
        </A>
      </div>
      <ItemList
        heading="Noch in den Korb"
        action={(item) => {
          markItemAsDone(item).then(refetch)
        }}
        emptyState="Nichts mehr einzukaufen!"
        items={list()?.todo ?? []}
      />
      <ItemList
        heading="Schon dabei"
        action={(item) => {
          markItemAsTodo(item).then(refetch)
        }}
        emptyState="Noch nichts eingekauft!"
        items={list()?.done ?? []}
      />

      {(list()?.done?.length ?? 0) > 0 && (
        <LoadingButton
          class="text-red-400 mt-10 mb-8"
          label="Neue Liste"
          onClick={async () => {
            await clearDone()
            refetch()
          }}
        />
      )}
    </HeightWrapper>
  )
}

const ItemList = (props: {
  items: ListItem[]
  emptyState: string
  heading: string
  action: (item: ListItem) => void
}) => {
  return (
    <div class="mt-5 p-3">
      <h2 class="text-2xl font-normal">{props.heading}</h2>
      <ul role="list" class="divide-y list-none divide-stone-800">
        <For
          each={props.items}
          fallback={
            <div class="p-3 font-extralight text-lg">{props.emptyState}</div>
          }
        >
          {(item) => (
            <li class="font-extralight text-lg grid grid-flow-col justify-between">
              <LoadingButton
                label={
                  <span>
                    {item.amount}
                    {item.scale} {item.title}
                  </span>
                }
                onClick={async () => props.action(item)}
              />
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}
