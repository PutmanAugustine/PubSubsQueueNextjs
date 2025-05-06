import random

with open("products.json", "w") as f:
	f.write("[\n")
	for i in range(100):
		j = random.randint(0,99)
		if j > 9:
			j = str(j)
		else:
			j = "0" + str(j)
		f.write("{ \"id\": " + str(i) + ", \"name\": \"Product #" + str(i) + "\", \"price\": " + str(random.randint(20,1000)) + "." + j + "},\n")
	f.write("]")	
	f.close()
