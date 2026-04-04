responses = [["good","ok","good","ok"],["ok","bad","good","ok","ok"],["good"],["bad"]]
x = []
for i in range(0,len(responses),1):
    count_map = {}
    for j in range(len(responses[i])):
        val = responses[i][j]
        if val in count_map:
            count_map[val]+=1
        else:
            count_map[val]=1
    x.append(count_map)
print(x)
