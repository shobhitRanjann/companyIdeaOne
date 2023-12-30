
const stats = [
    { id: 1, name: 'Visitors every 24 hours', value: '400' },
    { id: 2, name: 'Food Stalls Registered', value: '119' },
    { id: 3, name: 'Pin Code Covered', value: '46' },
  ]

function Stats() {
  return (
    <>
    <div className="bg-white py-24 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>

    <div className="bg-white py-4 sm:py-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80" alt="" />
      </div>
    </div>
    </>
  )
}

export default Stats