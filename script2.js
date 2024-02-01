const func1 = () => {
    return new Promise((resolve) => {
        // Resolve after some asynchronous operation
        setTimeout(() => {
            console.log("func1 resolved");
            resolve();
        }, 500);
    });
};

const func2 = () => {
    let count = 0;

    const demo = () => {
        return new Promise((resolve) => {
            // Resolve after some asynchronous operation
            setTimeout(() => {
                console.log("demo resolved");
                resolve();
            }, 500);
        });
    };

    // Start the promise chain
    return demo().then(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (count < 6) {
                    console.log("hello");
                    count++;
                    resolve();
                }
            }, 1000);
        });
    }).then(() => {
        // Chain the next promise
        return func1();
    });
};

func2().then(() => {
    console.log("All promises resolved");
});
