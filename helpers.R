library(dplyr)

group_by_city <- function(data) data %>% group_by(loc_city)

group_by_days <- function(data) data %>% group_by(date)

group_by_months <- function(data) data %>% mutate(month = format(as.Date(date), "%Y-%m")) %>% group_by(month)

group_by_years <- function(data) data %>% mutate(year = format(as.Date(date), "%Y")) %>% group_by(year)

summarise_sales_data <- function(data) data %>% summarise(
                                                  units_sold = n(),
                                                  total_profit = sum(profit),
                                                  max_profit = max(profit),
                                                  min_profit = min(profit),
                                                  mean_profit = mean(profit)
                                                )
