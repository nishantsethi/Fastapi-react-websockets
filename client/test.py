a = "hello"

def func():
    global a
    a = "Hi"

func()

print(a)