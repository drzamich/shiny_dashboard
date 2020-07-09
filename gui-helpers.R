update_production_data <- function(production, month) {
  production_for_month <- production %>% get_production_for_month(month)
  runjs(paste0('SD_updateProductionData(', toJSON(production_for_month$dates) ,',', toJSON(production_for_month$values) ,')'))
  production_for_month
}

update_sales_data <- function(sales, month) {
  sales_for_month <- sales %>% get_sales_for_month(month)
  runjs(paste0('SD_updateMapData(', toJSON(sales_for_month),')'))
  sales_for_month
}

update_top_sales <- function(sales, month, no_rows)  {
  sales_for_month <- sales %>% get_sales_for_month(month)
  top_sales <- sales_for_month %>% get_top_rows('rank', no_rows)
  runjs(paste0('SD_updateTopSales(', toJSON(top_sales),')'))
  top_sales
}

genetate_mocks <- function(metrics, months, sales, production, last_month) {
    # For development purposes
  if(!is.null(.GlobalEnv$generate_mocks)) {
    write_json(metrics, 'ui/src/mocks/metrics.json', auto_unbox = TRUE)
    write_json(months, 'ui/src/mocks/months.json')
    write_json(update_sales_data(sales, last_month), 'ui/src/mocks/sales.json')
    write_json(update_top_sales(sales, last_month, 3), 'ui/src/mocks/top_sales.json')
    write_json(update_production_data(production, last_month)$dates, 'ui/src/mocks/production_dates.json')
    write_json(update_production_data(production, last_month)$values, 'ui/src/mocks/production_values.json')
  }
}

initialize_gui_data <- function(sales, production) {
  months <- extract_months(sales)
  metrics <- calculate_metrics(sales, production)
  last_month = last(months)

  update_production_data(production, last_month)
  update_sales_data(sales, last_month)

  top_sales = 3
  update_top_sales(sales, last_month, top_sales)

  runjs('SD_setLoading(false)')
  runjs(paste0('SD_setMonthCodes(', toJSON(months) ,')'))
  runjs(paste0('SD_updateCardsData(', toJSON(metrics, auto_unbox = TRUE),')'))

  genetate_mocks(metrics, months, sales, production, last_month);
}
