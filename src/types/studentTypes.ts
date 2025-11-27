// studentTypes.ts - Alternative solution

import type { User } from ".";

export interface StudentDashboardProps {}

export interface StudentSidebarProps {
  onLogout: () => void;
  user?: Pick<User, "name"> | null; // 👈 Chỉ lấy field name từ User
}

export interface StudentProfileProps {
  user?: Pick<User, "name"> | null; // 👈 Chỉ lấy field name từ User
  onLogout: () => void;
}

export interface StudentHeaderProps {}

export interface StudentContentProps {
  courses: any[];
}
