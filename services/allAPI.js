import { serverURL } from "./serverURL"
import commonAPI from "./commonAPI"

// ADMIN REGISTER
export const adminRegisterAPI = async (reqBody) => {
  return await commonAPI('POST', `${serverURL}/api/adminregister`, reqBody, {})
}

// LOGIN (Admin, Lead, Developer, Tester)
export const loginAPI = async (reqBody) => {
  return await commonAPI('POST', `${serverURL}/api/login`, reqBody, {})
}

// ADMIN CREATES A USER (Lead / Developer / Tester)
export const createUserAPI = async (reqBody, reqHeader) => {
  return await commonAPI('POST', `${serverURL}/api/createuser`, reqBody, reqHeader)
}

// ADMIN GETS ALL USERS
export const getUsersAPI = async (reqHeader) => {
  return await commonAPI('GET', `${serverURL}/api/users`, {}, reqHeader)
}

// ADMIN GETS A SINGLE USER BY ID
export const getUserByIdAPI = async (id, reqHeader) => {
  return await commonAPI('GET', `${serverURL}/api/users/${id}`, {}, reqHeader)
}

// ADMIN DELETES A USER
export const deleteUserAPI = async (id, reqHeader) => {
  return await commonAPI('DELETE', `${serverURL}/api/users/${id}`, {}, reqHeader)
}

// ADMIN UPDATES A USER
export const updateUserAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI('PUT', `${serverURL}/api/users/${id}`, reqBody, reqHeader)
}

// ADMIN RESETS A USER'S PASSWORD
export const resetUserPasswordAPI = async (id, reqBody, reqHeader) =>{
   return await commonAPI('PUT', `${serverURL}/api/users/${id}/reset-password`, reqBody, reqHeader)
}
  

// CREATE PROJECT (Admin only)
export const createProjectAPI = async (reqBody, reqHeader) => {
  return await commonAPI('POST', `${serverURL}/api/projects`, reqBody, reqHeader)
}

// GET ALL PROJECTS
export const getProjectsAPI = async (reqHeader) => {
  return await commonAPI('GET', `${serverURL}/api/projects`, {}, reqHeader)
}

// GET SINGLE PROJECT BY ID
export const getProjectByIdAPI = async (id, reqHeader) => {
  return await commonAPI('GET', `${serverURL}/api/projects/${id}`, {}, reqHeader)
}

// UPDATE PROJECT (Admin only)
export const updateProjectAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI('PUT', `${serverURL}/api/projects/${id}`, reqBody, reqHeader)
}

// DELETE PROJECT (Admin only)
export const deleteProjectAPI = async (id, reqHeader) => {
  return await commonAPI('DELETE', `${serverURL}/api/projects/${id}`, {}, reqHeader)
}

// UPDATE PROJECT MEMBERS (Admin only) — Lead / Developers / Testers
export const updateProjectMembersAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI('PUT', `${serverURL}/api/projects/${id}/members`, reqBody, reqHeader)
}

// GET PROJECTS ASSIGNED TO LOGGED-IN USER (Lead / Developer / Tester)
export const getMyProjectsAPI = async (reqHeader) => {
  return await commonAPI('GET', `${serverURL}/api/my-projects`, {}, reqHeader)
}

// GET MY OWN PROFILE
export const getMyProfileAPI = async (reqHeader) => {
  return await commonAPI('GET', `${serverURL}/api/my-profile`, {}, reqHeader)
}

// UPDATE MY OWN PROFILE
export const updateMyProfileAPI = async (reqBody, reqHeader) => {
  return await commonAPI('PUT', `${serverURL}/api/my-profile`, reqBody, reqHeader)
}

// CHANGE MY OWN PASSWORD
export const changeMyPasswordAPI = async (reqBody, reqHeader) => {
  return await commonAPI('PUT', `${serverURL}/api/change-password`, reqBody, reqHeader)
}

// GET MY RECENT ACTIVITY
export const getMyActivityAPI = async (reqHeader) => {
  return await commonAPI('GET', `${serverURL}/api/my-activity`, {}, reqHeader)
}

// GET ADMIN DASHBOARD STATS
export const getAdminStatsAPI = async (reqHeader) => {
  return await commonAPI('GET', `${serverURL}/api/admin-stats`, {}, reqHeader)
}


// CREATE BUG
export const createBugAPI = async (reqBody, reqHeader) => {
  return await commonAPI('POST', `${serverURL}/api/bugs`, reqBody, reqHeader)
}

// GET ALL BUGS
export const getBugsAPI = async (reqHeader) => {
  return await commonAPI('GET', `${serverURL}/api/bugs`, {}, reqHeader)
}

// GET SINGLE BUG
export const getSingleBugAPI = async (id, reqHeader) => {
  return await commonAPI('GET', `${serverURL}/api/bugs/${id}`, {}, reqHeader)
}

// UPDATE BUG
export const updateBugAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI('PUT', `${serverURL}/api/bugs/${id}`, reqBody, reqHeader)
}

// DELETE BUG
export const deleteBugAPI = async (id, reqHeader) => {
  return await commonAPI('DELETE', `${serverURL}/api/bugs/${id}`, {}, reqHeader)
}