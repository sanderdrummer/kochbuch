import { HeightWrapper, LoadingButton, PlusIcon } from '@kochbuch/components'
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
    <HeightWrapper>
      <A
        class="p-4 text-lg grid grid-flow-col gap-2 text-stone-300 justify-end items-center"
        href="add"
      >
        <PlusIcon class="fill-stone-300 h-7 w-7" />
        Mehr einkaufen
      </A>
      <ItemList
        action={async (item) => {
          await markItemAsDone(item)
          refetch()
        }}
        emptyState="Nichts mehr einzukaufen!"
        items={list()?.todo ?? []}
      />
      <ItemList
        action={async (item) => {
          await markItemAsTodo(item)
          refetch()
        }}
        emptyState="Noch nichts eingekauft!"
        items={list()?.done ?? []}
      />

      {(list()?.done?.length ?? 0) > 0 && <LoadingButton
        class="text-red-400 mt-10"
        label="Neue Liste"
        onClick={async () => {
          await clearDone()
          refetch()
        }}
      />}
    </HeightWrapper>
  )
}

const ItemList = (props: {
  items: ListItem[]
  emptyState: string
  action: (item: ListItem) => Promise<void>
}) => {
  return (
    <div class="mt-5">
    <h2>hi</h2>
      <ul role="list" class="divide-y list-none divide-stone-800">
        <For
          each={props.items}
          fallback={
            <div class="p-3 font-extralight text-lg">{props.emptyState}</div>
          }
        >
          {(item) => (
            <li class="p-3 font-extralight text-lg grid grid-flow-col justify-between">
              <LoadingButton
                label={
                  <span>
                    {item.amount} {item.title}
                  </span>
                }
                onClick={() => props.action(item)}
              ></LoadingButton>
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}
