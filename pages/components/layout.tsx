import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

export default function Layout({ 
  children 
}: {
  children: React.ReactNode
}) {
  return <div className={styles.container}>{children}</div>
}