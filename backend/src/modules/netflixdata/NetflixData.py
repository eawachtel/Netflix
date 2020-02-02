import modules.config as config
import pandas as pd
import psycopg2


class NetflixData:
    def __init__(self):

        self.conn_string = "host=" + config.PGHOST + " port=" + "5432" + " dbname=" + config.PGDATABASE + " user=" \
                      + config.PGUSER + " password=" + config.PGPASSWORD
        self.conn = psycopg2.connect(self.conn_string)

    def getpageinitdata(self):
        cursor = self.conn.cursor()
        '''Get New Releases'''
        sql_command = "select title from netflix where date_added is not null order by date_added desc limit 5"
        new_releases_df = pd.read_sql(sql_command, self.conn)
        new_releases = new_releases_df.title.tolist()
        '''Get Type Options'''
        sql_command2 = "select distinct netflix_type from netflix"
        netflix_type_df = pd.read_sql(sql_command2, self.conn)
        netflix_type = netflix_type_df.netflix_type.tolist()

        return [new_releases, netflix_type]


    def getnetflixdata(self, post):
        category = post.get('selectedType')
        cursor = self.conn.cursor()
        sql_command = "select title, director, netflix_cast, release_year, " \
                      "rating, duration, description, listed_in from netflix where country = 'United States' " \
                      "and netflix_type = '{type}'".format(type=category)
        # Load the data
        data = pd.read_sql(sql_command, self.conn)
        columns = list(data)
        column_names = []
        for column in columns:
            field = {'field': column, 'title': column, 'filter': False, 'filterItems': None}
            column_names.append(field)
        data = data.fillna(-1).to_dict(orient='records')

        results = [data, column_names]

        return results
