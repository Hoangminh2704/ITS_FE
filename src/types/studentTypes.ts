// studentTypes.ts - Alternative solution

import type { User } from ".";

export interface StudentDashboardProps {}

export interface StudentSidebarProps {
  onLogout: () => void;
  user?: Pick<User, "name"> | null;
}

export interface StudentProfileProps {
  user?: Pick<User, "name"> | null;
  onLogout: () => void;
}

export interface StudentHeaderProps {
  onSearch?: (searchTerm: string) => void;
  searchValue?: string;
}

export interface StudentContentProps {
  searchTerm?: string;
  onClearSearch?: () => void;
}
