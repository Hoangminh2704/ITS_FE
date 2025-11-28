// StudentHeader.tsx
import React, { useState, useRef, useEffect } from "react";
import "./StudentHeader.css";

interface StudentHeaderProps {
  onSearch?: (searchTerm: string) => void;
  searchValue?: string;
}

const StudentHeader: React.FC<StudentHeaderProps> = ({
  onSearch,
  searchValue = "",
}) => {
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalSearchValue(searchValue);
  }, [searchValue]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setLocalSearchValue(searchTerm);

    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleClearSearch = () => {
    setLocalSearchValue("");
    if (onSearch) {
      onSearch("");
    }
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

  return (
    <header className="student-header">
      <form className="searchbar-container" onSubmit={handleSearchSubmit}>
        <span className="material-symbols-outlined search-icon">search</span>
        <input
          ref={searchInputRef}
          className="search-input"
          placeholder="Search courses, assignments..."
          type="text"
          value={localSearchValue}
          onChange={handleSearchChange}
        />
        {localSearchValue && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </form>
      <div className="header-actions">
        <button className="header-action-btn">
          <span className="material-symbols-outlined">notifications</span>
          <span className="notification-dot"></span>
        </button>
        <button className="header-action-btn">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </header>
  );
};

export default StudentHeader;
