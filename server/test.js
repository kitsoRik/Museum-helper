const func = (...args) => {
    func2([...args]);
}

const func2 = ([a]) => {
    console.log(a);
}

func(1,2,34);