library(dplyr)
library(purrr)
library(data.table)

group_data <- function(data, grouping_type) {
  if (grouping_type == 'day') {
    return(data %>% group_by(date))
  }
  else if (grouping_type == 'month') {
    return (data %>% mutate(month = format(as.Date(date), "%Y-%m")) %>% group_by(month))
  }
  else if (grouping_type == 'year') {
    return (data %>% mutate(year = format(as.Date(date), "%Y")) %>% group_by(year))
  }
  else if (grouping_type == 'city') {
    return (data %>% group_by(loc_city))
  }
  else if (grouping_type == 'month_and_city') {
    return(data %>% mutate(month = format(as.Date(date), "%Y-%m")) %>% group_by(month, loc_city))
  }
}

summarise_sales_data <- function(data) data %>% summarise(
                                                  units_sold = n(),
                                                  total_profit = sum(profit),
                                                  max_profit = max(profit),
                                                  min_profit = min(profit),
                                                  mean_profit = mean(profit),
                                                  loc_lat = mean(loc_lat),
                                                  loc_lng = mean(loc_lng),
) %>% mutate(rank = percent_rank(total_profit))

summarise_production_data <- function(data) data %>% summarise(
                                                        units = n()
)

calculate_change <- function(df, col_name) {
  last_tuple <- last(data.frame(df[[col_name]]), 2);
  change <- (last_tuple[2,1] - last_tuple[1,1]) / last_tuple[1,1]
  change
}

calculate_metrics <- function(sales, production) {
  metrics <- list()
  timespans <- list('day', 'month', 'year')
  sales_metrics <- list('total_profit', 'mean_profit', 'units_sold')

  for (timespan in timespans) {
    sales_data <- sales %>% group_data(timespan) %>% summarise_sales_data
    production_data <- production %>% group_data(timespan) %>% summarise_production_data

    metrics[[timespan]] = list()
    for (sale_metric in sales_metrics) {
      metrics[[timespan]][[sale_metric]] = list(
        value = sales_data %>% last(1)[[sale_metric]],
        change = sales_data %>% calculate_change(sale_metric)
      )
    }

    metrics[[timespan]]$units_produced = list(
      value = production_data %>% last(1)[['units']],
      change = production_data %>% calculate_change('units')
    )
  }

  metrics
}
