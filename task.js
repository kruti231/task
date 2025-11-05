function solution(D) {
    const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const getDayName = (dateStr) => {
        const date = new Date(dateStr);
        const dayIndex = date.getDay(); // 0 (Sun) to 6 (Sat)
        return DAYS[dayIndex === 0 ? 6 : dayIndex - 1];
    };

    const daily_sum = Object.fromEntries(DAYS.map(day => [day, 0]));
    const daily_count = Object.fromEntries(DAYS.map(day => [day, 0]));

    for (const [date, value] of Object.entries(D)) {
        const day = getDayName(date);
        daily_sum[day] += value;
        daily_count[day] += 1;
    }

    for (let i = 0; i < DAYS.length; i++) {
        const currentDay = DAYS[i];

        if (daily_count[currentDay] === 0) {
            const prevDayIndex = (i - 1 + 7) % 7;
            const nextDayIndex = (i + 1) % 7;

            const prevDaySum = daily_sum[DAYS[prevDayIndex]];
            const nextDaySum = daily_sum[DAYS[nextDayIndex]];

            const meanValue = Math.round((prevDaySum + nextDaySum) / 2);

            daily_sum[currentDay] = meanValue;
        }
    }

    return daily_sum;
}

