library(dplyr)
library(purrr)
library(data.table)

options(dplyr.summarise.inform=F)

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
  last_tuple <- data.table::last(data.frame(df[[col_name]]), 2);
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

extract_months <- function(data) {
  months_df <- data %>% group_data('month') %>% summarise
  return(as.vector(months_df[['month']]))
}

filter_by_month <- function(data, month_code) {
  data_with_months <- data %>% mutate(month = format(as.Date(date), "%Y-%m"))
  data_with_months[data_with_months$month == month_code,]
}

get_production_for_month <- function(production, month_code) {
  production_for_month <- production %>% filter_by_month(month_code)
  result <- list(
    dates = as.vector(production_for_month[['date']]),
    values = as.vector(production_for_month[['units']])
  )
}

get_sales_for_month <- function(sales, month_code) {
  sales_for_months <- sales %>% filter_by_month(month_code)
  sales_for_months %>% group_data('city') %>% summarise_sales_data
}

get_top_rows <- function(data, col_name, no_rows) {
  ordered <- data[order(data[[col_name]], decreasing = TRUE),]
  top <- ordered[1:no_rows,]
}
