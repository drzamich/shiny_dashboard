library(shiny)
library(shinyjs)
library(jsonlite)
library(data.table)

source('helpers.R')

sales = read.csv('data/sales.csv')
production = read.csv('data/production.csv')

months <- extract_months(sales)
metrics <- calculate_metrics(sales, production)

update_production_data <- function(production, month) {
  production_for_month <- production %>% get_production_for_month(month)
  runjs(paste0('SD_updateProductionData(', toJSON(production_for_month$dates) ,',', toJSON(production_for_month$values) ,')'))
  production_for_month
}

update_sales_data <- function(sales, month) {
  sales_for_month <- sales %>% get_sales_for_month(month)
  runjs(paste0('SD_updateMapData(', toJSON(sales_for_month),')'))
  sales_for_month
}

server <- function(input, output) {
  useShinyjs(html = TRUE)

  last_month = last(months)
  update_production_data(production, last_month)
  update_sales_data(sales, last_month)
  runjs('SD_setLoading(false)')
  runjs(paste0('SD_setMonthCodes(', toJSON(months) ,')'))
  runjs(paste0('SD_updateCardsData(', toJSON(metrics, auto_unbox = TRUE),')'))

  # For development purposes
  write_json(metrics, 'ui/src/mocks/metrics.json')
  write_json(months, 'ui/src/mocks/months.json')
  write_json(update_sales_data(sales, last_month), 'ui/src/mocks/sales.json')
  write_json(update_production_data(production, last_month)$dates, 'ui/src/mocks/production_dates.json')
  write_json(update_production_data(production, last_month)$values, 'ui/src/mocks/production_values.json')

  shiny::observeEvent(input$productionMonth, {
    production %>% update_production_data(input$productionMonth)
  });

  shiny::observeEvent(input$salesMonth, {
    sales %>% update_sales_data(input$salesMonth)
  });
}
