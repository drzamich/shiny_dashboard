library(shiny)
library(shinyjs)
library(jsonlite)
library(data.table)

source('helpers.R')

sales = read.csv('data/sales.csv')
production = read.csv('data/production.csv')

months <- extract_months(sales)
months_JSON <- toJSON(months)

metrics <- calculate_metrics(sales, production)
metrics_JSON <- toJSON(metrics, auto_unbox = TRUE)

production_data <- production %>% get_production_for_month(last(months))
production_dates_JSON <- toJSON(production_data$dates)
production_values_JSON <- toJSON(production_data$values)

sales_by_city <- sales %>% group_data('city') %>% summarise_sales_data()

sales_json = toJSON(sales_by_city);

server <- function(input, output) {
  useShinyjs(html = TRUE)
  runjs('SD_setLoading(false)')
  runjs(paste0('SD_setMonthCodes(', months_JSON ,')'))
  runjs(paste0('SD_updateMapData(', sales_json,')'))
  runjs(paste0('SD_updateCardsData(', metrics_JSON,')'))
  runjs(paste0('SD_updateProductionData(', production_dates_JSON ,',', production_values_JSON ,')'))

  # For development purposes
  write_json(metrics, 'ui/src/mocks/metrics.json')
  write_json(months, 'ui/src/mocks/months.json')
  write_json(sales_by_city, 'ui/src/mocks/sales.json')
  write_json(production_data$dates, 'ui/src/mocks/production_dates.json')
  write_json(production_data$values, 'ui/src/mocks/production_values.json')
}
