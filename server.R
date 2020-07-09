library(shiny)
library(shinyjs)
library(jsonlite)
library(data.table)

source('data-helpers.R')
source('gui-helpers.R')

sales = read.csv('data/sales.csv')
production = read.csv('data/production.csv')


server <- function(input, output) {
  useShinyjs(html = TRUE)

  initialize_gui_data(sales, production)

  shiny::observeEvent(input$productionMonth, {
    production %>% update_production_data(input$productionMonth)
  });

  shiny::observeEvent(input$salesMonth, {
    sales %>% update_sales_data(input$salesMonth)
  });

  shiny::observeEvent(input$topSalesMonth, {
    sales %>% update_top_sales(input$topSalesMonth, top_sales)
  });

  genetate_mocks(metrics, months, sales, production, last_month);
}
