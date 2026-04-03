grid = [[1,3],[2,2]]

x = []
for i in range(0,len(grid),1):
    for j in range(0,len(grid),1):
        x.append(grid[i][j])
# print(x)

count_map = {}
for i in x:
    if i in count_map:
        count_map[i]+=1
    else:
        count_map[i]=1
# print(count_map)
a = 0
for key,value in count_map.items():
    if value==2:
        a = key
# print(a)

x.sort()

# print(x)


n = len(x)
e_s = n*(n+1)//2
a_s = sum(x)
m_n = e_s-(a_s-a)
# print(m_n)

print([a,m_n])

