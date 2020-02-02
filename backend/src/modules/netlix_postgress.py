import psycopg2
import pandas as pd

PGHOST= 'database-1.c5yvutghx4zv.us-east-2.rds.amazonaws.com'
PGDATABASE='postgres'
PGUSER='postgres'
PGPASSWORD='Sarahapplejax123'

conn_string = "host="+ PGHOST +" port="+ "5432" +" dbname="+ PGDATABASE +" user=" + PGUSER \
+" password="+ PGPASSWORD
conn=psycopg2.connect(conn_string)
print("Connected!")

# Create a cursor object
cursor = conn.cursor()


sql_command = "SELECT * FROM public.netflix"
print (sql_command)

# Load the data
data = pd.read_sql(sql_command, conn)

test='test'