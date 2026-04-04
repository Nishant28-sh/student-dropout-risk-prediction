s = "lEetcOde"

x = ['a','e','i','o','u','A','E','I','O','U']
a = []
b = []

for i in s:
    if i in x:
        a.append(i)

for i in s:
    if  i in x:
        b.append(" ")
    else:
        b.append(i)


a = sorted(a)


k=0
for i in range(len(b)):
    if b[i]==" ":
        b[i] = a[k]
        k+=1
print("".join(b))