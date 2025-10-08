export const BASE_URL = import.meta.env.VITE_API_URL;
// export const BASE_URL = 'https://b0fd-139-135-36-92.ngrok-free.app'
export const BASE_URL_IMAGE = import.meta.env.VITE_FILES_URL;

const VERSION_API = "v1";

export const API_END_POINTS = {
  /////////////////////////////<=== AUTH ===>//////////////////////////////
  forgetPassword: BASE_URL + "/api/auth/forgot-password",
  resetPassword: BASE_URL + "/api/auth/reset-password",
  updateUserProfile: BASE_URL + "/api/auth/profile",
  getUserProfile: BASE_URL + "/api/auth/profile",

  /////////////////////////////<=== ADMIN DASHBOARD ===>/////////////////////
  getAdminDashboardStats: BASE_URL + "/api/admin/stats",

  /////////////////////////////<=== COMPANY DASHBOARD ===>///////////////////
  getCompanyDashboardStats: BASE_URL + "/api/company-owner/getCompanyStats",
  getCompanyDashboardIftaSummary:
    BASE_URL + "/api/company-owner/companyIftaSummary",
  getCompanyDashboardCriticalAlerts: BASE_URL + "/api/companies/criticalAlerts",

  /////////////////////////////<=== DRIVER DASHBOARD ===>////////////////////
  getDriverDashboardStats: BASE_URL + "/api/driver-dashboard/stats",
  getDriverDashboardStatus: BASE_URL + "/api/driver-dashboard/status",
  getDriverAlertReminder: BASE_URL + "/api/driver-dashboard/dashboardReminders",
  getDriverExpiringDocs: BASE_URL + "/api/driver-dashboard/expiring-documents",
};
