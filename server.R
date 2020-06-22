library(shiny)
library(shinyjs)
library(jsonlite)

source('helpers.R')

sales = read.csv('data/sales.csv');

sales_by_city <- sales %>% group_by_city() %>% summarise_sales_data()

sales_json = toJSON(sales_by_city);

server <- function(input, output) {
  useShinyjs(html = TRUE)
  runjs(paste0('map.updateData(', sales_json,')'))
}
