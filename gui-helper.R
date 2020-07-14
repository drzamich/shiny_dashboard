library(data.table)
library(jsonlite)
library(R6)

source('data-helper.R')

GuiHelper <- R6::R6Class("GuiHelper",
  public = list(
    # Constructor
    initialize = function(sales, production, refresh = FALSE) {
      private$data_helper <- DataHelper$new(sales, production)
      private$initialize_gui_data(refresh)
    },

    # Public methods
    update_production_data = function(month) {
      production_for_month <- private$data_helper$get_production_for_month(month)
      shinyjs::runjs(paste0('SD_updateProductionData(',
                              jsonlite::toJSON(production_for_month$dates), ',',
                              jsonlite::toJSON(production_for_month$values), ')'))
      production_for_month
    },

    update_sales_data = function(month) {
      sales_for_month <- private$data_helper$get_sales_for_month(month)
      shinyjs::runjs(paste0('SD_updateMapData(', jsonlite::toJSON(sales_for_month), ')'))
      sales_for_month
    },

    update_top_sales = function(month) {
      no_top_sales <- 3
      sales_for_month <- private$data_helper$get_sales_for_month(month)
      top_sales <- sales_for_month %>%
                      private$data_helper$get_top_rows('rank', no_top_sales)
      shinyjs::runjs(paste0('SD_updateTopSales(', jsonlite::toJSON(top_sales), ')'))
      top_sales
    }
  ),

  private = list(
    # Private variables
    data_helper = NULL,

    # Private methods
    initialize_gui_data = function(refresh = FALSE) {
      months <- private$data_helper$extract_months()
      metrics <- private$data_helper$calculate_metrics()
      last_month = data.table::last(months)

      self$update_production_data(last_month)
      self$update_sales_data(last_month)

      self$update_top_sales(last_month)

      shinyjs::runjs(paste0('SD_setMonthCodes(', jsonlite::toJSON(months), ')'))
      shinyjs::runjs(paste0('SD_updateCardsData(', jsonlite::toJSON(metrics,
                                                        auto_unbox = TRUE), ')'))

      private$genetate_mocks(metrics, months, last_month);
      method <- if (isTRUE(refresh)) 'setRefreshing' else 'setLoading'
      method_calll <- paste0('SD_', method, '(false)')
      shinyjs::runjs(method_calll)
    },

    genetate_mocks = function(metrics, months, last_month) {
      # For development purposes
      if (!is.null(.GlobalEnv$generate_mocks)) {
        write_json(metrics, 'ui/src/mocks/metrics.json', auto_unbox = TRUE)
        write_json(months, 'ui/src/mocks/months.json')
        write_json(self$update_sales_data(last_month),
                    'ui/src/mocks/sales.json')
        write_json(self$update_top_sales(last_month),
                    'ui/src/mocks/top_sales.json')
        write_json(self$update_production_data(last_month)$dates,
                    'ui/src/mocks/production_dates.json')
        write_json(self$update_production_data(last_month)$values,
                    'ui/src/mocks/production_values.json')
      }
    }
  )
)
