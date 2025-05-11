'use client'
import { useState, useEffect, useRef } from 'react'
import styles from '@/Styles/SearchModal.module.css'
import { useRouter } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const SearchModal = ({ isOpen, onClose }: Props) => {
  const [query, setQuery] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // GSAP را به صورت داینامیک بارگذاری می‌کنیم
  useEffect(() => {
    import('gsap').then((gsap) => {
      if (isOpen && modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4 }
        )
      }
    })
  }, [isOpen])

  const handleSearch = () => {
    if (query.trim() !== '') {
      onClose()
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleIconClick = () => {
    handleSearch()
  }

  if (!isOpen) return null
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalContent}>
          <div className={styles.searchBox} style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="کلمه مورد نظر را تایپ کنید..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <FaSearch className={styles.searchIcon} onClick={handleIconClick} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchModal
