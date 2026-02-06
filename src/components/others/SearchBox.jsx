import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import useAuthStore from '../../store/authStore';
import useJournalStore from '../../store/JournalStore';
const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const journalFilter = useJournalStore((state)=> state.journalFilter);
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    journalFilter(e.target.value);
  }

  return (
    <>
      {!isMobileSearchOpen && (
        <button 
            className="mobile-search-trigger" 
            onClick={() => setIsMobileSearchOpen(true)}
        >
            <FontAwesomeIcon icon={faSearch} />
        </button>
      )}

        <div className={`header-search ${isMobileSearchOpen ? 'mobile-active' : ''}`}>
          <FontAwesomeIcon icon={faSearch} className="search-icon"/>
          <input 
            type="text" 
            placeholder={`Search ${user.firstName}'s journal...`} 
            className="search-input"
            value={searchText}
            onChange={handleSearch}
            autoFocus={isMobileSearchOpen}
          />
          <button 
            className="mobile-search-close" 
            onClick={() => {
                setIsMobileSearchOpen(false);
                setSearchText("");
                filterJournals("");
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
    </>
  )
}

export default SearchBox;
