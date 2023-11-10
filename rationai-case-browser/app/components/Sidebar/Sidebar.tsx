import Link from 'next/link';
import React from 'react'

const menuItems = [
  {
    label: "Projects",
    link: "/files",
    subItems: [
      {
        label: "test1",
        link: "/",
      },
      {
        label: "test2",
        link: "/",
      }
    ]
  },
  {
    label: "Upload",
    link: "/upload",
  },
];

const Sidebar = () => {
  return (
    <aside className="flex flex-col items-center p-2 w-56 h-screen bg-base-100 border-r border-neutral shadow">
        <div className="navbar-center w-11/12 flex-1">
          <ul className="menu xl:menu-vertical lg:min-w-max bg-gray-50 rounded-lg">
            {menuItems.map((menuItem) => (
              <li key={menuItem.label}>
                <Link href={menuItem.link}>{menuItem.label}</Link>
                {menuItem.subItems && (
                  <ul>
                    {menuItem.subItems.map((subItem) => (
                      <li key={subItem.label}>
                        <Link href={subItem.link}>{subItem.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
  )
}

export default Sidebar