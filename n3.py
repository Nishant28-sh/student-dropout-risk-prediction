matrix = [[1,1,1],[1,0,1],[1,1,1]]

for i in range(0,len(matrix),1):
    for j in range(0,len(matrix[i]),1):
        if matrix[j]==0:
            matrix[i][j]=0
print(matrix)