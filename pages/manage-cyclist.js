import { addCyclistRequest, getAllTeams, editCyclistRequest, getCyclistById } from "../fetch-facade.js";

export function initiateTeamDropdown() {
    getAllTeams()
        .then(teams => {
            renderTeamOptions(teams)
        })
}

function renderTeamOptions(teams) {
    const teamOptions =
        teams.map(team => createTeamOption(team)
        ).join("\n")
    teamDropdown().innerHTML = teamOptions;
}

function createTeamOption(team) {
    return `<option value="${team.id}"> ${team.name} </option>`
}

export function addCyclistHandler() {
    addCyclistBtn().onclick = createNewCyclist;
}

const createNewCyclist = async () => {
    const teamId = teamIdVal()
    const cyclistDto = {
        firstName: fNameInputVal(),
        lastName: lNameInputVal(),
        teamId: teamId
    }
    const req = await addCyclistRequest(teamId, cyclistDto)
    console.log(JSON.stringify(req))
}

export function editCyclistHandler(cyclistId) {
    addCyclistBtn().onclick = function() {
        editCyclist(cyclistId);
    }
}

const editCyclist = async (cyclistId) => {
 const cyclistDto = {
        id: cyclistId,
        firstName: fNameInputVal(),
        lastName: lNameInputVal(),
        teamId: teamIdVal()
    }
    await editCyclistRequest(cyclistDto)
}

export function initiateCyclist(cyclistId) {
    getCyclistById(cyclistId)
        .then(cyclist => {
            document.getElementById("firstName-input").value = cyclist.firstName
            document.getElementById("lastName-input").value = cyclist.lastName
        })
}

function fNameInputVal() {
    return document.getElementById("firstName-input").value
}

function lNameInputVal() {
    return document.getElementById("lastName-input").value
}

function teamIdVal() {
    return teamDropdown().value
}

function teamDropdown() {
    return document.getElementById("team-select-dropdown")
}

function addCyclistBtn() {
    return document.getElementById("add-cyclist-btn")
}