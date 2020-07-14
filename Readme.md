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

### Generate sample data
There is  a Python script that prepares sample CSV files with data used in the Shiny app. Firstly make sure you have the libraries needed:
```
pip install Faker pandas
```

Generate the data by running the script
```
python data/fake_data_generator.py
```

## Usage
Open the `app.R` file in RStudio and click on the **Run App**  button.

## Development
### UI
To run the UI as React app in development mode, run:
```
REACT_APP_DEV_MODE=1 npm start
```
