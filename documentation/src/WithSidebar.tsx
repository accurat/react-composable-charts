import { useEffect, useState } from 'react'

export function WithSidebar({
  title,
  children,
  items,
}: {
  title?: React.ReactNode
  items: { title: React.ReactNode; id: string; level: number }[]
  children?: React.ReactNode
}) {
  const SIDEBAR_WIDTH = '20rem'
  const [selected, setSelected] = useState('')
  console.log('selected: ', selected)

  useEffect(() => {
    const headings = [
      ...document.querySelectorAll('h1,h2,h3,h4,h5,h6').values(),
    ].filter((h) => h.id)

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((e) => e.isIntersecting)
        if (entry) {
          setSelected(entry.target.id)
          console.log('entry.target.id: ', entry.target.id)
        }
      },
      {
        threshold: [0],
        rootMargin: '0px 0px -80% 0px',
      }
    )
    headings.forEach((h) => intersectionObserver.observe(h))
    return () => {
      intersectionObserver.disconnect()
    }
  }, [])
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: SIDEBAR_WIDTH,
          height: '100vh',
          overflow: 'auto',
          padding: '1rem 0',
          boxSizing: 'border-box',
          borderRight: '1px solid #f5f5f5',
        }}
      >
        {title && (
          <div
            style={{
              fontSize: '0.75rem',
              color: 'grey',
              padding: '0.5rem 1rem',
            }}
          >
            {title}
          </div>
        )}
        {items.map((item) => (
          <a
            href={`#${item.id}`}
            key={item.id}
            style={{
              padding: '0.5rem 1rem',
              display: 'block',

              backgroundColor:
                item.id === selected ? 'rgba(43, 168, 162,0.1)' : '',
              textDecoration: 'none',
              color: item.id === selected ? 'rgb(43, 168, 162)' : 'black',
              fontWeight: item.id === selected ? 'bold' : 'normal',
            }}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector(`#${item.id}`)?.scrollIntoView({
                behavior: 'smooth',
              })
            }}
          >
            <div style={{ marginLeft: item.level * 30 }}>{item.title}</div>
          </a>
        ))}
      </div>

      <div style={{ marginLeft: SIDEBAR_WIDTH }}>{children}</div>
    </>
  )
}
