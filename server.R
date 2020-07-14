library(shiny)
library(shinyjs)

source('gui-helper.R')

sales <- read.csv('data/sales.csv')
production <- read.csv('data/production.csv')

server <- function(input, output) {
  shinyjs::useShinyjs(html = TRUE)
  user_session <- new.env()

  user_session$gui_helper <- GuiHelper$new(sales, production)

  shiny::observeEvent(input$productionMonth, {
    user_session$gui_helper$update_production_data(input$productionMonth)
  });

  shiny::observeEvent(input$salesMonth, {
    user_session$gui_helper$update_sales_data(input$salesMonth)
  });

  shiny::observeEvent(input$topSalesMonth, {
    user_session$gui_helper$update_top_sales(input$topSalesMonth)
  });

  shiny::observeEvent(input$dataRefresh, {
    sales <- read.csv('data/sales.csv')
    production <- read.csv('data/production.csv')
    user_session$gui_helper <- GuiHelper$new(sales, production, refresh = TRUE)
  });
}
