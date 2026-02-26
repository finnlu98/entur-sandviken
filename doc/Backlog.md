# Backlog – Heimr

## Bugs

- widgets sometime renders with to wide width
- disable city bike map when moving it around
- negative minutes for bustimes
- bustime fetch is not updated on new route and route name is always 1


## Hard launch

- img identifier for image should be posted to server and img path in config (this is ok for mvp launch)
- accreditate all integrations
- review if you have rights to use all images in solution
- write about privacy etc.
- Go through security requirements for server
- update data should be displayed as small spinner in right corner

- fix on hover on tablet
- upload banner issue in prod
- need to fix calender name
- move config for header from home profile

- add linting rules to repo
- implement shared cache for dashboards

## Improvements

- calculate widget size and pos based on state when adding new widget
- Make dashboard smaller when opening edit mode
- collapse sidebar media query - on tap expand - sidebar icons show when collapsed
- when picking adress for the first time zoom to selection city bike
- customizable header - add compact widgets (needs standard class to pick widget to add) - move config to header
- review logs from react warnings in terminal and fix them
- User needs confirmation widget settings is OK
- add possiblity to add home local storage
- gh workflow should build and deploy seperatably
- horizontal scroll
- edit dashboard -> green checkmark and configuration save button before commiting changes
- buttons in sidebar button main button has - make it possible to cancel edit changes

## Refactors

- rename everything so it has the same naming convention - looking for linting package

## Later

### Widgets

- rate your stay
- App position data for home state, not HAS
- Home assistant iframe widget
- Expenses
- Shopping list with geo tracking
- Electricity advice

### New Integrations

- Forbrukerrådet
- Norges bank
- Yr badetemperatur
- Politet
- Bring
- Statens vegvesen: trafikkdata
