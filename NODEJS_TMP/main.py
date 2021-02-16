import mysql.connector

dbcon = mysql.connector.connect(host="localhost", port = "3306", user="root", passwd = "1234", database = "daim_support")

mycursor = dbcon.cursor()
sql = "INSERT INTO tb_user(id, user_id, user_name, user_pw) VALUES (%s, %s, %s, %s)"
val = (1, "shpark", "박소희", "12345")

mycursor.execute(sql, val)
dbcon.commit()

print(mycursor.rowcount, "record inserted")