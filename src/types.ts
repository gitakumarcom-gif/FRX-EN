export interface StaffMember {
  role: 'OWNER' | 'CURATOR';
  name: string;
  discordHandle: string;
  userId: string;
  description: string;
  avatarColor: string;
}

export interface RuleItem {
  id: number;
  title: string;
  details?: string;
  category: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info';
}
