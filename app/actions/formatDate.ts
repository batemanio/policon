export function formatDate(date: any) {
    const d = new Date(date);
    const formattedDate = d.toDateString();
    return formattedDate;
}
