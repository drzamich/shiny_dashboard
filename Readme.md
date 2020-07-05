# Shiny dashboard with React.js
Sample Shiny application that leverages React.js to build the UI.

## Installation
### Prerequisites
* R libraries: `shiny`, `shinyjs`
* `npm` command available in the command line

### Build the UI
Source code of the UI (a typical React project created with [Create React App](https://create-react-app.dev/)) is contained in the `ui` directory. A Shiny app needs _pure_ HTML, JS and CSS files, which are React build artifacts, in the `www` directory.

You firstly need to install React project's dependencies:
```
cd ui
npm install
```
And then build the UI:
```
npm run build
```
Build artifacts will  be automatically copied to the `www` directory.

## Usage
Open the `app.R` file in RStudio and click on the **Run App**  button.
