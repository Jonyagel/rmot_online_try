import type { NextPage } from 'next'
import ContentForm from './components/ContentForm'

const Home: NextPage = () => {
  return (
    <div>
      <h1>בדיקת תוכן</h1>
      <ContentForm />
    </div>
  )
}

export default Home