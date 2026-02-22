import { getAllApps } from '@/lib/content'
import AppsClient from './apps-client'

export default function AppsPage() {
  const apps = getAllApps()
  return <AppsClient apps={apps} />
}
