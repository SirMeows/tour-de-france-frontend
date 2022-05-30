import "https://unpkg.com/navigo"

import {
    loadTemplate, adjustForMissingHash, renderTemplate, setActiveLink
} from "./utils.js"

import { getAllCyclists, getAllTeams } from "./fetch-facade.js";

import { renderTeams } from "./pages/show-teams.js"
import { addCyclistHandler, initiateTeamDropdown, initiateCyclist, editCyclistHandler } from "./pages/add-cyclist.js"
import { renderCyclists } from "./pages/show-cyclists.js";


window.addEventListener("load", async () => {
    const router = new Navigo("/", { hash: true })
    const templateShowTeams = await loadTemplate("./pages/show-teams.html")
    const templateAddCyclist = await loadTemplate("./pages/add-cyclist.html")
    const templateShowCyclists = await loadTemplate("./pages/show-cyclists.html")

    adjustForMissingHash()
    await router
        .hooks({
            before(done, match) {
                setActiveLink("top-nav", match.url)
                done()
            }
        })
        .on("/show-teams", () => {
            renderTemplate(templateShowTeams, "content")
            renderTeams(getAllTeams())
        })
        .on("/add-cyclist", () => {
            renderTemplate(templateAddCyclist, "content")
            initiateTeamDropdown()
            addCyclistHandler()
        })
        .on("/show-cyclists", () => {
            renderTemplate(templateShowCyclists, "content")
            renderCyclists(getAllCyclists())
        })
        .on("/edit-cyclist/:cyclistId", (navigoMatch) => {
            renderTemplate(templateAddCyclist, "content")
            const cId = navigoMatch.data.cyclistId
            initiateCyclist(cId)
            initiateTeamDropdown()
            editCyclistHandler(cId)
        })
})