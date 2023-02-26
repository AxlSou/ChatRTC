import { fetchMessages } from '../utils/retrieveMessages'

export default async function Home () {
  const data = await fetchMessages()

  return (
    <pre>{data}</pre>
  )
}
