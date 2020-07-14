library(data.table)
library(dplyr)
library(R6)

options(dplyr.summarise.inform = F)

DataHelper <- R6::R6Class("DataHelper",
  public = list(
    # Constructor
    initialize = function(sales, production) {
      private$sales <- sales
      private$production <- production
    },

    # Public methods
    calculate_metrics = function() {
      metrics <- list()
      timespans <- list('day', 'month', 'year')
      sales_metrics <- list('total_profit', 'mean_profit', 'units_sold')

      for (timespan in timespans) {
        sales_data <- private$sales %>% private$group_data(timespan) %>%
                                          private$summarise_sales_data()
        production_data <- private$production %>% private$group_data(timespan) %>%
                                                  private$summarise_production_data()

        metrics[[timespan]] = list()
        for (sale_metric in sales_metrics) {
          metrics[[timespan]][[sale_metric]] = list(
            value = sales_data %>% last(1)[[sale_metric]],
            change = sales_data %>% private$calculate_change(sale_metric)
          )
        }

        metrics[[timespan]]$units_produced = list(
          value = production_data %>% data.table::last(1)[['units']],
          change = production_data %>% private$calculate_change('units')
        )
      }

      metrics
    },

    get_sales_for_month = function(month_code) {
      sales_for_months <- private$sales %>% private$filter_by_month(month_code)
      sales_for_months %>% private$group_data('city') %>% private$summarise_sales_data()
    },

    get_production_for_month = function(month_code) {
      production_for_month <- private$production %>% private$filter_by_month(month_code)
      result <- list(
        dates = as.vector(production_for_month[['date']]),
        values = as.vector(production_for_month[['units']])
      )
    },

    get_top_rows = function(data, col_name, no_rows) {
      ordered <- data[order(data[[col_name]], decreasing = TRUE),]
      top <- ordered[1:no_rows,]
    },

    extract_months = function() {
      months_df <- private$sales %>% private$group_data('month') %>% dplyr::summarise()
      return(as.vector(months_df[['month']]))
    }
  ),

  private = list(
    # Private variables
    sales = NULL,
    production = NULL,

    # Private methods
    group_data = function(data, grouping_type) {
      if (grouping_type == 'day') {
        return(data %>% dplyr::group_by(date))
      }
      else if (grouping_type == 'month') {
        return(data %>%
                dplyr::mutate(month = format(as.Date(date), "%Y-%m")) %>%
                  dplyr::group_by(month))
      }
      else if (grouping_type == 'year') {
        return(data %>%
                dplyr::mutate(year = format(as.Date(date), "%Y")) %>%
                  dplyr::group_by(year))
      }
      else if (grouping_type == 'city') {
        return(data %>%
                dplyr::group_by(loc_city))
      }
      else if (grouping_type == 'month_and_city') {
        return(data %>%
                dplyr::mutate(month = format(as.Date(date), "%Y-%m")) %>%
                  dplyr::group_by(month, loc_city))
      }
    },

    calculate_change = function(df, col_name) {
      last_tuple <- data.table::last(data.frame(df[[col_name]]), 2);
      change <- (last_tuple[2, 1] - last_tuple[1, 1]) / last_tuple[1, 1]
    },

    filter_by_month = function(data, month_code) {
      data_with_months <- data %>%
                            dplyr::mutate(month = format(as.Date(date), "%Y-%m"))
      data_with_months[data_with_months$month == month_code,]
    },

    summarise_sales_data = function(data) {
      data %>% dplyr::summarise(
                units_sold = n(),
                total_profit = sum(profit),
                max_profit = max(profit),
                min_profit = min(profit),
                mean_profit = mean(profit),
                loc_lat = mean(loc_lat),
                loc_lng = mean(loc_lng)) %>%
              dplyr::mutate(rank = percent_rank(total_profit))
    },

    summarise_production_data = function(data) {
      data %>% dplyr::summarise(units = n())
    }
  )
)
