import "https://unpkg.com/navigo"

import {
    loadTemplate, adjustForMissingHash, renderTemplate, setActiveLink
} from "./utils.js"
import { renderTeams } from "./pages/show-teams.js"

window.addEventListener("load", async () => {
    const router = new Navigo("/", { hash: true })
    const templateShowTeams = await loadTemplate("./pages/show-teams.html")

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
            renderTeams()
        })
})