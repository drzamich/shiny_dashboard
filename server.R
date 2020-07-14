library(shiny)
library(shinyjs)
library(jsonlite)
library(data.table)

source('data-helpers.R')
source('gui-helpers.R')

.GlobalEnv$sales <- read.csv('data/sales.csv')
.GlobalEnv$production <- read.csv('data/production.csv')

server <- function(input, output) {
  useShinyjs(html = TRUE)

  initialize_gui_data(sales, production)

  shiny::observeEvent(input$productionMonth, {
    .GlobalEnv$production %>% update_production_data(input$productionMonth)
  });

  shiny::observeEvent(input$salesMonth, {
    .GlobalEnv$sales %>% update_sales_data(input$salesMonth)
  });

  top_sales <- 3
  shiny::observeEvent(input$topSalesMonth, {
    .GlobalEnv$sales %>% update_top_sales(input$topSalesMonth, top_sales)
  });

  shiny::observeEvent(input$dataRefresh, {
    .GlobalEnv$sales <- read.csv('data/sales.csv')
    .GlobalEnv$production <- read.csv('data/production.csv')
    initialize_gui_data(sales, production, refresh = TRUE)
  });
}
