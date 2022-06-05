import { addCyclistRequest, getAllTeams, editCyclistRequest, getCyclistById } from "../fetch-facade.js";

// Team Dropdown

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
    teamDropdownElm().innerHTML = teamOptions;
}

function createTeamOption(team) {
    return `<option value="${team.id}"> ${team.name} </option>`
}

// Add Cyclist

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
    await addCyclistRequest(teamId, cyclistDto)
    //TODO: Redirect to Show Cyclists page
}

// Edit Cyclist

export function editCyclistHandler(cyclistId) {
    addCyclistBtn().onclick = function() {
        editCyclist(cyclistId);
    }
}

export function initiateCyclist(cyclistId) {
    getCyclistById(cyclistId)
        .then(cyclist => {
            document.getElementById("firstName-input").value = cyclist.firstName
            document.getElementById("lastName-input").value = cyclist.lastName
        })
}

const editCyclist = async (cyclistId) => {
 const cyclistDto = {
        id: cyclistId,
        firstName: fNameInputVal(),
        lastName: lNameInputVal(),
        teamId: teamIdVal()
    }
    await editCyclistRequest(cyclistDto)
    //TODO: Redirect to Show Cyclists page
}

// Elements and Element values

function fNameInputVal() {
    return document.getElementById("firstName-input").value
}

function lNameInputVal() {
    return document.getElementById("lastName-input").value
}

function teamIdVal() {
    return teamDropdownElm().value
}

function teamDropdownElm() {
    return document.getElementById("team-select-dropdown")
}

function addCyclistBtn() {
    return document.getElementById("add-cyclist-btn")
}