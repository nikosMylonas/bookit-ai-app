export function initialsGenerator(name: string) {
    const splitName = name.split(' ').splice(0, 2);
    const initialsArray = splitName.map((string) => {
        return string[0];
    });

    return initialsArray.join('');
}

export function nameFormatter(name: string) {
    const firstName = name.split(' ')[0];
    return firstName;
}

export function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        // hour: '2-digit',
        // minute: '2-digit',
    });
}

export function formatNumberOfPersons(numberOfPerons: number): string {
    if (numberOfPerons === 0) {
        return 'None';
    } else if (numberOfPerons === 4) {
        return 'More than Three';
    }

    return numberOfPerons.toString();
}
