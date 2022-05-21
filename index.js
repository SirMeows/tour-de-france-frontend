import "https://unpkg.com/navigo"

import {
    loadTemplate, adjustForMissingHash, renderTemplate, setActiveLink
} from "./utils.js"
import { renderEntities } from "./pages/show-[entities].js"
import { renderEntity } from "./pages/show-[entity].js"

window.addEventListener("load", async () => {
    const router = new Navigo("/", { hash: true })
    const templateHome = await loadTemplate("./pages/home.html")
    const templateShowEntities = await loadTemplate("./pages/pages/show-[entities].js")
    const templateShowEntity = await loadTemplate("./pages/show-[entity].js")

    adjustForMissingHash()
    await router
        .hooks({
            before(done, match) {
                setActiveLink("top-nav", match.url)
                done()
            }
        })
        .on("/", ()=>renderTemplate(templateHome, "content"))
        .on("/show-[entities]", () => {
            renderTemplate(templateShowEntities, "content")
            renderEntities()
        })
        .on("/show-[entity]/:entityId", (navigoMatch) => {
            renderTemplate(templateShowEntity, "content")
            renderEntity(navigoMatch.data.entityId)
        })
})