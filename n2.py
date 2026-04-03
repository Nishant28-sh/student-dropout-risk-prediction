matrix = [[3,7,8],[9,11,13],[15,16,17]]

x = []
for i in range(0,len(matrix),1):
    min = matrix[i][0]
    for j in range(0,len(matrix[i]),1):
        if matrix[i][j]<min:
            min = matrix[j]
    x.append(min)
# print(x)
max = x[0]
for j in range(0,len(x),1):
    if x[i]>=max:
        max = x[i]
print(max)