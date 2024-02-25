export const secondsToMinutes =(seconds : number) => {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }