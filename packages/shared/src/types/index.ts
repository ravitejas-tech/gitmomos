export interface Profile {
  id: string;
  username: string;
  email: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  remote_url: string;
  created_at: string;
}

export interface CommitMetadata {
  id: string;
  project_id: string;
  user_id: string;
  hash: string;
  message: string;
  author_email: string;
  author_timestamp: string;
  created_at: string;
}

export interface SyncState {
  project_id: string;
  last_synced_hash: string;
  last_sync_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  project_id: string;
  date: string;
  content: string;
  status: 'pending' | 'generated' | 'manual';
  created_at: string;
}
