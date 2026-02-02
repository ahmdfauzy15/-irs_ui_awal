export const storage = {
  saveSubmission: (submission) => {
    const existing = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
    const updated = [submission, ...existing];
    localStorage.setItem('hakAksesSubmissions', JSON.stringify(updated));
    return updated;
  },
  
  getSubmissions: () => {
    return JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
  }
};