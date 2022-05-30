import { addCyclistRequest, getAllTeams } from "../fetch-facade.js";

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
    document.getElementById("team-select-dropdown").innerHTML = teamOptions;
}

function createTeamOption(team) {
    return `<option value="${team.id}"> ${team.name} </option>`
}

export function addCyclistHandler() {
    document.getElementById("add-cyclist-btn").onclick = createNewCyclist;
}

const createNewCyclist = async () => {
    const teamDropdown = document.getElementById("team-select-dropdown");
    const teamId = teamDropdown.value;

    const cyclistDto = {
        firstName: document.getElementById("firstName-input").value,
        lastName: document.getElementById("lastName-input").value,
        teamId: teamId
    }
    const req = await addCyclistRequest(teamId, cyclistDto)
    console.log(JSON.stringify(req))
}