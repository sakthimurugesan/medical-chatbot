class A:

    def __init__(self,m1,m2):
        self.m1=m1
        self.m2=m2

    def total(self):
        return self.m1+self.m2

a=A(1,2)
print(a.total())

