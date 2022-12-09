import { Menu, Transition } from '@headlessui/react'

export default function MyDropdown() {
  return (
    <Menu>
      <h1 className='text-3xl font-bold underline'>Hello World</h1>
      <Menu.Button>More</Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
      <Menu.Items>
        <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
              >
                Account settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && 'bg-blue-500'}`}
                href="/documentation"
              >
                Documentation
              </a>
            )}
          </Menu.Item>
          <Menu.Item disabled>
            <span className="opacity-75">Invite a friend (coming soon!)</span>
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${
                  active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
                href="/documentation"
              >
                Documentation
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                href="/documentation"
              >
                Documentation
              </a>
            )}
          </Menu.Item>
      </Menu.Items>
      </Transition>
    </Menu>
  )
}
