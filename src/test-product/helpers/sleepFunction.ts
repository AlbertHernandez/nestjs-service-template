export const sleepTest = (): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3000); // 3000 milliseconds = 3 seconds
    });
};