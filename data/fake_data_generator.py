from os import path
import pandas as pd
from datetime import datetime
from faker import Faker
from faker.providers import date_time, python, geo

faker = Faker()
faker.add_provider(date_time)
faker.add_provider(python)

start_date = "2018-01-01"
end_date = "2019-12-31"

directory = path.dirname(__file__)

# PRODUCTION
dates = pd.date_range(start = start_date, end = end_date).to_pydatetime().tolist()
data = {
    'date': dates,
    'units': [faker.pyint(min_value = 10, max_value=200) for i in range(len(dates))],
}
production_df = pd.DataFrame(data)
production_df.to_csv(directory + '/production.csv', index = False)

# SALES
rows = 2500
locations = [faker.location_on_land() for i in range(rows)]
data = {
    'date': [faker.date_between_dates(datetime.fromisoformat(start_date), datetime.fromisoformat(end_date)) for i in range(rows)],
    'profit': [faker.pyfloat(min_value = -1000, max_value = 5000, right_digits=2) for i in range(rows)],
    'loc_lat': [i[0] for i in locations],
    'loc_lng': [i[1] for i in locations],
    'loc_city': [i[4].split('/')[1] for i in locations]
}
sales_df = pd.DataFrame(data)
sales_df.sort_values('date', inplace = True)
sales_df.to_csv(directory + '/sales.csv', index = False)
