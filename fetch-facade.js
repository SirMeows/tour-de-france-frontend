import { SERVER_URL } from "../../settings.js"

export const getAllTeams = async () => await fetch(`${SERVER_URL}teams`, makeOptions("get")).then(res => handleErrorsAndParse(res))
export const addCyclistRequest = async (id, cyclistDto) => await fetch(`${SERVER_URL}teams/${id}/cyclist`, makeOptions("post", cyclistDto)).then(res => handleErrorsAndParse(res))
export const getAllCyclists = async () => await fetch(`${SERVER_URL}cyclists/`, makeOptions("get")).then(res => handleErrorsAndParse(res))
export const deleteCyclistRequest = async (id) => await fetch(`${SERVER_URL}cyclists/${id}`, makeOptions("delete")).then(res => handleErrors(res))
export const editCyclistRequest = async (cyclistDto) => await fetch(`${SERVER_URL}cyclists/edit`, makeOptions("post", cyclistDto)).then((res) => handleErrorsAndParse(res))
export const getCyclistById = async (id) => await fetch(`${SERVER_URL}cyclists/${id}`, makeOptions("get")).then((res) => handleErrorsAndParse(res))
export const getCyclistsByTeam = async (id) => await fetch(`${SERVER_URL}teams/${id}/members`, makeOptions("get")).then(res => handleErrorsAndParse(res))

export function makeOptions(method, body, addToken) {
    const opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) opts.body = JSON.stringify(body) // Add optional body
    if (addToken) {
        let jwt = sessionStorage.getItem("token") // Authentication
        if (jwt) opts.headers.Authorization = `Bearer ${jwt}`
    }
    return opts
}

export async function handleErrorsAndParse(res) {
    if (!res.ok) {
        const errorResponse = await res.json()
        const error = new Error(errorResponse.error)
        throw error
    }
    return res.json()
}

export async function handleErrors(res) {
    if (!res.ok) {
        const errorResponse = await res.json()
        const error = new Error(errorResponse.error)
        throw error
    }
    return res
}