library(shiny)
library(shinyjs)
library(jsonlite)

source('helpers.R')

sales = read.csv('data/sales.csv')
production = read.csv('data/production.csv')

metrics <- calculate_metrics(sales, production)
metrics_JSON <- toJSON(metrics, auto_unbox = TRUE)

sales_by_city <- sales %>% group_data('city') %>% summarise_sales_data()

sales_json = toJSON(sales_by_city);

server <- function(input, output) {
  useShinyjs(html = TRUE)
  runjs('setLoading(false)')
  runjs(paste0('map.updateData(', sales_json,')'))
  runjs(paste0('cards.updateData(', metrics_JSON,')'))
}
